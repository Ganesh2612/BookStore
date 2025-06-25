import { Component } from '@angular/core';

import { FooterComponent } from '../../component/dashboard/footer/footer.component';
import { ToolbarComponent } from '../../component/dashboard/toolbar/toolbar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [ToolbarComponent,FooterComponent],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {

}
