import { TodoForm } from './render'

export class ToDoFormService {
    constructor(welcomeContent, onSubmit) {
        this.onSubmit = onSubmit
        this.todoForm = new TodoForm(welcomeContent)
        this.addEventListeners()
    }

    getTaskInput() {
        return this.todoForm.getInput().value.trim()
    }

    toggleSubmitButton() {
        const newTask = this.getTaskInput()
        const submitButton = this.todoForm.getSubmitButton()
        submitButton.disabled = !newTask
    }

    handleSubmit() {
        const newTask = this.getTaskInput()
        if (newTask) {
            this.onSubmit(newTask)
            this.todoForm.getInput().value = ''
            return true
        }
        return false
    }

    onInput() {
        this.toggleSubmitButton()
    }

    onFormSubmit(event) {
        event.preventDefault()
        const submitted = this.handleSubmit()
        if (submitted) {
            this.toggleSubmitButton()
        }
    }

    addEventListeners() {
        const formElement = this.todoForm.getFormElement()
        const inputElement = this.todoForm.getInput()

        inputElement.addEventListener('input', () => this.onInput())
        formElement.addEventListener('submit', (event) =>
            this.onFormSubmit(event)
        )

        this.onInput()
    }

    render(targetElement) {
        targetElement.appendChild(this.todoForm.getFormElement())
    }
}