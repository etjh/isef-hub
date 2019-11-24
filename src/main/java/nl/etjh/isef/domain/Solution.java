package nl.etjh.isef.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Solution.
 */
@Entity
@Table(name = "solution")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Solution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "version")
    private String version;

    @Column(name = "jhi_from")
    private Instant from;

    @Column(name = "until")
    private Instant until;

    @Column(name = "summary")
    private String summary;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Issue issue;

    @OneToOne
    @JoinColumn(unique = true)
    private Expert expert;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Solution code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getVersion() {
        return version;
    }

    public Solution version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Instant getFrom() {
        return from;
    }

    public Solution from(Instant from) {
        this.from = from;
        return this;
    }

    public void setFrom(Instant from) {
        this.from = from;
    }

    public Instant getUntil() {
        return until;
    }

    public Solution until(Instant until) {
        this.until = until;
        return this;
    }

    public void setUntil(Instant until) {
        this.until = until;
    }

    public String getSummary() {
        return summary;
    }

    public Solution summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public Solution description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Issue getIssue() {
        return issue;
    }

    public Solution issue(Issue issue) {
        this.issue = issue;
        return this;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public Expert getExpert() {
        return expert;
    }

    public Solution expert(Expert expert) {
        this.expert = expert;
        return this;
    }

    public void setExpert(Expert expert) {
        this.expert = expert;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solution)) {
            return false;
        }
        return id != null && id.equals(((Solution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Solution{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", version='" + getVersion() + "'" +
            ", from='" + getFrom() + "'" +
            ", until='" + getUntil() + "'" +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
