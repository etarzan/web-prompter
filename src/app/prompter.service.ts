import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PrompterService {

    inputData: PrompterData = {
        inputLines: [],
        textColor: "#363535",
        backColor: "#3635cc",
        fontSize: 10,
        scrollSpeed: 1
    }

    constructor() { }

    getData(): Observable<PrompterData> {
        return of(this.inputData);
    }

    addLine(line: string) {
        if (line.trim().length > 0) {
            this.inputData.inputLines.push(line);
        }
    }

    editLine(lineinput, editIndex) {
        this.inputData.inputLines.splice(editIndex, 1, lineinput);
    }

    deleteElement(index) {
        this.inputData.inputLines.splice(index, 1);
    }
}

interface PrompterData {
    inputLines: string[],
    textColor: string,
    backColor: string,
    fontSize: Number,
    scrollSpeed: Number
}
