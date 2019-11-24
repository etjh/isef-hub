package nl.etjh.isef.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import nl.etjh.isef.web.rest.TestUtil;

public class JHInterfaceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JHInterface.class);
        JHInterface jHInterface1 = new JHInterface();
        jHInterface1.setId(1L);
        JHInterface jHInterface2 = new JHInterface();
        jHInterface2.setId(jHInterface1.getId());
        assertThat(jHInterface1).isEqualTo(jHInterface2);
        jHInterface2.setId(2L);
        assertThat(jHInterface1).isNotEqualTo(jHInterface2);
        jHInterface1.setId(null);
        assertThat(jHInterface1).isNotEqualTo(jHInterface2);
    }
}
