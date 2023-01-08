import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'

export default class User extends GenericModel {
  @column()
  public emailAddress: string

  @column()
  public phoneNumber: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
