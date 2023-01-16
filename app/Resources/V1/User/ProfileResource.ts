import Profile from 'App/Models/Profile'
import LgaResource from 'App/Resources/V1/General/LgaResource'

export default class ProfileResource {
  public static single(profile: Profile) {
    return {
      identifier: profile.identifier,
      first_name: profile.firstName ?? 'N/A',
      last_name: profile.lastName ?? 'N/A',
      phone_number: profile.phoneNumber,
      gender: profile.gender ?? 'N/A',
      dob: profile.dob ?? 'N/A',
      lga: profile.lga ? LgaResource.single(profile.lga) : 'N/A',
      contact_address: profile.contactAddress ?? 'N/A',
      employment_status: profile.employmentStatus ?? 'N/A',
      additional_info: profile.additionalInfo ?? 'N/A',
      avatar_file_name: profile.avatarFileName ?? 'N/A',
      avatar_url: profile.avatarUrl ?? 'N/A',
      is_educated: profile.isEducated ?? 'N/A',
      is_profile_completed: profile.isProfileCompleted ?? 'N/A',
    }
  }
  public static collection(profiles: Profile[]) {
    return profiles.map((profile) => this.single(profile))
  }
}
