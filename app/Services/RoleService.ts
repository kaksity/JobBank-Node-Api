import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import Role from 'App/Models/Role'

export default class RoleService {
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<Role | null>)}
   * @memberof RoleService
   */
  public async getRoleById(id: number): Promise<Role | null> {
    const role = await Role.query().where('is_deleted', false).where('id', id).first()
    if (role === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return role
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<Role | null>)}
   * @memberof RoleService
   */
  public async getRoleByIdentifier(identifier: string): Promise<Role | null> {
    const role = await Role.query()
      .where('is_deleted', false)
      .where('identifier', identifier)
      .first()
    if (role === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return role
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} slug
   * @returns {*}  {(Promise<Role | null>)}
   * @memberof RoleService
   */
  public async getRoleBySlug(slug: string): Promise<Role | null> {
    const role = await Role.query().where('is_deleted', false).where('slug', slug).first()
    if (role === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return role
  }
  /**
   * @description
   * @author Dauda Pona
   * @returns {*}  {(Promise<Role | null>)}
   * @memberof RoleService
   */
  public async getRoleSystemUser(): Promise<Role | null> {
    return await this.getRoleBySlug('user')
  }
  /**
   * @description
   * @author Dauda Pona
   * @returns {*}  {(Promise<Role | null>)}
   * @memberof RoleService
   */
  public async getRoleSystemAdministrator(): Promise<Role | null> {
    return await this.getRoleBySlug('admin')
  }
}
