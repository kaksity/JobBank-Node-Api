import Lga from 'App/Models/Lga'
export default class LgaService {
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<Lga | null>)}
   * @memberof LgaService
   */
  public async getLgaById(id: number): Promise<Lga | null> {
    return Lga.query().where('is_deleted', false).where('id', id).first()
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<Lga | null>)}
   * @memberof LgaService
   */
  public async getLgaByIdentifier(identifier: string): Promise<Lga | null> {
    return Lga.query().where('is_deleted', false).where('identifier', identifier).first()
  }
  /**
   * @description
   * @author Dauda Pona
   * @returns {*}  {Promise<Lga[]>}
   * @memberof LgaService
   */
  public async getLgas(): Promise<Lga[]> {
    return Lga.query().where('is_deleted', false)
  }
}
