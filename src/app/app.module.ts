import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { MiniNavBarComponent } from './components/mini-nav-bar/mini-nav-bar.component';
import { FirstComponent } from './mainComponents/first/first.component';
import { SecondComponent } from './mainComponents/second/second.component';
import { ThirdComponent } from './mainComponents/third/third.component';
import { FourthComponent } from './mainComponents/fourth/fourth.component';
import { FifthComponent } from './mainComponents/fifth/fifth.component';
import { EducationComponent } from './nav-bar-Components/education/education.component';
import { SchoolsComponent } from './nav-bar-Components/schools/schools.component';
import { LegislationComponent } from './nav-bar-Components/legislation/legislation.component';
import { PublicSchoolsComponent } from './components/public-schools/public-schools.component';
import { PrivateSchoolsComponent } from './components/private-schools/private-schools.component';
import { SchoolsDetailsComponent } from './components/schools-details/schools-details.component';
import { ApxaziaComponent } from './regions/apxazia/apxazia.component';
import { TbilisiComponent } from './regions/tbilisi/tbilisi.component';
import { AdjaraComponent } from './regions/adjara/adjara.component';
import { ImeretiComponent } from './regions/imereti/imereti.component';
import { McxetaComponent } from './regions/mcxeta/mcxeta.component';
import { GuriaComponent } from './regions/guria/guria.component';
import { KaxetiComponent } from './regions/kaxeti/kaxeti.component';
import { RachaComponent } from './regions/racha/racha.component';
import { SamegreloComponent } from './regions/samegrelo/samegrelo.component';
import { JavaxetiComponent } from './regions/javaxeti/javaxeti.component';
import { QvemoqartliComponent } from './regions/qvemoqartli/qvemoqartli.component';
import { ShidaqartliComponent } from './regions/shidaqartli/shidaqartli.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    ErrorComponent,
    FooterComponent,
    MiniNavBarComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent,
    FifthComponent,
    EducationComponent,
    SchoolsComponent,
    LegislationComponent,
    PublicSchoolsComponent,
    PrivateSchoolsComponent,
    SchoolsDetailsComponent,
    ApxaziaComponent,
    TbilisiComponent,
    AdjaraComponent,
    ImeretiComponent,
    McxetaComponent,
    GuriaComponent,
    KaxetiComponent,
    RachaComponent,
    SamegreloComponent,
    JavaxetiComponent,
    QvemoqartliComponent,
    ShidaqartliComponent,
   
    
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
