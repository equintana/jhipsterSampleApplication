package es.keensoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "image", nullable = false)
    private String image;

    @Size(max = 4000000)
    @Lob
    @Column(name = "custom_image")
    private byte[] customImage;

    @Column(name = "custom_image_content_type")
    private String customImageContentType;

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Review> reviews = new HashSet<>();

    @ManyToOne
    private Category category;

    @ManyToMany(mappedBy = "books")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Filter> filters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public Book image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public byte[] getCustomImage() {
        return customImage;
    }

    public Book customImage(byte[] customImage) {
        this.customImage = customImage;
        return this;
    }

    public void setCustomImage(byte[] customImage) {
        this.customImage = customImage;
    }

    public String getCustomImageContentType() {
        return customImageContentType;
    }

    public Book customImageContentType(String customImageContentType) {
        this.customImageContentType = customImageContentType;
        return this;
    }

    public void setCustomImageContentType(String customImageContentType) {
        this.customImageContentType = customImageContentType;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Book reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Book addReview(Review review) {
        this.reviews.add(review);
        review.setBook(this);
        return this;
    }

    public Book removeReview(Review review) {
        this.reviews.remove(review);
        review.setBook(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Category getCategory() {
        return category;
    }

    public Book category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Filter> getFilters() {
        return filters;
    }

    public Book filters(Set<Filter> filters) {
        this.filters = filters;
        return this;
    }

    public Book addFilter(Filter filter) {
        this.filters.add(filter);
        filter.getBooks().add(this);
        return this;
    }

    public Book removeFilter(Filter filter) {
        this.filters.remove(filter);
        filter.getBooks().remove(this);
        return this;
    }

    public void setFilters(Set<Filter> filters) {
        this.filters = filters;
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
        Book book = (Book) o;
        if (book.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), book.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", image='" + getImage() + "'" +
            ", customImage='" + getCustomImage() + "'" +
            ", customImageContentType='" + getCustomImageContentType() + "'" +
            "}";
    }
}
