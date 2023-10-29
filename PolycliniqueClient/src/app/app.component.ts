import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ipms';
  constructor(private router:Router) {}

  openNewWindow() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/gestion-utilisateur/comptes/liste-compte.component.html'])
    );
    window.open(url, '_blank');
  }
}
