import { BaseEntity } from './../../shared';

export class Classroom implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public timelineEventId?: number,
        public teacherId?: number,
        public students?: BaseEntity[],
    ) {
    }
}
