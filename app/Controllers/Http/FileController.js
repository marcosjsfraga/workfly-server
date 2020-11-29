'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
    /**
     * Show a file.
     * GET files
     */
    async show ({ params, response }) {
        const file = await File.findOrFail(params.id)

        return response.download(Helpers.tmpPath(`uploads/${file.file_name}`))
    }

    /**
     * Create/save a new file.
     * POST files
     */
    async store ({ request, response }) {
        try {
            // If file don exists, exit function
            if (!request.file('file')) return

            const upload = request.file('file', { size: '2mb' })

            const fileName = `${Date.now()}.${upload.subtype}`

            await upload.move(Helpers.tmpPath('uploads'), {
                name: fileName
            })

            if (!upload.moved()) {
                throw upload.error()
            }

            const file = await File.create({
                file_name: fileName,
                original_name: upload.clientName,
                type: upload.type,
                subtype: upload.subtype
            })

            return file
        } catch (error) {
            console.log(`----= File Upload Error =----\n${error.message}\n----------------------------------`)
            return response
                .status(error.status)
                .send({ error: { message: 'Problemas no upload de arquivo.' } })
        }
    }
}

module.exports = FileController
