import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, HasMany, Default } from 'sequelize-typescript';
import { Invoice } from './Invoice';

interface AccountAttributes {
  id: number
  studentId: string
  hasOutstandingBalance: boolean  
}

export interface AccountInput extends Optional<AccountAttributes, 'id'> {}
export interface AccountOuput extends Required<AccountAttributes> { }
@Table
export class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER.UNSIGNED,
      })
      id!: number;

      @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
      })
    studentId!: string; 
 
    @HasMany(() => Invoice)
    invoiceList!: Invoice[]
    
    @Default(false)
    @Column({ 
      type: DataType.BOOLEAN
    })
    hasOutstandingBalance!: boolean; 
 
   


} 