import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Directive({
  selector: '[appProjectIduniqueValidator]',
  providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:ProjectIduniqueValidatorDirective,
    multi:true
  }]
})
export class ProjectIduniqueValidatorDirective implements AsyncValidator {

  constructor(private projectService:ProjectService) { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.projectService.getProjectByProjectID(control.value).pipe(
      map((existingProject:Project)=>{
        if(existingProject != null){
          return {uniqueProjectID:{valid:false}}
        }
        else{
          return null
        }
      })
    );

  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

}
