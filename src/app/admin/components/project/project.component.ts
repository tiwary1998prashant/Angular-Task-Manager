import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { ProjectsComponent } from '../projects/projects.component';
import { CheckboxPrinterComponent } from '../checkbox-printer/checkbox-printer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  hideDetails: boolean = false;
  @Input('currentProject') currentProject!: Project;
  @Input('recordIndex') index!: number;
  @Output('onEditClick') edit = new EventEmitter();
  @Output('onDeleteClcik') delete = new EventEmitter();
  @ContentChild('isChecked') selected!: CheckboxPrinterComponent;

  constructor(private router:Router){}

  onEditClick(index: number) {
    this.edit.emit({ index });
  }
  onDeleteClcik(index: number) {
    this.delete.emit({ index });
  }
  

  onSelect() {
    this.selected.isChecked = !this.selected.isChecked;
  }
}
