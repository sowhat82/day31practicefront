import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
	errorMessage = ''

	constructor(private fb: FormBuilder, private http: HttpClient, private router:Router, private auth: Auth) { }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  async login(){

    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value

    if(await this.auth.performLogin(username, password)) {
      this.router.navigate(['/main'])
    }
  }
}
