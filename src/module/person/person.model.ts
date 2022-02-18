import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'person'})
export class Person extends Model<Person> {
    @Column
    name: string;
}
