import { Privilege } from "./privilege.model";

export class Ressource {
    id: number;
	nomRessource: string;
	privileges!: Privilege[];
	checked!: boolean;
	constructor(ressource: { id: number; nomRessource: string }){
		this.id = ressource.id;
		this.nomRessource= ressource.nomRessource;
	}
}