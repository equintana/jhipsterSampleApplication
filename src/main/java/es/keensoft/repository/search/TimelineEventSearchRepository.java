package es.keensoft.repository.search;

import es.keensoft.domain.TimelineEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TimelineEvent entity.
 */
public interface TimelineEventSearchRepository extends ElasticsearchRepository<TimelineEvent, Long> {
}
