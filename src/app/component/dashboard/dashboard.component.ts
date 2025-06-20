import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BookCardComponent } from './book-card/book-card.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ToolbarComponent,BookCardComponent,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
