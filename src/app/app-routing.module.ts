import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainFormComponent} from "./main/main-form/main-form.component";
import {TicketSelectComponent} from "./main/ticket-select/ticket-select.component";
import {TicketAddingComponent} from "./main/ticket-adding/ticket-adding.component";
import {TicketTypeChangeComponent} from "./main/ticket-type-change/ticket-type-change.component";

const routes: Routes = [
  {
    path: '',
    component: MainFormComponent,
    children: [
      {
        path: '',
        redirectTo: 'select',
        pathMatch: 'full'
      },
      {
        path: 'select',
        component: TicketSelectComponent
      },
      {
        path: 'add',
        component: TicketAddingComponent
      },
      {
        path: 'types',
        component: TicketTypeChangeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
