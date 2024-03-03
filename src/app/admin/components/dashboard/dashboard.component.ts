import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  designation: string = '';
  username: string = '';
  noOfTeamMembers: number = 0;
  totalCostOfAllProjects: number = 0;
  pendingTasks: number = 0;
  upComingProjects: number = 0;
  projectCost: number = 0;
  currentExpenditure: number = 0;
  availableFunds: number = 0;
  toDay: Date = new Date();

  clients: string[] = [];
  projects: string[] = [];
  years: number[] = [];
  teamMembersSummary: any = [];
  teamMembers: any = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.designation = 'Team Leader';
    this.username = 'Scott Smith';
    this.noOfTeamMembers = 67;
    this.totalCostOfAllProjects = 240;
    this.pendingTasks = 15;
    this.upComingProjects = 0.2;
    this.projectCost = 2113507;
    this.currentExpenditure = 96788;
    this.availableFunds = 52536;
    this.toDay = new Date();

    this.clients = [
      'ABC Infotech Ltd.',
      'DEF Software Solutions',
      'GHI Industries',
    ];

    this.projects = ['Project A', 'Project B', 'Project C', 'Project D'];

    for (var i = 2024; i >= 2016; i--) {
      this.years.push(i);
    }

    this.teamMembersSummary = this.dashboardService.getTeamMembersSummary();

    this.teamMembers = [
      {
        Region: 'East',
        Members: [
          { ID: 1, Name: 'Ford', Status: 'Available' },
          { ID: 2, Name: 'Miller', Status: 'Available' },
          { ID: 3, Name: 'Jones', Status: 'Busy' },
          { ID: 4, Name: 'James', Status: 'Busy' },
        ],
      },
      {
        Region: 'West',
        Members: [
          { ID: 5, Name: 'Anna', Status: 'Available' },
          { ID: 6, Name: 'Arun', Status: 'Available' },
          { ID: 7, Name: 'Varun', Status: 'Busy' },
          { ID: 8, Name: 'Jasmine', Status: 'Busy' },
        ],
      },
      {
        Region: 'South',
        Members: [
          { ID: 9, Name: 'Krishna', Status: 'Available' },
          { ID: 10, Name: 'Mohan', Status: 'Available' },
          { ID: 11, Name: 'Raju', Status: 'Busy' },
          { ID: 12, Name: 'Farooq', Status: 'Busy' },
        ],
      },
      {
        Region: 'North',
        Members: [
          { ID: 13, Name: 'Jacob', Status: 'Available' },
          { ID: 14, Name: 'Smith', Status: 'Available' },
          { ID: 15, Name: 'Jones', Status: 'Busy' },
          { ID: 16, Name: 'James', Status: 'Busy' },
        ],
      },
    ];
  }

  onProjectChenage(event: any) {
    if (event.target.innerHTML.trim() == 'Project A') {
      this.projectCost = 2113507;
      this.currentExpenditure = 96788;
      this.availableFunds = 52436;
    } else if (event.target.innerHTML.trim() == 'Project B') {
      this.projectCost = 88923;
      this.currentExpenditure = 22450;
      this.availableFunds = 2640;
    } else if (event.target.innerHTML.trim() == 'Project C') {
      this.projectCost = 662183;
      this.currentExpenditure = 7721;
      this.availableFunds = 9811;
    } else if (event.target.innerHTML.trim() == 'Project D') {
      this.projectCost = 928431;
      this.currentExpenditure = 562;
      this.availableFunds = 883;
    }
  }
}
