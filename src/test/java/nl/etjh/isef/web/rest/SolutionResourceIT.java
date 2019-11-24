package nl.etjh.isef.web.rest;

import nl.etjh.isef.IsefApp;
import nl.etjh.isef.domain.Solution;
import nl.etjh.isef.repository.SolutionRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static nl.etjh.isef.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SolutionResource} REST controller.
 */
@SpringBootTest(classes = IsefApp.class)
public class SolutionResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final Instant DEFAULT_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UNTIL = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UNTIL = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SolutionRepository solutionRepository;

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

    private MockMvc restSolutionMockMvc;

    private Solution solution;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolutionResource solutionResource = new SolutionResource(solutionRepository);
        this.restSolutionMockMvc = MockMvcBuilders.standaloneSetup(solutionResource)
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
    public static Solution createEntity(EntityManager em) {
        Solution solution = new Solution()
            .code(DEFAULT_CODE)
            .version(DEFAULT_VERSION)
            .from(DEFAULT_FROM)
            .until(DEFAULT_UNTIL)
            .summary(DEFAULT_SUMMARY)
            .description(DEFAULT_DESCRIPTION);
        return solution;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Solution createUpdatedEntity(EntityManager em) {
        Solution solution = new Solution()
            .code(UPDATED_CODE)
            .version(UPDATED_VERSION)
            .from(UPDATED_FROM)
            .until(UPDATED_UNTIL)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);
        return solution;
    }

    @BeforeEach
    public void initTest() {
        solution = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolution() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isCreated());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate + 1);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSolution.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testSolution.getFrom()).isEqualTo(DEFAULT_FROM);
        assertThat(testSolution.getUntil()).isEqualTo(DEFAULT_UNTIL);
        assertThat(testSolution.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testSolution.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSolutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution with an existing ID
        solution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isBadRequest());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSolutions() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get all the solutionList
        restSolutionMockMvc.perform(get("/api/solutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solution.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].from").value(hasItem(DEFAULT_FROM.toString())))
            .andExpect(jsonPath("$.[*].until").value(hasItem(DEFAULT_UNTIL.toString())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", solution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solution.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.from").value(DEFAULT_FROM.toString()))
            .andExpect(jsonPath("$.until").value(DEFAULT_UNTIL.toString()))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingSolution() throws Exception {
        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Update the solution
        Solution updatedSolution = solutionRepository.findById(solution.getId()).get();
        // Disconnect from session so that the updates on updatedSolution are not directly saved in db
        em.detach(updatedSolution);
        updatedSolution
            .code(UPDATED_CODE)
            .version(UPDATED_VERSION)
            .from(UPDATED_FROM)
            .until(UPDATED_UNTIL)
            .summary(UPDATED_SUMMARY)
            .description(UPDATED_DESCRIPTION);

        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolution)))
            .andExpect(status().isOk());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSolution.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testSolution.getFrom()).isEqualTo(UPDATED_FROM);
        assertThat(testSolution.getUntil()).isEqualTo(UPDATED_UNTIL);
        assertThat(testSolution.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testSolution.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSolution() throws Exception {
        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Create the Solution

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isBadRequest());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        int databaseSizeBeforeDelete = solutionRepository.findAll().size();

        // Delete the solution
        restSolutionMockMvc.perform(delete("/api/solutions/{id}", solution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
