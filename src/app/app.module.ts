import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeadBigComponent } from './head-big/head-big.component';
import { BlockComponent } from './block/block.component';
import { FooterComponent } from './footer/footer.component';
import { SideFiguresComponent } from './side-figures/side-figures.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { HeadSmallComponent } from './head-small/head-small.component';
import { GraphComponent } from './graph/graph.component';
import { ExitComponent } from './exit/exit.component';
import { FormatPipe } from './user/format.pipe'
import { TranslatePipe } from './user/translate.pipe';
import { CvHeaderComponent } from './cv-header/cv-header.component'
import { DatePipe } from "./user/date.pipe"
import { SexPipe } from "./user/sex.pipe"
import { ProcessDatePipe } from "./user/procDate.pipe";
import { CvMiddleComponent } from './cv-middle/cv-middle.component';
import { CvFooterComponent } from './cv-footer/cv-footer.component';
import { SearchHeaderComponent } from './search-header/search-header.component'
import { ColorDirective } from './search-header/search-header.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeadBigComponent,
    BlockComponent,
    FooterComponent,
    SideFiguresComponent,
    NotFoundComponent,
    AboutComponent,
    GraphComponent,
    AuthComponent,
    CardComponent,
    SearchComponent,
    UserComponent,
    HeadSmallComponent,
    ExitComponent,
    FormatPipe,
    TranslatePipe,
    CvHeaderComponent,
    DatePipe,
    SexPipe,
    ProcessDatePipe,
    CvMiddleComponent,
    CvFooterComponent,
    SearchHeaderComponent,
    ColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
