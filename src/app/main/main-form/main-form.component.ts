import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketsService} from "../../shared/tickets.service";

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit, OnDestroy {

  constructor(private ts: TicketsService) {
    if (!localStorage.length) {
      ts.generateTicketList();
    } else {
      ts.loadTicketList();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ts.saveTickets();
  }
}
