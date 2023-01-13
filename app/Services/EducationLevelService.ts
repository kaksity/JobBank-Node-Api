import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import EducationLevel from 'App/Models/EducationLevel'

export default class EducationLevelService {
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<EducationLevel | null>)}
   * @memberof EducationLevelService
   */
  public async getEducationLevelById(id: number): Promise<EducationLevel | null> {
    const educationLevel = await EducationLevel.query()
      .where('is_deleted', false)
      .where('id', id)
      .first()

    if (educationLevel === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return educationLevel
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<EducationLevel | null>)}
   * @memberof EducationLevelService
   */
  public async getEducationLevelByIdentifier(identifier: string): Promise<EducationLevel | null> {
    const educationLevel = await EducationLevel.query()
      .where('is_deleted', false)
      .where('identifier', identifier)
      .first()

    if (educationLevel === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return educationLevel
  }
  /**
   * @description
   * @author Dauda Pona
   * @returns {*}  {Promise<EducationLevel[]>}
   * @memberof EducationLevelService
   */
  public async getEducationLevels(): Promise<EducationLevel[]> {
    return await EducationLevel.query().where('is_deleted', false).orderBy('name', 'asc')
  }
}
