var chess = document.getElementById("chess")
x = 1, y = 1;
for (let i = 1; i <= 64; i++) {
    let box = document.createElement("div");
    let img = document.createElement("img");
    img.classList.add("imagePiece");
    img.setAttribute("src", "#");
    img.setAttribute("alt", "");
    box.appendChild(img);
    box.classList.add("box");
    chess.appendChild(box);
    box.setAttribute("data-xindex", x);
    box.setAttribute("data-yindex", y);
    box.setAttribute("data-cords", `${x},${y}`);
    // box.innerText = "(" + x + "," + y + ")";
    if ((x + y) % 2 == 0) {
        box.style.backgroundColor = "brown";
    }
    else {
        box.style.backgroundColor = "yellow";
    }
    x++;
    if (x > 8) {
        x = 1;
        y++;
    }
}

const showMoves = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                if (box.dataset.color == piece.color) {
                    box.classList.add("cantkill")
                } else {
                    box.classList.add("cankill")
                }
                if (box.dataset.color == "" || box.dataset.color == null || box.dataset.color == undefined) {
                    box.classList.remove("cankill")
                    box.classList.add("possibleMove")
                }
            }
        }
    })
}
const resetPossibleMoves = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                box.classList.remove("possibleMove")
                box.classList.remove("cankill")
                box.classList.remove("cantkill")
            }
        }
    })
}

class Piece {
    constructor(color, name, initialX, initialY, image) {
        this.color = color;
        this.name = name;
        this.initialPos = {
            x: initialX,
            y: initialY
        };
        this.currentPos = {
            x: initialX,
            y: initialY
        };
        this.image = image;
        this.moves = [];
    }
}

class Pawn extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        if (this.color == "black") {
            if (this.initalMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y + 2
                })
            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y + 1
            })
            const box1 = document.querySelector(`div[data-cords="${this.currentPos.x + 1},${this.currentPos.y + 1}"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y + 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y + 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y + 1
                })
            }
        } else {
            if (this.initalMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y - 2
                })
            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y - 1
            })
            const box1 = document.querySelector(`div[data-cords="${this.currentPos.x + 1},${this.currentPos.y - 1}"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y - 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y - 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y - 1
                })
            }
        }
        showMoves(this)
       
    }
}
class Rook extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            validateRookMoves(this)
            showMoves(this);
            return;
        }
        let x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8
            }
            this.moves.push({ x: newX, y: this.currentPos.y });
            x--;
        }

        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8;
            }
            this.moves.push({ x: this.currentPos.x, y: newY })
            y--;
        }
        let validatedMoves = validateRookMoves(this)
        this.moves = validatedMoves;
        showMoves(this);
    }
}

class Knight extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            validateRookMoves(this);
            showMoves(this);
            return;
        }
        let newX, newY;
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });

        showMoves(this);
    }
}
class Bishop extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let x = 7, y = 1;
        let newX, newY;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            x--;
        }
        while (y < 7) {
            newX = this.currentPos.x - y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            y++;
        }

        x = 7, y = 1;

        while (y < 7) {
            newX = this.currentPos.x + y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            y++;
        }
        while (x > 0) {
            newX = this.currentPos.x - x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            x--;
        }
        let validatedMoves = validateBishopMoves(this)
        this.moves = validatedMoves;
        showMoves(this);
    }
}
class Queen extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let x = 7, y = 1;
        let newX, newY;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            x--;
        }
        while (y < 7) {
            newX = this.currentPos.x - y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            y++;
        }

        x = 7, y = 1;

        while (y < 7) {
            newX = this.currentPos.x + y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            y++;
        }
        while (x > 0) {
            newX = this.currentPos.x - x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY })
            x--;
        }
        x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8
            }
            this.moves.push({ x: newX, y: this.currentPos.y });
            x--;
        }

        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8;
            }
            this.moves.push({ x: this.currentPos.x, y: newY })
            y--;
        }
        this.moves = [...validateBishopMoves]
        showMoves(this)
    }

}

class King extends Piece {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let newX, newY;
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        showMoves(this);
    }
}

const pb2 = new Pawn("black", "Black Pawn", 2, 2, "./media/b_pawn.svg");
const pb1 = new Pawn("black", "Black Pawn", 1, 2, "./media/b_pawn.svg");
const pb3 = new Pawn("black", "Black Pawn", 3, 2, "./media/b_pawn.svg");
const pb4 = new Pawn("black", "Black Pawn", 4, 2, "./media/b_pawn.svg");
const pb5 = new Pawn("black", "Black Pawn", 5, 2, "./media/b_pawn.svg");
const pb6 = new Pawn("black", "Black Pawn", 6, 2, "./media/b_pawn.svg");
const pb7 = new Pawn("black", "Black Pawn", 7, 2, "./media/b_pawn.svg");
const pb8 = new Pawn("black", "Black Pawn", 8, 2, "./media/b_pawn.svg");

