export class TodoForm {
    constructor(welcomeContent) {
        this.welcomeContent = welcomeContent
        this.init()
    }

    init() {
        this.form = document.createElement('form')
        this.form.classList.add('add-note')

        this.input = document.createElement('input')
        this.input.type = 'text'
        this.input.id = 'todo'
        this.input.name = 'todo'
        this.input.setAttribute('aria-label', 'New Task')
        this.input.placeholder = 'Add a task'
        this.input.classList.add('add-note-input')

        this.submitButton = document.createElement('button')
        this.submitButton.type = 'submit'
        this.submitButton.classList.add('button', 'add-note-submit')
        this.submitButton.setAttribute('aria-label', 'Add Task')
        this.submitButton.textContent = 'Add Task'

        this.form.appendChild(this.input)
        this.form.appendChild(this.submitButton)
        this.welcomeContent.appendChild(this.form)
    }

    getFormElement() {
        return this.form
    }

    getInput() {
        return this.input
    }

    getSubmitButton() {
        return this.submitButton
    }
}
