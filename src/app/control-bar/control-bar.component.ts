import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-control-bar',
    templateUrl: './control-bar.component.html',
    styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {
    color = '#8b7fb4';

    constructor() { }
    ngOnInit() {
    }

}
