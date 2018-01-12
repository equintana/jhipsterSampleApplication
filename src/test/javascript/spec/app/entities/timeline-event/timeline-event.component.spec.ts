/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TimelineEventComponent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.component';
import { TimelineEventService } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.service';
import { TimelineEvent } from '../../../../../../main/webapp/app/entities/timeline-event/timeline-event.model';

describe('Component Tests', () => {

    describe('TimelineEvent Management Component', () => {
        let comp: TimelineEventComponent;
        let fixture: ComponentFixture<TimelineEventComponent>;
        let service: TimelineEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TimelineEventComponent],
                providers: [
                    TimelineEventService
                ]
            })
            .overrideTemplate(TimelineEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelineEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TimelineEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.timelineEvents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
