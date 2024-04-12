import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const getUserInfoValidator = vine.compile(
  vine.object({
    user_email: vine.string().email().trim(),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    first_name: vine.string().minLength(3).trim(),
    last_name: vine.string().minLength(3).trim(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      })
      .trim(),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      .confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string(),
  })
)

export const modifyAccountValidator = vine.compile(
  vine.object({
    first_name: vine.string().minLength(3).trim().optional(),
    last_name: vine.string().minLength(3).trim().optional(),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      .optional(),
  })
)

getUserInfoValidator.messagesProvider = new SimpleMessagesProvider({
  'user_email.required': 'Az email cím megadása kötelező',
  'user_email.string': 'Az email címnek szövegnek kell lennie',
  'user_email.email': 'Az email cím formátuma nem megfelelő',
})

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'first_name.required': 'A keresztnév megadása kötelező',
  'first_name.string': 'A keresztnévnek szövegnek kell lennie',
  'first_name.minLength': 'A keresztnévnek tartalmaznia kell minimum {{ min }} karaktert',
  'last_name.required': 'A vezetéknév megadása kötelező',
  'last_name.string': 'A vezetéknévnek szövegnek kell lennie',
  'last_name.minLength': 'A vezetéknévnek tartalmaznia kell minimum {{ min }} karaktert',
  'email.required': 'Az email cím megadása kötelező',
  'email.string': 'Az email címnek szövegnek kell lennie',
  'email.email': 'Az email cím formátuma nem megfelelő',
  'database.unique': 'A megadott e-mail címmel már van regisztrálva fiók',
  'password.required': 'A jelszó megadása kötelező',
  'password.string': 'A jelszónak szövegnek kell lennie',
  'password.minLength': 'A jelszónak tartalmaznia kell minimum {{ min }} karaktert',
  'password.regex':
    'A jelszónak tartalmaznia kell minimum egy kisbetűt, egy nagybetűt és egy számot',
  'password.confirmed': 'A jelszavak nem egyeznek meg',
})

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Az email cím megadása kötelező',
  'email.string': 'Az email címnek szövegnek kell lennie',
  'password.required': 'A jelszó megadása kötelező',
  'password.string': 'A jelszónak szövegnek kell lennie',
})

modifyAccountValidator.messagesProvider = new SimpleMessagesProvider({
  'first_name.string': 'A keresztnévnek szövegnek kell lennie',
  'first_name.minLength': 'A keresztnévnek tartalmaznia kell minimum {{ min }} karaktert',
  'last_name.string': 'A vezetéknévnek szövegnek kell lennie',
  'last_name.minLength': 'A vezetéknévnek tartalmaznia kell minimum {{ min }} karaktert',
  'password.string': 'A jelszónak szövegnek kell lennie',
  'password.minLength': 'A jelszónak tartalmaznia kell minimum {{ min }} karaktert',
  'password.regex':
    'A jelszónak tartalmaznia kell minimum egy kisbetűt, egy nagybetűt és egy számot',
})
