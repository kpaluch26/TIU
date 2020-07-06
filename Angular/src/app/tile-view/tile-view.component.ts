import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';
import { StudentsServerService } from '../students-server.service';
import { CsvserviceService } from '../csvservice.service';
@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent implements OnInit {

  @Input() students: Student[]; 

  @Input() showTileContent: boolean;

  @Output("loadStudents") loadStudents: EventEmitter<any> = new EventEmitter();

  constructor(private studentsService: StudentsServerService, private exporter:CsvserviceService) { }

  ngOnInit(): void {
  }

  loadStudentsSignal(){
    this.loadStudents.emit();
  }
  downloadCSV(){
    this.exporter.downloadCSV(this.students);
  }

}

