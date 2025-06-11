package el.itcompany;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class MainTest {

    @Test
    public void testMainMethodExists() {
        assertDoesNotThrow(() -> ITCompany.main(new String[0]));
    }
}
