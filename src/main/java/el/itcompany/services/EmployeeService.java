package el.itcompany.services;

import el.itcompany.dto.CreateEmployeeDTO;
import el.itcompany.dto.EmployeeDTO;
import el.itcompany.dto.EmployeeStatisticsDTO;
import el.itcompany.entities.people.Employee;
import el.itcompany.exceptions.ResourceNotFoundException;
import el.itcompany.exceptions.ResourceAlreadyExistsException;
import el.itcompany.exceptions.InvalidDataException;
import el.itcompany.mapper.EmployeeMapper;
import el.itcompany.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BuildingRepository buildingRepository;
    private final PositionRepository positionRepository;
    private final SectorRepository sectorRepository;
    private final EmployeeMapper employeeMapper;

    @Transactional(readOnly = true)
    public List<EmployeeDTO> findAll() {
        log.info("Fetching all employees");
        try {
            List<Employee> employees = employeeRepository.findAllWithRelations();
            log.info("Found {} employees", employees.size());
            return employees.stream()
                    .map(employeeMapper::toDTO)
                    .toList();
        } catch (Exception e) {
            log.error("Error fetching all employees", e);
            throw new RuntimeException("Failed to fetch employees", e);
        }
    }

    @Transactional(readOnly = true)
    public Page<EmployeeDTO> findAllPaginated(Pageable pageable) {
        log.info("Fetching paginated employees - page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        try {
            Page<Employee> employeePage = employeeRepository.findAll(pageable);
            log.info("Found {} employees on page {} of {}", employeePage.getContent().size(),
                    employeePage.getNumber(), employeePage.getTotalPages());
            return employeePage.map(employeeMapper::toDTO);
        } catch (Exception e) {
            log.error("Error fetching paginated employees", e);
            throw new RuntimeException("Failed to fetch paginated employees", e);
        }
    }

    @Transactional(readOnly = true)
    public EmployeeDTO findById(Long id) {
        log.info("Fetching employee with id: {}", id);
        validateId(id);

        return employeeRepository.findByIdWithRelations(id)
                .map(employee -> {
                    log.info("Found employee: {} {}", employee.getVorname(), employee.getNachname());
                    return employeeMapper.toDTO(employee);
                })
                .orElseThrow(() -> {
                    log.warn("Employee not found with id: {}", id);
                    return new ResourceNotFoundException("Employee not found with id: " + id);
                });
    }

    public EmployeeDTO create(CreateEmployeeDTO dto) {
        log.info("Creating new employee: {} {}", dto.getFirstName(), dto.getLastName());
        validateCreateEmployeeDTO(dto);

        try {
            // Check if employee already exists by email
            if (employeeRepository.findByEmail(dto.getEmail()).isPresent()) {
                throw new ResourceAlreadyExistsException("Employee with email " + dto.getEmail() + " already exists");
            }

            Employee employee = employeeMapper.toEntity(dto);

            // Set related entities
            employee.setBuilding(buildingRepository.findById(dto.getBuildingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + dto.getBuildingId())));
            employee.setPosition(positionRepository.findById(dto.getPositionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Position not found with id: " + dto.getPositionId())));
            employee.setSector(sectorRepository.findById(dto.getSectorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Sector not found with id: " + dto.getSectorId())));

            Employee saved = employeeRepository.save(employee);
            log.info("Successfully created employee with id: {}", saved.getId());

            return employeeMapper.toDTO(saved);
        } catch (ResourceNotFoundException | ResourceAlreadyExistsException e) {
            log.error("Error creating employee: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error creating employee", e);
            throw new RuntimeException("Failed to create employee", e);
        }
    }

    public EmployeeDTO update(Long id, CreateEmployeeDTO dto) {
        log.info("Updating employee with id: {}", id);
        validateId(id);
        validateCreateEmployeeDTO(dto);

        try {
            Employee existingEmployee = employeeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

            // Check if email is taken by another employee
            Optional<Employee> employeeWithEmail = employeeRepository.findByEmail(dto.getEmail());
            if (employeeWithEmail.isPresent() && !employeeWithEmail.get().getId().equals(id)) {
                throw new ResourceAlreadyExistsException("Employee with email " + dto.getEmail() + " already exists");
            }

            // Update fields
            existingEmployee.setVorname(dto.getFirstName());
            existingEmployee.setNachname(dto.getLastName());
            existingEmployee.setEmail(dto.getEmail());

            // Update related entities
            existingEmployee.setBuilding(buildingRepository.findById(dto.getBuildingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + dto.getBuildingId())));
            existingEmployee.setPosition(positionRepository.findById(dto.getPositionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Position not found with id: " + dto.getPositionId())));
            existingEmployee.setSector(sectorRepository.findById(dto.getSectorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Sector not found with id: " + dto.getSectorId())));

            Employee updated = employeeRepository.save(existingEmployee);
            log.info("Successfully updated employee with id: {}", id);

            return employeeMapper.toDTO(updated);
        } catch (ResourceNotFoundException | ResourceAlreadyExistsException e) {
            log.error("Error updating employee: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error updating employee with id: {}", id, e);
            throw new RuntimeException("Failed to update employee", e);
        }
    }

    public void delete(Long id) {
        log.info("Deleting employee with id: {}", id);
        validateId(id);

        try {
            if (!employeeRepository.existsById(id)) {
                throw new ResourceNotFoundException("Employee not found with id: " + id);
            }

            employeeRepository.deleteById(id);
            log.info("Successfully deleted employee with id: {}", id);
        } catch (ResourceNotFoundException e) {
            log.error("Error deleting employee: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error deleting employee with id: {}", id, e);
            throw new RuntimeException("Failed to delete employee", e);
        }
    }

    // Creative Features

    @Transactional(readOnly = true)
    public List<EmployeeDTO> findByBuilding(Long buildingId) {
        log.info("Fetching employees in building with id: {}", buildingId);
        validateId(buildingId);

        try {
            List<Employee> employees = employeeRepository.findByBuildingIdWithRelations(buildingId);
            log.info("Found {} employees in building {}", employees.size(), buildingId);
            return employees.stream().map(employeeMapper::toDTO).toList();
        } catch (Exception e) {
            log.error("Error fetching employees by building", e);
            throw new RuntimeException("Failed to fetch employees by building", e);
        }
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> findBySector(Long sectorId) {
        log.info("Fetching employees in sector with id: {}", sectorId);
        validateId(sectorId);

        try {
            List<Employee> employees = employeeRepository.findBySectorIdWithRelations(sectorId);
            log.info("Found {} employees in sector {}", employees.size(), sectorId);
            return employees.stream().map(employeeMapper::toDTO).toList();
        } catch (Exception e) {
            log.error("Error fetching employees by sector", e);
            throw new RuntimeException("Failed to fetch employees by sector", e);
        }
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> searchEmployees(String searchTerm) {
        log.info("Searching employees with term: {}", searchTerm);

        if (!StringUtils.hasText(searchTerm)) {
            throw new InvalidDataException("Search term cannot be empty");
        }

        try {
            List<Employee> employees = employeeRepository.findByVornameContainingIgnoreCaseOrNachnameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    searchTerm, searchTerm, searchTerm);
            log.info("Found {} employees matching search term: {}", employees.size(), searchTerm);
            return employees.stream().map(employeeMapper::toDTO).toList();
        } catch (Exception e) {
            log.error("Error searching employees", e);
            throw new RuntimeException("Failed to search employees", e);
        }
    }

    @Transactional(readOnly = true)
    public EmployeeStatisticsDTO getEmployeeStatistics() {
        log.info("Calculating employee statistics");

        try {
            long totalEmployees = employeeRepository.count();
            long totalBuildings = employeeRepository.countDistinctBuildings();
            long totalSectors = employeeRepository.countDistinctSectors();
            long totalPositions = employeeRepository.countDistinctPositions();

            EmployeeStatisticsDTO stats = EmployeeStatisticsDTO.builder()
                    .totalEmployees(totalEmployees)
                    .totalBuildings(totalBuildings)
                    .totalSectors(totalSectors)
                    .totalPositions(totalPositions)
                    .build();

            log.info("Employee statistics calculated: {} total employees", totalEmployees);
            return stats;
        } catch (Exception e) {
            log.error("Error calculating employee statistics", e);
            throw new RuntimeException("Failed to calculate employee statistics", e);
        }
    }

    public void transferEmployeeToBuilding(Long employeeId, Long newBuildingId) {
        log.info("Transferring employee {} to building {}", employeeId, newBuildingId);
        validateId(employeeId);
        validateId(newBuildingId);

        try {
            Employee employee = employeeRepository.findById(employeeId)
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

            Building newBuilding = buildingRepository.findById(newBuildingId)
                    .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + newBuildingId));

            Long oldBuildingId = employee.getBuilding() != null ? employee.getBuilding().getId() : null;
            employee.setBuilding(newBuilding);
            employeeRepository.save(employee);

            log.info("Successfully transferred employee {} from building {} to building {}",
                    employeeId, oldBuildingId, newBuildingId);
        } catch (ResourceNotFoundException e) {
            log.error("Error transferring employee: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error transferring employee", e);
            throw new RuntimeException("Failed to transfer employee", e);
        }
    }

    // Validation methods
    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new InvalidDataException("Invalid ID: " + id);
        }
    }

    private void validateCreateEmployeeDTO(CreateEmployeeDTO dto) {
        if (dto == null) {
            throw new InvalidDataException("Employee data cannot be null");
        }
        if (!StringUtils.hasText(dto.getFirstName())) {
            throw new InvalidDataException("First name is required");
        }
        if (!StringUtils.hasText(dto.getLastName())) {
            throw new InvalidDataException("Last name is required");
        }
        if (!StringUtils.hasText(dto.getEmail())) {
            throw new InvalidDataException("Email is required");
        }
        if (!dto.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new InvalidDataException("Invalid email format");
        }
        if (dto.getBuildingId() == null || dto.getBuildingId() <= 0) {
            throw new InvalidDataException("Valid building ID is required");
        }
        if (dto.getPositionId() == null || dto.getPositionId() <= 0) {
            throw new InvalidDataException("Valid position ID is required");
        }
        if (dto.getSectorId() == null || dto.getSectorId() <= 0) {
            throw new InvalidDataException("Valid sector ID is required");
        }
    }
}