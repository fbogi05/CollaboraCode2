import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('content').alter({ alterType: true, alterNullable: false })
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('content').alter({ alterType: true, alterNullable: false })
    })
  }
}
