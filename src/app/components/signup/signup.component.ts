import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { LoginComponent } from '../login/login.component';
import { SignUpViewModel } from 'src/app/models/sign-up-view-model';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  countries: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private customValidatorsService: CustomValidatorsService,
    private countriesService: CountriesService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.countriesService.getCountries().subscribe({
      next: (response) => {
        this.countries = response;
      },
    });
    this.renderer.selectRootElement('#firstName').focus();

    this.signupForm = this.fb.group(
      {
        personName: this.fb.group({
          firstName: [null, Validators.required],
          lastName: [null, Validators.required],
        }),
        email: [null, [Validators.required, Validators.email]],
        mobileNumber: [
          null,
          [Validators.required, Validators.pattern(/^[789]\d{9}$/)],
        ],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        dateOfBirth: [
          null,
          [
            Validators.required,
            this.customValidatorsService.minimumAgeValidator(18),
          ],
        ],
        gender: [null, Validators.required],
        countryID: [null, Validators.required],
        skills: this.fb.array([]),
        receiveNewsLetters: [null],
      },

      {
        validators: [
          this.customValidatorsService.compareValidator(
            'confirmPassword',
            'password'
          ),
        ],
      }
    );
  }

  get firstName() {
    return this.signupForm.get('personName.firstName');
  }
  get lastName() {
    return this.signupForm.get('personName.lastName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get mobileNumber() {
    return this.signupForm.get('mobileNumber');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get dateOfBirth() {
    return this.signupForm.get('dateOfBirth');
  }
  get countryID() {
    return this.signupForm.get('countryID');
  }
  get skills() {
    return this.signupForm.get('skills') as FormArray;
  }

  onCloseClicked() {
    this.activeModal.close();
  }
  login() {
    this.activeModal.close();
    this.modalService.open(LoginComponent);
  }
  onAddSkill() {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, Validators.required),
      skillLevel: new FormControl(null, Validators.required),
    });

    (<FormArray>this.signupForm.get('skills')).push(formGroup);
  }

  onRemoveSkill(index: number) {
    (<FormArray>this.signupForm.get('skills')).removeAt(index);
  }

  onSubmitClick() {
    var signUpViewModel = this.signupForm.value as SignUpViewModel;
    signUpViewModel.id = this.generateUniqueRandomNumber();

    this.loginService.Register(signUpViewModel).subscribe({
      next: (response) => {
        this.router.navigate(['/employee', 'tasks']);
        this.activeModal.close();
      },
      error: (error) => {
        //console.log(error);
      },
    });
  }
  minRange = 1;
  maxRange = 100;
  usedNumbers: number[] = [];

  generateUniqueRandomNumber(): number {
    let randomNumber: number;

    do {
      randomNumber =
        Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) +
        this.minRange;
    } while (this.usedNumbers.includes(randomNumber));

    this.usedNumbers.push(randomNumber);

    return randomNumber;
  }
}
