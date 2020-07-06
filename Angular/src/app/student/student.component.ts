import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  activatedRoute: any;
  name: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
