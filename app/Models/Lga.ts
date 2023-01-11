import { HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models//GenericModel'
import Profile from 'App/Models/Profile'

export default class Lga extends GenericModel {
  @column()
  public name: string

  @hasMany(() => Profile)
  public profiles: HasMany<typeof Profile>
}
