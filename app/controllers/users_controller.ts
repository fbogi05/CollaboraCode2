import RegisterNotification from '#mails/register_notification'
import User from '#models/user'
import {
  getUserInfoValidator,
  loginValidator,
  modifyAccountValidator,
  registerValidator,
} from '#validators/user'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'

export default class UsersController {
  async getAccountInfo({ auth, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fiók adatok lekéréséhez!')
    }

    const data = {
      user_email: authResult.user.email,
    }

    try {
      await getUserInfoValidator.validate(data)

      const user = await User.query()
        .select('id', 'first_name', 'last_name', 'email', 'is_moderator')
        .where('email', data['user_email'])
        .first()

      response.status(200).json(user)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async signUp({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const payload = await registerValidator.validate(data)
      const user = await User.create(payload)

      const email = new RegisterNotification(user)
      await email.buildWithContents()

      email.message.html(`
      <style>
        .container {
          background-color: whitesmoke;
          width: max-content;
          text-align: center;
          padding: 10px 20px;
          border: 2px solid lightgray;
          margin: 20px 10px;
          font-family: sans-serif;
          border-radius: 10px;
        }
      </style>
      <div class="container">
        <h1>Üdvözöljük a CollaboraCode-ban!</h1>
        <p>A regisztráció sikeres. Mostmár bejelentkezhet a fiókjába.</p>
      </div>
      `)

      await mail.send(email)

      response.header('Content-type', 'application/json')
      const token = await User.accessTokens.create(user)
      response.status(201).json(token)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await loginValidator.validate({ email, password })

      const user = await User.findBy('email', email)

      if (!user) {
        response.status(400).send({
          status: 400,
          code: 'INVALID_CREDENTIALS',
          message: 'Hibás e-mail cím és/vagy jelszó!',
        })
        return
      }

      const passwordMatch = await hash.verify(user.password, password)

      if (!passwordMatch) {
        response.status(400).send({
          status: 400,
          code: 'INVALID_CREDENTIALS',
          message: 'Hibás e-mail cím és/vagy jelszó!',
        })
        return
      }

      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30 days',
      })
      response.status(200).json(token)
    } catch (error) {
      response.status(401).send(error.message)
    }
  }

  async verify({ auth, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send(authResult.error.message)
    }

    return response
      .status(200)
      .send(
        `A felhasználó bejelentkezve marad (UTC): ${authResult.user.currentAccessToken.expiresAt?.toLocaleString()}-ig`
      )
  }

  async renewToken({ auth, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send(authResult.error.message)
    }

    await User.accessTokens.delete(authResult.user, authResult.user.currentAccessToken.identifier)

    const token = await User.accessTokens.create(authResult.user!, ['*'], {
      expiresIn: '30 days',
    })

    response.status(200).json(token)
  }

  async logout({ auth, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send(authResult.error.message)
    }

    await User.accessTokens.delete(authResult.user, authResult.user.currentAccessToken.identifier)

    response.status(200).send('Sikeres kijelentkezés!')
  }

  async modifyAccount({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send(authResult.error.message)
    }

    try {
      const data = request.only(['first_name', 'last_name', 'password'])

      await modifyAccountValidator.validate(data)

      await authResult.user.merge(data).save()

      response.status(200).send('Adatok sikeresen módosítva!')
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async deleteAccount({ auth, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send(authResult.error.message)
    }

    await authResult.user.delete()

    response.status(200).send('Fiók sikeresen törölve!')
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
