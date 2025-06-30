import { UserService } from './../../Services/User/user.service';
import { Component,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../component/dashboard/toolbar/toolbar.component';
import { BookService } from '../../Services/Book/book.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { HttpService } from '../../Services/http/http.service';
import { WishlistService } from '../../Services/wishlist/wishlist.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-book',
  imports: [MatButtonModule,MatIconModule,CommonModule,FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  book: any;
  feedbacks: any[] = [];
  selectedRating = 0;
  feedbackText = '';
  isWishlisted = false;
  isInCart = false;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private http: HttpService,
    private router: Router,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.book = this.bookService.getBookById(bookId!);

    if (this.book) {
      this.getFeedback();
      this.checkWishlistStatus();
    }
  }

  getFeedback(): void {
    this.userService.getFeedback(this.book._id).subscribe({
      next: (res: any) => {
        this.feedbacks = res.result.map((fb: any) => ({
          userName: fb.user_id.fullName,
          comment: fb.comment,
          rating: fb.rating,
        }));
      },
      error: (err:any) => console.error('Failed to fetch feedback:', err),
    });
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  submitFeedback(): void {
    const payload = {
      rating: this.selectedRating,
      comment: this.feedbackText,
    };

    this.userService.postFeedback(this.book._id, payload).subscribe({
      next: () => {
        this.getFeedback();
        this.selectedRating = 0;
        this.feedbackText = '';
      },
      error: (err) => console.error('Failed to submit feedback:', err),
    });
  }

  addToWishlist(): void {
    this.bookService.postWish(this.book._id).subscribe({
      next: () => {
        this.isWishlisted = true;
      },
      error: (err:any) => console.error('Failed to add to wishlist:', err),
    });
  }

  checkWishlistStatus(): void {
    this.bookService.getWish().subscribe({
      next: (res: any) => {
        this.isWishlisted = res.result.some(
          (item: any) => item._id === this.book._id
        );
      },
      error: (err:any) => console.error('Failed to load wishlist status:', err),
    });
  }

  addToCart(): void {
    this.bookService.addCart(this.book._id).subscribe({
      next: () => {
        console.log('Added to cart successfully');
        this.isInCart = true;

        this.bookService.getCart().subscribe({
          next: (res: any) => {
            const cartItem = res.result.find(
              (item: any) => item.product_id._id === this.book._id
            );

            if (cartItem) {
              this.book.cartItemId = cartItem._id;
            }
          },
          error: (err:any) => console.error('Failed to fetch cart:', err),
        });
      },
      error: (err:any) => console.error('Failed to add to cart:', err),
    });
  }

  increment(): void {
    this.quantity += 1;

    if (this.isInCart && this.book.cartItemId) {
      this.bookService
        .updateCart(this.book.cartItemId, this.quantity)
        .subscribe({
          next: () => console.log('Cart quantity updated successfully'),
          error: (err) => console.error('Failed to update cart quantity:', err),
        });
    }
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;

      if (this.isInCart && this.book.cartItemId) {
        this.bookService
          .updateCart(this.book.cartItemId, this.quantity)
          .subscribe({
            next: () => console.log('Cart quantity updated successfully'),
            error: (err:any) =>
              console.error('Failed to update cart quantity:', err),
          });
      }
    }
  }
}