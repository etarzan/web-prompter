import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { PrompterService } from 'src/app/prompter.service';

@Component({
  selector: 'app-entry-unit',
  templateUrl: './entry-unit.component.html',
  styleUrls: ['./entry-unit.component.css']
})
export class EntryUnitComponent implements OnInit {

  lines = [];
  lineinput = '';
  editIndex: number;
  @ViewChild('input_text') textInputElement: ElementRef<HTMLInputElement>;

  constructor(private readonly prompterService: PrompterService) { }
  ngOnInit() {
    this.editIndex = null;
    this.prompterService.getLines().subscribe(data => {
      this.lines = data;
    });
    this.textInputElement.nativeElement.autofocus = true;
  }

  addInputLineOnEnter(event) {
    if (event.keyCode === 13) {
      if (!(this.editIndex === undefined || this.editIndex === null) && this.editIndex > -1) {
        this.prompterService.editLine(this.lineinput, this.editIndex);
        this.editIndex = null;
      } else {
        this.prompterService.addLine(this.lineinput);
      }
      this.lineinput = '';
    }

  }
  addInputLine() {
    if (!(this.editIndex === undefined || this.editIndex === null) && this.editIndex > -1) {
      this.prompterService.editLine(this.lineinput, this.editIndex);
      this.editIndex = null;
    } else {
      this.prompterService.addLine(this.lineinput);
    }
    this.lineinput = '';
  }

  deleteElement(index) {
    if (!(this.lineinput.trim().length > 1 || this.editIndex !== null)) {
      this.prompterService.deleteElement(index);
    } else {
      alert('Can\'t Delete while editing list');
    }
   // this.textInputElement.nativeElement.focus();
  }

  onClickEdit(index: number) {
    this.lineinput = this.lines[index];
    this.editIndex = index;
    this.textInputElement.nativeElement.focus();
  }

}
