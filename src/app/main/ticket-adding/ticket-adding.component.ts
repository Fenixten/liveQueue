import {Component, OnInit} from '@angular/core';
import {Ticket, TicketsService, TicketType} from "../../shared/tickets.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'app-ticket-adding',
  templateUrl: './ticket-adding.component.html',
  styleUrls: ['./ticket-adding.component.scss']
})
export class TicketAddingComponent implements OnInit {
  ticket: Ticket =
    {
      id: 0,
      type: {id: 0, name: '', code: 0},
      descr: '',
      dateTime: new Date()
    }
  ticketTypes: TicketType[] = [];
  date;
  time;


  constructor(private ts: TicketsService, private ms: NgbModal) {
    this.ticketTypes = this.ts.getTypes()
    this.date = this.ticket.dateTime.getDate();
    this.time = this.ticket.dateTime.getTime();

  }

  ngOnInit(): void {
  }

  typeChange(event: any) {
    this.ticketTypes.map(item => {
      if (item.id.toString() === this.ticket.type.id.toString()) {
        this.ticket.type = {...item}
      }
    });
  }

  saveTicket() {
    console.log(this.ticket);
    let tickets = this.ts.getTickets();
    let dubl = tickets.find(item => {
      let diff = item.dateTime.getTime() - this.ticket.dateTime.getTime()
      if (Math.abs(diff) <= 300000) return true;
      else return false;
    });
    if (dubl) {
      let modal = this.ms.open(ModalComponent)
      modal.componentInstance.type='confirm';
      modal.componentInstance.title='Не удалось добавить талон'
      modal.componentInstance.text= 'Талон на такое время уже существует, выберите другое время'
    } else {
      this.ts.addTicket(this.ticket);
    }
  }

  clear() {
    this.ticket =
      {
        id: 0,
        type: {id: 0, name: '', code: 0},
        descr: '',
        dateTime: new Date()
      }
  }

  dateTransform() {
    let dateNormal = new Date(this.date);
    this.ticket.dateTime.setFullYear(dateNormal.getFullYear());
  }

  timeTransform() {
    let dateNormal = this.time.toString().split(':')
    this.ticket.dateTime.setHours(parseInt(dateNormal[0]));
    this.ticket.dateTime.setMinutes(parseInt(dateNormal[1]));
  }
}
