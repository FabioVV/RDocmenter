import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['titlesubtitle', 'situation', 'bookscontainer']

    searchTimeout = null
    TIMEOUT = 350

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

            const books_container = document.querySelector('.books-container') 

            if(books_container){
                const DATA = await response.json()
                let HTML = ``

                DATA.forEach(book => {

                    let book_cover = ""
                    if(book.cover_image_url){
                        book_cover = book.cover_image_url
                    } else {
                        book_cover = "/assets/placeholder_book_index-8a92c238b48126a5fb28c725154d946284c05f5d80cce0fe9280af58b25eb953.svg"
                    }

                    HTML += `
                        <div class='book' data-controller='editbook' data-action="click->editbook#openBookEdit" data-id='<%= b.slug %>'>
                            <div class='book-title-section'>
                                <h2 title='${book.title}'>${book.truncated_title}</h2>
                                <h3 title='${book.subtitle}'>${book.truncated_subtitle}</h3>
                            </div>

                            <div class='book-img-section'>
                                <img src="${book_cover}">
                            </div>

                            <div class="book-timestamps">
                                <span><span class='timestamp-created'>Created at:</span> ${book.created_at_ago} ago</span>
                                <span><span class='timestamp-updated'>Last edit:</span> ${book.updated_at_ago} ago</span>
                            </div>

                            <div class='book-actions'>
                                <hr />
                            </div>
                        </div>
                    `
                });

                books_container.innerHTML = HTML

            } else {
                console.log('Error searching books (R)')
            }
        } catch(error){
            console.log(error)
        }
    }
}