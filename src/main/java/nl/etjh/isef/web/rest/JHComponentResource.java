package nl.etjh.isef.web.rest;

import nl.etjh.isef.domain.JHComponent;
import nl.etjh.isef.repository.JHComponentRepository;
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
 * REST controller for managing {@link nl.etjh.isef.domain.JHComponent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class JHComponentResource {

    private final Logger log = LoggerFactory.getLogger(JHComponentResource.class);

    private static final String ENTITY_NAME = "jHComponent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JHComponentRepository jHComponentRepository;

    public JHComponentResource(JHComponentRepository jHComponentRepository) {
        this.jHComponentRepository = jHComponentRepository;
    }

    /**
     * {@code POST  /jh-components} : Create a new jHComponent.
     *
     * @param jHComponent the jHComponent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jHComponent, or with status {@code 400 (Bad Request)} if the jHComponent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jh-components")
    public ResponseEntity<JHComponent> createJHComponent(@RequestBody JHComponent jHComponent) throws URISyntaxException {
        log.debug("REST request to save JHComponent : {}", jHComponent);
        if (jHComponent.getId() != null) {
            throw new BadRequestAlertException("A new jHComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JHComponent result = jHComponentRepository.save(jHComponent);
        return ResponseEntity.created(new URI("/api/jh-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jh-components} : Updates an existing jHComponent.
     *
     * @param jHComponent the jHComponent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jHComponent,
     * or with status {@code 400 (Bad Request)} if the jHComponent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jHComponent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jh-components")
    public ResponseEntity<JHComponent> updateJHComponent(@RequestBody JHComponent jHComponent) throws URISyntaxException {
        log.debug("REST request to update JHComponent : {}", jHComponent);
        if (jHComponent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JHComponent result = jHComponentRepository.save(jHComponent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jHComponent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /jh-components} : get all the jHComponents.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jHComponents in body.
     */
    @GetMapping("/jh-components")
    public List<JHComponent> getAllJHComponents() {
        log.debug("REST request to get all JHComponents");
        return jHComponentRepository.findAll();
    }

    /**
     * {@code GET  /jh-components/:id} : get the "id" jHComponent.
     *
     * @param id the id of the jHComponent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jHComponent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jh-components/{id}")
    public ResponseEntity<JHComponent> getJHComponent(@PathVariable Long id) {
        log.debug("REST request to get JHComponent : {}", id);
        Optional<JHComponent> jHComponent = jHComponentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jHComponent);
    }

    /**
     * {@code DELETE  /jh-components/:id} : delete the "id" jHComponent.
     *
     * @param id the id of the jHComponent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jh-components/{id}")
    public ResponseEntity<Void> deleteJHComponent(@PathVariable Long id) {
        log.debug("REST request to delete JHComponent : {}", id);
        jHComponentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
