class Text {
    constructor(x, y, str, font, size, color, maxWidth = 100000) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.size = size;
        this.str = str;
        this.color = color;
        this.maxWidth = maxWidth;
    }
    draw() {
        c.textAlign = "center";
        c.font = `${this.size}px ${this.font}`;
        c.fillStyle = this.color;
        c.fillText(this.str, this.x, this.y, this.maxWidth);
    }
    update() {
        this.draw();
    }
    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }
}

function updateTexts() {
    for(let i = 0; i < texts.length; i++) {
        texts[i].update();
    }
}

function generateTexts() {
    //Title Text
    texts.push(new Text(canvas.width / 2, canvas.height / 2, "Jeff's Repo-Site", "monospace", 100, "white"));
}
