import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import Profile from 'App/Models/Profile'
export default class User extends GenericModel {
  @column()
  public emailAddress: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
