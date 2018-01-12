/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ClassroomComponent } from '../../../../../../main/webapp/app/entities/classroom/classroom.component';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom/classroom.service';
import { Classroom } from '../../../../../../main/webapp/app/entities/classroom/classroom.model';

describe('Component Tests', () => {

    describe('Classroom Management Component', () => {
        let comp: ClassroomComponent;
        let fixture: ComponentFixture<ClassroomComponent>;
        let service: ClassroomService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ClassroomComponent],
                providers: [
                    ClassroomService
                ]
            })
            .overrideTemplate(ClassroomComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Classroom(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classrooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
