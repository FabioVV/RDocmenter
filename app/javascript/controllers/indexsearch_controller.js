import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['titlesubtitle', 'situation']

    searchTimeout = null
    TIMEOUT = 350
    books_container = document.querySelector('books-container') 

    searchThrottle(){

        const titleSubtitle = this.titlesubtitleTarget.value
        const isActive = this.situationTarget.value === 'Y'
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            this.performSearch(titleSubtitle, isActive)
        }, this.TIMEOUT);

    }

    async performSearch(titleSubtitle, isActive){
        const payload = new URLSearchParams({
            title_subtitle: titleSubtitle,
            is_active: isActive
        });

        try{
            const response = await fetch(`/live_search_books?${payload.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
    
            if(response.ok){
                console.log(response.json())

                if(books_container !== null){
                    const HTML = `
                    
                    `
                }

            } else {
                console.log('Error searching books (R)')

            }
        } catch(error){
            console.log('Error searching books (T)')
        }
    }
}