import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesGrid } from './sales-grid/sales-grid';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';

const routes: Routes = [
  {path: 'home', component: SalesGrid},
  {path: 'category/:id', component: SalesGrid},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'**',  component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
