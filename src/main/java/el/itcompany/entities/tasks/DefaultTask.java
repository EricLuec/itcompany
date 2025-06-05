package el.itcompany.entities.tasks;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class DefaultTask implements Task {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    String name;
    int duration;
    int complexity;

    @Override
    public int getDuration() {
        return this.duration;
    }

    @Override
    public int getComplexity() {
        return this.complexity;
    }
}
