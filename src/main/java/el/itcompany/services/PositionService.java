package el.itcompany.services;

import el.itcompany.entities.position.Position;
import el.itcompany.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    public void newPosition(Position position) {
        this.positionRepository.save(position);

    }
}
