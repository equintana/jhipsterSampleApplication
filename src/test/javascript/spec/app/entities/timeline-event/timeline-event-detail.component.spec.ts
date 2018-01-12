/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TimelineEventDetailComponent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event-detail.component';
import { TimelineEventService } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.service';
import { TimelineEvent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.model';

describe('Component Tests', () => {

    describe('TimelineEvent Management Detail Component', () => {
        let comp: TimelineEventDetailComponent;
        let fixture: ComponentFixture<TimelineEventDetailComponent>;
        let service: TimelineEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TimelineEventDetailComponent],
                providers: [
                    TimelineEventService
                ]
            })
            .overrideTemplate(TimelineEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelineEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TimelineEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.timelineEvent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
