import type { HttpContext } from '@adonisjs/core/http'

import Project from '#models/project'
import { createProjectValidator, deleteProjectValidator } from '#validators/project'

export default class ProjectsController {
  async getProjects({ response }: HttpContext) {
    const projects = await Project.all()
    response.status(200).json(projects)
  }

  async createProject({ request, response }: HttpContext) {
    const data = request.all()
    try {
      await createProjectValidator.validate(data)
      const project = await Project.create(data)
      response.status(201).json(project)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async deleteProject({ request, response }: HttpContext) {
    const data = request.all()
    try {
      await deleteProjectValidator.validate(data)
      const project = await Project.findOrFail(data.id)
      await project.delete()
      response.status(200).json(project)
    } catch (error) {
      response.status(422).send(error)
    }
  }
}
