import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
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
import { NotificationUtil } from 'src/app/shared/util/util';
import { CreateOrUpdateCompteComponent } from '../create-or-update-compte/create-or-update-compte.component';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListeCompteComponent implements OnInit, AfterViewInit, OnDestroy {
  selection = new SelectionModel<Compte>(true, []);
  dataSource = new MatTableDataSource();
  pageSize = 7;
  subject$: ReplaySubject<Compte[]> = new ReplaySubject<Compte[]>(1);
  data$: Observable<Compte[]> = this.subject$.asObservable();
  comptes: Compte[];
  compte: Compte;
  username: string;
  email: string;
  agent: Agent;
  utilisateur: string; // prenom et nom de l'utilisateur qui s'est connecté
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "Matricule", property: "matricule", visible: true, isModelProperty: true },
    {
      name: "Nom",
      property: "nom", // cette propriete se trouve dans l'objet agent
      visible: true,    // qui est un sous objet dans compte
      isModelProperty: true
    },
    {
      name: "Prenom",
      property: "prenom", // cette propriete se trouve dans l'objet agent
      visible: true,      // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Telephone",
      property: "telephone", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Adresse",
      property: "adresse", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Direction",
      property: "uniteOrganisationnelle", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Email",
      property: "email", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    { name: "Etat", property: "enabled", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private compteService: CompteService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getComptes();
    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.email = this.compte.agent.email;
      this.utilisateur = this.compte.agent.prenom + ' ' + this.compte.agent.nom;
    });
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((comptes) => {
      this.comptes = comptes;
      this.dataSource.data = comptes;
    });

  }

  logOut() {
    console.log('logout');
    this.authentificationService.logOut();
    this.router.navigateByUrl("/login");
  }
  getComptes() {
    this.compteService.getAll().subscribe(
      (response) => {
        this.comptes = response.body;
        console.log("Response compte :", response);
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {
        this.subject$.next(this.comptes);
      }
    );
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  onFilterChange(value: any) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }

  }

  ngOnDestroy() { }
  createCompte() {
    this.dialog
      .open(CreateOrUpdateCompteComponent)
      .afterClosed()
      .subscribe((compte: any) => {
        if (compte) {
          this.comptes.unshift(compte);
          this.subject$.next(this.comptes);
          this.getComptes();
        }
      });
  }

  updateCompte(compte: Compte) {
    this.dialog.open(CreateOrUpdateCompteComponent, {
      data: compte,
    }).afterClosed().subscribe((compte) => {
      if (compte) {
        const index = this.comptes.findIndex(
          (existingCompte) => existingCompte.id === compte.id
        );
        this.comptes[index] = compte;
        this.subject$.next(this.comptes);
        this.getComptes();
      }
    });
  }

  deleteCompte(compte: Compte) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.compteService.delete(compte).subscribe((response) => {
          console.log("Dossier congé deleted: ", response);
          this.notificationService.success(NotificationUtil.suppression)
          this.comptes.splice(
            this.comptes.findIndex(
              (existingCompte) => existingCompte.id === compte.id
            ),
            1
          );
          this.subject$.next(this.comptes);
        });
      }
    })
  }
  activeDesactiveCompte(compte?: Compte, active?: string) {
    if (compte == null) { // activation desactivation multiple
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === 'CONFIRMER') {
          if (active === 'activer') {
            this.selection.selected.forEach(compteChecked => {
              compteChecked.enabled = true
            })
            // console.log('selection(s) to enable => ', this.selection.selected);
          }
          else {
            this.selection.selected.forEach(compteChecked => {
              compteChecked.enabled = false
            })
            // console.log('selection(s) to disable=> ', this.selection.selected);
          }
          this.compteService.updateMany(this.selection.selected).subscribe(
            response => {
              console.log("response compte actived or desactived: ", response)
              if (active === 'activer') {
                this.notificationService.successlight('Comptes Actives avec succès')
              } else {
                this.notificationService.successlight('Comptes Desactives avec succès')
              }
            })
        }
      })

    } else { // activation desactivation suivant la ligne
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === 'CONFIRMER') {
          compte.enabled = !compte.enabled
          this.compteService.update(compte).subscribe(
            response => {
              console.log("response compte actived or desactived: ", response)
              if (compte.enabled) {
                this.notificationService.successlight('Compte Active avec succès')
              } else {
                this.notificationService.successlight('Compte Desactive avec succès')
              }
            })
        }
      })
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select());
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Compte): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  retour() {
    this.router.navigateByUrl("/index");
  }
}
