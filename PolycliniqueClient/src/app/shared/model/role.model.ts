import { Privilege } from "./privilege.model";

export class Role {
	id: number;
	nomRole: string;
	description: string;
	privileges: Privilege[] = [];
	
	constructor() {	
	}

	// constructor(role) {
	// 	this.id = role.id;
	// 	this.nomRole = role.nomRole;
	// 	this.description = role.description;
	// }
}