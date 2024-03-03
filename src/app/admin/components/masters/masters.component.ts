import { Component, OnInit, ViewChildren, QueryList, ViewContainerRef, ViewChild, Type, ComponentFactoryResolver } from '@angular/core';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { CountriesComponent } from '../countries/countries.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
})
export class MastersComponent implements OnInit {
  masterMenuItems = [
    {
      itemName: 'Countries',
      displayName: 'Countries',
      component: CountriesComponent,
    },
    {
      itemName: 'ClientLocations',
      displayName: 'Client Locations',
      component: ClientLocationsComponent,
    },
    {
      itemName: 'TaskPriorities',
      displayName: 'Task Priorities',
      component: TaskPrioritiesComponent,
    },
    {
      itemName: 'TaskStatus',
      displayName: 'Task Status',
      component: TaskStatusComponent,
    },
  ];

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  tabs: any = [];
  activeItem ='';

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.onCreateComponent(this.masterMenuItems[0].itemName);
  }

  onCreateComponent(itemName: string) {
    const item = this.masterMenuItems.find((item) => item.itemName === itemName);

    if (item) {
      this.tabs = [item];
      this.container.clear();
      this.createComponent(item.component);
      this.activeItem = item.displayName;
    }
  }

  onCloseClick(event: any) {
    this.tabs = [];
    this.container.clear();
    this.activeItem = '';
  }

  private createComponent(component: Type<any>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.container.createComponent(factory);
  }
}
