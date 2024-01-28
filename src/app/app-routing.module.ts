import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'product/:id', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'search', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'sale', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
  { path: 'terms', loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule) },
  { path: 'return-policy', loadChildren: () => import('./pages/return-policy/return-policy.module').then(m => m.ReturnPolicyModule) },
  { path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'demo', loadChildren: () => import('./pages/home/components/pages/demo/demo.module').then(m => m.DemoModule) },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
