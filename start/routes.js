'use strict'

const Route = use('Route')

// Users
Route.post('users', 'UserController.store').validator('User')

// Sessions
Route.post('sessions', 'SessionController.store').validator('Session')

// Password
Route.post('forgotpassword', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgotpassword', 'ForgotPasswordController.update').validator('ResetPassword')

// Files
Route.get('files/:id', 'FileController.show')

// Routes that need authentication
Route.group(() => {
    // Files
    Route.post('/files', 'FileController.store')

    // Project (All routes in one declaration)
    Route.resource('projects', 'ProjectController')
        .apiOnly()
        .validator(new Map([[['projects.store', ['Project']]]]))

    // Tasks (All routes with project_id dependecy)
    Route.resource('projects.tasks', 'TaskController')
        .apiOnly()
        .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
