import { BaseEntity } from './../../shared';

export class Teacher implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imageContentType?: string,
        public image?: any,
        public userId?: number,
        public classrooms?: BaseEntity[],
        public schoolId?: number,
    ) {
    }
}
