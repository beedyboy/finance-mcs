import { Optional } from "sequelize/types"

export type CreateAccountDTO = {
    id: number
  studentId: string
  hasOutstandingBalance: boolean  
}

export type UpdateIngredientDTO = Optional<CreateAccountDTO, 'studentId'>