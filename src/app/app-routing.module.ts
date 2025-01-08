import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { MainComponent } from './components/main/main.component';

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
import { GuriaComponent } from './regions/guria/guria.component';
import { ImeretiComponent } from './regions/imereti/imereti.component';
import { JavaxetiComponent } from './regions/javaxeti/javaxeti.component';
import { KaxetiComponent } from './regions/kaxeti/kaxeti.component';
import { McxetaComponent } from './regions/mcxeta/mcxeta.component';
import { QvemoqartliComponent } from './regions/qvemoqartli/qvemoqartli.component';
import { ShidaqartliComponent } from './regions/shidaqartli/shidaqartli.component';
import { RachaComponent } from './regions/racha/racha.component';
import { SamegreloComponent } from './regions/samegrelo/samegrelo.component';
let routes: Routes = [

  {
    path: "",
    component: MainComponent
  },
  {
    path: "main",
    component: MainComponent
  },
  {
    path: "first",
    component: FirstComponent
  },

  {
    path: "second",
    component: SecondComponent
  },

  {
    path: "third",
    component: ThirdComponent
  },

  {
    path: "fourth",
    component: FourthComponent
  },

  {
    path: "fifth",
    component: FifthComponent
  },
  {
    path: "education",
    component: EducationComponent
  },
  {
    path: "schools",
    component: SchoolsComponent
  },
  {
    path: "publicSchools",
    component: PublicSchoolsComponent
  },
  {
    path: "privateSchools",
    component: PrivateSchoolsComponent
  },
  {
    path: "legislation",
    component: LegislationComponent
  },
  {
    path: "schools/:id",  
    component: SchoolsDetailsComponent
  },

 
  {
    path: "apxazia",
    component: ApxaziaComponent
  },
  {
    path: "tbilisi",
    component: TbilisiComponent
  },
  {
    path: "adjara",
    component: AdjaraComponent
  },
  {
    path: "guria",
    component: GuriaComponent
  },
  {
    path: "imereti",
    component: ImeretiComponent
  },
  {
    path: "javaxeti",
    component: JavaxetiComponent
  },
  {
    path: "kaxeti",
    component: KaxetiComponent
  },
  {
    path: "mcxeta",
    component: McxetaComponent
  },
  {
    path: "qvemoqartli",
    component: QvemoqartliComponent
  },
  {
    path: "shidaqartli",
    component: ShidaqartliComponent
  },
  {
    path: "racha",
    component: RachaComponent
  },
  {
    path: "samegrelo",
    component: SamegreloComponent
  },




  {
    path: "**",
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
