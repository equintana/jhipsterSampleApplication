package es.keensoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TimelineEvent.
 */
@Entity
@Table(name = "timeline_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "timelineevent")
public class TimelineEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "visible")
    private Boolean visible;

    @OneToOne
    @JoinColumn(unique = true)
    private Classroom classroom;

    @OneToMany(mappedBy = "timelineEvent")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Review> reviews = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isVisible() {
        return visible;
    }

    public TimelineEvent visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public TimelineEvent classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public TimelineEvent reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public TimelineEvent addReview(Review review) {
        this.reviews.add(review);
        review.setTimelineEvent(this);
        return this;
    }

    public TimelineEvent removeReview(Review review) {
        this.reviews.remove(review);
        review.setTimelineEvent(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TimelineEvent timelineEvent = (TimelineEvent) o;
        if (timelineEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timelineEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimelineEvent{" +
            "id=" + getId() +
            ", visible='" + isVisible() + "'" +
            "}";
    }
}
