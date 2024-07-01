import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    openPageEdit(event){
        // Access the data-id and the data-book-id from the page div
        const PAGE_ID = this.element.dataset.id
        const BOOK_ID = this.element.dataset.bookId

        window.open(`/books/${BOOK_ID}/pages/${PAGE_ID}/edit`, "_self")
    }
    
}