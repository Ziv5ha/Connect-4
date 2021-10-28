class controller {
    constructor (){

    }
    getelement(elemId){
        return document.getElementById(elemId)
    }
    createElement(tag, className){
        const elem = document.createElement(tag)
        elem.classList.add(className)
        return elem
    }
}