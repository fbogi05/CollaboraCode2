/* eslint-disable prettier/prettier */
import RegisterNotification from '#mails/register_notification'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'

export default class UsersController {
  async getUsers({ response }: HttpContext) {
    const users = await User.all()
    response.status(200).json(users)
  }

  async register({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const payload = await registerValidator.validate(data)
      const user = await User.create(payload)

      const email = new RegisterNotification(user)
      await email.buildWithContents()

      email.message.html(`
      <body>
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
      </body>
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
      response.header('Content-type', 'application/json')
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

      const token = await User.accessTokens.create(user)
      response.status(200).json(token)
    } catch (error) {
      response.status(401).send(error.message)
    }
  }

  async verify({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    if (!user) {
      return response.status(401).send('Unauthorized')
    }

    response.status(200).json(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.authenticate()

    const user = await auth.user

    if (!user) {
      return response.status(400).send('Unauthorized')
    }

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    response.status(200).send('Logged out successfully')
  }
}
