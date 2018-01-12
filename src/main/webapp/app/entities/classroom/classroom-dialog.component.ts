import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classroom } from './classroom.model';
import { ClassroomPopupService } from './classroom-popup.service';
import { ClassroomService } from './classroom.service';
import { TimelineEvent, TimelineEventService } from '../timeline-event';
import { Teacher, TeacherService } from '../teacher';
import { Student, StudentService } from '../student';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-classroom-dialog',
    templateUrl: './classroom-dialog.component.html'
})
export class ClassroomDialogComponent implements OnInit {

    classroom: Classroom;
    isSaving: boolean;

    timelineevents: TimelineEvent[];

    teachers: Teacher[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private classroomService: ClassroomService,
        private timelineEventService: TimelineEventService,
        private teacherService: TeacherService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.timelineEventService.query()
            .subscribe((res: ResponseWrapper) => { this.timelineevents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.students = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.classroom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classroomService.update(this.classroom));
        } else {
            this.subscribeToSaveResponse(
                this.classroomService.create(this.classroom));
        }
    }

    private subscribeToSaveResponse(result: Observable<Classroom>) {
        result.subscribe((res: Classroom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Classroom) {
        this.eventManager.broadcast({ name: 'classroomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTimelineEventById(index: number, item: TimelineEvent) {
        return item.id;
    }

    trackTeacherById(index: number, item: Teacher) {
        return item.id;
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-classroom-popup',
    template: ''
})
export class ClassroomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classroomPopupService
                    .open(ClassroomDialogComponent as Component, params['id']);
            } else {
                this.classroomPopupService
                    .open(ClassroomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
