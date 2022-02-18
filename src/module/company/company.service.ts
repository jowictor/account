import { ApiBase } from "../../utils/ApiBase";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
//
import { Company } from './company.model'
import { ICompany } from "../../interface/ICompany";

@Injectable()
export class CompanyService  {
	constructor(
        @InjectModel(Company)
        private companyModel: typeof Company
    ) {}


	public async createPerson(company: Company): Promise<ApiBase.ApiResponse> {
		try {
			const result = await this.companyModel.create(company);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	public async findOrCreateCompany(company: ICompany): Promise<ApiBase.ApiResponse> {
		try {
			const result = await this.companyModel.findOrCreate({
				where: { name: company.name },
				defaults: {
					name: company.name
				}
			});

			if (!result) return ApiBase.error(`Fail to find or create company <<${company.name}>>`, ApiBase.Status.FAILED);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	public async findCompany(companyName?: string, companyId?: number): Promise<ApiBase.ApiResponse> {
		try {

			const filter = (companyName) ? { name: companyName } : (companyId) ? { id: companyId } : null;
			if (!filter) return ApiBase.error(`Filter param is null`, ApiBase.Status.FAILED);

			const result = await this.companyModel.findOne({
				where: filter
			});

			if (!result) return ApiBase.error(`Fail to find company <<${companyName}>>`, ApiBase.Status.FAILED);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}
}
