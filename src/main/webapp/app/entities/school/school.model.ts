import { BaseEntity } from './../../shared';

export class School implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public active?: boolean,
        public imageContentType?: string,
        public image?: any,
        public userId?: number,
        public teachers?: BaseEntity[],
    ) {
        this.active = false;
    }
}
