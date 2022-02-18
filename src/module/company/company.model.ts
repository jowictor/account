import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'company'})
export class Company extends Model<Company> {
    @Column
    name: string;
}
