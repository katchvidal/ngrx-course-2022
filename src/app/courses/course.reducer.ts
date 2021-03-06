import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./action-types";
import { compareCourses, Course } from "./model/course";


export interface CourseState extends EntityState<Course> {
    allCoursesLoaded: boolean
}
// export interface CourseState {
//     entities: {[ key: number ] : Course }
//     ids: number[]
// }

export const adpater = createEntityAdapter<Course>(
    {
        sortComparer: compareCourses,
        selectId: course => course.id
    }
);
export const initiaCourseState = adpater.getInitialState({
    allCoursesLoaded: false
});

export const courseReducer = createReducer(
    initiaCourseState,
    on(CourseActions.ALLCOURSESLOADED, (state, action) => adpater.addMany(action.courses, {...state, allCoursesLoaded: true })),
    on(CourseActions.COURSESUPDATE, ( state, action) => adpater.updateOne( action.update, state ))
)

export const {
    selectAll
} = adpater.getSelectors();