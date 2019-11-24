package nl.etjh.isef.web.rest;

import nl.etjh.isef.IsefApp;
import nl.etjh.isef.domain.JHInterface;
import nl.etjh.isef.repository.JHInterfaceRepository;
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
 * Integration tests for the {@link JHInterfaceResource} REST controller.
 */
@SpringBootTest(classes = IsefApp.class)
public class JHInterfaceResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private JHInterfaceRepository jHInterfaceRepository;

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

    private MockMvc restJHInterfaceMockMvc;

    private JHInterface jHInterface;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JHInterfaceResource jHInterfaceResource = new JHInterfaceResource(jHInterfaceRepository);
        this.restJHInterfaceMockMvc = MockMvcBuilders.standaloneSetup(jHInterfaceResource)
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
    public static JHInterface createEntity(EntityManager em) {
        JHInterface jHInterface = new JHInterface()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .summary(DEFAULT_SUMMARY)
            .description(DEFAULT_DESCRIPTION);
        return jHInterface;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JHInterface createUpdatedEntity(EntityManager em) {
        JHInterface jHInterface = new JHInterface()
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);
        return jHInterface;
    }

    @BeforeEach
    public void initTest() {
        jHInterface = createEntity(em);
    }

    @Test
    @Transactional
    public void createJHInterface() throws Exception {
        int databaseSizeBeforeCreate = jHInterfaceRepository.findAll().size();

        // Create the JHInterface
        restJHInterfaceMockMvc.perform(post("/api/jh-interfaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHInterface)))
            .andExpect(status().isCreated());

        // Validate the JHInterface in the database
        List<JHInterface> jHInterfaceList = jHInterfaceRepository.findAll();
        assertThat(jHInterfaceList).hasSize(databaseSizeBeforeCreate + 1);
        JHInterface testJHInterface = jHInterfaceList.get(jHInterfaceList.size() - 1);
        assertThat(testJHInterface.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testJHInterface.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testJHInterface.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testJHInterface.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createJHInterfaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jHInterfaceRepository.findAll().size();

        // Create the JHInterface with an existing ID
        jHInterface.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJHInterfaceMockMvc.perform(post("/api/jh-interfaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHInterface)))
            .andExpect(status().isBadRequest());

        // Validate the JHInterface in the database
        List<JHInterface> jHInterfaceList = jHInterfaceRepository.findAll();
        assertThat(jHInterfaceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllJHInterfaces() throws Exception {
        // Initialize the database
        jHInterfaceRepository.saveAndFlush(jHInterface);

        // Get all the jHInterfaceList
        restJHInterfaceMockMvc.perform(get("/api/jh-interfaces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jHInterface.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getJHInterface() throws Exception {
        // Initialize the database
        jHInterfaceRepository.saveAndFlush(jHInterface);

        // Get the jHInterface
        restJHInterfaceMockMvc.perform(get("/api/jh-interfaces/{id}", jHInterface.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jHInterface.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingJHInterface() throws Exception {
        // Get the jHInterface
        restJHInterfaceMockMvc.perform(get("/api/jh-interfaces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJHInterface() throws Exception {
        // Initialize the database
        jHInterfaceRepository.saveAndFlush(jHInterface);

        int databaseSizeBeforeUpdate = jHInterfaceRepository.findAll().size();

        // Update the jHInterface
        JHInterface updatedJHInterface = jHInterfaceRepository.findById(jHInterface.getId()).get();
        // Disconnect from session so that the updates on updatedJHInterface are not directly saved in db
        em.detach(updatedJHInterface);
        updatedJHInterface
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);

        restJHInterfaceMockMvc.perform(put("/api/jh-interfaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJHInterface)))
            .andExpect(status().isOk());

        // Validate the JHInterface in the database
        List<JHInterface> jHInterfaceList = jHInterfaceRepository.findAll();
        assertThat(jHInterfaceList).hasSize(databaseSizeBeforeUpdate);
        JHInterface testJHInterface = jHInterfaceList.get(jHInterfaceList.size() - 1);
        assertThat(testJHInterface.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testJHInterface.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testJHInterface.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testJHInterface.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingJHInterface() throws Exception {
        int databaseSizeBeforeUpdate = jHInterfaceRepository.findAll().size();

        // Create the JHInterface

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJHInterfaceMockMvc.perform(put("/api/jh-interfaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jHInterface)))
            .andExpect(status().isBadRequest());

        // Validate the JHInterface in the database
        List<JHInterface> jHInterfaceList = jHInterfaceRepository.findAll();
        assertThat(jHInterfaceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJHInterface() throws Exception {
        // Initialize the database
        jHInterfaceRepository.saveAndFlush(jHInterface);

        int databaseSizeBeforeDelete = jHInterfaceRepository.findAll().size();

        // Delete the jHInterface
        restJHInterfaceMockMvc.perform(delete("/api/jh-interfaces/{id}", jHInterface.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<JHInterface> jHInterfaceList = jHInterfaceRepository.findAll();
        assertThat(jHInterfaceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
