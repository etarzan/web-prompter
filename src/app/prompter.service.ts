import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrompterService {

  inputLines: string[] = [];
  constructor() { }

  getLines(): Observable<string[]> {
    return of(this.inputLines);
  }

  addLine(line: string) {
    if (line.trim().length > 0) {
      this.inputLines.push(line);
    }
  }

  editLine(lineinput, editIndex) {
    this.inputLines.splice(editIndex, 1, lineinput);
  }

  deleteElement(index) {
    this.inputLines.splice(index - 1, 1);
  }
}
