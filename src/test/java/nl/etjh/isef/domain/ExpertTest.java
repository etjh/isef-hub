package nl.etjh.isef.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import nl.etjh.isef.web.rest.TestUtil;

public class ExpertTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expert.class);
        Expert expert1 = new Expert();
        expert1.setId(1L);
        Expert expert2 = new Expert();
        expert2.setId(expert1.getId());
        assertThat(expert1).isEqualTo(expert2);
        expert2.setId(2L);
        assertThat(expert1).isNotEqualTo(expert2);
        expert1.setId(null);
        assertThat(expert1).isNotEqualTo(expert2);
    }
}
