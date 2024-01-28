import { Injectable, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutUsService } from '@core/services/abou-us/about-us.service';
import { UserService } from '@core/services/auth/user.service';
import { BlogsService } from '@core/services/blogs/blogs.service';
import { CartService } from '@core/services/cart/cart.service';
import { CategoryService } from '@core/services/categories/category.service';
import { ContactUsService } from '@core/services/contact-us/contact-us.service';
import { HandleErrorsService } from '@core/services/handle-errors/handle-errors.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { TermsPolicyService } from '@core/services/policy-terms-conditions/terms-policy.service';
import { ProductSearchService } from '@core/services/product-search/product-search.service';
import { ProductsService } from '@core/services/products/products.service';
import { SharingDataService } from '@core/services/sharing-data/sharing-data.service';
import { WishListService } from '@core/services/wish-list/wish-list.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private _userService: UserService | undefined;
  public get userService(): UserService {
    if (!this._userService) {
      this._userService = this.injector.get(UserService);
    }
    return this._userService;
  }

  private _handleErrorsService: HandleErrorsService | undefined;
  public get handleErrorsService(): HandleErrorsService {
    if (!this._handleErrorsService) {
      this._handleErrorsService = this.injector.get(HandleErrorsService);
    }
    return this._handleErrorsService;
  }

  //// return policy module
  private _termsPolicyService: TermsPolicyService | undefined;
  public get termsPolicyService(): TermsPolicyService {
    if (!this._termsPolicyService) {
      this._termsPolicyService = this.injector.get(TermsPolicyService);
    }
    return this._termsPolicyService;
  }

  //// About Us module
  private _aboutUsService: AboutUsService | undefined;
  public get aboutUsService(): AboutUsService {
    if (!this._aboutUsService) {
      this._aboutUsService = this.injector.get(AboutUsService);
    }
    return this._aboutUsService;
  }

  //// Blogs module
  private _blogsService: BlogsService | undefined;
  public get blogsService(): BlogsService {
    if (!this._blogsService) {
      this._blogsService = this.injector.get(BlogsService);
    }
    return this._blogsService;
  }

  private _route: ActivatedRoute | undefined;
  public get route(): ActivatedRoute {
    if (!this._route) {
      this._route = this.injector.get(ActivatedRoute);
    }
    return this._route;
  }

  private _contactUsService: ContactUsService | undefined;
  public get contactUsService(): ContactUsService {
    if (!this._contactUsService) {
      this._contactUsService = this.injector.get(ContactUsService);
    }
    return this._contactUsService;
  }

  private _toastrService: ToastrService | undefined;
  public get toastrService(): ToastrService {
    if (!this._toastrService) {
      this._toastrService = this.injector.get(ToastrService);
    }
    return this._toastrService;
  }

  public _formBuilder: FormBuilder | undefined;
  public get formBuilder(): FormBuilder {
    if (!this._formBuilder) {
      this._formBuilder = this.injector?.get(FormBuilder);
    }
    return this._formBuilder;
  }

  public _categoryService: CategoryService | undefined;
  public get categoryService(): CategoryService {
    if (!this._categoryService) {
      this._categoryService = this.injector?.get(CategoryService);
    }
    return this._categoryService;
  }

  public _router: Router | undefined;
  public get router(): Router {
    if (!this._router) {
      this._router = this.injector?.get(Router);
    }
    return this._router;
  }

  public _productSearchService: ProductSearchService | undefined;
  public get productSearchService(): ProductSearchService {
    if (!this._productSearchService) {
      this._productSearchService = this.injector?.get(ProductSearchService);
    }
    return this._productSearchService;
  }

  public _activatedRoute: ActivatedRoute | undefined;
  public get activatedRoute(): ActivatedRoute {
    if (!this._activatedRoute) {
      this._activatedRoute = this.injector?.get(ActivatedRoute);
    }
    return this._activatedRoute;
  }

  public _translateService: TranslateService | undefined;
  public get translateService(): TranslateService {
    if (!this._translateService) {
      this._translateService = this.injector?.get(TranslateService);
    }
    return this._translateService;
  }

  public _cartService: CartService | undefined;
  public get cartService(): CartService {
    if (!this._cartService) {
      this._cartService = this.injector?.get(CartService);
    }
    return this._cartService;
  }

  public _wishListService: WishListService | undefined;
  public get wishListService(): WishListService {
    if (!this._wishListService) {
      this._wishListService = this.injector?.get(WishListService);
    }
    return this._wishListService;
  }

  public _sharingDataService: SharingDataService | undefined;
  public get sharingDataService(): SharingDataService {
    if (!this._sharingDataService) {
      this._sharingDataService = this.injector?.get(SharingDataService);
    }
    return this._sharingDataService;
  }

  public _localStorageService: LocalStorageService | undefined;
  public get localStorageService(): LocalStorageService {
    if (!this._localStorageService) {
      this._localStorageService = this.injector?.get(LocalStorageService);
    }
    return this._localStorageService;
  }

  public _productsService: ProductsService | undefined;
  public get productsService(): ProductsService {
    if (!this._productsService) {
      this._productsService = this.injector?.get(ProductsService);
    }
    return this._productsService;
  }

  // ProductsService

  constructor(private injector: Injector) {}

  validateBuyer(data: any) {
    return this.userService.validateBuyer(data);
  }

  register(data: any) {
    return this.userService.register(data);
  }

  resendActivationMail(data: any) {
    return this.userService.resendActivationMail(data);
  }

  forgetPassword(data: any) {
    return this.userService.forgetPassword(data);
  }

  activateUser(data: any) {
    return this.userService.activateUser(data);
  }

  activateChangeEmail(data: any) {
    return this.userService.activateChangeEmail(data);
  }

  login(data: any) {
    return this.userService.login(data);
  }

  resetPassword(data: any) {
    return this.userService.resetPassword(data);
  }

  //// handle error service
  handleError(data: any) {
    return this.handleErrorsService.handleError(data);
  }

  //// return policy module
  getSitting() {
    return this.termsPolicyService.getSitting();
  }

  getTermsAndConditions(variables: any) {
    return this.termsPolicyService.getTermsAndConditions(variables);
  }

  //// Abouy Us
  aboutUs() {
    return this.aboutUsService.aboutUs();
  }

  //// Blogs
  getBlogs(variables: any) {
    return this.blogsService.getBlogs(variables);
  }

  relatedBlogs(variables: any) {
    return this.blogsService.relatedBlogs(variables);
  }

  getBlog(variables: any) {
    return this.blogsService.getBlog(variables);
  }

  /// Contact Us
  createContact(variables: any) {
    return this.contactUsService.createContact(variables);
  }

  /// toastrService
  success(variables: any) {
    return this.toastrService.success(variables);
  }

  info(variables: any) {
    return this.toastrService.info(variables);
  }


  /// formBuilder
  fb(data: any) {
    return this.formBuilder.group(data);
  }
  array() {
    return this.formBuilder.array([]);
  }

  ///  category Service
  getCategories(data: any) {
    return this.categoryService.getCategories(data);
  }

  getSubCategoryByCategoryId(data: any) {
    return this.categoryService.getSubCategoryByCategoryId(data);
  }

  getCategoryById(data: any) {
    return this.categoryService.getCategoryById(data);
  }

  getSubCategoryBySubCategoryId(data: any) {
    return this.categoryService.getSubCategoryBySubCategoryId(data);
  }


  /// Router
  navigate(url: any, query?: any) {
    return this.router.navigate(url, query);
  }

  url() {
    return this.router.url;
  }

  ///  product Search Service
  getAllAttributes() {
    return this.productSearchService.getAllAttributes();
  }

  filterProducts(variables: any) {
    return this.productSearchService.filterProducts(variables);
  }

  getVariantsBysubCategoryId(variables: any) {
    return this.productSearchService.getVariantsBysubCategoryId(variables);
  }

  getProductsByCategoryId(variables: any) {
    return this.productSearchService.getProductsByCategoryId(variables);
  }

  searchProductWithWord(variables: any) {
    return this.productSearchService.searchProductWithWord(variables);
  }
  searchByProductId(variables: any) {
    return this.productSearchService.searchByProductId(variables);
  }

  /// activatedRoute
  snapshotPth() {
    return this.activatedRoute?.snapshot?.url[0]?.path;
  }

  snapshot() {
    return this.activatedRoute?.snapshot;
  }

  queryParams() {
    return this.activatedRoute.queryParams;
  }

  paramMap() {
    return this.activatedRoute.paramMap;
  }

  /// translate service
  use(lang: string) {
    return this.translateService.use(lang);
  }

  /// Cart service
  createCart() {
    return this.cartService.createCart();
  }

  addToCart(variables: any) {
    return this.cartService.addToCart(variables);
  }

  cartOverlayToggle() {
    return this.cartService.cartOverlayToggle();
  }

  getCurencies() {
    return this.cartService.getCurencies();
  }

  /// Wish List Service
  addFavorite(variables: any) {
    return this.wishListService.addFavorite(variables);
  }

  deleteBuyerWithoutInputVar(variables: any) {
    return this.wishListService.deleteBuyerWithoutInputVar(variables);
  }

  /// Sharing Data
  nextCount(variables: any) {
    return this.sharingDataService.nextCount(variables);
  }

  nextFave(variables: any) {
    return this.sharingDataService.nextFave(variables);
  }

  /// LocalStorarge
  setItem(key: any, value: any) {
    return this.localStorageService.set(key, value);
  }

  getItem(key: any) {
    return this.localStorageService.get(key);
  }

  /// productsService
  getProductDetail(key: any) {
    return this.productsService.getProductDetail(key);
  }

  getVariantByAttributeValue(key: any) {
    return this.productsService.getVariantByAttributeValue(key);
  }

  getProductRelated(key: any) {
    return this.productsService.getProductRelated(key);
  }


}
// getVariantByAttributeValue
