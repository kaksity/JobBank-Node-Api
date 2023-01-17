import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'

export default class Role extends GenericModel {
  @column()
  public name: string

  @column()
  public slug: string
}
