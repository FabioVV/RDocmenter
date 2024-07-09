class Documenter extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){

        const doc_content = document.createElement('div')
        doc_content.classList.add("doc-menter-content"),
        doc_content.setAttribute('contenteditable', !0)
        this.appendChild(doc_content)

        doc_content.addEventListener('keydown', (event) => {
            if(event.key == 'Enter'){
                event.preventDefault()
                
                document.execCommand('insertLineBreak');
            }
        })

        // this.querySelector('#unordered-list').addEventListener('click', () => {
        //     document.execCommand('insertUnorderedList');
        // });
    
        // this.querySelector('#ordered-list').addEventListener('click', () => {
        //     document.execCommand('insertOrderedList');
        // });
    }
}

customElements.define('doc-menter', Documenter)