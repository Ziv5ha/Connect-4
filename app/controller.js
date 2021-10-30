class Controller {
    // model = new Model()
    // view = new View()
    constructor (){
        this.model = new Model()
        this.view = new View()
        
        this.view.playEvent.addListener(tileId => { this.model.play(tileId); })

        this.model.updateCellEvent.addListener(data => { this.view.updateBoard(data); })
        this.model.victoryEvent.addListener(winner => { this.view.checkWin(winner); })
        
    }
    run(){
        this.view.render()
    }
}