package nl.etjh.isef.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A JHInterface.
 */
@Entity
@Table(name = "jh_interface")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JHInterface implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "summary")
    private String summary;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("jHInterfaces")
    private JHComponent producer;

    @ManyToOne
    @JsonIgnoreProperties("jHInterfaces")
    private JHComponent consumer;

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

    public JHInterface code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public JHInterface name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public JHInterface summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public JHInterface description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public JHComponent getProducer() {
        return producer;
    }

    public JHInterface producer(JHComponent jHComponent) {
        this.producer = jHComponent;
        return this;
    }

    public void setProducer(JHComponent jHComponent) {
        this.producer = jHComponent;
    }

    public JHComponent getConsumer() {
        return consumer;
    }

    public JHInterface consumer(JHComponent jHComponent) {
        this.consumer = jHComponent;
        return this;
    }

    public void setConsumer(JHComponent jHComponent) {
        this.consumer = jHComponent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JHInterface)) {
            return false;
        }
        return id != null && id.equals(((JHInterface) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "JHInterface{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", summary='" + getSummary() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
