import { Column, Model, Table, PrimaryKey } from "sequelize-typescript";

 @Table({tableName: 'transaction'})
export class Transaction extends Model<Transaction> {
    @Column({ 
        unique: true,
    })
    //@PrimaryKey
    type: number;

    @Column
    name: string;

    @Column
    nature: string;
} 
