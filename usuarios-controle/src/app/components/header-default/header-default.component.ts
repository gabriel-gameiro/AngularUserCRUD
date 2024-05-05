import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-default',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-default.component.html',
  styleUrl: './header-default.component.css'
})
export class HeaderDefaultComponent {
}
