import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentsServerService } from '../students-server.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['../app.component.css', './student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  student: Student;
  selectedId: number;
  loading: boolean;
  noData: boolean;
  edit: boolean;

  images = [
    'assets\\avatar_1.png',
    'assets\\avatar_2.png',
    'assets\\avatar_3.png',
    'assets\\avatar_4.png',
    'assets\\avatar_5.png'
  ];

  constructor(private route: ActivatedRoute, private studentsService: StudentsServerService) {

  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.selectedId = +params.get('id');
      });
    this.loadStudent();
  }

  loadStudent(): void {
    this.loading = true;
    this.studentsService.getOneStudent(this.selectedId)
      .subscribe(student => {
        this.student = student;
        this.loading = false;
      },
        error => console.log(error));
  }
  deleteStudent(id: number): void {
    this.studentsService
      .deleteStudent(id)
      .subscribe(() => {
        this.noData = true;
        this.loadStudent();
      });
  }
  showEditForm() {
    this.edit = true;
  }
  showDetailsForm() {
    this.edit = false;
  }
  public onSubmit() {
    //console.log(this.student);
    this.studentsService.updateStudent(this.selectedId,this.student).subscribe(result => console.log(result));
  }

  getErrorMessage() {
    return 'To pole musi być wypełnione';
  }

  isAdminAuthenticated() {
    const uType: string = localStorage.getItem("uType");
    if (uType == 'admin') {
      return true;
    }
    else {
      return false;
    }
  }

}