import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

interface ProfileObjectInterface {
  /**
   * Profile Primary Key
   */
    id: number
    
    /**
     * Profile Public Identifier
     */
    identifier: string

    /**
     * Profile User Id
     */
  userId: number
  /**
   * Profile LGA
   */
  
  lgaId: number
  
  /**
   * Profile First Name
   */
  firstName: string
  /**
   * Profile Last Name
   */
  lastName: string
  /**
   * Profile Phone Number
   */
  phoneNumber: string
  /**
   * Profile Gender
   */
  gender: string
  /**
   * Profile Date of Birth
   */
  dob: DateTime
  
  /**
   * Profile Contact Address
   */
  contactAddress: string
  
  /**
   * Profile Employment Status
   */
  employmentStatus: string
  
  /**
   * Profile Additional Information
   */
  additionalInfo: string
  
  /**
   * Profile Avatar File Name
   */
  avatarFileName: string
  
  /**
   * Profile Avatar Url
   */
  avatarUrl: string
  
  /**
   * Profile Is Educated
   */
  isEducated: boolean
  
  /**
   * Profile Highest Education Level
   */
  highestEducationLevel: string
  
  /**
   * Profile Is Profile Completed
   */
  isProfileCompleted: boolean

  transaction: TransactionClientContract
}
export default ProfileObjectInterface
