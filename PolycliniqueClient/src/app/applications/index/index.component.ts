import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentification.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router,
    private authentificationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  gestionUtilisateur() {
    
      this.router.navigateByUrl('/gestion-utilisateur');
   
    // windowObjectReference = window.open(url, 'gestionUtilisalisateur');
  }
  logOut(){
    console.log('logout');
    this.authentificationService.logOut();
    this.router.navigateByUrl("/login");
  }
  gestionDossierPatient() {
    var windowObjectReference;
    var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['../gestion-dossiers/dossiers/liste-dossier'])
    );
    //window.open(url, '_blank');
    windowObjectReference = window.open(url, 'gestionDossier', strWindowFeatures);
  }

  

  
}
