import { Injectable } from '@angular/core';
import { Student } from '../app/student';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Injectable({
  providedIn: 'root'
})
export class CsvserviceService {

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your Student List :',
    useBom: true,
    noDownload: false,
    headers: ["Student id", "Student image", "Student name","Student surname", "Student hobby"]
  };
  downloadCSV(students:Student[]){
    //this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
    new  AngularCsv(students, "StudentsList", this.csvOptions);
  }
}
