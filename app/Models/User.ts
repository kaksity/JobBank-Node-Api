import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasOne, HasOne, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import Profile from 'App/Models/Profile'
import Role from 'App/Models/Role'

export default class User extends GenericModel {
  @column()
  public roleId: number

  @column()
  public emailAddress: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
