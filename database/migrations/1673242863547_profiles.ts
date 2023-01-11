import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier').index()
      table.bigint('user_id').notNullable()
      table.bigint('lga_id').nullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone_number').notNullable()
      table.string('gender').nullable()
      table.date('dob').nullable()
      table.string('contact_address').nullable()
      table.string('employment_status').nullable()
      table.string('additional_info').nullable()
      table.string('avatar_file_name').nullable()
      table.string('avatar_url').nullable()
      table.boolean('is_educated').nullable()
      table.string('highest_education_level').nullable()
      table.boolean('is_profile_completed').nullable()

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
