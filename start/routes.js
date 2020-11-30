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

// Routes that need authentication
Route.group(() => {
    // Files
    Route.post('files', 'FileController.store')

    // Project (All routes in one declaration)
    Route.resource('projects', 'ProjectController').apiOnly()

    // Tasks (All routes with project_id dependecy)
    Route.resource('projects.tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
