import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeDelete, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare isModerator: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Project, {
    foreignKey: 'ownerId',
  })
  declare projects: HasMany<typeof Project>

  @manyToMany(() => Project, {
    pivotTable: 'project_members',
  })
  declare projectMembers: ManyToMany<typeof Project>

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeDelete()
  static async deleteUser(user: User) {
    await user.related('projectMembers').detach()
    const projects = await user.related('projects').query().exec()

    for (const project of projects) {
      await project.related('members').detach()
      project.delete()
    }
  }
}
