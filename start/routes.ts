/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const FilesController = () => import('#controllers/files_controller')

router.get('/', () => {
  return []
})

// users
router.get('account/info', [UsersController, 'getAccountInfo'])
router.post('sign-up', [UsersController, 'signUp'])
router.post('login', [UsersController, 'login'])
router.post('logout', [UsersController, 'logout'])
router.post('verify', [UsersController, 'verify'])
router.post('token/renew', [UsersController, 'renewToken'])
router.put('account/modify', [UsersController, 'modifyAccount'])
router.delete('account/delete', [UsersController, 'deleteAccount'])

// projects
router.post('project/info', [ProjectsController, 'getProjectInfo'])
router.post('user/projects', [ProjectsController, 'getUserProjects'])
router.post('project/create', [ProjectsController, 'createProject'])
router.put('project/modify', [ProjectsController, 'modifyProject'])
router.delete('project/delete', [ProjectsController, 'deleteProject'])
router.post('project/members', [ProjectsController, 'getMembers'])
router.post('project/member/add', [ProjectsController, 'addMember'])
router.delete('project/member/remove', [ProjectsController, 'removeMember'])

// files
router.post('file/info', [FilesController, 'getFileInfo'])
router.post('project/files', [FilesController, 'getProjectFiles'])
router.post('file/create', [FilesController, 'createFile'])
router.put('file/modify', [FilesController, 'modifyFile'])
router.delete('file/delete', [FilesController, 'deleteFile'])
router.post('file/content', [FilesController, 'getFileContent'])
router.put('file/edit', [FilesController, 'editFileContent'])
router.post('file/info/edit', [FilesController, 'getLastEditInfo'])
