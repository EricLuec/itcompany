package el.itcompany.controllers;

import el.itcompany.entities.LogEntry;
import el.itcompany.services.LogEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logEntry")
public class LogEntryController {

    private final LogEntryService logEntryService;

    public LogEntryController (LogEntryService logEntryService) {
        this.logEntryService = logEntryService;
    }

    @GetMapping
    public List<LogEntry> getAllLogEntries() {
        return logEntryService.getAllLogEntries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogEntry> getItemById(@PathVariable Long id) {
        return logEntryService.getLogEntryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public LogEntry createLogEntry(@RequestBody LogEntry logEntry) {
        return logEntryService.createLogEntry(logEntry);
    }
}
