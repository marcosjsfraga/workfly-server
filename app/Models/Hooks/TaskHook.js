'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
    // "dirty" propertie have the early updated data in Model
    if (!taskInstance.user_id && !taskInstance.dirty.user_id) { return }

    const { email, username } = await taskInstance.user().fetch()
    const file = await taskInstance.file().fetch()

    const { title } = taskInstance

    await Mail.send(
        ['emails.new_task'],
        { username, title, hasAttachment: !!file }, // !! make variable turn to booblen
        message => {
            message
                .to(email)
                .from('marcosjsfraga@gmail.com', 'Marcos')
                .subject('Nova tarefa para você')

            if (file) {
                message.attach(Helpers.tmpPath(`uploads/${file.file_name}`, {
                    filename: file.original_name
                }))
            }
        }
    )
}
