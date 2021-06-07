import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { TitleComponent } from './title/title.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnnoucementsComponent } from './annoucements/annoucements.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    TitleComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    NotFoundComponent,
    AnnoucementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
