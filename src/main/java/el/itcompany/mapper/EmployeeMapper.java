package el.itcompany.mapper;

import el.itcompany.dto.CreateEmployeeDTO;
import el.itcompany.dto.EmployeeDTO;
import el.itcompany.entities.people.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EmployeeMapper {

    @Mapping(target = "firstName", source = "vorname")
    @Mapping(target = "lastName", source = "nachname")
    @Mapping(target = "positionId", source = "position.id")
    @Mapping(target = "buildingId", source = "building.id")
    @Mapping(target = "sectorId", source = "sector.id")
    @Mapping(target = "positionName", source = "position.name")
    @Mapping(target = "buildingName", source = "building.name")
    @Mapping(target = "sectorName", source = "sector.name")
    @Mapping(target = "buildingAddress", source = "building.address")
    @Mapping(target = "sectorSalaryClass", source = "sector.salaryClass")
    EmployeeDTO toDTO(Employee employee);

    // Map from CreateEmployeeDTO to Employee entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "vorname", source = "firstName")
    @Mapping(target = "nachname", source = "lastName")
    Employee toEntity(CreateEmployeeDTO dto);
}