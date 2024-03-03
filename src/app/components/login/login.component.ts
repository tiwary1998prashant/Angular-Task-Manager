import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = new User();
  loginError: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.renderer.selectRootElement('#username').focus();
  }
  onLoginClick(event: any) {
    this.loginService.Login(this.user).subscribe({
      next: (response) => {
        if (this.loginService.currentUserRole == 'Admin') {
          this.router.navigate(['/admin', 'dashboard']);
        } else {
          this.router.navigate(['/employee', 'tasks']);
        }

        this.onCloseClicked();
      },
      error: (error) => {
        this.loginError = 'Invalid Username or Password';
      },
    });
  }

  onCloseClicked() {
    this.activeModal.close('login');
  }
  onRegisterClick() {
    this.activeModal.close('login');
    this.modalService.open(SignupComponent);
  }
}
