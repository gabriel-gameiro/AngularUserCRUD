import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderDefaultComponent } from './components/header-default/header-default.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderDefaultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'usuarios-controle';
}
