import { Routes } from '@angular/router';
import { ShowCaseOfMyProjectComponent } from '../show-case-of-my-project/show-case-of-my-project.component';
import { LoginAdminComponent } from '../userProfile/login-admin/login-admin.component';
import { SignupAdminComponent } from '../userProfile/signup-admin/signup-admin.component';
import { LoginUserComponent } from '../userProfile/login-user/login-user.component';
import { SignupUserComponent } from '../userProfile/signup-user/signup-user.component';
import { StoreComponent } from '../elements/store/store.component';
import { ContactUsComponent } from '../elements/contact-us/contact-us.component';
import { CartComponent } from '../elements/cart/cart.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { CreateproductComponent } from '../createproduct/createproduct.component';
import { BuynowComponent } from '../elements/buynow/buynow.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ChatComponent } from './chat/chat.component';
import { SuccessPaymentComponent } from '../success-payment/success-payment.component';
import { FaliedPaymentComponent } from '../falied-payment/falied-payment.component';

import { IntroductionComponent } from '../elements/introduction/introduction.component';
import { SplashComponent } from '../elements/splash/splash.component';
import { PlantAccessoriesComponent } from './plant-accessories/plant-accessories.component';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { AdminSidebarComponent } from '../admin/admin-sidebar/admin-sidebar.component';
import { ManageProductsComponent } from '../admin/manage-products/manage-products.component';
import { AllOrdersComponent } from '../admin/all-orders/all-orders.component';


export const routes: Routes = [
    { path: 'show', component: ShowCaseOfMyProjectComponent },
    { path: '', component: SplashComponent },
    { path: 'user-login', component: LoginUserComponent },
    { path: 'signup-admin', component: SignupAdminComponent },
    { path: 'signup-user', component: SignupUserComponent },
    { path: 'store', component: StoreComponent },
    { path: 'contact', component: ContactUsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'buynow', component: BuynowComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'chat1', component: ChatComponent },
    { path: 'paysucess', component: SuccessPaymentComponent },
    { path: 'payfail', component: FaliedPaymentComponent},
    { path: 'intro', component: IntroductionComponent},
    { path: 'accessories', component: PlantAccessoriesComponent},
    { path: 'show-cart', component: CartDisplayComponent},

    //admin routes
        { path: 'admin', component: AdminSidebarComponent },
        { path: 'admin-login', component: LoginAdminComponent },
        { path: 'admindash', component: AdminDashboardComponent },
        { path: 'products', component: ManageProductsComponent },
        { path: 'all-orders', component: AllOrdersComponent },

        { path: 'addProduct', component: CreateproductComponent }, //create product from admin


    







    // { path: 'productDetail', component: ProductDetailsComponent }








];
