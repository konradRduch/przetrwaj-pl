import { Component } from "@angular/core";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        // console.log(form.value);
        const firstName = form.value.firstName;
        const lastName = form.value.lastName;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;


        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(firstName, lastName, email, password);
        }

        authObs.subscribe(
            resData => {
                // console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/main-view']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                console.log('error: ' + this.error)
                this.isLoading = false;
            }
        );

        form.reset();
    }



}


