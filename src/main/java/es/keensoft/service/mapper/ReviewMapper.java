package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.ReviewDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Review and its DTO ReviewDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, BookMapper.class, TimelineEventMapper.class})
public interface ReviewMapper extends EntityMapper<ReviewDTO, Review> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "book.id", target = "bookId")
    @Mapping(source = "book.title", target = "bookTitle")
    @Mapping(source = "timelineEvent.id", target = "timelineEventId")
    ReviewDTO toDto(Review review);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "bookId", target = "book")
    @Mapping(source = "timelineEventId", target = "timelineEvent")
    Review toEntity(ReviewDTO reviewDTO);

    default Review fromId(Long id) {
        if (id == null) {
            return null;
        }
        Review review = new Review();
        review.setId(id);
        return review;
    }
}
