import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    
    connect(){
        this.applyTheme()
    }

    changeTheme(){
        document.documentElement.classList.toggle('dark-theme')
        this.saveTheme()
    }

    saveTheme(){
        const isDarkTheme = document.documentElement.classList.contains('dark-theme')
        document.cookie = `theme=${isDarkTheme ? 'dark' : 'light'}; path=/; max-age=31536000`; // Expires in 1 year
    }

    applyTheme(){
        const theme = this.getCookie('theme')
        if(theme == 'dark'){
            document.documentElement.classList.add('dark-theme')
        } else {
            document.documentElement.classList.remove('dark-theme')
        }
    }

    getCookie(name){
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if(parts.length == 2) return parts.pop().split(';').shift()
    }
}