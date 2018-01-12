import { BaseEntity } from './../../shared';

export class TimelineEvent implements BaseEntity {
    constructor(
        public id?: number,
        public visible?: boolean,
        public classroomId?: number,
        public reviews?: BaseEntity[],
    ) {
        this.visible = false;
    }
}
