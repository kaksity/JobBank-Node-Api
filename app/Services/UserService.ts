import Database from '@ioc:Adonis/Lucid/Database'
import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
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
    const user = User.query().where('id', id).preload('profile').first()
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
    const user = User.query().where('identifier', identifier).preload('profile').first()
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
    const user = User.query().where('email_address', emailAddress).preload('profile').first()
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
    const user = User.query().where('phone_number', phoneNumber).preload('profile').first()
    if (user) {
      return user
    }
    return NULL_OBJECT
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {UserIdentifierOptionsType} userIdentifierOptionsType
   * @returns {*}  {(Promise<User | null>)}
   * @memberof UserService
   */
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
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<UserObjectInterface>} userCreationOptions
   * @returns {*}  {Promise<User>}
   * @memberof UserService
   */
  public async createUserRecord(userCreationOptions: Partial<UserObjectInterface>): Promise<User> {
    const user = new User()

    Object.assign(user, userCreationOptions)

    if (userCreationOptions.transaction) {
      user.useTransaction(userCreationOptions.transaction)
      await user.save()
    }
    return user
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} [page=1]
   * @param {number} [limit=100]
   * @returns {*}  {Promise<{ data: User[], meta: any}>}
   * @memberof UserService
   */
  public async getUsers(
    page: number = 1,
    limit: number = 100
  ): Promise<{ data: User[]; meta: any }> {
    const result = await User.query()
      .preload('profile')
      .where('is_deleted', false)
      .orderBy('email_address', 'asc')
      .paginate(page, limit)

    return { data: result.all(), meta: result.getMeta() }
  }
}
