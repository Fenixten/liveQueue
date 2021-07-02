import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {HeaderComponent} from './header/header.component';
import {MainFormComponent} from './main-form/main-form.component';
import {TicketSelectComponent} from './ticket-select/ticket-select.component';
import {TicketAddingComponent} from './ticket-adding/ticket-adding.component';
import {TicketTypeChangeComponent} from './ticket-type-change/ticket-type-change.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ModalComponent} from "../shared/modal/modal.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HeaderComponent,
    MainFormComponent,
    TicketSelectComponent,
    TicketAddingComponent,
    TicketTypeChangeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    NgbModule,
    NgSelectModule
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class MainModule {
}
