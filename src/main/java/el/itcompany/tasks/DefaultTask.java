package el.itcompany.tasks;

public class DefaultTask implements Task {
    String name;
    int duration;
    int complexity;

    public DefaultTask(String name, int duration, int complexity) {
        this.name = name;
        this.duration = duration;
        this.complexity = complexity;
    }

    @Override
    public int getDuration() {
        return this.duration;
    }

    @Override
    public int getComplexity() {
        return this.complexity;
    }
}
