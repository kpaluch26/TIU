import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';
import { StudentsServerService } from '../students-server.service';
import { CsvserviceService } from '../csvservice.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'surname', 'hobby', 'action'];

  @Input() students: Student[];  

  @Input() showTableContent: boolean;

  @Output("loadStudents") loadStudents: EventEmitter<any> = new EventEmitter();

  constructor(private studentsService: StudentsServerService, private exporter:CsvserviceService) {

  }

  ngOnInit(): void {
  }

  deleteStudent(id: number): void {
    this.studentsService
        .deleteStudent(id)
        .subscribe(()=> {
          this.loadStudents.emit();
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

  downloadCSV(){
    this.exporter.downloadCSV(this.students);
  }

}
