import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: any;
  limit: any = 10;
  isGettingData!: boolean;
  slogans: any;

  constructor(
    private facade: FacadeService
    ) {
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    const variables = {
      paginationOptions: {
        page: 1,
        limit: this.limit
      }
    }
    this.isGettingData = true
    this.facade.getBlogs(variables).subscribe((res: any) => {
      console.log('getBlogs', res);
      this.blogs = res?.data?.blogs;
      this.isGettingData = false
    }, error => {
      this.isGettingData = false
    })
  }


  onScroll() {
    console.log('scrolled!!');
    this.limit = this.limit + 10;
      this.getBlogs();
  }
}
