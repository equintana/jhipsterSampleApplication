import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { School } from './school.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SchoolService {

    private resourceUrl =  SERVER_API_URL + 'api/schools';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/schools';

    constructor(private http: Http) { }

    create(school: School): Observable<School> {
        const copy = this.convert(school);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(school: School): Observable<School> {
        const copy = this.convert(school);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<School> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to School.
     */
    private convertItemFromServer(json: any): School {
        const entity: School = Object.assign(new School(), json);
        return entity;
    }

    /**
     * Convert a School to a JSON which can be sent to the server.
     */
    private convert(school: School): School {
        const copy: School = Object.assign({}, school);
        return copy;
    }
}
