import { Component, OnInit } from '@angular/core';
import { PrompterService } from 'src/app/prompter.service';

@Component({
  selector: 'app-entry-unit',
  templateUrl: './entry-unit.component.html',
  styleUrls: ['./entry-unit.component.css']
})
export class EntryUnitComponent implements OnInit {

  lines = [];
  constructor(private readonly prompterService: PrompterService) { }
  ngOnInit() {
    this.prompterService.getLines().subscribe(data => {
      this.lines = data;
    });
  }

}
