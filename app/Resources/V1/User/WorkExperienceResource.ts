import WorkExperience from 'App/Models/WorkExperience'

export default class WorkExperienceResource {
  public static single(workExperience: WorkExperience) {
    return {
      identifier: workExperience.identifier,
      organization: workExperience.organization,
      job_title: workExperience.jobTitle,
      job_description: workExperience.description,
      is_current_work: workExperience.isCurrentWork,
      start_date: workExperience.startDate,
      end_date: workExperience.endDate,
      additional_info: workExperience.additionalInfo,
    }
  }
  public static collection(workExperiences: WorkExperience[]) {
    return workExperiences.map((workExperience) => {
      return this.single(workExperience)
    })
  }
}
