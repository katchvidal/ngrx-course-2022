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

    saveCourse$ = createEffect(
        () => this.actions$
        .pipe(
            ofType( CourseActions.COURSESUPDATE),
            concatMap( action => this.coursesService.saveCourse( action.update.id, action.update.changes)),
        ), { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private coursesService: CoursesHttpService,
    ) { }
}