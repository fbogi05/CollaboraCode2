import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
  })
)

export const deleteProjectValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

createProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'A név megadása kötelező',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.alpha': 'A névnek egyben kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
})

deleteProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})
