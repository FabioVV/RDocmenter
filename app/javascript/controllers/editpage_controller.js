import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    openPageEdit(event){
        // Access the data-id and the data-book-id from the page div
        const PAGE_SLUG = this.element.dataset.id
        const BOOK_SLUG = this.element.dataset.bookId
        const USER_ID = this.element.dataset.userId

        if(USER_ID){
            window.open(`/books/${BOOK_SLUG}/pages/${PAGE_SLUG}/edit`, "_self")
        } else {
            window.open(`/books/${BOOK_SLUG}/pages/${PAGE_SLUG}`, "_self") // If there is no user logged in, open in show mode
        }
    }
    
}