import Database from '@ioc:Adonis/Lucid/Database'
import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages'
import User from 'App/Models/User'
import UserIdentifierOptionsType from 'App/TypeChecking/ModelManagement/UserIdentifierOptionsType'
import UserObjectInterface from 'App/TypeChecking/ModelManagement/UserObjectInterface'

export default class UserService {
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<User | null>)}
   * @memberof UserService
   */
  public async getUserById(id: number): Promise<User | null> {
    const user = User.query().where('id', id).first()
    if (user) {
      return user
    }
    return NULL_OBJECT
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<User | null>)}
   * @memberof UserService
   */
  public async getUserByIdentifier(identifier: string): Promise<User | null> {
    const user = User.query().where('identifier', identifier).first()
    if (user) {
      return user
    }
    return NULL_OBJECT
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} emailAddress
   * @returns {*}  {(Promise<User | null>)}
   * @memberof UserService
   */
  public async getUserByEmailAddress(emailAddress: string): Promise<User | null> {
    const user = User.query().where('email_address', emailAddress).first()
    if (user) {
      return user
    }
    return NULL_OBJECT
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} phoneNumber
   * @returns {*}  {(Promise<User | null>)}
   * @memberof UserService
   */
  public async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = User.query().where('phone_number', phoneNumber).first()
    if (user) {
      return user
    }
    return NULL_OBJECT
  }

  public async checkIfUserExist(
    userIdentifierOptionsType: UserIdentifierOptionsType
  ): Promise<User | null> {
    const { id, identifier, emailAddress, phoneNumber } = userIdentifierOptionsType
    if (id) {
      return this.getUserById(id)
    }
    if (identifier) {
      return this.getUserByIdentifier(identifier)
    }
    if (emailAddress) {
      return this.getUserByEmailAddress(emailAddress)
    }
    if (phoneNumber) {
      return this.getUserByPhoneNumber(phoneNumber)
    }
    return NULL_OBJECT
  }

  public async createUserRecord(userCreationOptions: Partial<UserObjectInterface>) {
    const user = new User()
    await Database.transaction(async (dbTransaction) => {
      Object.assign(user, userCreationOptions)
      user.useTransaction(dbTransaction)
      await user.save()
    })
    return user
  }
}
