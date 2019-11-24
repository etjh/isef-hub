package nl.etjh.isef.web.rest;

import nl.etjh.isef.domain.Expert;
import nl.etjh.isef.repository.ExpertRepository;
import nl.etjh.isef.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link nl.etjh.isef.domain.Expert}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExpertResource {

    private final Logger log = LoggerFactory.getLogger(ExpertResource.class);

    private static final String ENTITY_NAME = "expert";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpertRepository expertRepository;

    public ExpertResource(ExpertRepository expertRepository) {
        this.expertRepository = expertRepository;
    }

    /**
     * {@code POST  /experts} : Create a new expert.
     *
     * @param expert the expert to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expert, or with status {@code 400 (Bad Request)} if the expert has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/experts")
    public ResponseEntity<Expert> createExpert(@RequestBody Expert expert) throws URISyntaxException {
        log.debug("REST request to save Expert : {}", expert);
        if (expert.getId() != null) {
            throw new BadRequestAlertException("A new expert cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expert result = expertRepository.save(expert);
        return ResponseEntity.created(new URI("/api/experts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /experts} : Updates an existing expert.
     *
     * @param expert the expert to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expert,
     * or with status {@code 400 (Bad Request)} if the expert is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expert couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/experts")
    public ResponseEntity<Expert> updateExpert(@RequestBody Expert expert) throws URISyntaxException {
        log.debug("REST request to update Expert : {}", expert);
        if (expert.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expert result = expertRepository.save(expert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expert.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /experts} : get all the experts.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of experts in body.
     */
    @GetMapping("/experts")
    public ResponseEntity<List<Expert>> getAllExperts(Pageable pageable) {
        log.debug("REST request to get a page of Experts");
        Page<Expert> page = expertRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /experts/:id} : get the "id" expert.
     *
     * @param id the id of the expert to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expert, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/experts/{id}")
    public ResponseEntity<Expert> getExpert(@PathVariable Long id) {
        log.debug("REST request to get Expert : {}", id);
        Optional<Expert> expert = expertRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expert);
    }

    /**
     * {@code DELETE  /experts/:id} : delete the "id" expert.
     *
     * @param id the id of the expert to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/experts/{id}")
    public ResponseEntity<Void> deleteExpert(@PathVariable Long id) {
        log.debug("REST request to delete Expert : {}", id);
        expertRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
