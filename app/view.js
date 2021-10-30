class View {
    constructor (){
        this.playEvent = new Event()
        this.app = this.getElement('root')
        this.player1Turn = true
    }
    render(){
        this.topBar = this.generateTopBar()
        this.board = this.generateBoard()
        this.app.append(this.topBar, this.board)
    }
    getElement(elemId){
        return document.getElementById(elemId)
    }
    createElement(tag, className){
        const elem = document.createElement(tag)
        if (className) elem.classList.add(className)
        return elem
    }
    generateTopBar(){
        const bar = this.createElement('div', 'top-bar')
        const head = this.createElement('h1')
        head.textContent = 'Connect 4!'
        bar.appendChild(head)
        const btnDiv = this.createElement('div', 'top-bar-btn')
        const player1 = this.createElement('button', 'player1-btn')
        const player2 = this.createElement('button', 'player2-btn')
        const clearBtn = this.createElement('button', 'clear')
        clearBtn.textContent = 'New Game'
        btnDiv.appendChild(player1)
        btnDiv.appendChild(player2)
        btnDiv.appendChild(clearBtn)
        bar.appendChild(btnDiv)
        return bar
    }
    #rowNum = 7
    generateBoard(){
        const board = this.createElement('div', 'board')
        for (let i = this.#rowNum**2; i >= 1; i--) {
            const tileElem = this.createElement('div', 'tile')
            tileElem.id = i
            board.appendChild(tileElem)
        }
        board.addEventListener('click', ({target})=>{
            if(!target.classList.contains('player1') && !target.classList.contains('player2')){
                const row = Number(target.id) % 7
                this.playEvent.trigger(this.placeOfTileInRow(row))
                this.player1Turn = !this.player1Turn
            }
        })
        return board
    }
    // clearBoard(){
    //     for (const tileImg of document.querySelectorAll('tile-img')) {
    //         img.remove()
    //     }
    // }
    updateBoard({tileId, player}){
        const tileElem = this.getElement(tileId)
        tileElem.classList.add(player)
    }
    placeOfTileInRow(row){
        let num
        while(!num){
            if (row === 0) row += 7
            const tileElem = this.getElement(row)
            if (tileElem.classList.contains('player1') || tileElem.classList.contains('player2')){
                row += 7
            } else {
                num = row
            }
        }
        return num
    }
    checkWin(winner){
        const winElem = this.createElement('div', 'win')
        winElem.textContent = `${winner} won!`
        this.app.appendChild(winElem)
    }
}