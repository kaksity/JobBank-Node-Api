import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import WorkExperience from 'App/Models/WorkExperience'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import WorkExperienceObjectInterface from 'App/TypeChecking/ModelManagement/WorkExperienceObjectInterface'

export default class WorkExperienceService {
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<WorkExperienceObjectInterface>} createWorkExperienceOptions
   * @returns {*}  {Promise<WorkExperience>}
   * @memberof WorkExperienceService
   */
  public async createWorkExperienceRecord(
    createWorkExperienceOptions: Partial<WorkExperienceObjectInterface>
  ): Promise<WorkExperience> {
    const workExperience = new WorkExperience()

    Object.assign(workExperience, createWorkExperienceOptions)

    if (createWorkExperienceOptions.transaction) {
      workExperience.useTransaction(createWorkExperienceOptions.transaction)
    }

    await workExperience.save()
    return workExperience
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<WorkExperience | null>)}
   * @memberof WorkExperienceService
   */
  public async getWorkExperienceById(id: number): Promise<WorkExperience | null> {
    const workExperience = await WorkExperience.query()
      .where('is_deleted', false)
      .where('id', id)
      .first()
    if (workExperience === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return workExperience
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<WorkExperience | null>)}
   * @memberof WorkExperienceService
   */
  public async getWorkExperienceByIdentifier(identifier: string): Promise<WorkExperience | null> {
    const workExperience = await WorkExperience.query()
      .where('is_deleted', false)
      .where('identifier', identifier)
      .first()
    if (workExperience === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return workExperience
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} userId
   * @returns {*}  {Promise<WorkExperience[]>}
   * @memberof WorkExperienceService
   */
  public async getWorkExperienceByUserId(userId: number): Promise<WorkExperience[]> {
    return WorkExperience.query().where('is_deleted', false).where('user_id', userId)
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {DeleteRecordPayloadOptions} deleteRecordPayloadOptions
   * @returns {*}  {Promise<void>}
   * @memberof WorkExperienceService
   */
  public async deleteWorkExperienceRecord(
    deleteRecordPayloadOptions: DeleteRecordPayloadOptions
  ): Promise<void> {
    const { identifierType = 'id', entityId, transaction } = deleteRecordPayloadOptions
    if (identifierType === 'identifier') {
      const recordByIdentifier = await this.getWorkExperienceByIdentifier(String(entityId))
      recordByIdentifier!.merge({
        isDeleted: true,
      })
      if (transaction) {
        recordByIdentifier!.useTransaction(transaction)
      }
      recordByIdentifier!.save()
    } else {
      const recordById = await this.getWorkExperienceById(Number(entityId))
      recordById!.merge({
        isDeleted: true,
      })
      if (transaction) {
        recordById!.useTransaction(transaction)
      }
      recordById!.save()
    }
  }
}
