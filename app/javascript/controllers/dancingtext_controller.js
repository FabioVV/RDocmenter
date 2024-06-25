import { Controller } from "@hotwired/stimulus"

export default class extends Controller{
    static targets = ["text"]

    STYLES = ["bold", "italic", "code", "color"]
    COLORS = ["red", "green", "blue", "yellow", "purple", "black"]

    connect(){
        setInterval(()=> this.updateText(), 750)
    }

    updateText(){
        const randomClass = this.STYLES[Math.floor(Math.random() * this.STYLES.length)]
        this.textTarget.className  = `${randomClass}`

        if(randomClass == "color"){
            this.textTarget.style.color  = `${this.COLORS[Math.floor(Math.random() * this.COLORS.length)]}`

        } 
        // this.textTarget.textContent = "abcd"
    }
    
}