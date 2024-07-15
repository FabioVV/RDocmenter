import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

    open(event) {
      event.preventDefault();
  
      const imageUrl = event.currentTarget.src;
      
      document.querySelector('#image-dialog-show').src = imageUrl;
      document.querySelector('#image-dialog').showModal();

    }
  
    close() {
      document.querySelector('#image-dialog-show').src = ''
      document.querySelector('#image-dialog').close();
    }
}