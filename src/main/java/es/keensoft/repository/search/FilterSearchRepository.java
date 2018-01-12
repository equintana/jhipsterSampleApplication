package es.keensoft.repository.search;

import es.keensoft.domain.Filter;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Filter entity.
 */
public interface FilterSearchRepository extends ElasticsearchRepository<Filter, Long> {
}
