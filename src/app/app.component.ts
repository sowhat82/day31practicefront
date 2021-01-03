import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  loginForm : FormGroup
	errorMessage = ''

	constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  async login(){

    var success = true;
    var status = 0

    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value

    this.performLogin(username, password)

  }

  // auth service
  performLogin(user, passwd) {
    
    const loginDetails = new HttpParams()
    .set('email', user)
    .set('password', passwd);
    
    const  httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    
    this.http.post('/login', loginDetails.toString(),
    { headers: httpHeaders })
    .toPromise()
    .then(
      (token) => {window.alert("success " + token)
    }
    )
    .catch((error) => {
      if (401 == error.status) {
        //handle incorrect login
        window.alert("ERROR " + error.status)
        }
      })
  }
                       

}

