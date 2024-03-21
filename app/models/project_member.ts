import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProjectMember extends BaseModel {
  @column()
  declare projectId: number

  @column()
  declare userId: number
}
