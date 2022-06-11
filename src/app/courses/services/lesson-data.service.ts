import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Lesson } from "../model/lesson";

//  Jutanmos Modelo y Llamadas a Peticiones Http Backend

@Injectable()
export class LessonDataService extends DefaultDataService<Lesson> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator ) {
        super('Course', http, httpUrlGenerator);
    }

}