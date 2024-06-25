import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["text"]

    STYLES = ["bold", "italic", "code", "color"]
    COLORS = ["#DAAE66", "#CC00CC", "#1A1A1A", "#33CCFF"]
    COUNTER = 0

    connect(){
        setInterval(()=> {
            if(this.COUNTER > this.STYLES.length-1) this.COUNTER = 0
            this.updateText()
        }, 750)
    }

    updateText(){
        // const randomClass = this.STYLES[Math.floor(Math.random() * this.STYLES.length)]
        const Class = this.STYLES[this.COUNTER]

        this.textTarget.className  = `${Class}`
        this.textTarget.style.color  = `${this.COLORS[Math.floor(Math.random() * this.COLORS.length)]}`
        
        this.COUNTER++
    }
    
}