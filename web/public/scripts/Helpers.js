function clearScreen(color) {
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);    
}

function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randRGBA(alpha) {
    return {r: randRange(0, 250), g: randRange(0, 250), b: randRange(0, 250), a: alpha};
}

function isCollision(a, b) {
    //Returns true if the distance between the two circle points
    //is less that the sum of each a, and b's radii.
    let xDist = a.x - b.x;
    let yDist = a.y - b.y;
    let distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
    if(distance <= a.radius + b.radius) {
        return true;
    }
    return false;
}

function rotate(velocity, angle) {
    let rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function computeCollision(a, b) {
    const xVelocityDiff = a.velocity.x - b.velocity.x;
    const yVelocityDiff = a.velocity.y - b.velocity.y;

    const xDist = b.x - a.x;
    const yDist = b.y - a.y;

    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(b.y - a.y, b.x - a.x);

        const m1 = a.mass;
        const m2 = b.mass;

        const u1 = rotate(a.velocity, angle);
        const u2 = rotate(b.velocity, angle);

        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        a.velocity.x = vFinal1.x;
        a.velocity.y = vFinal1.y;

        b.velocity.x = vFinal2.x;
        b.velocity.y = vFinal2.y;
    }
}