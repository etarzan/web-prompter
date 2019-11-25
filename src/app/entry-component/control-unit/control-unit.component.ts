import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material';

@Component({
    selector: "app-control-unit",
    templateUrl: "./control-unit.component.html",
    styleUrls: ["./control-unit.component.css"]
})
export class ControlUnitComponent implements OnInit {
    textSize = "Small";

    @ViewChild('backColorGroup', { static: true }) backColorGroup: ElementRef<MatButtonToggleGroup>;
    @ViewChild('textColorGroup', { static: true }) textColorGroup: MatButtonToggleGroup;

    textColorChecked: boolean = false;
    backColorChecked: boolean = false;

    constructor() { }

    ngOnInit() { }


    checkTextColor(event: any) {
        console.log(this.textColorGroup.value);
    }

    checkBackColor(event: any) {
        console.log(event);
    }
}
