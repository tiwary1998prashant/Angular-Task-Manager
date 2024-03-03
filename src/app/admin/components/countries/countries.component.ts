import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  showLoading = false;
  deleteCountry: Country = new Country(0, '');
  editIndex!: number;
  deleteIndex!: number;
  searchBy = 'countryName';
  searchText = '';
  currentPageIndex = 0;
  pages: { pageIndex: number }[] = [];
  pageSize = 7;
  newForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private ngModelService: NgbModal,
    private renderer: Renderer2,
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadCountriesData();
    this.initializeForms();
  }

  loadCountriesData() {
    this.countriesService.getCountries().subscribe((response: Country[]) => {
      this.countries = response;
      this.showLoading = false;
      this.calculateNoOfPages();
    });
  }

  initializeForms() {
    this.newForm = this.formBuilder.group({
      countryID: [null],
      countryName: [null, [Validators.required]],
    });

    this.editForm = this.formBuilder.group({
      countryID: [null],
      countryName: [null, [Validators.required]],
    });
  }

  calculateNoOfPages() {
    const filterPipe = new FilterPipe();
    const filteredCountries = filterPipe.transform(
      this.countries,
      this.searchBy,
      this.searchText
    );
    const noOfPages = Math.ceil(filteredCountries.length / this.pageSize);

    this.pages = Array.from({ length: noOfPages }, (_, i) => ({
      pageIndex: i,
    }));
    this.currentPageIndex = 0;
  }

  onPageIndexClicked(ind: number) {
    if (ind >= 0 && ind < this.pages.length) {
      this.currentPageIndex = ind;
    }
  }

  onAddCountry(country: TemplateRef<any>) {
    this.newForm.reset();
    this.ngModelService.open(country);
    this.focusOnElement('#countryName');
  }

  onSaveClick() {
    this.countriesService.insertCountry(this.newForm.value).subscribe({
      next: (response) => {
        const newCountry: Country = { ...response };
        this.countries.push(newCountry);
        this.calculateNoOfPages();
      },
      error: () => {},
    });
  }

  onEditClick(country: Country, editModal: TemplateRef<any>) {
    this.ngModelService.open(editModal);
    this.editForm.patchValue(country);
    this.editIndex = this.countries.indexOf(country);
    this.focusOnElement('#countryName');
  }

  onUpdateClick() {
    this.countriesService.updateCountry(this.editForm.value).subscribe({
      next: (response) => {
        this.countries[this.editIndex] = { ...response };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onDeleteClick(country: Country, deleteModal: TemplateRef<any>) {
    this.ngModelService.open(deleteModal);
    this.deleteCountry = { ...country };
    this.deleteIndex = this.countries.indexOf(country);
  }

  onDeleteConfirmClick() {
    this.countriesService.deleteCountry(this.deleteCountry.countryID).subscribe(
      () => {
        this.countries.splice(this.deleteIndex, 1);
        this.deleteCountry = new Country(0, ''); // Clear deleteCountry
        this.calculateNoOfPages();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearchTextChange() {
    this.calculateNoOfPages();
  }

  private focusOnElement(elementId: string) {
    this.renderer.selectRootElement(elementId).focus();
  }
}
