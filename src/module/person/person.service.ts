import { ApiBase } from "../../utils/ApiBase";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
//
import { Person } from './person.model'
import { IPerson } from "../../interface/IPerson";

@Injectable()
export class PersonService {
	constructor(
		@InjectModel(Person)
		private personModel: typeof Person
	) { }

	public async createPerson(person: Person): Promise<ApiBase.ApiResponse> {
		try {
			const result = await this.personModel.create(person);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	public async findOrCreatePerson(person: IPerson): Promise<ApiBase.ApiResponse> {
		try {
			const result = await this.personModel.findOrCreate({
				where: { name: person.person_name },
				defaults: {
					name: person.person_name
				}
			});

			if (!result) return ApiBase.error(`Fail to find or create person <<${person.person_name}>>`, ApiBase.Status.FAILED);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}

	public async findPerson(personName?: string, personId?: number): Promise<ApiBase.ApiResponse> {
		try {
			const filter = (personName) ? { name: personName } : (personId) ? { id: personId } : null;
			if (!filter) return ApiBase.error(`Filter param is null`, ApiBase.Status.FAILED);

			const result = await this.personModel.findOne({
				where: filter
			});

			if (!result) return ApiBase.error(`Fail to find person <<${filter}>>`, ApiBase.Status.FAILED);

			return ApiBase.success(result);
		} catch (ex) {
			throw ApiBase.exception(ex);
		}
	}
}
