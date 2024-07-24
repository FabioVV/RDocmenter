import parseMarkdown from "./parser"
import insertToolbox from "./generate_toolbar"

class Documenter extends HTMLElement {

    constructor() {
        super()
        this.contentDiv = null
        this.caretPos = null
        this.textHistoryManager = null
        this.inputHidden =  this.querySelector('#content_hidden')
    }

    connectedCallback() {
        this.setAttribute('role', "textbox")
        
        this.contentDiv = document.createElement('div')
        this.contentDiv.classList.add("doc-menter-content")
        this.contentDiv.setAttribute('contenteditable', true)
        this.contentDiv.setAttribute('autofocus', true)
        this.appendChild(this.contentDiv)

        this.contentDiv.innerHTML = parseMarkdown(this.inputHidden.value)
        this.textHistoryManager = new History(this.contentDiv)

        // Specify the div ID to load the toolbox into
        insertToolbox('markdown-load-toolbox')

        this.contentDiv.addEventListener('keydown', this.handleEnterKeyDown.bind(this))
        this.contentDiv.addEventListener('keydown', this.handleTextHistory.bind(this))
        this.contentDiv.addEventListener('input', this.handleInput.bind(this))
        this.contentDiv.addEventListener('blur', this.handleBlur.bind(this))
        this.contentDiv.addEventListener('focus', this.handleFocus.bind(this))

        document.getElementById('markdown-file').addEventListener('change', this.uploadImage.bind(this))
        document.querySelector('.image.editor-button').addEventListener('click', this.handleClickOnFileField.bind(this))
        document.querySelector('.bold.editor-button').addEventListener('click', this.insertBold.bind(this))
        document.querySelector('.italic.editor-button').addEventListener('click', this.insertItalic.bind(this))
        document.querySelector('.header.editor-button').addEventListener('click', this.insertHeader.bind(this))
        document.querySelector('.listul.editor-button').addEventListener('click', this.insertUnorderedList.bind(this))
        document.querySelector('.listol.editor-button').addEventListener('click', this.insertOrderedList.bind(this))
        document.querySelector('.code.editor-button').addEventListener('click', this.insertCode.bind(this))
        document.querySelector('.link.editor-button').addEventListener('click', this.insertLink.bind(this))

    }

    disconnectedCallback(){
        this.#cleanEventListeners()
    }

    handleClickOnFileField(){
        document.getElementById('markdown-file').click()
    }

    handleMarkdown(){
        let contentElement = this.contentDiv

        const scrollPosition = window.scrollY || window.pageYOffset

        const content = contentElement.textContent
        const restore = this.textHistoryManager.saveCaretPosition(contentElement)
        const parsedContent = parseMarkdown(content)

        contentElement.innerHTML = parsedContent
        this.inputHidden.value = contentElement.innerHTML

        restore()
        
        window.scrollTo(0, scrollPosition)
    }

    handleInput(event) {
        event.preventDefault()
        this.handleMarkdown()
    }

    handleEnterKeyDown(event) {
        this.handleEnter(event)
    }   

    handleTextHistory(event){
        if (event.ctrlKey && event.key === 'z') {
            event.preventDefault()
            this.textHistoryManager.undo()

        } else if (event.ctrlKey && event.key === 'y') {
            event.preventDefault()
            this.textHistoryManager.redo()

        } else if (event.key === 'Backspace' || event.key === "Delete"){
            event.preventDefault()

            let selection = window.getSelection()

            if(!selection.rangeCount){
                selection.deleteFromDocument()

            } else {        
                const range = selection.getRangeAt(0)
        
                if (!this.contentDiv.contains(range.commonAncestorContainer)) {
                    return
                }
        
                const currentNode = range.startContainer
                range.setStart(currentNode, range.startOffset - 1);

                range.deleteContents()
            }

            this.textHistoryManager.saveState()
        }

        this.handleMarkdown()
    }

    handleEnter(event) {
        if (event.key == 'Enter') {
            event.preventDefault()

            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            const currentNode = range.startContainer
            const textBeforeCaret = currentNode.textContent.substring(0, range.startOffset)
            const linesBefore = textBeforeCaret.split('\n')
            const currentLine = linesBefore[linesBefore.length - 1]
        
            let newLine = '\n'

            if (currentLine.match(/^\d+\. /)) {
              newLine = `\n${parseInt(currentLine, 10) + 1}. `

            } else if (currentLine.match(/^- /)) {
              newLine = `\n- `

            } 

            range.insertNode(document.createTextNode(newLine))
            range.collapse(false)
            selection.removeAllRanges();
            selection.addRange(range)

        }
    }

    handleBlur(event) {
        this.saveCaret = this.textHistoryManager.saveCaretPosition(this.contentDiv)
        window.getSelection().removeAllRanges()
    }

    handleFocus(event) {
        if (this.saveCaret) {
            this.saveCaret()
        }
    }

    insertHeader() {
        this.textHistoryManager.insertAtCaret('# ')
        this.handleMarkdown()
    }

    insertBold() {
        this.textHistoryManager.insertAtCaret('****')
        this.handleMarkdown()

    }

