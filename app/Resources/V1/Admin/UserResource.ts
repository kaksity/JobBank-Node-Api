import User from 'App/Models/User'

export default class UserResource {
  public static single(user: User) {
    return {
      identifier: user.identifier,
      email_address: user.emailAddress,
    }
  }
  public static collection(users: User[]) {
    return users.map((user) => {
      return this.single(user)
    })
  }
}
