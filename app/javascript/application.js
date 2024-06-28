// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"



document.addEventListener('DOMContentLoaded', ()=>{
    const FLASH_CONTAINER = document.getElementsByClassName('flash-messages-container')[0]

    setTimeout(()=>{
        FLASH_CONTAINER.classList.add('removed')
        FLASH_CONTAINER.addEventListener('transitionend', ()=>{
            FLASH_CONTAINER.remove()
        })
    },1500)
})