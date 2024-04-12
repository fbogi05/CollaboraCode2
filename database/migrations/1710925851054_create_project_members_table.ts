import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_members'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.integer('project_id').notNullable().unsigned().references('id').inTable('projects')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
    })

    this.schema.alterTable('projects', (table) => {
      table.integer('owner_id').notNullable().unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
