class Controller {
    model = new Model()
    view = new View()
    constructor (){//model, view){
        // this.model = model
        // this.view = view
    }
    moveHandler(move){
        this.model.move(move)
    }
    winHandler(){
        this.model.testWin()
    }
    run(){
        this.view.makeAMove(this.moveHandler, this.winHandler)
    }
}