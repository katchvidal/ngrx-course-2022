import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Course } from "../model/course";

//  Modelo de Entidad de tipo Course

@Injectable()
export class CourseEntityServce extends EntityCollectionServiceBase<Course>{

    constructor( serviceElementFactory: EntityCollectionServiceElementsFactory ){
        super('Course', serviceElementFactory );
    }
}

