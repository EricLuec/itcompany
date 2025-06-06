package el.itcompany.services;

import el.itcompany.entities.position.Position;
import el.itcompany.repositories.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PositionService {

    private final PositionRepository positionRepository;

    public void newPosition(Position position) {
        this.positionRepository.save(position);
    }
    public List<Position> findAll() {
        return this.positionRepository.findAll();
    }
}
