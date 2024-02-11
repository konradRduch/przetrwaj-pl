import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { GlobalVariablesService } from "../services/global-variables.service";

export interface AuthResponseData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
}


@Injectable(
    { providedIn: 'root' }
)
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient, private globalVariablesService: GlobalVariablesService) { }


    signup(firstName: string, lastName: string, email: string, password: string) {
        return this.http.post<AuthResponseData>('/api/v1/auth/register',
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(resData => {
                this.setUserRole(resData.role);
                this.setCurrentUser(resData.id, resData.firstName, resData.lastName, resData.email, resData.role);
                this.globalVariablesService.setUserIsLogged(true);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('/api/v1/auth',
            {
                username: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.setUserRole(resData.role);
            this.setCurrentUser(resData.id, resData.firstName, resData.lastName, resData.email, resData.role);
            this.globalVariablesService.setUserIsLogged(true);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMassage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMassage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMassage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMassage = 'This email didnt exist';
                break;
            case 'INVALID_PASSWORD':
                errorMassage = 'This password is not correct';
                break;

        }
        return throwError(errorMassage);
    }

    setUserRole(role: string) {
        if (role === 'MODERATOR') {
            this.globalVariablesService.setUserIsModerator(true);
        }
        else {
            this.globalVariablesService.setUserIsModerator(false);
        }
    }

    setCurrentUser(id: number, firstName: string, lastName: string, email: string, role: string) {
        let user = { id: id, firstName: firstName, lastName: lastName, email: email, role: role };
        this.globalVariablesService.setCurrentUser(user);
    }
}