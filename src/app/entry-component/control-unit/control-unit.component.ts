import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatButtonToggleGroup, MatSlider } from '@angular/material';
import { PrompterService } from 'src/app/prompter.service';

@Component({
    selector: "app-control-unit",
    templateUrl: "./control-unit.component.html",
    styleUrls: ["./control-unit.component.css"]
})
export class ControlUnitComponent implements OnInit, AfterViewInit {


    textSize = "Small";

    @ViewChild('backColorGroup', { static: true }) backColorGroup: MatButtonToggleGroup;
    @ViewChild('textColorGroup', { static: true }) textColorGroup: MatButtonToggleGroup;
    @ViewChild('fontsize', { static: true }) fontsize: MatSlider;
    @ViewChild('scrollspeed', { static: true }) scrollspeed: MatButtonToggleGroup;

    textColorChecked: boolean = false;
    backColorChecked: boolean = false;

    constructor(private readonly prompterSvc: PrompterService) { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        this.prompterSvc.inputData.fontSize = this.fontsize.value;
        this.prompterSvc.inputData.scrollSpeed = this.scrollspeed.value;
        this.prompterSvc.inputData.textColor = this.textColorGroup.value;
        this.prompterSvc.inputData.backColor = this.backColorGroup.value;
    }


    onChange(event: any) {
        this.prompterSvc.inputData.fontSize = this.fontsize.value;
        this.prompterSvc.inputData.scrollSpeed = this.scrollspeed.value;
        this.prompterSvc.inputData.textColor = this.textColorGroup.value;
        this.prompterSvc.inputData.backColor = this.backColorGroup.value;
    }

}
