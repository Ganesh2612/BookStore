import { Component } from '@angular/core';
import { ToolbarComponent } from '../../component/dashboard/toolbar/toolbar.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [ToolbarComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

   constructor(private router: Router) {}

onLogin(){
   this.router.navigate(['/login']);
}
}
