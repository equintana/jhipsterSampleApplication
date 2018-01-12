package es.keensoft.service.mapper;

import es.keensoft.domain.*;
import es.keensoft.service.dto.BookDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Book and its DTO BookDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface BookMapper extends EntityMapper<BookDTO, Book> {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    BookDTO toDto(Book book);

    @Mapping(target = "reviews", ignore = true)
    @Mapping(source = "categoryId", target = "category")
    @Mapping(target = "filters", ignore = true)
    Book toEntity(BookDTO bookDTO);

    default Book fromId(Long id) {
        if (id == null) {
            return null;
        }
        Book book = new Book();
        book.setId(id);
        return book;
    }
}
