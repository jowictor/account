import { Column, Model, Table, DataType , ForeignKey, BelongsTo} from "sequelize-typescript";
import { Company } from "../company/company.model";
import { Person } from "../person/person.model";

@Table({tableName: 'account'})
export class Account extends Model<Account> {
    @Column
    transactionId: number;

    @Column
    date: Date;

    @Column({ type: DataType.DECIMAL })
    value: number;

    @Column
    card: string;

    @Column
    time: string;

    @Column
    ben_code: string;

    @Column
    personId: number;

    @Column
    companyId: number;
}
