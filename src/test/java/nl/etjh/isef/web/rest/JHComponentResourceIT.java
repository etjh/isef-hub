package nl.etjh.isef.web.rest;

import nl.etjh.isef.IsefApp;
import nl.etjh.isef.domain.JHComponent;
import nl.etjh.isef.repository.JHComponentRepository;
import nl.etjh.isef.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static nl.etjh.isef.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link JHComponentResource} REST controller.
 */
@SpringBootTest(classes = IsefApp.class)
public class JHComponentResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private JHComponentRepository jHComponentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restJHComponentMockMvc;

    private JHComponent jHComponent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JHComponentResource jHComponentResource = new JHComponentResource(jHComponentRepository);
        this.restJHComponentMockMvc = MockMvcBuilders.standaloneSetup(jHComponentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JHComponent createEntity(EntityManager em) {
        JHComponent jHComponent = new JHComponent()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .summary(DEFAULT_SUMMARY)
            .description(DEFAULT_DESCRIPTION);
        return jHComponent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JHComponent createUpdatedEntity(EntityManager em) {
        JHComponent jHComponent = new JHComponent()
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);
        return jHComponent;
    }

    @BeforeEach
    public void initTest() {
        jHComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createJHComponent() throws Exception {
        int databaseSizeBeforeCreate = jHComponentRepository.findAll().size();

        // Create the JHComponent
        restJHComponentMockMvc.perform(post("/api/jh-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHComponent)))
            .andExpect(status().isCreated());

        // Validate the JHComponent in the database
        List<JHComponent> jHComponentList = jHComponentRepository.findAll();
        assertThat(jHComponentList).hasSize(databaseSizeBeforeCreate + 1);
        JHComponent testJHComponent = jHComponentList.get(jHComponentList.size() - 1);
        assertThat(testJHComponent.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testJHComponent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testJHComponent.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testJHComponent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createJHComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jHComponentRepository.findAll().size();

        // Create the JHComponent with an existing ID
        jHComponent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJHComponentMockMvc.perform(post("/api/jh-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHComponent)))
            .andExpect(status().isBadRequest());

        // Validate the JHComponent in the database
        List<JHComponent> jHComponentList = jHComponentRepository.findAll();
        assertThat(jHComponentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllJHComponents() throws Exception {
        // Initialize the database
        jHComponentRepository.saveAndFlush(jHComponent);

        // Get all the jHComponentList
        restJHComponentMockMvc.perform(get("/api/jh-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jHComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getJHComponent() throws Exception {
        // Initialize the database
        jHComponentRepository.saveAndFlush(jHComponent);

        // Get the jHComponent
        restJHComponentMockMvc.perform(get("/api/jh-components/{id}", jHComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jHComponent.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingJHComponent() throws Exception {
        // Get the jHComponent
        restJHComponentMockMvc.perform(get("/api/jh-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJHComponent() throws Exception {
        // Initialize the database
        jHComponentRepository.saveAndFlush(jHComponent);

        int databaseSizeBeforeUpdate = jHComponentRepository.findAll().size();

        // Update the jHComponent
        JHComponent updatedJHComponent = jHComponentRepository.findById(jHComponent.getId()).get();
        // Disconnect from session so that the updates on updatedJHComponent are not directly saved in db
        em.detach(updatedJHComponent);
        updatedJHComponent
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);

        restJHComponentMockMvc.perform(put("/api/jh-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJHComponent)))
            .andExpect(status().isOk());

        // Validate the JHComponent in the database
        List<JHComponent> jHComponentList = jHComponentRepository.findAll();
        assertThat(jHComponentList).hasSize(databaseSizeBeforeUpdate);
        JHComponent testJHComponent = jHComponentList.get(jHComponentList.size() - 1);
        assertThat(testJHComponent.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testJHComponent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testJHComponent.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testJHComponent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingJHComponent() throws Exception {
        int databaseSizeBeforeUpdate = jHComponentRepository.findAll().size();

        // Create the JHComponent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJHComponentMockMvc.perform(put("/api/jh-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHComponent)))
            .andExpect(status().isBadRequest());

        // Validate the JHComponent in the database
        List<JHComponent> jHComponentList = jHComponentRepository.findAll();
        assertThat(jHComponentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJHComponent() throws Exception {
        // Initialize the database
        jHComponentRepository.saveAndFlush(jHComponent);

        int databaseSizeBeforeDelete = jHComponentRepository.findAll().size();

        // Delete the jHComponent
        restJHComponentMockMvc.perform(delete("/api/jh-components/{id}", jHComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<JHComponent> jHComponentList = jHComponentRepository.findAll();
        assertThat(jHComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
