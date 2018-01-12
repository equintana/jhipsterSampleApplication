import { BaseEntity } from './../../shared';

export class Book implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public image?: string,
        public customImageContentType?: string,
        public customImage?: any,
        public reviews?: BaseEntity[],
        public categoryId?: number,
        public filters?: BaseEntity[],
    ) {
    }
}
