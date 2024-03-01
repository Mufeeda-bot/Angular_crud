import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private services:UserService,private router:Router){

  }
registerform=this.builder.group({
  id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
  name: this.builder.control('', Validators.required),
  password: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(5)])),
  email: this.builder.control('', Validators.compose([Validators.required,Validators.email])),
  role:this.builder.control(''),
  isactive:this.builder.control(true)

});
proceedregisteration(){
  if(this.registerform.valid){
    this.services.proceedregister(this.registerform.value).subscribe(res =>{
     alert('Registered successfully'); 
     this.router.navigate(['login']);
    })

  }else{
     this.toastr.warning('please enter valid data');
  }
}
}
