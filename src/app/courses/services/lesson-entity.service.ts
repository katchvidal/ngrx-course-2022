import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Lesson } from "../model/lesson";

//  Modelo de Entidad de tipo Course

@Injectable()
export class LessonEntityServce extends EntityCollectionServiceBase<Lesson>{

    constructor( serviceElementFactory: EntityCollectionServiceElementsFactory ){
        super('Lesson', serviceElementFactory );
    }
}

