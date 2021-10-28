class view {
    constructor (){
        this.app = this.getElement('root')
        this.topBar = this.generateTopBar()
        this.board = this.generateBoard()
        this.app.append(this.topBar, this.board)
        this.player1Turn = true
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
        return board
    }
    // clearBoard(){
    //     for (const tileImg of document.querySelectorAll('tile-img')) {
    //         img.remove()
    //     }
    // }
    makeAMove(moveHandler){
        this.board.addEventListener('click', ({target})=>{
            // console.log(target.id);
            if(moveHandler(target.id)){
                const row = Number(target.id) % 7
                // console.log(row);
                const tileElem = this.getElement(this.placeOfTileInRow(row))
                console.log(tileElem);
                tileElem.classList.add(this.player(this.player1Turn))
                this.player1Turn = !this.player1Turn
            }
        })
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
    player(t){
        if(t) return 'player1'
        return 'player2'
    }
}