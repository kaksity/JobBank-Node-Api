import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_educations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.bigInteger('user_id').index()
      table.bigInteger('education_level_id').index()
      table.string('school_name')
      table.string('course_name')
      table.string('grade')
      table.date('start_date')
      table.date('end_date').nullable()
      table.string('is_completed')
      table.string('additional_info')
      table.boolean('is_deleted').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
