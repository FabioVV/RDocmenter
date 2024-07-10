import parseMarkdown from "./parser"


class Documenter extends HTMLElement {

    constructor() {
        super();
        this.contentDiv = null;

        this.handleInput = this.handleInput.bind(this);
    }

    connectedCallback() {
        this.contentDiv = document.createElement('div');
        this.contentDiv.classList.add("doc-menter-content");
        this.contentDiv.setAttribute('contenteditable', true);
        this.contentDiv.setAttribute('autofocus', true);
        this.appendChild(this.contentDiv);

        this.contentDiv.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                event.preventDefault()

                document.execCommand('insertLineBreak');
                
                this.contentDiv.focus();

            }
        });

        this.contentDiv.addEventListener('input', this.handleInput);
    }

    handleInput(event) {
        event.preventDefault()
        let contentElement = this.contentDiv
        let restore = this.saveCaretPosition(contentElement)

        const content = contentElement.innerHTML;
        const parsedContent = parseMarkdown(content)

        contentElement.innerHTML = parsedContent

        restore()
        contentElement.focus()
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


}

function moveCursorToEnd(contentEle) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(contentEle, contentEle.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
};

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


customElements.define('doc-menter', Documenter);