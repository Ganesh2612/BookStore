import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-book-card',
  imports: [MatCardModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
selectedSort = 'Sort by relevance';
sortOptions: string[] = [
  'Sort by relevance',
  'Price: Low to High',
  'Price: High to Low',
  'Newest First'
];

}
