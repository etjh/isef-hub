package nl.etjh.isef.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * ISEF Interface Solution Expert Finder\n\n@author etjh.nl
 */
@ApiModel(description = "ISEF Interface Solution Expert Finder\n\n@author etjh.nl")
@Entity
@Table(name = "expert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Expert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "contact_details")
    private String contactDetails;

    @ManyToOne
    @JsonIgnoreProperties("experts")
    private Expert group;

    @ManyToOne
    @JsonIgnoreProperties("experts")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Expert name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public Expert contactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
        return this;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public Expert getGroup() {
        return group;
    }

    public Expert group(Expert expert) {
        this.group = expert;
        return this;
    }

    public void setGroup(Expert expert) {
        this.group = expert;
    }

    public User getUser() {
        return user;
    }

    public Expert user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expert)) {
            return false;
        }
        return id != null && id.equals(((Expert) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expert{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", contactDetails='" + getContactDetails() + "'" +
            "}";
    }
}
