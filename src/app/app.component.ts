import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : []
})
export class AppComponent {
  title = 'angular-concepts';
  constructor() {
    // customize default values of modals used by this component tree
  }
}
