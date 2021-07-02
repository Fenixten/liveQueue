import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Ticket, TicketType} from "../tickets.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = 'title';
  @Input() text: unknown;
  @Input() typeForEdit?: TicketType;
  @Input() type: 'confirm' | 'data' = 'confirm';
  @Input() timeOut: boolean = false;
  ticketType: TicketType = {id: 0, name: '', code: 0};
  time: any;

  constructor(private ngbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.typeForEdit) {
      this.ticketType = {...this.typeForEdit};
    }
    if (this.timeOut) {
      this.time = setTimeout(() => {this.ngbActiveModal.close('cancel');}, 5000)
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.time);
  }

  cancel() {
    this.ngbActiveModal.close('cancel');
  }

  ok() {
    if (this.type === 'confirm') {
      this.ngbActiveModal.close('ok')
    } else {
      this.ngbActiveModal.close(this.ticketType)
    }
  }
}
