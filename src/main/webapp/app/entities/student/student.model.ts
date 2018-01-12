import { BaseEntity } from './../../shared';

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imageContentType?: string,
        public image?: any,
        public userId?: number,
        public students?: BaseEntity[],
        public reviews?: BaseEntity[],
        public classrooms?: BaseEntity[],
        public studentId?: number,
    ) {
    }
}
