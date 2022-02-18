export interface IAccount {
	transactionId: string;
	date: Date;
	company_name: string;
	ben_code: string;
	person_name: string;
	value: number;
	card: string;
	time: string;
}

export interface IAccountData {
	transactionId: number;
	date: Date;
	value: number;
	card: string;
	ben_code: string;
	time: string;
	personId: number;
	companyId: number;
}