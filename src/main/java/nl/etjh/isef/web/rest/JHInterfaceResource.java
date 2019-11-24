package nl.etjh.isef.web.rest;

import nl.etjh.isef.domain.JHInterface;
import nl.etjh.isef.repository.JHInterfaceRepository;
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
 * REST controller for managing {@link nl.etjh.isef.domain.JHInterface}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class JHInterfaceResource {

    private final Logger log = LoggerFactory.getLogger(JHInterfaceResource.class);

    private static final String ENTITY_NAME = "jHInterface";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JHInterfaceRepository jHInterfaceRepository;

    public JHInterfaceResource(JHInterfaceRepository jHInterfaceRepository) {
        this.jHInterfaceRepository = jHInterfaceRepository;
    }

    /**
     * {@code POST  /jh-interfaces} : Create a new jHInterface.
     *
     * @param jHInterface the jHInterface to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jHInterface, or with status {@code 400 (Bad Request)} if the jHInterface has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jh-interfaces")
    public ResponseEntity<JHInterface> createJHInterface(@RequestBody JHInterface jHInterface) throws URISyntaxException {
        log.debug("REST request to save JHInterface : {}", jHInterface);
        if (jHInterface.getId() != null) {
            throw new BadRequestAlertException("A new jHInterface cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JHInterface result = jHInterfaceRepository.save(jHInterface);
        return ResponseEntity.created(new URI("/api/jh-interfaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jh-interfaces} : Updates an existing jHInterface.
     *
     * @param jHInterface the jHInterface to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jHInterface,
     * or with status {@code 400 (Bad Request)} if the jHInterface is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jHInterface couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jh-interfaces")
    public ResponseEntity<JHInterface> updateJHInterface(@RequestBody JHInterface jHInterface) throws URISyntaxException {
        log.debug("REST request to update JHInterface : {}", jHInterface);
        if (jHInterface.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JHInterface result = jHInterfaceRepository.save(jHInterface);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jHInterface.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /jh-interfaces} : get all the jHInterfaces.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jHInterfaces in body.
     */
    @GetMapping("/jh-interfaces")
    public ResponseEntity<List<JHInterface>> getAllJHInterfaces(Pageable pageable) {
        log.debug("REST request to get a page of JHInterfaces");
        Page<JHInterface> page = jHInterfaceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /jh-interfaces/:id} : get the "id" jHInterface.
     *
     * @param id the id of the jHInterface to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jHInterface, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jh-interfaces/{id}")
    public ResponseEntity<JHInterface> getJHInterface(@PathVariable Long id) {
        log.debug("REST request to get JHInterface : {}", id);
        Optional<JHInterface> jHInterface = jHInterfaceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jHInterface);
    }

    /**
     * {@code DELETE  /jh-interfaces/:id} : delete the "id" jHInterface.
     *
     * @param id the id of the jHInterface to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jh-interfaces/{id}")
    public ResponseEntity<Void> deleteJHInterface(@PathVariable Long id) {
        log.debug("REST request to delete JHInterface : {}", id);
        jHInterfaceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
