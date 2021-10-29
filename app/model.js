class Model {
    #rowNum = 7
    constructor(){
        this.player1 = []
        this.player2 = []
        this.player1Turn = true
    }
    move(tileId){
        console.log(tileId);
        this.player1Turn ? this.player1.push(tileId) : this.player2.push(tileId)
        this.player1Turn = !this.player1Turn
        console.log(`player 1 [${this.player1}]`)
        console.log(`player 2 [${this.player2}]`)
        this.testWin()
        return true
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
        // console.log(winArr);
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
            // console.log(...winningArr);
            if (this.player1Turn){
                if (winningArr.every(i => this.player1.includes(i))){
                    console.log('player 1 won!')
                    return 'player 1 won'
                }
            } else {
                if (winningArr.every(i => this.player2.includes(i))){
                    console.log('player 2 won!')
                    return 'player 2 won'
                }
            }
        }
    }
}