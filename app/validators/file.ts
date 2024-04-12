import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const getFileInfoValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
    name: vine.string().optional(),
  })
)

export const getProjectFilesValidator = vine.compile(
  vine.object({
    project_id: vine.number(),
  })
)

export const createFileValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    project_id: vine.number(),
  })
)

export const modifyFileValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).trim(),
  })
)

export const deleteFileValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const getFileContentValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const editFileContentValidator = vine.compile(
  vine.object({
    id: vine.number(),
    content: vine.string().nullable(),
  })
)

export const getLastEditInfoValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

getFileInfoValidator.messagesProvider = new SimpleMessagesProvider({
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.string': 'A névnek szövegnek kell lennie',
})

getProjectFilesValidator.messagesProvider = new SimpleMessagesProvider({
  'project_id.required': 'A projekt azonosítójának megadása kötelező',
  'project_id.number': 'A projekt azonosítójának számnak kell lennie',
})

createFileValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'A név megadása kötelező',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
  'project_id.required': 'A projekt megadása kötelező',
})

modifyFileValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
})

deleteFileValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})

getFileContentValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})

editFileContentValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'content.string': 'A tartalomnak szövegnek kell lennie',
})

getLastEditInfoValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})
