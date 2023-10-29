import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { Compte } from 'src/app/shared/model/compte.model';
import { Role } from 'src/app/shared/model/role.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from 'src/app/shared/services/compte.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { NotificationUtil } from 'src/app/shared/util/util';
//import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { CreateOrUpdateRoleComponent } from '../create-or-update-role/create-or-update-role.component';

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListeRoleComponent implements OnInit{
  compte: Compte;
  username: string;
  email: string;
  agent: Agent;
  roles: Role[];
  utilisateur: string; // prenom et nom de l'utilisateur qui s'est connecté
  subject$: ReplaySubject<Role[]> = new ReplaySubject<Role[]>(1);
  data$: Observable<Role[]> = this.subject$.asObservable();
  pageSize = 5;
  dataSource: MatTableDataSource<Role> | null;
  selection = new SelectionModel<Compte>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    {
      name: "ID",
      property: "id",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Nom",
      property: "nomRole",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Description",
      property: "description",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRoles();
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username);
    this.dataSource = new MatTableDataSource();
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  logOut(){
    console.log('logout');
    this.authentificationService.logOut();
    this.router.navigateByUrl("/login");
  }
  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.compte = response.body;
      },err => {},
      () => {
        this.email = this.compte.agent.email;
        this.utilisateur = this.compte.agent.prenom + ' ' + this.compte.agent.nom;
      }
    )
  }
  getRoles() {
    this.roleService.getAll().subscribe(
      (response) => {
        this.roles = response.body;
        console.log("Response dossier congé :", response);
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {
        this.data$.pipe(filter((data) => !!data)).subscribe((roles) => {
          this.roles = roles;
          this.dataSource.data = roles;
        });
        this.subject$.next(this.roles);
      }
    );
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }

  ngOnDestroy() { }
  createRole() {
    this.dialog
      .open(CreateOrUpdateRoleComponent)
      .afterClosed()
      .subscribe((role: any) => {
        /**
         * Dossier congé is the updated role (if the user pressed Save - otherwise it's null)
         */ if (role) {
          /**
           * Here we are updating our local array.
           */
          this.roles.unshift(role);
          this.subject$.next(this.roles);
        }
      });
  }
  updateRole(role: Role) {
    this.dialog
      .open(CreateOrUpdateRoleComponent, {
        data: role,
      })
      .afterClosed()
      .subscribe((role) => {
        /**
         * Customer is the updated role (if the user pressed Save - otherwise it's null)
         */
        if (role) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.roles.findIndex(
            (existingRole) =>
              existingRole.id === role.id
          );
          this.roles[index] = role;
          this.subject$.next(this.roles);
        }
      });
  }
  deleteRole(role: Role) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.delete(role).subscribe((response) => {
          this.notificationService.success(NotificationUtil.suppression)
          this.roles.splice(
            this.roles.findIndex((existingRole) => existingRole.id === role.id), 1);
          this.subject$.next(this.roles);
        });
      } 
    })
  }
}