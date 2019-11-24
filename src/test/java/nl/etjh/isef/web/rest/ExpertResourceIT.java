package nl.etjh.isef.web.rest;

import nl.etjh.isef.IsefApp;
import nl.etjh.isef.domain.Expert;
import nl.etjh.isef.repository.ExpertRepository;
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
 * Integration tests for the {@link ExpertResource} REST controller.
 */
@SpringBootTest(classes = IsefApp.class)
public class ExpertResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_DETAILS = "BBBBBBBBBB";

    @Autowired
    private ExpertRepository expertRepository;

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

    private MockMvc restExpertMockMvc;

    private Expert expert;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpertResource expertResource = new ExpertResource(expertRepository);
        this.restExpertMockMvc = MockMvcBuilders.standaloneSetup(expertResource)
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
    public static Expert createEntity(EntityManager em) {
        Expert expert = new Expert()
            .name(DEFAULT_NAME)
            .contactDetails(DEFAULT_CONTACT_DETAILS);
        return expert;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expert createUpdatedEntity(EntityManager em) {
        Expert expert = new Expert()
            .name(UPDATED_NAME)
            .contactDetails(UPDATED_CONTACT_DETAILS);
        return expert;
    }

    @BeforeEach
    public void initTest() {
        expert = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpert() throws Exception {
        int databaseSizeBeforeCreate = expertRepository.findAll().size();

        // Create the Expert
        restExpertMockMvc.perform(post("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isCreated());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeCreate + 1);
        Expert testExpert = expertList.get(expertList.size() - 1);
        assertThat(testExpert.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExpert.getContactDetails()).isEqualTo(DEFAULT_CONTACT_DETAILS);
    }

    @Test
    @Transactional
    public void createExpertWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expertRepository.findAll().size();

        // Create the Expert with an existing ID
        expert.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpertMockMvc.perform(post("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isBadRequest());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExperts() throws Exception {
        // Initialize the database
        expertRepository.saveAndFlush(expert);

        // Get all the expertList
        restExpertMockMvc.perform(get("/api/experts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expert.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].contactDetails").value(hasItem(DEFAULT_CONTACT_DETAILS)));
    }
    
    @Test
    @Transactional
    public void getExpert() throws Exception {
        // Initialize the database
        expertRepository.saveAndFlush(expert);

        // Get the expert
        restExpertMockMvc.perform(get("/api/experts/{id}", expert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expert.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.contactDetails").value(DEFAULT_CONTACT_DETAILS));
    }

    @Test
    @Transactional
    public void getNonExistingExpert() throws Exception {
        // Get the expert
        restExpertMockMvc.perform(get("/api/experts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpert() throws Exception {
        // Initialize the database
        expertRepository.saveAndFlush(expert);

        int databaseSizeBeforeUpdate = expertRepository.findAll().size();

        // Update the expert
        Expert updatedExpert = expertRepository.findById(expert.getId()).get();
        // Disconnect from session so that the updates on updatedExpert are not directly saved in db
        em.detach(updatedExpert);
        updatedExpert
            .name(UPDATED_NAME)
            .contactDetails(UPDATED_CONTACT_DETAILS);

        restExpertMockMvc.perform(put("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExpert)))
            .andExpect(status().isOk());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeUpdate);
        Expert testExpert = expertList.get(expertList.size() - 1);
        assertThat(testExpert.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExpert.getContactDetails()).isEqualTo(UPDATED_CONTACT_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingExpert() throws Exception {
        int databaseSizeBeforeUpdate = expertRepository.findAll().size();

        // Create the Expert

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpertMockMvc.perform(put("/api/experts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expert)))
            .andExpect(status().isBadRequest());

        // Validate the Expert in the database
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpert() throws Exception {
        // Initialize the database
        expertRepository.saveAndFlush(expert);

        int databaseSizeBeforeDelete = expertRepository.findAll().size();

        // Delete the expert
        restExpertMockMvc.perform(delete("/api/experts/{id}", expert.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expert> expertList = expertRepository.findAll();
        assertThat(expertList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
