import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() hideModal = new EventEmitter<boolean>();

  close() {
    this.hideModal.emit(false);
    this.show = false;
  }
  constructor() {}

  ngOnInit(): void {}
}
