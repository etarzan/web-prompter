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
    timeLeft: number = 60;
    interval;

    prompterStyleObj: Object = {
        "height": "480px",
        "background-color": "#eee",
        "color": "#111",
    };

    constructor(private prompterService: PrompterService) { }

    ngOnInit() {
        this.prompterService.getData().subscribe(inputData => {
            this.prompterText = inputData.inputLines;
            this.timeLeft = inputData.inputLines.length;

            this.fontsize = inputData.fontSize;
            this.scrollspeed = inputData.scrollSpeed;

            this.prompterStyleObj["background-color"] = inputData.backColor;
            this.prompterStyleObj["color"] = inputData.textColor;
        });
    }
    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.timeLeft = 60;
            }
        }, 1000)
    }

    pauseTimer() {
        clearInterval(this.interval);
    }
}
