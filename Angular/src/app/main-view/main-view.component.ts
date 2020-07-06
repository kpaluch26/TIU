import { Component, OnInit, Output } from '@angular/core';
import { StudentsServerService } from '../students-server.service';
import { Student } from '../student';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {

  showTableVar: boolean = true;
  showTileVar: boolean = false;
  spanVar: string = 'Nie wybrano żadnego obiektu';
  loading: boolean;
  students: Student[] = [];

  constructor(private studentsService: StudentsServerService,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  showTable() {
    this.showTableVar = true;
    this.showTileVar = false;
  }

  showTile() {
    this.showTableVar = false;
    this.showTileVar = true;
  }

  loadStudents() {
    this.loading = true;
    this.studentsService.getStudents()
      .subscribe(students => {
        this.students = students;
        this.loading = false;
      },
        error => console.log(error));
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.router.navigate(["login"]);
      return false;
    }
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

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["login"]);
  }
}
