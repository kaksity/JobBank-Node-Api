import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { cuid } from '@ioc:Adonis/Core/Helpers'
export default class GenericModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public identifier: string

  @column()
  public isDeleted: boolean
  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  private static generateIdentifier(genericModel: GenericModel) {
    genericModel.identifier = cuid()
  }
}
