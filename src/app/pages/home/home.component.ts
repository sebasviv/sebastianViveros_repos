import { Component } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Component({
  selector: 'app-home',
  imports: [
    DashboardComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
