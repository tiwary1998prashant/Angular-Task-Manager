import { Component, Renderer2, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { ClientLocationsService } from 'src/app/services/client-locations.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss'],
})
export class ClientLocationsComponent {
  clientLocations: ClientLocation[] = [];
  showLoading = true;
  deleteClientLocation: ClientLocation = new ClientLocation();
  editIndex!: number;
  deleteIndex!: number;
  searchBy = 'clientLocationName';
  searchText = '';
  currentPageIndex = 0;
  pages: { pageIndex: number }[] = [];
  pageSize = 7;
  // sortBy = 'clientLocationName';
  // sortOrder = 'ASC';
  newForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private clientLocationsService: ClientLocationsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadData();
    this.initializeForms();
  }

  loadData() {
    this.clientLocationsService
      .getClientLocations()
      .subscribe((response: ClientLocation[]) => {
        this.clientLocations = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      });
  }

  initializeForms() {
    this.newForm = this.formBuilder.group({
      clientLocationID: [null],
      clientLocationName: [null, [Validators.required]],
    });

    this.editForm = this.formBuilder.group({
      clientLocationID: [null],
      clientLocationName: [null, [Validators.required]],
    });
  }

  calculateNoOfPages() {
    const filterPipe = new FilterPipe();
    const filteredClientLocations = filterPipe.transform(
      this.clientLocations,
      this.searchBy,
      this.searchText
    );
    const noOfPages = Math.ceil(filteredClientLocations.length / this.pageSize);

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

  onNewClick(addClientModal: TemplateRef<any>) {
    this.newForm.reset();
    this.modalService.open(addClientModal);
    this.focusOnElement('#clientLocationName');
  }

  onSaveClick() {
    this.clientLocationsService
      .insertClientLocation(this.newForm.value)
      .subscribe({
        next: (response: ClientLocation) => {
          const newClientLocation: ClientLocation = { ...response };
          this.clientLocations.push(newClientLocation);
          this.calculateNoOfPages();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onEditClick(clientLocation: ClientLocation, editModal: TemplateRef<any>) {
    this.modalService.open(editModal);
    this.renderer.selectRootElement('#clientLocationName').focus();
    this.editForm.patchValue(clientLocation);
    this.editIndex = this.clientLocations.indexOf(clientLocation);
  }

  onUpdateClick() {
    this.clientLocationsService
      .updateClientLocation(this.editForm.value)
      .subscribe({
        next: (response: ClientLocation) => {
          this.clientLocations[this.editIndex] = { ...response };
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onDeleteClick(clientLocation: ClientLocation, deleteModal: TemplateRef<any>) {
    this.modalService.open(deleteModal);
    this.deleteClientLocation = { ...clientLocation };
    this.deleteIndex = this.clientLocations.indexOf(clientLocation);
  }

  onDeleteConfirmClick() {
    this.clientLocationsService
      .deleteClientLocation(this.deleteClientLocation.clientLocationID)
      .subscribe({
        next: () => {
          this.clientLocations.splice(this.deleteIndex, 1);
          this.deleteClientLocation = new ClientLocation(); // Clear deleteClientLocation
          this.calculateNoOfPages();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onSearchTextChange() {
    this.calculateNoOfPages();
  }

  private focusOnElement(elementId: string) {
    this.renderer.selectRootElement(elementId).focus();
  }
}
