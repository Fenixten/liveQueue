import {Component, OnChanges, OnInit} from '@angular/core';
import {TicketsService, TicketType} from "../../shared/tickets.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'app-ticket-type-change',
  templateUrl: './ticket-type-change.component.html',
  styleUrls: ['./ticket-type-change.component.scss']
})
export class TicketTypeChangeComponent implements OnInit, OnChanges {
  ticketTypes: TicketType[] = []

  constructor(private ts: TicketsService, private ms: NgbModal) {
    this.ticketTypes = this.ts.getTypes();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.ticketTypes = this.ts.getTypes();
  }

  delType(index: number) {
    const modal = this.ms.open(ModalComponent);
    modal.componentInstance.title = 'Подтверждение удаления';
    modal.componentInstance.type = 'confirm';
    modal.componentInstance.text = 'Подтвержите удаление типа карточки. ' +
      'При удалении типа будут так же удалены все карточки этого типа';
    modal.componentInstance.timeOut = true;
    modal.result.then(res => {
      if (res !== 'cancel')
        this.ts.changeTypes(index);
    })
  }

  changeType(index: number) {
    const modal = this.ms.open(ModalComponent);
    modal.componentInstance.title = 'Редактирование типа';
    modal.componentInstance.type = 'data';
    modal.componentInstance.typeForEdit = this.ticketTypes[index];
    modal.result.then(res => {
      if (res !== 'cancel')
        this.ts.changeTypes(index, res);
    })
  }

  addNewType() {
    const modal = this.ms.open(ModalComponent);
    modal.componentInstance.title = 'Создание нового типа';
    modal.componentInstance.type = 'data';
    modal.result.then(res => {
      if (res !== 'cancel')
        this.ts.changeTypes(undefined, res);
    })
  }

}
