import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {TicketComponent} from './ticket/ticket.component';
import {MatCardModule} from "@angular/material/card";
import {ModalModule} from "ngb-modal";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ModalComponent,
    TicketComponent
  ],
  exports: [
    TicketComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ModalModule,
    NgbModule,
    FormsModule
  ]
})
export class SharedModule {
}
