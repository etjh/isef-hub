package nl.etjh.isef.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import nl.etjh.isef.web.rest.TestUtil;

public class JHComponentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JHComponent.class);
        JHComponent jHComponent1 = new JHComponent();
        jHComponent1.setId(1L);
        JHComponent jHComponent2 = new JHComponent();
        jHComponent2.setId(jHComponent1.getId());
        assertThat(jHComponent1).isEqualTo(jHComponent2);
        jHComponent2.setId(2L);
        assertThat(jHComponent1).isNotEqualTo(jHComponent2);
        jHComponent1.setId(null);
        assertThat(jHComponent1).isNotEqualTo(jHComponent2);
    }
}
