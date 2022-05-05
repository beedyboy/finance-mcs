import { Optional } from 'sequelize'
import { Table, Model, Column, DataType,  BelongsTo, Length, ForeignKey } from 'sequelize-typescript';
import { Account } from './Account';
import { Status } from '../enums/Status';
import {Type} from "../enums/Type";

interface InvoiceAttributes {
  id: number
  amount: number 
  dueDate: string 
  reference: string 
  account: {
    studentId: string
  }
  accountId: number 
  type: Type 
  status: Status 
}

export interface InvoiceCreationAttributes extends Optional<InvoiceAttributes, 'id'> {}

export interface InvoiceOuput extends Required<InvoiceAttributes> { }
@Table
export class Invoice extends Model<InvoiceAttributes, InvoiceCreationAttributes> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER.UNSIGNED,
      })
      id!: number;

      @Length({ min: 8, max: 15 })
      @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
      })
      reference!: string; 
 
      @Column({
        allowNull: false,
        type: DataType.DOUBLE, 
      })
    amount!: number; 


    @Column({
      allowNull: false,
      type: DataType.STRING
    })
    dueDate!: string
    
    @Column({ type: DataType.STRING})
    type!: Type
  
    @Column({ type: DataType.STRING})
    status!: Status

    @ForeignKey(() => Account)
    @Column({
      allowNull: false, 
      type: DataType.INTEGER.UNSIGNED,
    })
    accountId!: number

    @BelongsTo(() => Account)
    account!: Account 
  
} 