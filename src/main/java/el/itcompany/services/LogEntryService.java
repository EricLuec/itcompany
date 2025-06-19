package el.itcompany.services;

import el.itcompany.entities.Item;
import el.itcompany.entities.LogEntry;
import el.itcompany.repositories.LogEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogEntryService {
    private final LogEntryRepository logEntryRepository;

    public List<LogEntry> getAllLogEntries() {
        return logEntryRepository.findAll();
    }

    public Optional<LogEntry> getLogEntryById(Long id) {
        return logEntryRepository.findById(id);
    }

    public LogEntry createLogEntry(LogEntry logEntry) {
        return logEntryRepository.save(logEntry);
    }

}
