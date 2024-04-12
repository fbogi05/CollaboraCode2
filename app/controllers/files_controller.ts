import File from '#models/file'
import Project from '#models/project'
import User from '#models/user'
import {
  createFileValidator,
  modifyFileValidator,
  deleteFileValidator,
  getProjectFilesValidator,
  getFileInfoValidator,
  editFileContentValidator,
  getFileContentValidator,
  getLastEditInfoValidator,
} from '#validators/file'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Authenticators } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class FilesController {
  async getFileInfo({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)

    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt lekéréséhez!')
    }

    const data = request.all()

    try {
      await getFileInfoValidator.validate(data)

      let queryResult

      if (data['id']) {
        queryResult = await File.query()
          .select('id', 'name', 'projectId')
          .where('id', data['id'])
          .preload('projects', (query) => query.select('id', 'name'))
      } else if (data['name']) {
        queryResult = await File.query()
          .select('id', 'name', 'projectId')
          .where('name', data['name'])
          .preload('projects', (query) => query.select('id', 'name'))
      } else {
        throw new Error('Nincs megadva az id vagy a név!')
      }

      const file = queryResult.map((item) => {
        const { projectId, ...rest } = item.toJSON()
        return rest
      })

      response.status(200).json(file)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async getProjectFiles({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájlok lekéréséhez!')
    }

    const data = request.all()

    try {
      await getProjectFilesValidator.validate(data)

      const project = await Project.findOrFail(data['project_id'])

      const files = await project.related('files').query().select('id', 'name')

      response.status(200).json(files)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async createFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl létrehozásához!')
    }

    const data = request.all()

    try {
      await createFileValidator.validate(data)

      data.last_edited_user = authResult.user!.firstName + ' ' + authResult.user!.lastName
      data.last_edited_time = DateTime.now().toISO()

      const createdFile = await File.create(data)

      const file = await File.query().select('id', 'name').where('id', createdFile.id).firstOrFail()

      response.status(201).json(file)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async modifyFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl módosításához!')
    }

    const data = request.all()

    try {
      await modifyFileValidator.validate(data)

      const file = await File.findOrFail(data.id)

      await file.merge(data).save()

      const modifiedFile = await File.query().select('id', 'name').where('id', data['id']).first()

      response.status(201).json(modifiedFile)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async deleteFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send('Be kell jelentkezni a fájl törléséhez!')
    }

    const data = request.all()

    try {
      await deleteFileValidator.validate(data)

      const file = await File.findOrFail(data.id)

      const deletedFile = await File.query().select('id', 'name').where('id', data['id']).first()

      await file.delete()

      response.status(200).json(deletedFile)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async getFileContent({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl lekéréséhez!')
    }

    const data = request.all()

    try {
      await getFileContentValidator.validate(data)

      let file = await File.query()
        .select('content', 'project_id')
        .where('id', data['id'])
        .firstOrFail()

      const project = await Project.query()
        .where('id', file.projectId)
        .whereHas('members', (query) => {
          query.where('users.id', authResult.user!.id)
        })
        .first()

      if (!project) {
        return response.status(403).send('Nem vagy a projekt tagja!')
      }

      const { projectId, ...fileResult } = file.toJSON()

      response.status(200).send(fileResult)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async editFileContent({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl módosításához!')
    }

    const data = request.all()

    try {
      await editFileContentValidator.validate(data)

      const file = await File.findOrFail(data['id'])

      const project = await Project.query()
        .where('id', file.projectId)
        .whereHas('members', (query) => {
          query.where('users.id', authResult.user!.id)
        })
        .first()

      if (!project) {
        return response.status(403).send('Nem vagy a projekt tagja!')
      }

      await file.merge(data).save()

      file.lastEditedUser = authResult.user!.firstName + ' ' + authResult.user!.lastName
      file.lastEditedTime = DateTime.now().toISO()

      await file.save()

      const modifiedFile = await File.query().select('content').where('id', data['id']).first()

      response.status(201).send(modifiedFile)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async getLastEditInfo({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a szerkesztési információk lekéréséhez!')
    }

    const data = request.all()

    try {
      await getLastEditInfoValidator.validate(data)

      let file = await File.findOrFail(data['id'])

      const project = await Project.query()
        .where('id', file.projectId)
        .whereHas('members', (query) => {
          query.where('users.id', authResult.user!.id)
        })
        .first()

      file = await File.query()
        .select('id', 'name', 'lastEditedUser', 'lastEditedTime')
        .where('id', data['id'])
        .firstOrFail()

      if (!project) {
        return response.status(403).send('Nem vagy a projekt tagja!')
      }

      response.status(200).json(file)
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
