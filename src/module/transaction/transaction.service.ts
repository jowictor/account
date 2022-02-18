import { ApiBase } from "../../utils/ApiBase";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
//
import { Transaction } from './transaction.model'

interface ITransaction {
	type: number;
	name: string;
	nature: string;
}

@Injectable()
export class TransactionService {
	constructor(
		@InjectModel(Transaction)
		private transactionModel: typeof Transaction
	) { }

	public async registerTransaction(): Promise<ApiBase.ApiResponse> {
		try {
			const transactionList: ITransaction[] = [
				{ type: 1, name: 'Débito', nature: 'Entrada' },
				{ type: 2, name: 'Boleto', nature: 'Saída' },
				{ type: 3, name: 'Financiamento', nature: 'Saída' },
				{ type: 4, name: 'Crédito', nature: 'Entrada' },
				{ type: 5, name: 'Recebimento Empréstimo', nature: 'Entrada' },
				{ type: 6, name: 'Vendas', nature: 'Entrada' },
				{ type: 7, name: 'Recebimento TED', nature: 'Entrada' },
				{ type: 8, name: 'Recebimento DOC', nature: 'Entrada' },
				{ type: 9, name: 'Aluguel', nature: 'Saída' }
			]

			for (const transaction of transactionList) {
				const result = await this.transactionModel.findOrCreate({
					where: { type: transaction.type },
					defaults: {
						type: transaction.type,
						name: transaction.name,
						nature: transaction.nature
					}
				});
			}

			return ApiBase.success(true);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}


	public async findTransaction(transactionType: number): Promise<ApiBase.ApiResponse> {
		try {
			const result = await this.transactionModel.findOne({
				where: { type: transactionType }
			});

			if (!result) return ApiBase.error(`Fail to find transaction type <<${transactionType}>>`, ApiBase.Status.FAILED);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}
}
