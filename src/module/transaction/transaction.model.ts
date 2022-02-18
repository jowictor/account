import { Column, Model, Table } from "sequelize-typescript";

 @Table({tableName: 'transaction'})
export class Transaction extends Model<Transaction> {
    @Column({ 
        unique: true,
    })
    type: number;

    @Column
    name: string;

    @Column
    nature: string;
} 
