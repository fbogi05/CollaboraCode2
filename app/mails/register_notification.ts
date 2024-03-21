import User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

export default class RegisterNotification extends BaseMail {
  from = 'noreply@collaboracode'
  subject = 'Üdvözöljük a CollaboraCode-ban!'
  user: User

  constructor(user: User) {
    super()
    this.user = user
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.user.email)
  }
}
