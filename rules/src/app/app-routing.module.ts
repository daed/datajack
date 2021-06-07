import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '404', redirectTo: '404.html'},
  { path: '**', component: PageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
