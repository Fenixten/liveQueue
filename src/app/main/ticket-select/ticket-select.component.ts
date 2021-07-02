import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Ticket, TicketsService} from "../../shared/tickets.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss']
})
export class TicketSelectComponent implements OnInit, OnDestroy {
  tickets: Ticket[] = []
  firstTickets: Ticket[] = [];
  interval: any

  constructor(private ts: TicketsService, private ms: NgbModal) {
    this.tickets = ts.getTickets();
    this.sortTicketDyDate();
    for (let i = 0; i<10; i++) {
      this.firstTickets.push(this.tickets[i])
    }
  }

  ngOnInit(): void {
    this.interval = setInterval(() => this.confirmTicket(), 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  sortTicketDyDate() {
    this.tickets.sort(function (a, b) {
      if (a.dateTime > b.dateTime) return 1;
      else if (a.dateTime < b.dateTime) return -1;
      else return 0;
    })
  }

  confirmTicket() {
    let now = new Date();
    if (this.firstTickets[0].dateTime.toString() === now.toString()) {
      clearInterval(this.interval);
      let inst = this.ms.open(ModalComponent)
      inst.componentInstance.title = 'Подтверждение талона';
      inst.componentInstance.type = 'confirm';
      inst.componentInstance.text = 'Возьмите талон номер ' + this.firstTickets[0].id;
      inst.componentInstance.timeOut = true;
      inst.result.then(res => {
        if (res === 'ok') {
          console.log('Талон принят')
        } else {
          console.log('Талон не принят')
        }
        this.ts.delTicket(this.firstTickets[0])
        this.tickets = this.ts.getTickets();
        this.sortTicketDyDate();
        this.firstTickets = [];
        for (let i = 0; i<10; i++) {
          this.firstTickets.push(this.tickets[i])
        }
        this.interval = setInterval(() => this.confirmTicket(), 1000)
      })
    }
  }
}
