import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Compte } from 'src/app/shared/model/compte.model';
import { Role } from 'src/app/shared/model/role.model';
import { CompteService } from 'src/app/shared/services/compte.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { NotificationUtil } from 'src/app/shared/util/util';

@Component({
  selector: 'app-create-or-update-compte',
  templateUrl: './create-or-update-compte.component.html',
  styleUrls: ['./create-or-update-compte.component.css']
})
export class CreateOrUpdateCompteComponent implements OnInit {
  static id = 100;
  compte: Compte;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  inputType = 'password';
  visible = false;
  roles: Role[];
  rolesUser: Role[];
  agents: any;
  agent: {}
  // autocomplete select
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Compte,
    private dialogRef: MatDialogRef<CreateOrUpdateCompteComponent>,
    private fb: FormBuilder,
    private compteService: CompteService,
    private cd: ChangeDetectorRef,
    private roleService: RoleService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) { }
  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Compte;
    }
    this.getRoles()
    this.getAgentsWithoutCompte()
    console.log('defaults :', this.defaults);
    
    this.form = this.fb.group({
      username: [this.defaults.username || '', Validators.required],
      password: [this.defaults.password || '', Validators.required],
      roles: ['', Validators.required],
    });
}
filterStates(name: string) {
return this.agents.filter(agent =>
  agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
  agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
  agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
}

setAgent(agent){
this.agent = agent
}
togglePassword() {
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
save() {
if (this.mode === 'create') {
  this.createCompte();
} else if (this.mode === 'update') {
  this.updateCompte();
}
}
createCompte() {
let compte = this.form.value;
compte.agent = this.agent;
console.log('compte to save ', compte);
this.dialogConfirmationService.confirmationDialog().subscribe(action => {
  if (action === 'CONFIRMER') {
    this.compteService.create(compte).subscribe(
      response => {
        this.notificationService.success(NotificationUtil.ajout)
        console.log('response ', response);
        this.dialogRef.close(response.body);
      }, (error: HttpErrorResponse) => {
        console.log('error intercepted : ',error);
        if(error.status === 500){
          this.notificationService.warn(error.error.message);
        }
      }) 
    }
  })
}
updateCompte() {
  let compte: Compte = this.form.value;
  compte.id = this.defaults.id
  compte.agent = this.defaults.agent;
  compte.password = this.defaults.password;
  compte.enabled = this.defaults.enabled; 
  console.log('compte', compte);
  this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    if (action === 'CONFIRMER') {
      this.compteService.update(compte).subscribe(
        response => {
          this.notificationService.success(NotificationUtil.modification)
          console.log("response compte updated: ", response)
          this.dialogRef.close(compte);
        }
      )
    } 
  })
  
  }
  getRoles() {
  this.roleService.getAll().subscribe(
    (response) => {
      this.roles = response.body;
    }, error => {}
    ,() => {
      this.rolesUser = this.roles.filter((role) => this.defaults.roles.find((item)=>role.id == item.id))
      this.form.get('roles').setValue(this.rolesUser) 
    }
  );
  }
  
getAgentsWithoutCompte() {
this.compteService.getAgensWithoutCompte().subscribe(
  (response) => {
    this.agents = response.body;
  }, err => {
    console.log('error', err);
  }, () => {
    // used by autocomplete in role
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.agents.slice())
    );
  }
);
}
isCreateMode() {
return this.mode === 'create';
}
isUpdateMode() {
return this.mode === 'update';
}
}