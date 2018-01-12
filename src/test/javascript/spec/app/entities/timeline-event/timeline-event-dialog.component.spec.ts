/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TimelineEventDialogComponent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event-dialog.component';
import { TimelineEventService } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.service';
import { TimelineEvent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.model';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom';

describe('Component Tests', () => {

    describe('TimelineEvent Management Dialog Component', () => {
        let comp: TimelineEventDialogComponent;
        let fixture: ComponentFixture<TimelineEventDialogComponent>;
        let service: TimelineEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TimelineEventDialogComponent],
                providers: [
                    ClassroomService,
                    TimelineEventService
                ]
            })
            .overrideTemplate(TimelineEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelineEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TimelineEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.timelineEvent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'timelineEventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TimelineEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.timelineEvent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'timelineEventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
