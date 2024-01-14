import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/auth/auth.component";
import { MainViewComponent } from "./main-view/main-view.component";

const appRoutes: Routes = [
    { path: '', redirectTo: ' ', pathMatch: 'full' },
    { path: '', component: AuthComponent},
    { path: 'main-view', component: MainViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}