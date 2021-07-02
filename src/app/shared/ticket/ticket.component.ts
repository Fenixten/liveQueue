import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Ticket} from "../tickets.service";
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  @Input() ticket!: Ticket;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
