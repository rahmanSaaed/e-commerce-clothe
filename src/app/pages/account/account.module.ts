import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '@shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersSingleComponent } from './orders/orders-single/orders-single.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { ReviewModalComponent } from './components/review-modal/review-modal.component';
import { AddressModalComponent } from './components/address-modal/address-modal.component';

@NgModule({
  declarations: [
    AccountComponent,
    DetailsComponent,
    WishlistComponent,
    SubscriptionsComponent,
    ChangePasswordComponent,
    OrdersComponent,
    OrdersSingleComponent,
    ReviewsComponent,
    AddressesComponent,
    OrdersListComponent,
    ReviewModalComponent,
    AddressModalComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
