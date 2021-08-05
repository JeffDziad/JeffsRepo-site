class Particle {
    constructor(x, y, radius, rgba, text = null, url = null) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgba = rgba;

        if(text != null) {
            this.text = text;
            this.url = url;
        }
        
        //Physics Vars
        this.mass = 1;
        this.velocity = {
            x: randRange(-1.5, 1.5),
            y: randRange(-1.5, 1.5)
        }
    }
    draw() {
        c.beginPath();
        c.fillStyle = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    }
    update() {
        this.mouseCollision();
        this.detectWallCollision();
        this.detectParticleCollision();

        //update text position
        if(this.text != null) {
            this.text.setCoords(this.x, this.y + 10);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        //Draw THIS particle & text
        this.draw();
    }
    mouseCollision() {
        //Check for mouse hover
        if(isCollision(this, {x: mouse.x, y: mouse.y, radius: 5})) {
            console.log(this.text.str + " collided with mouse!");
        }
    }
    detectWallCollision() {
        //Check for wall collisions
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }
        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }
    }
    detectParticleCollision() {
        //Check for collisions with other particles
        for(let i = 0; i < particles.length; i++) {
            if(particles[i] === this) { continue; }
            if(isCollision(this, particles[i])) {
                //Collision between two particles
                computeCollision(this, particles[i]);
            }
        }
    }
}

function updateParticles() {
    for(let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

function populateParticles() {
    for(let i = 0; i < links.length; i++) {
        let finished = false;
        let radius = randRange(100, 150);
        let x, y;
        while(!finished) {
            let collisionCount = 0;
            x = randRange(radius, canvas.width - radius);
            y = randRange(radius, canvas.height - radius);
            if(particles.length >= 1) {
                for(let j = 0; j < particles.length; j++) {
                     let p = particles[j];
                     if(isCollision(p, {x: x, y: y, radius: radius})) {
                         collisionCount++;
                     }
                }
            }
            if(collisionCount === 0) {
                finished = true;
            }else {
                finished = false;
            }
        }
        //Create Particle
        let l = links[i];
        let text = new Text(0, 0, l.str, "monospace", 25, "white");
        let randomColor = randRGBA(1);
        particles.push(new Particle(x, y, radius, randomColor, text));
        texts.push(text);
    }
}