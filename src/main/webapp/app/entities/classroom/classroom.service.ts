import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Classroom } from './classroom.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClassroomService {

    private resourceUrl =  SERVER_API_URL + 'api/classrooms';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/classrooms';

    constructor(private http: Http) { }

    create(classroom: Classroom): Observable<Classroom> {
        const copy = this.convert(classroom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(classroom: Classroom): Observable<Classroom> {
        const copy = this.convert(classroom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Classroom> {
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
     * Convert a returned JSON object to Classroom.
     */
    private convertItemFromServer(json: any): Classroom {
        const entity: Classroom = Object.assign(new Classroom(), json);
        return entity;
    }

    /**
     * Convert a Classroom to a JSON which can be sent to the server.
     */
    private convert(classroom: Classroom): Classroom {
        const copy: Classroom = Object.assign({}, classroom);
        return copy;
    }
}
