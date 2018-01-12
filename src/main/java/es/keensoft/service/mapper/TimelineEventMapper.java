package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.TimelineEventDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TimelineEvent and its DTO TimelineEventDTO.
 */
@Mapper(componentModel = "spring", uses = {ClassroomMapper.class})
public interface TimelineEventMapper extends EntityMapper<TimelineEventDTO, TimelineEvent> {

    @Mapping(source = "classroom.id", target = "classroomId")
    @Mapping(source = "classroom.name", target = "classroomName")
    TimelineEventDTO toDto(TimelineEvent timelineEvent);

    @Mapping(source = "classroomId", target = "classroom")
    @Mapping(target = "reviews", ignore = true)
    TimelineEvent toEntity(TimelineEventDTO timelineEventDTO);

    default TimelineEvent fromId(Long id) {
        if (id == null) {
            return null;
        }
        TimelineEvent timelineEvent = new TimelineEvent();
        timelineEvent.setId(id);
        return timelineEvent;
    }
}
