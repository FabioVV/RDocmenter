import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    changeTheme() {
        document.body.classList.toggle("dark-theme");
    }
}