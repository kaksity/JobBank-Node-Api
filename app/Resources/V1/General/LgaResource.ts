import Lga from 'App/Models/Lga'

export default class LgaResource {
  public static single(lga: Lga) {
    return {
      identifier: lga.identifier,
      name: lga.name,
    }
  }
  public static collection(lgas: Lga[]) {
    return lgas.map((lga) => {
      return this.single(lga)
    })
  }
}
