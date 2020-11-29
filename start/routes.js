'use strict'

const Route = use('Route')

// Users
Route.post('users', 'UserController.store')

// Sessions
Route.post('sessions', 'SessionController.store')

// Password
Route.post('forgotpassword', 'ForgotPasswordController.store')
Route.put('forgotpassword', 'ForgotPasswordController.update')

// Files
Route.get('files/:id', 'FileController.show')

Route.group(() => {
    Route.post('files', 'FileController.store')
    // Project (All routes in one declaration)
    Route.resource('projects', 'ProjectController').apiOnly()
}).middleware(['auth'])
