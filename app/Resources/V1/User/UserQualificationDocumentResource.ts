import UserQualificationDocument from 'App/Models/UserQualificationDocument'
import EducationLevelResource from 'App/Resources/V1/General/EducationLevelResource'
import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'

export default class UserQualificationDocumentResource {
  public static async single(qualificationDocument: UserQualificationDocument) {
    const url = await Drive.getUrl(`${qualificationDocument.filePath}`)
    return {
      identifier: qualificationDocument.identifier,
      educationLevel: EducationLevelResource.single(qualificationDocument.educationLevel),
      url,
    }
  }
  public static collection(qualificationDocuments: UserQualificationDocument[]) {
    return Promise.all(
      qualificationDocuments.map(async (qualificationDocument) => {
        return await this.single(qualificationDocument)
      })
    )
  }
}
