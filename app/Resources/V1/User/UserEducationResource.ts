import UserEducation from 'App/Models/UserEducation'
import EducationLevelResource from 'App/Resources/V1/General/EducationLevelResource'

export default class UserEducationResource {
  public static single(userEducation: UserEducation) {
    return {
      identifier: userEducation.identifier,
      educationLevel: EducationLevelResource.single(userEducation.educationLevel),
      school_name: userEducation.schoolName,
      course_name: userEducation.courseName,
      grade: userEducation.grade,
      start_date: userEducation.startDate,
      end_date: userEducation.endDate,
      is_completed: userEducation.startDate,
      additional_info: userEducation.additionalInfo,
    }
  }
  public static collection(userEducations: UserEducation[]) {
    return userEducations.map((userEducation) => {
      return this.single(userEducation)
    })
  }
}
