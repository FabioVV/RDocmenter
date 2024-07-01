import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    openBookEdit(event){
        // Access the data-id from the book div
        const BOOK_ID = this.element.dataset.id
        window.open(`/books/${BOOK_ID}/edit`, "_self")
    }
    
}