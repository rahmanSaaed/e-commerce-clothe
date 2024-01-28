import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacadeService } from '@core/facade/facade.service';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss']
})
export class BlogSingleComponent implements OnInit {

  blog: any;
  blogs: any;

  productsSliderConfig: any = {
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };

  constructor(
    private router: ActivatedRoute,
    private facade: FacadeService
  ) {
    this.router.params.subscribe((paramsId: any) => {
      console.log('this.id', paramsId);
    });
  }
  ngOnInit(): void {
    this.getQueryParam();
  }

  getQueryParam() {
    this.router.params.subscribe((paramsId: any) => {
      console.log('this.id', paramsId);
      if (paramsId?.id) {
        this.getBlogDetail(paramsId?.id);
      }
    });
  }

  getBlogDetail(id: any) {
    const variables = {
      findBlogInput: { blogId: id },
    };
    this.facade.getBlog(variables).subscribe(
      (res: any) => {
        console.log(res);
        this.blog = res?.data?.blog;
        this.getRelatedBlog(this.blog?.blogTag?.tagId);
      },
      (error: any) => {
        this.facade.handleError(error);
      }
    );
  }

  getRelatedBlog(id: any) {
    const variables = {
      relatedBlogInput: { tagId: id },
      paginationOptions: {
        page: 1,
        limit: 3,
      },
    };
    this.facade.relatedBlogs(variables).subscribe(
      (res: any) => {
        console.log('getRelatedBlog', res);
        this.blogs = res?.data?.relatedBlogs;
      },
      (error: any) => {
        this.facade.handleError(error);
      }
    );
  }
}
