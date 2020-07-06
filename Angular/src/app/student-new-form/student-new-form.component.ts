import { Component, OnInit } from '@angular/core';
import { StudentsServerService } from '../students-server.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Student } from '../student';

export interface Avatar {
  name: string;
}

@Component({
  selector: 'app-student-new-form',
  templateUrl: './student-new-form.component.html',
  styleUrls: ['./student-new-form.component.css']
})
export class StudentNewFormComponent implements OnInit {
  public stateCtrl = new FormControl();
  public filteredStates: Observable<Avatar[]>;

  public newForm: FormGroup;

  avatar: Avatar[] = [
    {
      name: 'assets\\avatar_1.png',
    },
    {
      name: 'assets\\avatar_2.png',
    },
    {
      name: 'assets\\avatar_3.png',
    },
    {
      name: 'assets\\avatar_4.png',
    },
    {
      name: 'assets\\avatar_5.png',
    }
  ];

  constructor(fb: FormBuilder, private studentsService: StudentsServerService) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.avatar.slice())
      );
      this.newForm = fb.group({
        id: new FormControl(0),
        avatar: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        job: new FormControl(null, [Validators.required]),
        descript: new FormControl(null, [Validators.required]),
      });
  }

  private _filterStates(value: string): Avatar[] {
    const filterValue = value.toLowerCase();

    return this.avatar.filter(avatar => avatar.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public test() {
    let newStudent = this.newForm.value as Student;
    console.log(newStudent);
  }

  public onSubmit() {
    let newStudent = this.newForm.value as Student;
    this.studentsService.postStudent(newStudent).subscribe(result => console.log(result));
  }

   ngOnInit(): void {
  }
  
  getErrorMessage() {
    return 'To pole musi być wypełnione';
  }
}
