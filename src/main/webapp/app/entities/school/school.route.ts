import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SchoolComponent } from './school.component';
import { SchoolDetailComponent } from './school-detail.component';
import { SchoolPopupComponent } from './school-dialog.component';
import { SchoolDeletePopupComponent } from './school-delete-dialog.component';

@Injectable()
export class SchoolResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const schoolRoute: Routes = [
    {
        path: 'school',
        component: SchoolComponent,
        resolve: {
            'pagingParams': SchoolResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school/:id',
        component: SchoolDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolPopupRoute: Routes = [
    {
        path: 'school-new',
        component: SchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school/:id/edit',
        component: SchoolPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school/:id/delete',
        component: SchoolDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
