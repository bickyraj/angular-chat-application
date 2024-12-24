import { Component } from '@angular/core';
import {MessageComponent} from './message/message.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    MessageComponent,
    FormsModule,
    MaterialModule,
    MatIcon,
  ],

  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-application';
  opened = false;
}
