import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';
import { StudentsServerService } from '../students-server.service';

@Component({
  selector: 'app-tile-view',
  templateUrl: './tile-view.component.html',
  styleUrls: ['./tile-view.component.css']
})
export class TileViewComponent implements OnInit {

  @Input() students: Student[]; 

  @Input() showTileContent: boolean;

  @Output("loadStudents") loadStudents: EventEmitter<any> = new EventEmitter();

  constructor(private studentsService: StudentsServerService) { }

  ngOnInit(): void {
  }

  loadStudentsSignal(){
    this.loadStudents.emit();
  }


}

