import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isActive: boolean = false;
  constructor(
    private ngbModalService: NgbModal,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.isActive = this.loginService.detectIfAlreadyLoggedIn();
    if (!this.isActive) {
      this.ngbModalService.open(LoginComponent);
    }
  }
}
