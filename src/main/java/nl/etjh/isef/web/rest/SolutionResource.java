package nl.etjh.isef.web.rest;

import nl.etjh.isef.domain.Solution;
import nl.etjh.isef.repository.SolutionRepository;
import nl.etjh.isef.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link nl.etjh.isef.domain.Solution}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SolutionResource {

    private final Logger log = LoggerFactory.getLogger(SolutionResource.class);

    private static final String ENTITY_NAME = "solution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolutionRepository solutionRepository;

    public SolutionResource(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    /**
     * {@code POST  /solutions} : Create a new solution.
     *
     * @param solution the solution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solution, or with status {@code 400 (Bad Request)} if the solution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solutions")
    public ResponseEntity<Solution> createSolution(@RequestBody Solution solution) throws URISyntaxException {
        log.debug("REST request to save Solution : {}", solution);
        if (solution.getId() != null) {
            throw new BadRequestAlertException("A new solution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Solution result = solutionRepository.save(solution);
        return ResponseEntity.created(new URI("/api/solutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solutions} : Updates an existing solution.
     *
     * @param solution the solution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solution,
     * or with status {@code 400 (Bad Request)} if the solution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solutions")
    public ResponseEntity<Solution> updateSolution(@RequestBody Solution solution) throws URISyntaxException {
        log.debug("REST request to update Solution : {}", solution);
        if (solution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Solution result = solutionRepository.save(solution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solution.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /solutions} : get all the solutions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solutions in body.
     */
    @GetMapping("/solutions")
    public List<Solution> getAllSolutions() {
        log.debug("REST request to get all Solutions");
        return solutionRepository.findAll();
    }

    /**
     * {@code GET  /solutions/:id} : get the "id" solution.
     *
     * @param id the id of the solution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solutions/{id}")
    public ResponseEntity<Solution> getSolution(@PathVariable Long id) {
        log.debug("REST request to get Solution : {}", id);
        Optional<Solution> solution = solutionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(solution);
    }

    /**
     * {@code DELETE  /solutions/:id} : delete the "id" solution.
     *
     * @param id the id of the solution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solutions/{id}")
    public ResponseEntity<Void> deleteSolution(@PathVariable Long id) {
        log.debug("REST request to delete Solution : {}", id);
        solutionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
