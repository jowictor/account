import { ApiBase } from "../../utils/ApiBase";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
//
import { Account } from './account.model'
//
import { PersonService } from '../person/person.service';
import { Person } from '../person/person.model';
import { CompanyService } from "../company/company.service";
import { Company } from "../company/company.model";
import { TransactionService } from "../transaction/transaction.service";
import { Transaction } from "../transaction/transaction.model";
import { IAccount, IAccountData } from "../../interface/IAccount";
import { IPerson } from "../../interface/IPerson";
import { ICompany } from "../../interface/ICompany";

@Injectable()
export class AccountService {
	constructor(
		@InjectModel(Account)
		private accountModel: typeof Account
	) { }

	public async registerCnab(file: Express.Multer.File): Promise<ApiBase.ApiResponse> {
		try {
			if (!file) return ApiBase.error('Missing file param', ApiBase.Status.ERROR_NULL_PARAMETER);

			const fileString = file.buffer.toString();
			const accountList = fileString.split("\n");

			const accountDataList: IAccount[] = [];
			const personList: IPerson[] = [];
			const companyList: ICompany[] = [];

			const transactionService = new TransactionService(Transaction);
			await transactionService.registerTransaction();

			if (accountList && accountList.length > 0) {
				for (const accountItem of accountList) {
					if (!accountItem) break;

					// Transform Date
					const accountDateStr = accountItem.substring(1, 9);
					const transformDate = [];
					transformDate.push(accountDateStr.substring(0, 4)) // Year
					transformDate.push(accountDateStr.substring(4, 6)) // Month
					transformDate.push(accountDateStr.substring(6, 8)) // Day
					const accountDate = new Date(`${transformDate[0]}/${transformDate[1]}/${transformDate[2]}`)

					// Prepare account
					const accountValue = parseFloat(accountItem.substring(9, 19)) / 100;
					const account: IAccount = {
						transactionId: accountItem.substring(0, 1),
						date: accountDate,
						value: accountValue,
						ben_code: accountItem.substring(19, 30),
						card: accountItem.substring(30, 42),
						time: accountItem.substring(42, 48),
						person_name: accountItem.substring(48, 62),
						company_name: accountItem.substring(62, 81)
					}

					if (!personList.find(item => item.person_name === account.person_name)) {
						personList.push({
							person_name: account.person_name
						});
					}

					if (!companyList.find(item => item.name === account.company_name)) {
						companyList.push({ name: account.company_name });
					}

					accountDataList.push(account);
				}
			}

			if (personList && personList.length > 0) {
				const result = await this.registerPerson(personList);
				if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
			}

			if (companyList && companyList.length > 0) {
				const result = await this.registerCompany(companyList);
				if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
			}

			if (accountDataList && accountDataList.length > 0) {
				const result = await this.registerAccount(accountDataList);
				if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
			}

			const resultAccount = await this.accountModel.findAll({})
			if (resultAccount && resultAccount.length > 0) {
				const result = await this.totalize(resultAccount);
				if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
				return ApiBase.success(result.$data);
			}

			return ApiBase.success(true);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	private async registerAccount(accountDataList: IAccount[]): Promise<ApiBase.ApiResponse> {
		try {
			if (accountDataList.length <= 0) return ApiBase.error('Missing accountDataList param', ApiBase.Status.ERROR_NULL_PARAMETER);

			if (accountDataList && accountDataList.length > 0) {
				const personService = new PersonService(Person);
				const companyService = new CompanyService(Company);
				const transactionService = new TransactionService(Transaction);

				for (const accountItem of accountDataList) {
					let result = await personService.findPerson(accountItem.person_name);
					if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
					const personData = result.$data;

					result = await companyService.findCompany(accountItem.company_name);
					if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
					const companyData = result.$data

					result = await transactionService.findTransaction(parseInt(accountItem.transactionId));
					if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
					const transactionData = result.$data

					const accountToUpdate: IAccountData = {
						card: accountItem.card,
						companyId: companyData.id,
						date: accountItem.date,
						personId: personData.id,
						ben_code: accountItem.ben_code,
						time: accountItem.time,
						transactionId: transactionData.type,
						value: accountItem.value
					}

					const accountResult = await this.accountModel.create(accountToUpdate);
					if (!accountResult) return ApiBase.error(`Fail to create account`, ApiBase.Status.FAILED);
				}
			}
			return ApiBase.success(true);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	private async registerPerson(personList: IPerson[]): Promise<ApiBase.ApiResponse> {
		try {
			if (personList.length <= 0) return ApiBase.error('Missing personList param', ApiBase.Status.ERROR_NULL_PARAMETER);

			const personService = new PersonService(Person);
			if (personList && personList.length > 0) {
				for (const personItem of personList) {
					const result = await personService.findOrCreatePerson(personItem);
					if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
				}
			}
			return ApiBase.success(true);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	private async registerCompany(companyList: ICompany[]): Promise<ApiBase.ApiResponse> {
		try {
			if (companyList.length <= 0) return ApiBase.error('Missing companyList param', ApiBase.Status.ERROR_NULL_PARAMETER);

			const companyService = new CompanyService(Company);
			if (companyList && companyList.length > 0) {
				for (const companyItem of companyList) {
					const result = await companyService.findOrCreateCompany(companyItem);
					if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
				}
			}
			return ApiBase.success(true);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	private async totalize(resultAccount: Account[]): Promise<ApiBase.ApiResponse> {
		try {
			if (resultAccount.length <= 0) return ApiBase.error('Missing resultAccount param', ApiBase.Status.ERROR_NULL_PARAMETER);
			const companyIdList = resultAccount.map(item => item.companyId).filter((v, i, a) => a.indexOf(v) === i);
			const account: object[] = []

			if (companyIdList && companyIdList.length > 0) {
				for (const companyId of companyIdList) {
					const operationByCompany = resultAccount.filter(item => item.companyId === companyId);
					if (operationByCompany && operationByCompany.length > 0) {

						const companyService = new CompanyService(Company);
						let result = await companyService.findCompany(null, companyId);
						if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
						const companyData: ICompany = result.$data;

						const accountResult = {
							company: companyData.name,
							transaction: [],
							total: null
						}

						for (const operation of operationByCompany) {
							const operationValue: any = operation.value;
							operation.value = parseFloat(operationValue);

							const transactionService = new TransactionService(Transaction);
							result = await transactionService.findTransaction(operation.transactionId)
							if (result.$status !== ApiBase.Status.SUCCESS) return ApiBase.error(result.$data, result.$status)
							const transactionData = result.$data;

							accountResult.transaction.push({
								type: transactionData.name,
								date: operation.date,
								ben_code: operation.ben_code,
								card: operation.card,
								value: operation.value
							})
						}
						const accountTotal = operationByCompany.reduce((sum, item) => sum + item.value, 0);
						accountResult.total = accountTotal;
						account.push(accountResult);
					}
				}
			}

			return ApiBase.success(account);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}
}
