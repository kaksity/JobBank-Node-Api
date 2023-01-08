import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database"
import { DateTime } from "luxon"

interface UserObjectInterface {
  /**
   * User Internal Primary Key
   */
  id: string
  /**
   * User Public Identifier
   */
  identifier: string
  /**
   * User First Name
   */
  firstName: string
  /**
   * User Last Name
   */
  lastName: string
  /**
   * User Email Address
   */
  emailAddress: string
  /**
   * User Phone Number
   */
  phoneNumber: string
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
