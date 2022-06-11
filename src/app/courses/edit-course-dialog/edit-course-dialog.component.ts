import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CoursesHttpService} from '../services/courses-http.service';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { COURSESUPDATE } from '../course.action';
import { CourseEntityServce } from '../services/course-entity.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$:Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    // private store: Store<AppState>,
    // private coursesService: CoursesHttpService
    private coursesService: CourseEntityServce,
    ) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {

    //  Manejador del Formulario
    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    // this.coursesService.saveCourse(course.id, course)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )

    //  Objeto Actualizado 
    // const update : Update<Course> = {
    //   id: course.id,
    //   changes: course
    // }

    // //  Despachando la Accion
    // this.store.dispatch( COURSESUPDATE({ update }));

    // //  Cerrar el Formulario
    // this.dialogRef.close()

    if ( this.mode === 'update'){

      this.coursesService.update(course)
      this.dialogRef.close()
    }
    else if ( this.mode === 'create'){
      this.coursesService.add( course )
      this.dialogRef.close()
    }
  }


}
