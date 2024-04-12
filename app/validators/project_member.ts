import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const getMembersValidator = vine.compile(
  vine.object({
    project_id: vine.number(),
  })
)

export const addMemberValidator = vine.compile(
  vine.object({
    project_id: vine.number(),
    user_email: vine.string().email(),
  })
)

export const removeMemberValidator = vine.compile(
  vine.object({
    project_id: vine.number(),
    user_email: vine.string().email(),
  })
)

getMembersValidator.messagesProvider = new SimpleMessagesProvider({
  'project_id.required': 'A projekt azonosítójának megadása kötelező',
  'project_id.number': 'A projekt azonosítójának számnak kell lennie',
})

addMemberValidator.messagesProvider = new SimpleMessagesProvider({
  'project_id.required': 'A projekt azonosítójának megadása kötelező',
  'project_id.number': 'A projekt azonosítójának számnak kell lennie',
  'user_email.required': 'A felhasználó email címének megadása kötelező',
  'user_email.email': 'A felhasználó email címe nem megfelelő formátumú',
})

removeMemberValidator.messagesProvider = new SimpleMessagesProvider({
  'project_id.required': 'A projekt azonosítójának megadása kötelező',
  'project_id.number': 'A projekt azonosítójának számnak kell lennie',
  'user_email.required': 'A felhasználó email címének megadása kötelező',
  'user_email.email': 'A felhasználó email címe nem megfelelő formátumú',
})
