import { Optional } from "sequelize/types"
import { Status } from "../../db/enums/Status"
import { Type } from "../../db/enums/Type"

export type CreateInvoiceDTO = {
    id: number
    amount: number 
    dueDate: string 
    type: Type 
    reference: string  
    accountId: number
    status: Status
    account: {
      studentId: string
    }
}

// export type UpdateIngredientDTO = Optional<CreateInvoiceDTO, 'id'>