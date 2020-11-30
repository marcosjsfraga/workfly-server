'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     */
    async handle (error, { request, response }) {
        // response.status(error.status).send(error.message)
        if (error.name === 'ValidationException') {
            return response.status(error.status).send(error.messages)
        }

        if (Env.get('NODE_ENV') === 'development') {
            const youch = new Youch(error, request.request)
            const errorJSON = await youch.toJSON()

            // console.log(errorJSON)

            return response.status(error.status).send(errorJSON)
        }

        return response.status(error.status)
    }

    /**
     * Report exception for logging or debugging.
     */
    async report (error, { request }) {
        console.log('+--------------+')
        console.log('| Error Report |')
        console.log('+--------------+')
        console.log(error)
    }
}

module.exports = ExceptionHandler
