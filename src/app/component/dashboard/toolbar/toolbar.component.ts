import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { FooterComponent } from '../footer/footer.component';
import { BookService } from '../../../Services/Book/book.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  standalone:true,
  imports: [MatDividerModule,MatMenuModule,MatIconModule,MatToolbarModule,CommonModule,RouterLink,CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{
  isLoggedIn = false;
  userName = 'User';

  books: any[] = [];

  constructor(private bookService: BookService, public router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.userName = userInfo.fullName || 'User';

    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.books = res.result || [];
      },
      error: (err:any) => console.error('Error fetching books:', err),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
