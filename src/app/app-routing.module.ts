import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/auth/auth.component";
import { MainViewComponent } from "./main-view/main-view.component";
import { UsersManagementPanelComponent } from "./users-management-panel/users-management-panel.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

const appRoutes: Routes = [
    { path: '', redirectTo: ' ', pathMatch: 'full' },
    { path: '', component: AuthComponent },
    { path: 'main-view', component: MainViewComponent },
    { path: 'users-management-panel', component: UsersManagementPanelComponent },
    { path: 'account-settings', component: AccountSettingsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}