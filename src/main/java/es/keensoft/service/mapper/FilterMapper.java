package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.FilterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Filter and its DTO FilterDTO.
 */
@Mapper(componentModel = "spring", uses = {BookMapper.class})
public interface FilterMapper extends EntityMapper<FilterDTO, Filter> {



    default Filter fromId(Long id) {
        if (id == null) {
            return null;
        }
        Filter filter = new Filter();
        filter.setId(id);
        return filter;
    }
}
