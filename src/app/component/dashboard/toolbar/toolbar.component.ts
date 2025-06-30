import { Component, OnInit , Input, Inject} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../../../Services/Book/book.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { SearchService } from '../../../Services/search/search.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-toolbar',
  standalone:true,
  imports: [MatDividerModule,MatMenuModule,MatIconModule,MatToolbarModule,CommonModule,RouterLink,CommonModule,FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  @Input() showSearch: boolean = true;
  @Input() showProfile: boolean = true;
  @Input() showCart: boolean = true;
  searchText: string = '';
  isLoggedIn: boolean = false;
  userName: string = '';
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.isLoggedIn = true;
        this.userName = JSON.parse(user).fullName;
      } else if (token) {
        this.isLoggedIn = true;
        this.userName = 'User';
      }

      this.cartService.getCartCountObservable().subscribe(count => {
        this.cartCount = count;
      });
      this.cartService.updateCartCount();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToOrders() {
    this.router.navigate(['/my-orders']);
  }

  navigateToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  

onSearchChange(): void {
  this.searchService.setSearchQuery(this.searchText);
}
}