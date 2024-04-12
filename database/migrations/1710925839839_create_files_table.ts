import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('file_name').notNullable()
      table.string('content').notNullable()
      table.integer('project_id').notNullable().unsigned().references('id').inTable('projects')
      table.string('last_edited_user').nullable()
      table.dateTime('last_edited_time').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
