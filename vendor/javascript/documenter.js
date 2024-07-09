class Documenter extends HTMLElement{

    constructor() {
        super()
        this.cursorPos = null
    }

    connectedCallback(){

        const contentDiv = document.createElement('div')
        contentDiv.classList.add("doc-menter-content"),
        contentDiv.setAttribute('contenteditable', !0)
        contentDiv.setAttribute('autofocus', !0)
        this.appendChild(contentDiv)

        contentDiv.addEventListener('keydown', (event) => {
            if(event.key == 'Enter'){
                event.preventDefault()

                document.execCommand('insertLineBreak');
            }
        })

        contentDiv.addEventListener('mouseup', this.saveSelection.bind(this));
        contentDiv.addEventListener('keyup', this.saveSelection.bind(this))
        
        contentDiv.addEventListener('input', (event) => {
            this.saveSelection()
            this.ApplyMrk()
            this.restoreSelection();

        })


        // this.querySelector('#unordered-list').addEventListener('click', () => {
        //     document.execCommand('insertUnorderedList');
        // });
    
        // this.querySelector('#ordered-list').addEventListener('click', () => {
        //     document.execCommand('insertOrderedList');
        // });
    }

    ApplyMrk(){
        const contentDiv = this.querySelector('.doc-menter-content')


        const content = contentDiv.innerHTML
        const newContent = content.replace(/\*(.*?)\*/g, '<em>*$1*</em>')

        contentDiv.innerHTML = newContent
    
    }

    saveSelection(){
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            this.cursorPos = sel.getRangeAt(0).cloneRange();
        }
    }

    restoreSelection(){
        const contentDiv = this.querySelector('.doc-menter-content');
        if (this.cursorPos) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this.cursorPos);

            // Restore focus to the content editable div
            contentDiv.focus();
        }
    }
}

customElements.define('doc-menter', Documenter)