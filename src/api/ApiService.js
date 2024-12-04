export class ApiService {
    constructor(serverUrl) {
        this.serverUrl = serverUrl
    }

    async create(item) {
        try {
            const response = await fetch(this.serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            if (!response.ok) {
                throw new Error('Failed to add item')
            }
        } catch (error) {
            console.error('Failed to add item:', error)
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${this.serverUrl}/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to delete item')
            }
        } catch (error) {
            console.error('Failed to delete item:', error)
        }
    }

    async update(id, updatedItem) {
        try {
            const response = await fetch(`${this.serverUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            })
            if (!response.ok) {
                throw new Error('Failed to update item')
            }
        } catch (error) {
            console.error('Failed to toggle item:', error)
        }
    }

    async read() {
        try {
            const response = await fetch(this.serverUrl)
            if (!response.ok) {
                throw new Error('Failed to fetch items')
            }
            return await response.json()
        } catch (error) {
            console.error('Failed to fetch item:', error)
        }
    }
}
