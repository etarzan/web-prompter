import { Component, OnInit } from '@angular/core';
import { PrompterService } from '../prompter.service';

@Component({
  selector: 'app-prompter',
  templateUrl: './prompter.component.html',
  styleUrls: ['./prompter.component.css']
})
export class PrompterComponent implements OnInit {

    prompterText: string [] = [''];

  constructor(private prompterService: PrompterService) { }

  ngOnInit() {
    this.prompterService.getLines().subscribe( lines =>{
        this.prompterText = lines;
    });
  }

}
