import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student } from './student';

export const STUDENTS_DATA: Student[] = [
  { id: 1, image: 'assets\\image_1.png', name: 'Katarzyna', surname: 'Robak', hobby: 'Obsługa klienta' },
  { id: 2, image: 'assets\\image_2.png', name: 'Daniel', surname: 'Ryba', hobby: 'Sprzedawca' },
  { id: 3, image: 'assets\\image_3.png', name: 'Henryk', surname: 'Kania', hobby: 'Dyrektor Finansowy' },
  { id: 4, image: 'assets\\image_4.png', name: 'Laura', surname: 'Ramka', hobby: 'ramki' },
  { id: 5, image: 'assets\\image_5.png', name: 'Grzegorz', surname: 'Pudełko', hobby: 'pudełka' },
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _todos: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENTS_DATA);

  public readonly todos: Observable<Student[]> = this._todos.asObservable();

  constructor() { }

  public getStudents() {
    return this.todos;
  }
}
