import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {

  @Input() dateCreated!: string;
  @Input() name!: string;
  @Input() image!: string;
  @Input() blogId!: string;
  @Input() blogTag: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('blogTag', this.name)
  }

  goToBlogDetail(id: any) {
    this.router.navigate(['blogs/post', id])
  }

}
