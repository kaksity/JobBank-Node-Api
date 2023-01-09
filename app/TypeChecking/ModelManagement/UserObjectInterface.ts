import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database"
import { DateTime } from "luxon"

interface UserObjectInterface {
  /**
   * User Internal Primary Key
   */
  id: string
  /**
   * User Email Address
   */
  emailAddress: string

  /**
   * User Password
   */
  password: string
  /**
   * User Last Login Date
   */
   lastLoginDate: DateTime
  /**
   * User Active Status
   */
  isActive: boolean
  /**
   * User Deleted Status
   */
  isDeleted: boolean

  transaction: TransactionClientContract | null
}

export default UserObjectInterface
