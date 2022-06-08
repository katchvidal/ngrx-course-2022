import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { ALLCOURSESLOADED } from "./course.action";
import { CoursesHttpService } from "./services/courses-http.service";



@Injectable()
export class DataEffects {
    loadedCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.LOADEDALLCOURSES),
            concatMap(action =>
                this.coursesService.findAllCourses()),
            map(courses => CourseActions.ALLCOURSESLOADED({ courses }))
        )
    )

    constructor(
        private actions$: Actions,
        private coursesService: CoursesHttpService,
    ) { }
}