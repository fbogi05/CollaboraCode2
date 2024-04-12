import type { HttpContext } from '@adonisjs/core/http'

import Project from '#models/project'
import {
  createProjectValidator,
  deleteProjectValidator,
  getProjectInfoValidator,
  getUserProjectsValidator,
  modifyProjectValidator,
} from '#validators/project'
import User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Authenticators } from '@adonisjs/auth/types'
import {
  addMemberValidator,
  getMembersValidator,
  removeMemberValidator,
} from '#validators/project_member'

export default class ProjectsController {
  async getProjectInfo({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)

    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt lekéréséhez!')
    }

    const data = request.all()

    try {
      await getProjectInfoValidator.validate(data)

      let queryResult

      if (data['id']) {
        queryResult = await Project.query()
          .where('projects.id', data['id'])
          .preload('owner', (query) =>
            query.select('id', 'first_name', 'last_name', 'email', 'is_moderator')
          )
          .select('id', 'name', 'ownerId')
      } else if (data['name']) {
        queryResult = await Project.query()
          .where('projects.name', data['name'])
          .preload('owner', (query) =>
            query.select('id', 'first_name', 'last_name', 'email', 'is_moderator')
          )
          .select('id', 'name', 'ownerId')
      } else {
        throw new Error('Nincs megadva az id vagy a név!')
      }

      const project = queryResult.map((item) => {
        const { ownerId, ...rest } = item.toJSON()
        return rest
      })

      response.status(200).json(project)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async getUserProjects({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projektek lekéréséhez!')
    }

    const data = request.all()

    try {
      await getUserProjectsValidator.validate(data)

      const user = await User.query().where('email', data['user_email']).firstOrFail()

      const queryResult = await Project.query()
        .select('id', 'name', 'ownerId')
        .where('ownerId', user.id)
        .preload('owner', (query) =>
          query.select('id', 'first_name', 'last_name', 'email', 'is_moderator')
        )

      const projects = queryResult.map((item) => {
        const { ownerId, ...rest } = item.toJSON()
        return rest
      })

      response.status(200).json(projects)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async createProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt létrehozásához!')
    }

    const name = request.input('name')
    const data = { name, owner_id: authResult.user.id }

    try {
      await createProjectValidator.validate(data)

      const project = await Project.create(data)

      response.status(201).json(project)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async modifyProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt módosításához!')
    }

    const data = request.all()

    try {
      await modifyProjectValidator.validate(data)

      const project = await Project.findOrFail(data.id)

      if (project.ownerId !== authResult.user.id) {
        return response.status(401).send('Nincsen jogosultsága a projekt módosításához!')
      }

      await project.merge(data).save()

      response.status(201).json(project)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async deleteProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt törléséhez!')
    }

    const data = request.all()
    try {
      await deleteProjectValidator.validate(data)

      const project = await Project.findOrFail(data.id)

      if (project.ownerId !== authResult.user.id) {
        return response.status(401).send('Nincsen jogosultsága a projekt törléséhez!')
      }

      await project.delete()

      response.status(200).json(project)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async getMembers({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a szerkesztő hozzáadásához!')
    }

    const data = request.all()

    try {
      await getMembersValidator.validate(data)

      const project = await Project.findOrFail(data.project_id)

      if (
        project.ownerId !== authResult.user.id &&
        !(await project.related('members').query().where('user_id', authResult.user.id).first())
      ) {
        return response
          .status(401)
          .send('Nem tagja a projektnek, amiből a szerkesztőket szeretné lekérni!')
      }

      const members = await project
        .related('members')
        .query()
        .select('id', 'firstName', 'lastName', 'email', 'isModerator')
        .where('user_id', '!=', project.ownerId)

      response.status(201).json(members)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async addMember({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a szerkesztő hozzáadásához!')
    }

    const data = request.all()

    try {
      await addMemberValidator.validate(data)

      const project = await Project.findOrFail(data.project_id)

      const user = await User.query().where('email', data.user_email).first()

      if (!user) {
        return response.status(401).send('A megadott email címmel nem található felhasználó!')
      }

      if (
        project.ownerId !== authResult.user.id &&
        !(await project.related('members').query().where('user_id', authResult.user.id).first())
      ) {
        return response
          .status(401)
          .send('Nem tagja a projektnek, amihez a szerkesztőt szeretné hozzáadni!')
      }

      if (project.ownerId === user.id) {
        return response.status(401).send('A tulajdonos még egyszer nem adható hozzá!')
      } else if (await project.related('members').query().where('user_id', user.id).first()) {
        return response.status(401).send('A szerkesztő már hozzá lett adva!')
      }

      await project.related('members').attach([user.id])

      const addedMember = await project
        .related('members')
        .query()
        .where('user_id', user.id)
        .select('id', 'firstName', 'lastName', 'email', 'isModerator')
        .first()

      response.status(201).json(addedMember)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async removeMember({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a szerkesztő eltávolításához!')
    }

    const data = request.all()

    try {
      await removeMemberValidator.validate(data)

      const project = await Project.findOrFail(data.project_id)

      const user = await User.query().where('email', data.user_email).first()

      if (!user) {
        return response.status(401).send('A megadott email címmel nem található felhasználó!')
      }

      if (
        project.ownerId !== authResult.user.id &&
        !(await project.related('members').query().where('user_id', authResult.user.id).first())
      ) {
        return response
          .status(401)
          .send('Nem tagja a projektnek, amiből a szerkesztőt szeretné eltávolítani!')
      }

      if (project.ownerId === user.id) {
        return response.status(401).send('A tulajdonost nem lehet eltávolítani!')
      } else if (!(await project.related('members').query().where('user_id', user.id).first())) {
        return response.status(401).send('A szerkesztő már ki lett törölve!')
      }

      const removedMember = await project
        .related('members')
        .query()
        .where('user_id', user.id)
        .select('id', 'firstName', 'lastName', 'email', 'isModerator')

      await project.related('members').detach([user.id])

      response.status(201).json(removedMember)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  private async authenticateUser(auth: Authenticator<Authenticators>) {
    let authResult: {
      user:
        | (User & {
            currentAccessToken: AccessToken
          })
        | undefined
      error: { status: number; message: string }
    } = {
      user: undefined,
      error: { status: 401, message: 'Nem érvényes token' },
    }
    try {
      authResult.user = await auth.authenticate()
      if (!authResult.user) {
        return authResult
      }
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return authResult
      } else {
        authResult.error = { status: error.status, message: error }
        return authResult
      }
    }
    return authResult
  }
}
