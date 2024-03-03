import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  //activeUser!: string;

  constructor(
    public loginService: LoginService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    // const storedUserData = sessionStorage.getItem('currentUser');

    // if (storedUserData !== null) {
    //   const currentUser = JSON.parse(storedUserData);
    //   const firstName = currentUser.personName.firstName;
    //   this.activeUser = firstName;
    // }
  }

  openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
