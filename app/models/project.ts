import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeDelete,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import User from './user.js'
import File from './file.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare ownerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => File)
  declare files: HasMany<typeof File>

  @manyToMany(() => User, {
    pivotTable: 'project_members',
  })
  declare members: ManyToMany<typeof User>

  @afterCreate()
  static async createMemberTable(project: Project) {
    project.related('members').attach([project.ownerId])
  }

  @beforeDelete()
  static async deleteProject(project: Project) {
    project.related('files').query().delete().exec()
    project.related('members').detach()
  }
}
