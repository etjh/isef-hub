package nl.etjh.isef.web.rest;

import nl.etjh.isef.domain.Issue;
import nl.etjh.isef.repository.IssueRepository;
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
 * REST controller for managing {@link nl.etjh.isef.domain.Issue}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IssueResource {

    private final Logger log = LoggerFactory.getLogger(IssueResource.class);

    private static final String ENTITY_NAME = "issue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IssueRepository issueRepository;

    public IssueResource(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    /**
     * {@code POST  /issues} : Create a new issue.
     *
     * @param issue the issue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new issue, or with status {@code 400 (Bad Request)} if the issue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/issues")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to save Issue : {}", issue);
        if (issue.getId() != null) {
            throw new BadRequestAlertException("A new issue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.created(new URI("/api/issues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /issues} : Updates an existing issue.
     *
     * @param issue the issue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated issue,
     * or with status {@code 400 (Bad Request)} if the issue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the issue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/issues")
    public ResponseEntity<Issue> updateIssue(@RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to update Issue : {}", issue);
        if (issue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, issue.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /issues} : get all the issues.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of issues in body.
     */
    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssues(Pageable pageable) {
        log.debug("REST request to get a page of Issues");
        Page<Issue> page = issueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /issues/:id} : get the "id" issue.
     *
     * @param id the id of the issue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the issue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/issues/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable Long id) {
        log.debug("REST request to get Issue : {}", id);
        Optional<Issue> issue = issueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(issue);
    }

    /**
     * {@code DELETE  /issues/:id} : delete the "id" issue.
     *
     * @param id the id of the issue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/issues/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        log.debug("REST request to delete Issue : {}", id);
        issueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
