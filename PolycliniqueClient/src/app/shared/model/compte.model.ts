
import { Agent } from "./agent.model";
import { Role } from "./role.model";

export class Compte {
	id: number;
	username: string;
	password!: string;
	enabled: boolean
	roles: Role[];
	agent: Agent;

	constructor(compte){
		this.id = compte.id;
		this.username = compte.username;
		this.enabled = compte.enabled;
		this.roles = compte.roles;
		this.agent = compte.agent;
    }
	
}