import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrompterService {

  inputLines: string[] = ['First line', 'Second line'];
  constructor() { }

  getLines(): Observable<string[]> {
    return of(this.inputLines);
  }
}
