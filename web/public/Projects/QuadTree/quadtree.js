class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Rectangle {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x - this.w && point.x <= this.x + this.w && point.y >= this.y - this.h && point.y <= this.y + this.h);
    }

}

class QuadTree {

    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];

        this.divided = false;
    }

    insert(point) {
        if(!this.boundary.contains(point)) {
            return;
        }
        if(this.points.length < this.capacity) {
            this.points.push(point);
        }else {
            if(!this.divided) {
                this.subdivide();
            }
            this.northeast.insert(point);
            this.northwest.insert(point);
            this.southeast.insert(point);
            this.southwest.insert(point);
        }
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity);

        this.divided = true;
    }

    show() {
        stroke(255);
        noFill();
        rectMode(CENTER);
        strokeWeight(1);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if(this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        strokeWeight(4);
        for(let p of this.points) {
            point(p.x, p.y);
        }
    }

}