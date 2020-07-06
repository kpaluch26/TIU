import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentsServerService {
  private url = "https://localhost:5001/";

  constructor(private http: HttpClient) { 

  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + 'Students');
  }

  public deleteStudent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + 'Students/' + id);
  }

  public getOneStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.url + 'Students/' + id);
  }

  public updateStudent(id: number, student: Student): Observable<boolean> {
    return this.http.put<boolean>(this.url + 'Students/' + id, student);
  }

  public postStudent(student: Student): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'Students', student);
  }
}
