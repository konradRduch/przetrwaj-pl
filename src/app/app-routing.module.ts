import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/auth/auth.component";
import { MapkaComponent } from "./mapka/mapka.component";

const appRoutes: Routes = [
    { path: '', redirectTo: ' ', pathMatch: 'full' },
    { path: '', component: AuthComponent},
    { path: 'mapka', component: MapkaComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}