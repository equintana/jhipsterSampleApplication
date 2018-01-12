import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Classroom } from './classroom.model';
import { ClassroomService } from './classroom.service';

@Component({
    selector: 'jhi-classroom-detail',
    templateUrl: './classroom-detail.component.html'
})
export class ClassroomDetailComponent implements OnInit, OnDestroy {

    classroom: Classroom;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classroomService: ClassroomService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassrooms();
    }

    load(id) {
        this.classroomService.find(id).subscribe((classroom) => {
            this.classroom = classroom;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classroomListModification',
            (response) => this.load(this.classroom.id)
        );
    }
}
