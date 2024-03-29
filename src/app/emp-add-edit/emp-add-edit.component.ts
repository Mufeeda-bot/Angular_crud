import { Component, OnInit, Inject } from '@angular/core'; // Corrected OnInit import
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit { 
  empForm: FormGroup;

  education: string[] = [
    'Diploma',
    'Graduate',
    'postGraduate'
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      FirstName: '',
      LastName: '',
      email: '',
      dob: '',
      Gender: '',
      education: ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) { 
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee updated Successfully')
            this._dialogRef.close(true); 
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added Successfully')
          this._dialogRef.close(true); 
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } 
  }
  }
}
