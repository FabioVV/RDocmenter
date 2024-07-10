import parseMarkdown from "./parser"

class Documenter extends HTMLElement {

    constructor() {
        super()
        this.contentDiv = null
        this.handleInput = this.handleInput.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    connectedCallback() {
        this.contentDiv = document.createElement('div')
        this.contentDiv.classList.add("doc-menter-content")
        this.contentDiv.setAttribute('contenteditable', true)
        this.contentDiv.setAttribute('autofocus', true)
        this.appendChild(this.contentDiv)

        this.contentDiv.addEventListener('keydown', this.handleKeyDown);
        this.contentDiv.addEventListener('input', this.handleInput)
    }

    disconnectedCallback(){
        this.#cleanEventListeners()
    }
    

    handleInput(event) {
        event.preventDefault()
        let contentElement = this.contentDiv
        const content = contentElement.textContent;

        const restore = this.saveCaretPosition(contentElement)

        const parsedContent = parseMarkdown(content)
        contentElement.innerHTML = parsedContent

        restore()
    }

    handleKeyDown(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            document.execCommand('insertLineBreak');
        }
    }

    saveCaretPosition(context){
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        range.setStart(  context, 0 );
        let len = range.toString().length;
    
        return function restore(){
            let pos = getTextNodeAtPosition(context, len);
            selection.removeAllRanges();
            let range = new Range();
            range.setStart(pos.node ,pos.position);
            selection.addRange(range);
    
        }
    }


    #cleanEventListeners(){
        this.contentDiv.removeEventListener('keydown', this.handleKeyDown);
        this.contentDiv.removeEventListener('input', this.handleInput);
    }

}

function getTextNodeAtPosition(root, index){
    const NODE_TYPE = NodeFilter.SHOW_TEXT;
    let treeWalker = document.createTreeWalker(root, NODE_TYPE, function next(elem) {
        if(index > elem.textContent.length){
            index -= elem.textContent.length;
            return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT;
    });
    let c = treeWalker.nextNode();

    return {
        node: c? c: root,
        position: index
    };
}

// function moveCursorToEnd(contentEle) {
//     const range = document.createRange();
//     const selection = window.getSelection();
//     range.setStart(contentEle, contentEle.childNodes.length);
//     range.collapse(true);
//     selection.removeAllRanges();
//     selection.addRange(range);
// }


customElements.define('doc-menter', Documenter);