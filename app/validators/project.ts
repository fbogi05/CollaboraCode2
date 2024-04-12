import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const getProjectInfoValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
    name: vine.string().minLength(3).trim().optional(),
  })
)

export const getUserProjectsValidator = vine.compile(
  vine.object({
    user_email: vine.string().email().trim(),
  })
)

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .alphaNumeric({ allowSpaces: false, allowDashes: true, allowUnderscores: true })
      .minLength(3)
      .unique(async (db, value) => {
        const project = await db.from('projects').where('name', value).first()
        return !project
      })
      .trim(),
    owner_id: vine.number(),
  })
)

export const modifyProjectValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).trim().optional(),
  })
)

export const deleteProjectValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

getProjectInfoValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.required': 'A projekt nevének megadása kötelező',
  'name.string': 'A projekt nevének szövegnek kell lennie',
  'name.minLength': 'A projekt nevének tartalmaznia kell minimum {{ min }} karaktert',
})

getUserProjectsValidator.messagesProvider = new SimpleMessagesProvider({
  'user_email.required': 'Az email cím megadása kötelező',
  'user_email.string': 'Az email címnek szövegnek kell lennie',
  'user_email.email': 'Az email cím formátuma nem megfelelő',
})

createProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'A név megadása kötelező',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.alpha': 'A névnek egyben kell lennie',
  'name.alphaNumeric': 'A név csak angol betűket, számokat, kötőjelet és alsóvonalat tartalmazhat',
  'database.unique': 'Ilyen nevű projekt már létezik',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
  'owner_id.required': 'A projekt tulajdonosának megadása kötelező',
  'owner_id.number': 'A projekt tulajdonosa azonosítójának számnak kell lennie',
})

modifyProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
})

deleteProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})
