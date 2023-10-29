
export class Agent{
	id!: number;
	matricule!: string;
	nom!: string;
	prenom!: string;
	dateNaissance!: Date;
	lieuNaissance!: String;
	adresse!: String;
	matrimoniale!: string;
	photo!: string;
	sexe!: string;
	email!: string;
	telephone!: string;
	dateEngagement!: Date;
	datePriseService!: Date;
	estChef!: boolean;
	//uniteOrganisationnelle: UniteOrganisationnelle;
	//fonction: Fonction

	constructor(agent: { id: number; matricule: string; nom: string; prenom: string; dateNaissance: Date;lieuNaissance: string;adresse: string;  matrimoniale: string; photo: string; sexe: string; mail: string; telephone: string; dateEngagement: Date; datePriseService: Date; estChef: boolean}) {
		if (agent != null) {
			this.id = agent.id;
			this.matricule = agent.matricule
			this.nom = agent.nom
			this.prenom = agent.prenom
			this.dateNaissance = agent.dateNaissance;
            this.lieuNaissance = agent.lieuNaissance;
            this.adresse = agent.adresse;
			this.matrimoniale = agent.matrimoniale;
			this.photo = agent.photo;
			this.sexe = agent.sexe;
			this.email = agent.mail;
			this.telephone = agent.telephone;
			this.dateEngagement = agent.dateEngagement
			this.datePriseService = agent.datePriseService;
			this.estChef = agent.estChef;
		
			// this.uniteOrganisationnelle = agent.uniteOrganisationelle;
			// this.fonction = agent.fonction
		}
	}
}