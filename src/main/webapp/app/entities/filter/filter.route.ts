import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FilterComponent } from './filter.component';
import { FilterDetailComponent } from './filter-detail.component';
import { FilterPopupComponent } from './filter-dialog.component';
import { FilterDeletePopupComponent } from './filter-delete-dialog.component';

@Injectable()
export class FilterResolvePagingParams implements Resolve<any> {

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

export const filterRoute: Routes = [
    {
        path: 'filter',
        component: FilterComponent,
        resolve: {
            'pagingParams': FilterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'filter/:id',
        component: FilterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filterPopupRoute: Routes = [
    {
        path: 'filter-new',
        component: FilterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'filter/:id/edit',
        component: FilterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'filter/:id/delete',
        component: FilterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
