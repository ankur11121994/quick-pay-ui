import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  dynamicContent: string= 'Ankur Angular';
  protected readonly title = signal('angular-starter');
}
