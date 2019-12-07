import { Component, OnInit } from '@angular/core';
import { PrompterService } from '../prompter.service';

@Component({
    selector: 'app-prompter',
    templateUrl: './prompter.component.html',
    styleUrls: ['./prompter.component.css']
})
export class PrompterComponent implements OnInit {

    curSec: number = 0;
    progressbarValue = 100;
    prompterText: string[] = [''];
    fontsize: Number;
    scrollspeed: Number;
    textcolor: string;
    backcolor: string;

    constructor(private prompterService: PrompterService) { }

    ngOnInit() {
        this.prompterService.getData().subscribe(inputData => {
            this.prompterText = inputData.inputLines;
            this.fontsize = inputData.fontSize;
            this.scrollspeed = inputData.scrollSpeed;
            this.textcolor = inputData.textColor;
            this.backcolor = inputData.backColor;
        });
    }

}
