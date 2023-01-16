import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import UserEducation from 'App/Models/UserEducation'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import UserEducationObjectInterface from 'App/TypeChecking/ModelManagement/UserEducationObjectInterface'

export default class UserEducationService {
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<UserEducationObjectInterface>} createUserEducationPayload
   * @returns {*}  {Promise<UserEducation>}
   * @memberof UserEducationService
   */
  public async createUserEducationServiceRecord(
    createUserEducationPayload: Partial<UserEducationObjectInterface>
  ): Promise<UserEducation> {
    const userEducation = new UserEducation()

    Object.assign(userEducation, createUserEducationPayload)

    await userEducation.save()

    return userEducation
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<UserEducation | null>)}
   * @memberof UserEducationService
   */
  public async getUserEducationById(id: number): Promise<UserEducation | null> {
    const userEducation = await UserEducation.query()
      .where('is_deleted', false)
      .where('id', id)
      .preload('educationLevel')
      .first()
    if (userEducation === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return userEducation
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<UserEducation | null>)}
   * @memberof UserEducationService
   */
  public async getUserEducationByIdentifier(identifier: string): Promise<UserEducation | null> {
    const userEducation = await UserEducation.query()
      .where('is_deleted', false)
      .where('identifier', identifier)
      .preload('educationLevel')
      .first()
    if (userEducation === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return userEducation
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} userId
   * @returns {*}  {Promise<UserEducation[]>}
   * @memberof UserEducationService
   */
  public async getUserEducationByUserId(userId: number): Promise<UserEducation[]> {
    return await UserEducation.query()
      .where('is_deleted', false)
      .where('user_id', userId)
      .preload('educationLevel')
      .orderBy('created_at', 'asc')
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} userIdentifier
   * @returns {*}  {Promise<UserEducation[]>}
   * @memberof UserEducationService
   */
  public async getUserEducationByUserIdentifier(userIdentifier: string): Promise<UserEducation[]> {
    return await UserEducation.query()
      .whereHas('user', (userQuery) => {
        userQuery.where('identifier', userIdentifier).where('is_deleted', false)
      })
      .where('is_deleted', false)
      .preload('educationLevel')
      .orderBy('created_at', 'asc')
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {DeleteRecordPayloadOptions} userEducationDeletePayloadOptions
   * @returns {*}  {Promise<void>}
   * @memberof UserEducationService
   */
  public async deleteUserEducationRecord(
    userEducationDeletePayloadOptions: DeleteRecordPayloadOptions
  ): Promise<void> {
    const {
      identifierType = 'identifier',
      entityId,
      transaction,
    } = userEducationDeletePayloadOptions

    if (identifierType === 'identifier') {
      const recordByIdentifier = await this.getUserEducationByIdentifier(String(entityId))
      recordByIdentifier?.merge({
        isDeleted: true,
      })
      if (transaction) {
        recordByIdentifier?.useTransaction(transaction)
      }
      await recordByIdentifier?.save()
    } else {
      const recordById = await this.getUserEducationById(Number(entityId))
      recordById?.merge({
        isDeleted: true,
      })
      if (transaction) {
        recordById?.useTransaction(transaction)
      }
      await recordById?.save()
    }
  }
}
