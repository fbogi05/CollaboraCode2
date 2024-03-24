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
// const ProjectsController = () => import('#controllers/projects_controller')

router.get('/users', [UsersController, 'getUsers'])
router.post('/register', [UsersController, 'register'])
router.post('/login', [UsersController, 'login'])
router.post('/logout', [UsersController, 'logout'])
router.post('/verify', [UsersController, 'verify'])
router.post('/renew-token', [UsersController, 'renewToken'])
// router.get('/projects', [ProjectsController, 'getProjects'])
// router.post('/create-project', [ProjectsController, 'createProject'])
// router.delete('delete-project', [ProjectsController, 'deleteProject'])
