import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from 'src/app/shared/services/compte.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  inputType = 'password';
  visible = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authentificationService: AuthenticationService,
    private route: ActivatedRoute,
    private notificationservice: NotificationService,
    private compteService: CompteService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authentificationService.login(this.form.value)
      .subscribe(resp => {
        let jwt = resp.headers.get('Authorization')
        this.authentificationService.saveToken(jwt);
        // On accède à la page souhaitée
        this.router.navigateByUrl('/applications');
        // On récupère l'url de redirection
        // const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '';
        // this.router.navigate([redirectUrl]);
        // console.log("dddddddd" +redirectUrl);
      }, error => {
        console.log(error)
        this.notificationservice.login('Verifiez vos identifiants !!! ')
      }, () => {
       
      })
  }


  // Is used to submit form by clicked enter touch
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
