import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    static targets = ["checkbox"]

    connect(){
        this.updateCheckbox()
    }

    toggle(){
        if(this.checkboxTarget.checked) {
            window.location.href = this.editPath()
        } else {
            window.location.href = this.showPath()
        }
    }
    
    updateCheckbox(){
        if(this.isEditPage()) {
            this.checkboxTarget.checked = true
        } else {
            this.checkboxTarget.checked = false
        }
    }

    isEditPage(){
        let pathname = window.location.pathname.split('/')
        if(pathname[pathname.length - 1] == 'edit'){
            return true
        } 
        return false
    }

    showPath(){
        return this.data.get('showPath')
    }

    editPath(){
        return this.data.get('editPath')
    }
}