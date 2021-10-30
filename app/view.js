class View {
    constructor (){
        this.playEvent = new Event()
        this.newGameEvent = new Event()
        this.app = this.getElement('root')
        this.player1Turn = true
        this.player1 = {name: 'player 1', color: 'red'}
        this.player2 = {name: 'player 2', color: 'yellow'}
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
    generateTopBar(){  //don't look at it, I know it horrifying
        const bar = this.createElement('div', 'top-bar')
        const head = this.createElement('h1')
        head.textContent = 'Connect 4!'
        bar.appendChild(head)

        const clearBoard = this.createElement('button', 'clear-btn')
        clearBoard.textContent = 'New Game'
        clearBoard.addEventListener('click', () => {
            for (const elem of document.querySelectorAll('.win')) {
                elem.remove()
            }
            for (const elem of document.querySelectorAll('.player1')) {
                elem.classList.remove('player1')
            }
            for (const elem of document.querySelectorAll('.player2')) {
                elem.classList.remove('player2')
            }
            for (const elem of document.querySelectorAll('.p-tile')) {
                elem.remove()
            }
            this.player1Turn = !this.player1Turn
            this.newGameEvent.trigger(true)
        })
        bar.appendChild(clearBoard)

        const btnDiv = this.createElement('div', 'top-bar-btn')

        const player1 = this.createElement('div', 'p-btn-div')
        const player1NameInput = this.createElement('input', 'name-input')
        player1NameInput.placeholder = 'player 1'
        player1NameInput.addEventListener('keyup', ()=>{
            this.player1.name = player1NameInput.value
            })
        const player1ColorInput = this.createElement('input', 'player-btn')
        player1ColorInput.type = 'color'
        player1ColorInput.value = '#ff0000'
        player1ColorInput.addEventListener('change', ()=>{
            this.player1.color = player1ColorInput.value
        })
        player1.appendChild(player1NameInput)
        player1.appendChild(player1ColorInput)

        const player2 = this.createElement('div', 'p-btn-div')
        const player2NameInput = this.createElement('input', 'name-input')
        player2NameInput.placeholder = 'player 2'
        player2NameInput.addEventListener('keyup', ()=>{
            this.player2.name = player2NameInput.value
            })
        const player2ColorInput = this.createElement('input', 'player-btn')
        player2ColorInput.type = 'color'
        player2ColorInput.value = '#fff700'
        player2ColorInput.addEventListener('change', ()=>{
            this.player2.color = player2ColorInput.value
        })
        player2.appendChild(player2NameInput)
        player2.appendChild(player2ColorInput)

        btnDiv.appendChild(player1)
        btnDiv.appendChild(player2)
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
            if(!target.classList.contains('player1') && !target.classList.contains('player2') && !target.classList.contains('p-tile')){
                const row = Number(target.id) % 7
                this.playEvent.trigger(this.placeOfTileInRow(row))
                this.player1Turn = !this.player1Turn
            }
        })
        return board
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
    updateBoard({tileId, player}){
        const tileElem = this.getElement(tileId)
        tileElem.classList.add(player)
        this.placeATile(tileElem)
    }
    placeATile(tileElem){
        let tileColor
        const tile = this.createElement('div', 'p-tile')
        // this.player1Turn ? tileColor = tile.classList.add('player1') : tile.classList.add('plaer2')
        this.player1Turn ? tileColor = this.player1.color : tileColor = this.player2.color
        tile.style.backgroundColor = tileColor
        tileElem.appendChild(tile)
    }
    checkWin(winner){
        const winElem = this.createElement('div', 'win')
        let playerName
        console.log(winner);
        winner.includes('1') ? playerName = this.player1.name : playerName = this.player2.name
        winElem.textContent = `${playerName} won!`
        this.app.appendChild(winElem)
    }
    // clearBoard(){
    //     for (const tileImg of document.querySelectorAll('tile-img')) {
    //         img.remove()
    //     }
    // }
}