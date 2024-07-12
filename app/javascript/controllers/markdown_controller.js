import { Controller } from "@hotwired/stimulus"

// MOVER ISSO AQUI PRO DOCUMENTER

export default class extends Controller {
  static targets = []

  connect() {
    this.input = document.querySelector('.doc-menter-content')
    
    document.getElementById('image-editor-button').addEventListener('click', () => {
      document.getElementById('markdown-file').click();
    });

    document.getElementById('markdown-file').addEventListener('change', this.uploadImage.bind(this));
  }

  async uploadImage(event) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      
      const PAGE_ID = this.element.dataset.id

      try {
        const response = await fetch(`/pages/${PAGE_ID}/upload_image`, {
          method: 'POST',
          body: formData
        });

        if(response.ok){
          const { url, filename } = await response.json()
          this.insertImage(url, filename);
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

  insertHeader() {
    const restoreCaret = this.saveCaretPosition(this.input);

    this.insertAtCaret('# ', restoreCaret);
  }

  insertBold() {
    this.insertAtCaret('****');
  }

  insertItalic() {
    this.insertAtCaret('**');
  }

  insertUnorderedList() {
    this.insertAtCaret('- ');
  }

  insertOrderedList() {
    this.insertAtCaret('1. ');
  }

  insertLink() {
    this.insertAtCaret(`[title](url)`);
  }

  insertImage(url, filename) {
    const markdownImage = `![${filename}](${url})`;
    this.insertAtCaret(markdownImage);
  }
  

  insertAtCaret(text, restoreCaret) {
    // this.input.focus();

    restoreCaret();

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    range.deleteContents();

    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move the caret after the inserted text node
    // range.setStartAfter(textNode);
    // range.setEndAfter(textNode);
    // selection.removeAllRanges();
    // selection.addRange(range);
  }

  saveCaretPosition(context) {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    range.setStart(context, 0);
    let len = range.toString().length;

    return function restore() {
      let pos = getTextNodeAtPosition(context, len);
      selection.removeAllRanges();
      let range = new Range();
      range.setStart(pos.node, pos.position);
      selection.addRange(range);
    };
  }



}

function getTextNodeAtPosition(root, index) {
  const NODE_TYPE = NodeFilter.SHOW_TEXT;
  let treeWalker = document.createTreeWalker(root, NODE_TYPE, function next(elem) {
    if (index > elem.textContent.length) {
      index -= elem.textContent.length;
      return NodeFilter.FILTER_REJECT;
    }
    return NodeFilter.FILTER_ACCEPT;
  });
  let c = treeWalker.nextNode();

  return {
    node: c ? c : root,
    position: index
  };
}