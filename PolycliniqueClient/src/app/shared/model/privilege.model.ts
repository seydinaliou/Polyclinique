import { Ressource } from "./ressource.model";

export class Privilege {
	id: number;
    nom: string;
	description: string;
    checked: boolean = false;
	ressource: Ressource;
	constructor(privilege: {id: number; nom: string; description: string; ressource: Ressource }){
		this.id=privilege.id;
		this.nom = privilege.nom;
        this.description = privilege.description;
		this.ressource= privilege.ressource;
	}
}