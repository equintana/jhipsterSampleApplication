import { BaseEntity } from './../../shared';

export class Filter implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public books?: BaseEntity[],
    ) {
    }
}