    insertItalic() {
        this.textHistoryManager.insertAtCaret('**')
        this.handleMarkdown()

    }

    insertUnorderedList() {
        this.textHistoryManager.insertAtCaret('- ')
        this.handleMarkdown()

    }

    insertOrderedList() {
        this.textHistoryManager.insertAtCaret('1. ')
        this.handleMarkdown()

    }

    insertLink() {
        this.textHistoryManager.insertAtCaret(`[title](url)`)
        this.handleMarkdown()

    }

    insertCode(){
        const CODE = "\n``"
        this.textHistoryManager.insertAtCaret(`${CODE}`)
        this.handleMarkdown()

    }

    insertImage(url, filename) {
        const markdownImage = `![${filename}](${url})`
        this.textHistoryManager.insertAtCaret(markdownImage)
        this.handleMarkdown()

    }

    async uploadImage(event) {
        const file = event.target.files[0]
    
        if (file) {
          const formData = new FormData()
          formData.append('image', file)
          
          const PAGE_SLUG = document.getElementById('markdown-file').dataset.id
          const BOOK_SLUG = document.getElementById('markdown-file').dataset.bookId

          try {
            const response = await fetch(`/books/${BOOK_SLUG}/pages/${PAGE_SLUG}/upload_markdown_image`, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            })
    
            if(response.ok){
              const { url, filename } = await response.json()
              this.insertImage(url, filename)

            } else {
              console.log('Image tag could not be generated.')
            }
    
          } catch (error) {
            console.log(`Error uploading image: ${error}`)
          }
    
        } else {
          return 
        }
    }

    #cleanEventListeners(){
        this.contentDiv.removeEventListener('keydown', this.handleKeyDown.bind(this))
        this.contentDiv.removeEventListener('input', this.handleInput.bind(this))
        this.contentDiv.removeEventListener('blur', this.handleBlur.bind(this))
        this.contentDiv.removeEventListener('focus', this.handleFocus.bind(this))
        document.getElementById('markdown-file').removeEventListener('change', this.uploadImage.bind(this))
        document.querySelector('.image.editor-button').removeEventListener('click', this.handleClickOnFileField.bind(this))
        document.querySelector('.bold.editor-button').removeEventListener('click', this.insertBold.bind(this))
        document.querySelector('.italic.editor-button').removeEventListener('click', this.insertItalic.bind(this))
        document.querySelector('.header.editor-button').removeEventListener('click', this.insertHeader.bind(this))
        document.querySelector('.listul.editor-button').removeEventListener('click', this.insertUnorderedList.bind(this))
        document.querySelector('.listol.editor-button').removeEventListener('click', this.insertOrderedList.bind(this))
        document.querySelector('.code.editor-button').removeEventListener('click', this.insertCode.bind(this))
        document.querySelector('.link.editor-button').removeEventListener('click', this.insertLink.bind(this))
    }

}

class History {

    constructor(element) {
        this.element = element
        this.undoStack = []
        this.redoStack = []

        // this.saveState()

        this.element.addEventListener('input', () => {
            this.saveState()
        })
    }

    saveState(){
        this.undoStack.push({content: this.element.innerHTML, caretPosRestore: this.saveCaretPosition(this.element)})
        this.redoStack = []
    }

    undo(){
        if(this.undoStack.length > 0){
            const { content, caretPosRestore } = this.undoStack.pop();

            this.redoStack.push({content: this.element.innerHTML, caretPosRestore: this.saveCaretPosition(this.element)})
            this.element.innerHTML = content

            caretPosRestore()
        }
    }

    redo(){
        if(this.redoStack.length > 0){
            const { content, caretPosRestore } = this.redoStack.pop();

            this.undoStack.push({content: this.element.innerHTML, caretPosRestore: this.saveCaretPosition(this.element)})
            this.element.innerHTML = content
            
            caretPosRestore()
        }
    }

    saveCaretPosition(context){
        let selection = window.getSelection()

        let range = selection.getRangeAt(0)
        range.setStart(  context, 0 )
        let len = range.toString().length
    
        return function restore(){
            let pos = getTextNodeAtPosition(context, len)
            selection.removeAllRanges()
            let range = new Range()
            range.setStart(pos.node ,pos.position)
            selection.addRange(range)
    
        }
    }

    insertAtCaret(text){
        this.element.focus()

        const selection = window.getSelection()
        if (!selection.rangeCount) return

        const range = selection.getRangeAt(0)

        if (!this.element.contains(range.commonAncestorContainer)) {
            return
        }

        range.deleteContents()

        const textNode = document.createTextNode(text)
        range.insertNode(textNode)    

    }

}

// Helper of saveCaretPosition
function getTextNodeAtPosition(root, index){
    const NODE_TYPE = NodeFilter.SHOW_TEXT
    let treeWalker = document.createTreeWalker(root, NODE_TYPE, function next(elem) {
        if(index > elem.textContent.length){
            index -= elem.textContent.length
            return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
    })
    let c = treeWalker.nextNode()

    return {
        node: c? c: root,
        position: index
    }
}



customElements.define('doc-menter', Documenter)