import {Injectable} from '@angular/core';

export interface TicketType {
  id: number,
  name: string,
  code: number
}

export interface Ticket {
  id: number,
  type: TicketType,
  descr: string,
  dateTime: Date
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tickets: Ticket[] = [];
  private ticketTypes: TicketType[] = [];

  getTickets() {
    return this.tickets;
  }

  addTicket(item: Ticket) {
    this.tickets.push(item);
  }

  delTicket(item: Ticket) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== item.id)
    console.log(this.tickets);
  }

  changeTypes(index?: number, type?: TicketType) {
    console.log(index);
    if (typeof index === "number" && !type) {
      this.tickets = this.tickets.filter(item => item.type.id !== this.ticketTypes[index].id)
      this.ticketTypes.splice(index, 1);
    }
    if (typeof index !== "number" && type) {
      this.ticketTypes.push(type);
    }
    if (typeof index === "number" && type) {
      this.tickets.forEach(item => {
        if (item.type === this.ticketTypes[index])
          item.type = type
      })
      this.ticketTypes.splice(index, 1, type);
    }
    this.saveTickets();
  }

  getTypes() {
    return this.ticketTypes;
  }

  constructor() {

  }

  generateTicketList() {
    for (let i = 0; i < 5; i++) {
      this.ticketTypes.push({id: i, code: i * 4, name: 'type ' + i})
    }
    for (let i = 0; i < 20; i++) {
      let dateNow = new Date(),
        dateFuture = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), dateNow.getHours(),
          dateNow.getMinutes() + Math.random() * 200, dateNow.getSeconds() + i * 2)
      this.tickets.push({
        id: i,
        type: this.ticketTypes[i % 5],
        descr: 'This is description for card ' + i,
        dateTime: this.randomDate(dateNow, dateFuture)
      })
    }
  }

  loadTicketList() {
    this.tickets = [];
    console.log('storage');
    let keys = Object.keys(localStorage);
    for (let key in keys) {
      this.tickets.push(this.ticketParsel(localStorage.getItem(key)))
      if (!this.ticketTypes.find(item => item.id === this.tickets[this.tickets.length - 1].type.id))
        this.ticketTypes.push(this.tickets[this.tickets.length - 1].type);
    }
  }

  ticketParsel(data: string | null) {
    let result: Ticket = {
      id: 0,
      type: {id: 0, name: '', code: 0},
      descr: '',
      dateTime: new Date()
    }, dataArr: any[] = [];
    if (data) dataArr = data.split(';')
    if (dataArr.length === 6) {
      result = {
        id: dataArr[0],
        type: {id: dataArr[1], name: dataArr[2], code: dataArr[3]},
        descr: dataArr[4],
        dateTime: dataArr[5]
      }
    }
    return result;
  }

  ticketToStr(item: Ticket) {
    let str: string = item.id + ';' + item.type.id + ';' + item.type.name + ';' + item.type.code + ';' +
      item.descr + ';' + item.dateTime;
    return str;
  }

  saveTickets() {
    localStorage.clear();
    for (let item in this.tickets) {
      let str = this.ticketToStr(this.tickets[item]);
      localStorage.setItem(item, str);
    }
  }

  randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
