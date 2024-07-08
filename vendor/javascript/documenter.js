class Documenter extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){


        const doc_content = document.createElement('div')
        doc_content.classList.add("doc-menter-content"),
        doc_content.setAttribute('contenteditable', !0)
        this.appendChild(doc_content)

        // this.querySelector('#unordered-list').addEventListener('click', () => {
        //     document.execCommand('insertUnorderedList');
        // });
    
        // this.querySelector('#ordered-list').addEventListener('click', () => {
        //     document.execCommand('insertOrderedList');
        // });
    }
}

customElements.define('doc-menter', Documenter)