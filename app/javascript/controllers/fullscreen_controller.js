import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    openFullscreen(){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
    
}