import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';
import { StudentsServerService } from '../students-server.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() student: Student;

  @Output("loadStudentsSignal") loadStudentsSignal: EventEmitter<any> = new EventEmitter();

  constructor(private studentsService: StudentsServerService) { }

  ngOnInit(): void {
  }

  deleteStudent(id: number): void {
    this.studentsService
        .deleteStudent(id)
        .subscribe(()=> {
          this.loadStudentsSignal.emit();
        });
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
