import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducer";
import * as fromCourses from './course.reducer'

export const selectCourseState = createFeatureSelector<CourseState>("courses")

export const selectAllCourses = createSelector(
    selectCourseState,//  Propiedad a la que apuntamos 
    fromCourses.selectAll
);



export const selectBegginerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter( course => course.category === 'BEGINNER')
)
export const selectAdvanceCourses = createSelector(
    selectAllCourses,
    courses => courses.filter( course => course.category === 'ADVANCE')
)

export const selectPromoCourses = createSelector(
    selectAllCourses,
    courses => courses.filter( course => course.promo ).length
)

