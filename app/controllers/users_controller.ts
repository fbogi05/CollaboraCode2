import RegisterNotification from '#mails/register_notification'
import User from '#models/user'
import { registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
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

      const token = await User.accessTokens.create(user)
      response.status(201).json(token)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  async login({}: HttpContext) {}
}
