import { Component } from '@angular/core';
import { ToolbarComponent } from '../../component/dashboard/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-profile',
  imports: [ToolbarComponent,MatCardModule,MatButtonModule,MatFormFieldModule,MatRadioModule,MatInputModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

}
