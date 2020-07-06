import { Component, OnInit } from '@angular/core';
import { StudentsServerService } from '../students-server.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Student } from '../student';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Image {
  name: string;
}

@Component({
  selector: 'app-student-new-form',
  templateUrl: './student-new-form.component.html',
  styleUrls: ['./student-new-form.component.css']
})
export class StudentNewFormComponent implements OnInit {
  public stateCtrl = new FormControl();
  public filteredStates: Observable<Image[]>;

  public newForm: FormGroup;

  images: Image[] = [
    {
      name: 'assets\\img1.png',
    },
    {
      name: 'assets\\img2.png',
    },
    {
      name: 'assets\\img3.png',
    }
  ];

  constructor(fb: FormBuilder, private studentsService: StudentsServerService, private _snackBar: MatSnackBar) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.images.slice())
      );
      this.newForm = fb.group({
        id: new FormControl(0),
        images: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        hobby: new FormControl(null, [Validators.required]),
      });
  }

  private _filterStates(value: string): Image[] {
    const filterValue = value.toLowerCase();

    return this.images.filter(images => images.name.toLowerCase().indexOf(filterValue) === 0);
  }

  /*public test() {
    let newStudent = this.newForm.value as Student;
    console.log(newStudent);
  }*/

  public onSubmit() {
    let newStudent = this.newForm.value as Student;
    this.studentsService.postStudent(newStudent).subscribe(result => console.log(result));
  }

   ngOnInit(): void {
  }
  
  getErrorMessage() {
    return 'To pole musi być wypełnione';
  }
  openSnackBar() {
    this._snackBar.open("Worker created","Ok" , {
      duration: 2000,
    });
}
}
