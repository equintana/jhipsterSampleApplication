package es.keensoft.repository;

import es.keensoft.domain.TimelineEvent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TimelineEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimelineEventRepository extends JpaRepository<TimelineEvent, Long> {

}
