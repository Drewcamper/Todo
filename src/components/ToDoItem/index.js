import { DateTimeService } from '@utils'
import { ToDoItem } from './render'
export class ToDoItemService {
    constructor(todo, onDelete, onSaveEdit, handleCheckboxChange) {
        this.todo = todo
        this.onDelete = onDelete
        this.onSaveEdit = onSaveEdit
        this.handleCheckboxChangeCallback = handleCheckboxChange
        this.elapsedTime = DateTimeService.getElapsedTime(new Date(todo.date))
        this.toDoItem = new ToDoItem()
        this.initializeElement()
    }

    initializeElement() {
        this.toDoItem.setCheckboxChecked(this.isCompleted())
        this.toDoItem.setTitle(this.getTitle())
        this.toDoItem.setDateTime(this.getDateTime())
        this.toDoItem.setDateTextContent(this.getFormattedDate())

        this.attachEvents()
        this.attachCheckboxListener()
    }

    attachEvents() {
        const editButton = this.toDoItem.getEditButton()
        const deleteButton = this.toDoItem.getDeleteButton()
        const titleElement = this.toDoItem.getTitleElement()
        const element = this.toDoItem.getElement()

        editButton.addEventListener('click', (event) => {
            event.stopPropagation()
            this.toggleEdit(titleElement, () =>
                this.saveOnBlurOrEsc(titleElement)
            )
        })

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation()
            this.onDelete(this.todo.id)
        })

        element.addEventListener('click', (event) => {
            const target = event.target
            if (target.closest('.todo-info')) {
                event.stopPropagation()
                this.toggleEdit(titleElement, () =>
                    this.saveOnBlurOrEsc(titleElement)
                )
            }
        })
    }

    attachCheckboxListener() {
        const checkbox = this.toDoItem.getCheckbox()
        checkbox.addEventListener('change', (event) => {
            this.handleCheckboxChangeCallback(this.todo.id, {
                completed: event.target.checked,
            })
        })
    }

    async saveOnBlurOrEsc(titleElement) {
        const newTitle = titleElement.textContent.trim()
        await this.saveEdit(newTitle)
    }

    async saveEdit(newTitle) {
        if (newTitle !== this.todo.title) {
            await this.onSaveEdit(this.todo.id, newTitle)
        }
    }

    get isEditing() {
        return this.titleElement.contentEditable === 'true'
    }

    set isEditing(value) {
        if (value) {
            this.titleElement.contentEditable = 'true'
            this.titleElement.classList.add('editable')
            this.titleElement.focus()
        } else {
            this.titleElement.contentEditable = 'false'
            this.titleElement.classList.remove('editable')
        }
    }

    toggleEdit(titleElement, saveOnBlurOrEsc) {
        this.titleElement = titleElement
        if (this.isEditing) {
            this.isEditing = false
            saveOnBlurOrEsc()
        } else {
            this.isEditing = true
            const handleSave = (event) => {
                if (
                    event.type === 'blur' ||
                    event.key === 'Escape' ||
                    event.key === 'Enter'
                ) {
                    saveOnBlurOrEsc()
                    this.titleElement.removeEventListener('blur', handleSave)
                    this.titleElement.removeEventListener('keydown', handleSave)
                }
            }
            this.titleElement.addEventListener('blur', handleSave)
            this.titleElement.addEventListener('keydown', handleSave)
        }
    }

    isCompleted() {
        return this.todo.completed
    }

    getTitle() {
        return this.todo.title
    }

    getDateTime() {
        return new Date(this.todo.date).toISOString()
    }

    getFormattedDate() {
        const updatedTime = new Date(this.todo.date).toLocaleDateString()
        const elapsedTime = this.elapsedTime
        return `Updated: ${updatedTime}, ${elapsedTime}`
    }

    getElement() {
        return this.toDoItem.getElement()
    }
}
