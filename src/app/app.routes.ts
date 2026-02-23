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
import { SuccessPaymentComponent } from '../success-payment/success-payment.component';
import { FaliedPaymentComponent } from '../falied-payment/falied-payment.component';
import { IntroductionComponent } from '../elements/introduction/introduction.component';
import { SplashComponent } from '../elements/splash/splash.component';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { AdminSidebarComponent } from '../admin/admin-sidebar/admin-sidebar.component';
import { ManageProductsComponent } from '../admin/manage-products/manage-products.component';
import { AllOrdersComponent } from '../admin/all-orders/all-orders.component';
import { BoxeBlogComponent } from '../elements/boxe-blog/boxe-blog.component';


export const routes: Routes = [

    {
        path: '',
        component: SplashComponent,
        data: {
            title: 'BOXÉ Official Store | Premium Lifestyle & Exclusive Products',
            description: 'BOXÉ is your destination for premium lifestyle products, accessories, and exclusive collections. Shop high-quality products with secure checkout.'
        }
    },

    {
        path: 'store',
        component: StoreComponent,
        data: {
            title: 'Shop Premium Products | BOXÉ Official Store',
            description: 'Explore premium products at BOXÉ. Discover exclusive collections, modern essentials, and high-quality lifestyle items.'
        }
    },

    {
        path: 'product/:id',
        component: ProductDetailsComponent,
        data: {
            title: 'Product Details | BOXÉ Official Store',
            description: 'View detailed information, features, and pricing of premium BOXÉ products. Shop securely online.'
        }
    },

    {
        path: 'cart',
        component: CartComponent,
        data: {
            title: 'Your Cart | BOXÉ Official Store',
            description: 'Review your selected products, update quantities, and proceed to secure checkout.'
        }
    },

    {
        path: 'contact',
        component: ContactUsComponent,
        data: {
            title: 'Contact Us | BOXÉ Official Store',
            description: 'Contact BOXÉ for customer support, product inquiries, and assistance.'
        }
    },

    {
        path: 'boxe-blog',
        component: BoxeBlogComponent,
        data: {
            title: 'BOXÉ Blog | News, Trends & Insights',
            description: 'Discover the latest trends, news, and insights from BOXÉ.'
        }
    },

    {
        path: 'user-login',
        component: LoginUserComponent,
        data: {
            title: 'Login | BOXÉ Official Store',
            description: 'Login to your BOXÉ account to manage orders and shop premium products.'
        }
    },

    {
        path: 'signup-user',
        component: SignupUserComponent,
        data: {
            title: 'Create Account | BOXÉ Official Store',
            description: 'Create your BOXÉ account and start shopping premium products.'
        }
    },

    {
        path: 'buynow',
        component: BuynowComponent,
        data: {
            title: 'Secure Checkout | BOXÉ',
            description: 'Complete your purchase securely with BOXÉ’s trusted checkout.'
        }
    },

    {
        path: 'paysucess',
        component: SuccessPaymentComponent,
        data: {
            title: 'Payment Successful | BOXÉ',
            description: 'Your order has been successfully placed. Thank you for shopping with BOXÉ.'
        }
    },

    {
        path: 'payfail',
        component: FaliedPaymentComponent,
        data: {
            title: 'Payment Failed | BOXÉ',
            description: 'Your payment could not be processed. Please try again.'
        }
    },

    {
        path: 'intro',
        component: IntroductionComponent,
        data: {
            title: 'About BOXÉ | Official Store',
            description: 'Learn more about BOXÉ, our mission, and our premium product collections.'
        }
    },

    {
        path: 'show-cart',
        component: CartDisplayComponent,
        data: {
            title: 'Shopping Cart | BOXÉ',
            description: 'View and manage your selected products.'
        }
    },

    {
        path: 'show',
        component: ShowCaseOfMyProjectComponent,
        data: {
            title: 'Showcase | BOXÉ',
            description: 'Explore featured showcases and highlights.'
        }
    },


    // ADMIN

    {
        path: 'admin-login',
        component: LoginAdminComponent,
        data: {
            title: 'Admin Login | BOXÉ',
            description: 'Administrator login panel.'
        }
    },

    {
        path: 'admin',
        component: AdminSidebarComponent,
        data: {
            title: 'Admin Panel | BOXÉ',
            description: 'BOXÉ administrator panel.'
        }
    },

    {
        path: 'admindash',
        component: AdminDashboardComponent,
        data: {
            title: 'Admin Dashboard | BOXÉ',
            description: 'BOXÉ dashboard overview.'
        }
    },

    {
        path: 'products',
        component: ManageProductsComponent,
        data: {
            title: 'Manage Products | BOXÉ',
            description: 'Manage and update BOXÉ products.'
        }
    },

    {
        path: 'all-orders',
        component: AllOrdersComponent,
        data: {
            title: 'Manage Orders | BOXÉ',
            description: 'View and manage customer orders.'
        }
    },

    {
        path: 'addProduct',
        component: CreateproductComponent,
        data: {
            title: 'Add Product | BOXÉ',
            description: 'Add new product to BOXÉ store.'
        }
    }

];