const pw1 = new Pawn("white", "white Pawn", 1, 7, "./media/w_pawn.svg");
const pw2 = new Pawn("white", "white Pawn", 2, 7, "./media/w_pawn.svg");
const pw3 = new Pawn("white", "white Pawn", 3, 7, "./media/w_pawn.svg");
const pw4 = new Pawn("white", "white Pawn", 4, 7, "./media/w_pawn.svg");
const pw5 = new Pawn("white", "white Pawn", 5, 7, "./media/w_pawn.svg");
const pw6 = new Pawn("white", "white Pawn", 6, 7, "./media/w_pawn.svg");
const pw7 = new Pawn("white", "white Pawn", 7, 7, "./media/w_pawn.svg");
const pw8 = new Pawn("white", "white Pawn", 8, 7, "./media/w_pawn.svg");

const rb1 = new Rook("black", "black Rook", 1, 1, "./media/b_rook.svg");
const rb2 = new Rook("black", "black Rook", 8, 1, "./media/b_rook.svg");
const rw1 = new Rook("white", "white Rook", 1, 8, "./media/w_rook.svg");
const rw2 = new Rook("white", "white Rook", 8, 8, "./media/w_rook.svg");

const knb1 = new Knight("black", "black Knight", 2, 1, "./media/b_knight.svg");
const knb2 = new Knight("black", "black Knight", 7, 1, "./media/b_knight.svg");
const knw1 = new Knight("white", "white Knight", 2, 8, "./media/w_knight.svg");
const knw2 = new Knight("white", "white Knight", 7, 8, "./media/w_knight.svg");


const bhb1 = new Bishop("black", "black Bishop", 3, 1, "./media/b_bishop.svg");
const bhb2 = new Bishop("black", "black Bishop", 6, 1, "./media/b_bishop.svg");
const bhw1 = new Bishop("white", "white Bishop", 3, 8, "./media/w_bishop.svg");
const bhw2 = new Bishop("white", "white Bishop", 6, 8, "./media/w_bishop.svg");


const qb1 = new Queen("black", "black queen", 4, 1, "./media/b_queen.svg");
const qw2 = new Queen("white", "white queen", 4, 8, "./media/b_queen.svg");


const kb1 = new King("black", "black king", 5, 1, "./media/w_king.svg");
const kw2 = new King("white", "white king", 5, 8, "./media/w_king.svg");





const peiceArr = [pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8, pw1, pw2, pw3, pw4, pw5, pw6, pw7, pw8, rb1, rb2, rw1, rw2, knb1, knb2, knw1, knw2, bhb1, bhb2, bhw1, bhw2, qb1, qw2, kb1, kw2];
const boxes = document.getElementsByClassName("box");
peiceArr.forEach(p => {
    for (const box of boxes) {
        if (p.initialPos.x == box.dataset.xindex && p.initialPos.y == box.dataset.yindex) {
            box.firstChild.setAttribute("src", p.image);
            box.setAttribute("data-name", p.name);
            box.setAttribute("data-color", p.color);
            box.addEventListener("mouseenter", p.getPossibleMoves)
            box.addEventListener("mouseleave", () => resetPossibleMoves(p))
        }
    }
})


for (const box of boxes) {
    if (box.dataset.name == "" || box.dataset.name == null || box.dataset.name == undefined) {
        box.firstElementChild.classList.add("hideImg");
    }
}

const findDistance = (a, b) => {
    return Math.sqrt((Math.pow(a.x - b.x), 2) + (Math.pow(a.y - b.y), 2));
}

const filterDirections = (directions,piece) => {
    let newMoves = [];
    for (const dir in directions) {
        for (const d of directions[dir]) {
            const box = document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
            const color = box.dataset.color;
            if(color != "" && color != undefined && color != null) {
                // if(color == piece.color) break;
                newMoves.push(d);
                break;
            } else {
                newMoves.push(d);
            }
        }
    }
    return newMoves;
}


const validateRookMoves = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => findDistance(a, current) - findDistance(b, current));
    let directions = {
        up: [],
        down: [],
        left: [],
        right: []
    }
    moves.forEach(m => {
        if (m.y > current.y && m.x == current.x) {
            directions.down = [...directions.down, m]
        }
        if (m.y < current.y && m.x == current.x) {
            directions.up = [...directions.up, m]
        }
        if (m.y == current.y && m.x > current.x) {
            directions.right = [...directions.right, m]
        }
        if (m.y == current.y && m.x < current.x) {
            directions.left = [...directions.left, m]
        }
    })
    return filterDirections(directions, piece);
}

const validateBishopMoves = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => findDistance(a, current) - findDistance(b, current));
    let directions = {
        upRight: [],
        upLeft: [],
        downLeft: [],
        downRight: []
    }
    moves.forEach(m => {
        if (m.x > current.x && m.y < current.y) {
            directions.upRight = [...directions.upRight, m]
        }
        if (m.x < current.x && m.y < current.y) {
            directions.upLeft = [...directions.upLeft, m]
        }
        if (m.x > current.x && m.y > current.y) {
            directions.downLeft = [...directions.downLeft, m]
        }
        if (m.x < current.x && m.y > current.y) {
            directions.downRight = [...directions.downRight, m]
        }
    })
    return filterDirections(directions, piece);
}
