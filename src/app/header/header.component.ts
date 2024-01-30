import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription| any;

    constructor( private authService: AuthService){}
    
    ngOnInit(){
     this.userSub = this.authService.user.subscribe(
        user=>{
            this.isAuthenticated = !user ? false: true;//!!user
        }
     );   
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

}
