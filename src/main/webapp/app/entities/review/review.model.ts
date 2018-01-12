import { BaseEntity } from './../../shared';

export class Review implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public approved?: boolean,
        public teacherComment?: string,
        public studentId?: number,
        public bookId?: number,
        public timelineEventId?: number,
    ) {
        this.approved = false;
    }
}
