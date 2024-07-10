import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["input", "preview"]

    previewImage(){
        const input = this.inputTarget
        const preview = this.previewTarget

        if(input.files && input.files[0]){
            const file = input.files[0]

            if(!file.type.startsWith('image/')){
                return
            }

            const r = new FileReader()
            r.onload = function(e) {
                preview.src = e.target.result
            }

            r.readAsDataURL(file)
        }

    }

    clickOnFileField(){
        this.inputTarget.click()
    }
    
}
