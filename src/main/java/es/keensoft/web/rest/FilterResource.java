package es.keensoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.keensoft.domain.Filter;

import es.keensoft.repository.FilterRepository;
import es.keensoft.repository.search.FilterSearchRepository;
import es.keensoft.web.rest.errors.BadRequestAlertException;
import es.keensoft.web.rest.util.HeaderUtil;
import es.keensoft.web.rest.util.PaginationUtil;
import es.keensoft.service.dto.FilterDTO;
import es.keensoft.service.mapper.FilterMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Filter.
 */
@RestController
@RequestMapping("/api")
public class FilterResource {

    private final Logger log = LoggerFactory.getLogger(FilterResource.class);

    private static final String ENTITY_NAME = "filter";

    private final FilterRepository filterRepository;

    private final FilterMapper filterMapper;

    private final FilterSearchRepository filterSearchRepository;

    public FilterResource(FilterRepository filterRepository, FilterMapper filterMapper, FilterSearchRepository filterSearchRepository) {
        this.filterRepository = filterRepository;
        this.filterMapper = filterMapper;
        this.filterSearchRepository = filterSearchRepository;
    }

    /**
     * POST  /filters : Create a new filter.
     *
     * @param filterDTO the filterDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new filterDTO, or with status 400 (Bad Request) if the filter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/filters")
    @Timed
    public ResponseEntity<FilterDTO> createFilter(@Valid @RequestBody FilterDTO filterDTO) throws URISyntaxException {
        log.debug("REST request to save Filter : {}", filterDTO);
        if (filterDTO.getId() != null) {
            throw new BadRequestAlertException("A new filter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Filter filter = filterMapper.toEntity(filterDTO);
        filter = filterRepository.save(filter);
        FilterDTO result = filterMapper.toDto(filter);
        filterSearchRepository.save(filter);
        return ResponseEntity.created(new URI("/api/filters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /filters : Updates an existing filter.
     *
     * @param filterDTO the filterDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated filterDTO,
     * or with status 400 (Bad Request) if the filterDTO is not valid,
     * or with status 500 (Internal Server Error) if the filterDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/filters")
    @Timed
    public ResponseEntity<FilterDTO> updateFilter(@Valid @RequestBody FilterDTO filterDTO) throws URISyntaxException {
        log.debug("REST request to update Filter : {}", filterDTO);
        if (filterDTO.getId() == null) {
            return createFilter(filterDTO);
        }
        Filter filter = filterMapper.toEntity(filterDTO);
        filter = filterRepository.save(filter);
        FilterDTO result = filterMapper.toDto(filter);
        filterSearchRepository.save(filter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, filterDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /filters : get all the filters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of filters in body
     */
    @GetMapping("/filters")
    @Timed
    public ResponseEntity<List<FilterDTO>> getAllFilters(Pageable pageable) {
        log.debug("REST request to get a page of Filters");
        Page<Filter> page = filterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/filters");
        return new ResponseEntity<>(filterMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /filters/:id : get the "id" filter.
     *
     * @param id the id of the filterDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the filterDTO, or with status 404 (Not Found)
     */
    @GetMapping("/filters/{id}")
    @Timed
    public ResponseEntity<FilterDTO> getFilter(@PathVariable Long id) {
        log.debug("REST request to get Filter : {}", id);
        Filter filter = filterRepository.findOneWithEagerRelationships(id);
        FilterDTO filterDTO = filterMapper.toDto(filter);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(filterDTO));
    }

    /**
     * DELETE  /filters/:id : delete the "id" filter.
     *
     * @param id the id of the filterDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/filters/{id}")
    @Timed
    public ResponseEntity<Void> deleteFilter(@PathVariable Long id) {
        log.debug("REST request to delete Filter : {}", id);
        filterRepository.delete(id);
        filterSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/filters?query=:query : search for the filter corresponding
     * to the query.
     *
     * @param query the query of the filter search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/filters")
    @Timed
    public ResponseEntity<List<FilterDTO>> searchFilters(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Filters for query {}", query);
        Page<Filter> page = filterSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/filters");
        return new ResponseEntity<>(filterMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
