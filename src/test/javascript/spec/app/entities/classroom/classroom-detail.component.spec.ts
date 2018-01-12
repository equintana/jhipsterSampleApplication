/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ClassroomDetailComponent } from '../../../../../../main/webapp/app/entities/classroom/classroom-detail.component';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom/classroom.service';
import { Classroom } from '../../../../../../main/webapp/app/entities/classroom/classroom.model';

describe('Component Tests', () => {

    describe('Classroom Management Detail Component', () => {
        let comp: ClassroomDetailComponent;
        let fixture: ComponentFixture<ClassroomDetailComponent>;
        let service: ClassroomService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ClassroomDetailComponent],
                providers: [
                    ClassroomService
                ]
            })
            .overrideTemplate(ClassroomDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Classroom(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classroom).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
