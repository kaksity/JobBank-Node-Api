import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'work_experiences'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').notNullable().index()
      table.bigint('user_id').notNullable().index()
      table.string('organization').notNullable()
      table.string('job_title').notNullable()
      table.string('description').notNullable()
      table.string('is_current_work').notNullable()
      table.string('start_date').notNullable()
      table.string('end_date').nullable()
      table.text('additional_info').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
