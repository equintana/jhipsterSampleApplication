package es.keensoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.keensoft.domain.TimelineEvent;

import es.keensoft.repository.TimelineEventRepository;
import es.keensoft.repository.search.TimelineEventSearchRepository;
import es.keensoft.web.rest.errors.BadRequestAlertException;
import es.keensoft.web.rest.util.HeaderUtil;
import es.keensoft.web.rest.util.PaginationUtil;
import es.keensoft.service.dto.TimelineEventDTO;
import es.keensoft.service.mapper.TimelineEventMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TimelineEvent.
 */
@RestController
@RequestMapping("/api")
public class TimelineEventResource {

    private final Logger log = LoggerFactory.getLogger(TimelineEventResource.class);

    private static final String ENTITY_NAME = "timelineEvent";

    private final TimelineEventRepository timelineEventRepository;

    private final TimelineEventMapper timelineEventMapper;

    private final TimelineEventSearchRepository timelineEventSearchRepository;

    public TimelineEventResource(TimelineEventRepository timelineEventRepository, TimelineEventMapper timelineEventMapper, TimelineEventSearchRepository timelineEventSearchRepository) {
        this.timelineEventRepository = timelineEventRepository;
        this.timelineEventMapper = timelineEventMapper;
        this.timelineEventSearchRepository = timelineEventSearchRepository;
    }

    /**
     * POST  /timeline-events : Create a new timelineEvent.
     *
     * @param timelineEventDTO the timelineEventDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timelineEventDTO, or with status 400 (Bad Request) if the timelineEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/timeline-events")
    @Timed
    public ResponseEntity<TimelineEventDTO> createTimelineEvent(@RequestBody TimelineEventDTO timelineEventDTO) throws URISyntaxException {
        log.debug("REST request to save TimelineEvent : {}", timelineEventDTO);
        if (timelineEventDTO.getId() != null) {
            throw new BadRequestAlertException("A new timelineEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimelineEvent timelineEvent = timelineEventMapper.toEntity(timelineEventDTO);
        timelineEvent = timelineEventRepository.save(timelineEvent);
        TimelineEventDTO result = timelineEventMapper.toDto(timelineEvent);
        timelineEventSearchRepository.save(timelineEvent);
        return ResponseEntity.created(new URI("/api/timeline-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /timeline-events : Updates an existing timelineEvent.
     *
     * @param timelineEventDTO the timelineEventDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timelineEventDTO,
     * or with status 400 (Bad Request) if the timelineEventDTO is not valid,
     * or with status 500 (Internal Server Error) if the timelineEventDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/timeline-events")
    @Timed
    public ResponseEntity<TimelineEventDTO> updateTimelineEvent(@RequestBody TimelineEventDTO timelineEventDTO) throws URISyntaxException {
        log.debug("REST request to update TimelineEvent : {}", timelineEventDTO);
        if (timelineEventDTO.getId() == null) {
            return createTimelineEvent(timelineEventDTO);
        }
        TimelineEvent timelineEvent = timelineEventMapper.toEntity(timelineEventDTO);
        timelineEvent = timelineEventRepository.save(timelineEvent);
        TimelineEventDTO result = timelineEventMapper.toDto(timelineEvent);
        timelineEventSearchRepository.save(timelineEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timelineEventDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /timeline-events : get all the timelineEvents.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of timelineEvents in body
     */
    @GetMapping("/timeline-events")
    @Timed
    public ResponseEntity<List<TimelineEventDTO>> getAllTimelineEvents(Pageable pageable) {
        log.debug("REST request to get a page of TimelineEvents");
        Page<TimelineEvent> page = timelineEventRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/timeline-events");
        return new ResponseEntity<>(timelineEventMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /timeline-events/:id : get the "id" timelineEvent.
     *
     * @param id the id of the timelineEventDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timelineEventDTO, or with status 404 (Not Found)
     */
    @GetMapping("/timeline-events/{id}")
    @Timed
    public ResponseEntity<TimelineEventDTO> getTimelineEvent(@PathVariable Long id) {
        log.debug("REST request to get TimelineEvent : {}", id);
        TimelineEvent timelineEvent = timelineEventRepository.findOne(id);
        TimelineEventDTO timelineEventDTO = timelineEventMapper.toDto(timelineEvent);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(timelineEventDTO));
    }

    /**
     * DELETE  /timeline-events/:id : delete the "id" timelineEvent.
     *
     * @param id the id of the timelineEventDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/timeline-events/{id}")
    @Timed
    public ResponseEntity<Void> deleteTimelineEvent(@PathVariable Long id) {
        log.debug("REST request to delete TimelineEvent : {}", id);
        timelineEventRepository.delete(id);
        timelineEventSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/timeline-events?query=:query : search for the timelineEvent corresponding
     * to the query.
     *
     * @param query the query of the timelineEvent search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/timeline-events")
    @Timed
    public ResponseEntity<List<TimelineEventDTO>> searchTimelineEvents(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TimelineEvents for query {}", query);
        Page<TimelineEvent> page = timelineEventSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/timeline-events");
        return new ResponseEntity<>(timelineEventMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

}
