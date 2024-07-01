// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


// document.addEventListener('DOMContentLoaded', () => {
//     const FLASH_CONTAINER = document.getElementsByClassName('flash-messages-container')

//     if(FLASH_CONTAINER.length > 0){
//         setTimeout(()=>{
//             FLASH_CONTAINER.classList.add('removed')
//             FLASH_CONTAINER.addEventListener('transitionend', ()=>{
//                 FLASH_CONTAINER.remove()
//             })
//         },1500)
//     }
// })


//Custom turbo-confirm
Turbo.setConfirmMethod((message, element) => {
    const DIALOG = document.getElementById('turbo-confirm')

    let message_array = message.split("|")

    DIALOG.showModal()
    DIALOG.querySelector(`h5`).textContent = message_array[0]
    DIALOG.querySelector(`h5`).style.color = `red`
    DIALOG.querySelector(`p`).textContent = message_array[1]

    return new Promise((resolve, reject)=>{
        DIALOG.addEventListener("close", () => {
            
            resolve(DIALOG.returnValue == "confirm")

        }, {once:true}) // once removes the eventListener after it has been called
    })
})