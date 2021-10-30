class Model {
    #rowNum = 7
    constructor(){
        this.player1 = []
        this.player2 = []
        this.player1Turn = true
        this.finished = false

        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
    }
    play(tileId){
        if (this.finished) return false
        this.player1Turn ? this.player1.push(tileId) : this.player2.push(tileId)
        this.updateCellEvent.trigger({tileId, player: this.currentPlayer()})
        this.finished = this.testWin()
        if (!this.finished) this.player1Turn = !this.player1Turn
        return true
    }
    currentPlayer(){
        if (this.player1Turn) return 'player1'
        return 'player2'
    }
    generateWinningArr(){
        const winArr = []
        for (let i = 1; i <= this.#rowNum**2; i++){
            let row
            (i%7 === 0) ? row = 7 : row = i
            this.generateWiiningRow(winArr, row)
            this.generateWinningCol(winArr, row)
            this.generateWinningDia(winArr, row)
            this.generateWinningRevDia(winArr, row)
        }
        return winArr
    }
    generateWiiningRow(winArr, row){
            if (row%7 <= 4){
                winArr.push([row, row+1, row+2, row+3])
            }
        return winArr
    }
    generateWinningCol(winArr, row){
            if (row%7 <= 7){
                winArr.push([row, row+(this.#rowNum), row+(this.#rowNum*2), row+(this.#rowNum*3)])
            }
        return winArr
    }
    generateWinningDia(winArr, row){
            if (row%7<=4){
                winArr.push([row, row+(this.#rowNum)+1, row+(this.#rowNum*2)+2, row+(this.#rowNum*3)+3])
            }
        return winArr
    }
    generateWinningRevDia(winArr, row){
            if (row%7>=4){
                winArr.push([row, row+(this.#rowNum)-1, row+(this.#rowNum*2)-2, row+(this.#rowNum*3)-3])
            }
        return winArr
    }
    testWin(){
        const winArr = this.generateWinningArr()
        for (const winningArr of winArr){
            if (this.player1Turn){
                if (winningArr.every(i => this.player1.includes(i))){
                    this.victoryEvent.trigger('player 1 won!')
                    return true
                }
            } else {
                if (winningArr.every(i => this.player2.includes(i))){
                    this.victoryEvent.trigger('player 2 won!')
                    return true
                }
            }
        }
    }
}