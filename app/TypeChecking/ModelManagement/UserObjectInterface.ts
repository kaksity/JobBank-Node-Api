import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

interface UserObjectInterface {
  /**
   * User Internal Primary Key
   */
  id: number
  /**
   * User Email Address
   */
  emailAddress: string
  /**
   * User Role Id
   */
  roleId: number
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
