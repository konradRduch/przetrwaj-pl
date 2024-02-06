import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresln: string
    localId: string
    registered?: boolean
}


@Injectable(
    { providedIn: 'root' }
)
export class AuthService {
    //auth key AIzaSyBUmtCRmzcqSGITccMqDrMtM48TGP5iQbU

    user = new Subject<User>();

    constructor(private http: HttpClient) { }


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
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresln
                );
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
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresln
            );
        }));
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresln: number) {
        const expirationDate = new Date(
            new Date().getTime() + +expiresln * 1000
        );

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
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
}