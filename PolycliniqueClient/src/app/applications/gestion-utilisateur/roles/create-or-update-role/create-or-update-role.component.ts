import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Privilege } from 'src/app/shared/model/privilege.model';
import { Ressource } from 'src/app/shared/model/ressource.model';
import { Role } from 'src/app/shared/model/role.model';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RessourceService } from 'src/app/shared/services/ressource.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { NotificationUtil } from 'src/app/shared/util/util';

@Component({
  selector: 'app-create-or-update-role',
  templateUrl: './create-or-update-role.component.html',
  styleUrls: ['./create-or-update-role.component.css']
})
export class CreateOrUpdateRoleComponent implements OnInit {
  static id = 100;
  role: Role = new Role();
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  ressources!: Array<Ressource>;
  permissions: string[] = new Array();
  allComplete: boolean = false;
  checkboxColor = 'primary';
  // using for update
  privileges: Array<Privilege> = new Array();
  privilegesChecked: string[] = new Array();
  nomRoleCtrl: FormControl;
  privilegeCtrl: FormControl;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateOrUpdateRoleComponent>,
    private roleService: RoleService,
    private ressourceService: RessourceService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService) { 
    
    this.nomRoleCtrl = new FormControl();
    this.privilegeCtrl = new FormControl();
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.role = this.defaults
      this.getAllRessourcesWithPrivilegeChecked();
    } else {
      this.defaults = {} as Role;
      this.getAllRessource()
    }
  }
  getAllRessource() {
    this.ressourceService.getAll()
      .subscribe(response => {
        this.ressources = response.body
        this.ressources.forEach(x => x.privileges.forEach(x => x.checked = false))
      })
  }

  save() {
    if (this.mode === 'create') {
      this.createRole();
    } else if (this.mode === 'update') {
      this.updateRole();
    }
  }

  createRole() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.createWithPrivileges(this.role, this.permissions).subscribe(
          response => {
            console.log('response create role :', response);
            this.notificationService.success(NotificationUtil.ajout)
            this.dialogRef.close(response.body);
          }
        )
      } 
    })
  }

  updateRole() {
    console.log('update', this.role);
    // role.name = this.defaults.name;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.updateWithPrivilege(this.role, this.permissions).subscribe(
          response => {
            console.log("Role updated: ", response)
            this.notificationService.success(NotificationUtil.modification)
            this.dialogRef.close(response.body);
          }
        )} 
    })
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  updateCheckbox() {
    this.ressources.forEach(x => x.privileges.filter(x => x.checked === true).map(x => x.nom));
    this.permissions = [];
    for (let r of this.ressources) {
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }
  setLine(ressource: Ressource, completed: boolean) {
    // this.allComplete = completed;
    ressource.privileges.forEach(t => t.checked = completed);
    this.ressources.forEach(x => x.privileges.filter(x => x.checked === true).map(x => x.nom));
    this.permissions = [];
    for (let r of this.ressources) {
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }
  setAll(completed: boolean) {
    for (let r of this.ressources) {
      r.checked = completed
      r.privileges.forEach(t => t.checked = completed);
      this.permissions.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
    }
  }

  getAllRessourcesWithPrivilegeChecked() {
    this.ressourceService.getAll().subscribe(data => {
        this.ressources = data.body
        this.ressources.forEach(x => x.privileges.forEach(x => x.checked = false))
        for (let r of this.ressources) {
          for (let p of r.privileges) {
            for (let puser of this.role.privileges)
              if (p.nom === puser.nom) {
                p.checked = true;
              }
          }
        }
        this.privilegesChecked = [];
        for (let r of this.ressources) {
          this.privilegesChecked.push(...r.privileges.filter(x => x.checked === true).map(x => x.nom));
        }
        console.log("ppppppp" +this.privilegesChecked);   
      })
  }
  fermerDialog() {
    this.dialogRef.close()
  }
}
