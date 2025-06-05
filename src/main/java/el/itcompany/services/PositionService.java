package el.itcompany.services;

import el.itcompany.entities.position.Position;
import el.itcompany.repositories.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PositionService {

    private final PositionRepository positionRepository;

    public void newPosition(Position position) {
        this.positionRepository.save(position);

    }
}
