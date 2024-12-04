export class ToDoItem {
    constructor() {
        this.todoElement = this.createElement()
    }

    createElement() {
        const todoElement = document.createElement('li')
        todoElement.classList.add('todo')

        const checkboxArea = this.createCheckboxArea()
        const infoArea = this.createInfoArea()
        const editButton = this.createEditButton()
        const deleteButton = this.createDeleteButton()

        todoElement.appendChild(checkboxArea)
        todoElement.appendChild(infoArea)
        todoElement.appendChild(editButton)
        todoElement.appendChild(deleteButton)

        return todoElement
    }

    createCheckboxArea() {
        const checkboxArea = document.createElement('div')
        checkboxArea.classList.add('todo-checkbox-area')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('todo-checkbox')

        checkboxArea.appendChild(checkbox)
        return checkboxArea
    }

    createInfoArea() {
        const infoArea = document.createElement('div')
        infoArea.classList.add('todo-info')

        const title = document.createElement('h3')
        title.classList.add('text', 'todo-title')
        title.contentEditable = false

        const date = document.createElement('time')
        date.classList.add('todo-date')

        infoArea.appendChild(title)
        infoArea.appendChild(date)

        return infoArea
    }

    createEditButton() {
        const editButton = document.createElement('button')
        editButton.type = 'button'
        editButton.classList.add('button', 'todo-edit')
        return editButton
    }

    createDeleteButton() {
        const deleteButton = document.createElement('button')
        deleteButton.type = 'button'
        deleteButton.classList.add('button', 'todo-delete')
        return deleteButton
    }

    getElement() {
        return this.todoElement
    }

    getCheckbox() {
        return this.todoElement.querySelector('.todo-checkbox')
    }

    getInfoArea() {
        return this.todoElement.querySelector('.todo-info')
    }

    getEditButton() {
        return this.todoElement.querySelector('.todo-edit')
    }

    getDeleteButton() {
        return this.todoElement.querySelector('.todo-delete')
    }

    getTitleElement() {
        return this.todoElement.querySelector('.todo-title')
    }

    getDateElement() {
        return this.todoElement.querySelector('.todo-date')
    }

    setCheckboxChecked(checked) {
        this.getCheckbox().checked = checked
    }

    setTitle(title) {
        this.getTitleElement().textContent = title
    }

    setDateTime(dateTime) {
        this.getDateElement().datetime = dateTime
    }

    setDateTextContent(textContent) {
        this.getDateElement().textContent = textContent
    }
}
