import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
})
export class ReviewModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() hideModal = new EventEmitter<boolean>();

  close() {
    this.hideModal.emit(false);
    this.show = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
