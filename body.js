function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(1);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}


class Body {
    constructor(id, m, r, x, y, vx, vy) {
        // console.log('x,y', x, y,);
        this.id = id;
        this.m = m;
        this.radius = r;
        this.v = createVector(vx, vy);
        this.vhalf = null;
        this.r = createVector(x, y);
        // console.log('r vector:', this.r);
        this.deltat = 0.1;
        this.G = 1000;
        // console.log(this);
    }

    logVector(vector) {
        let logObj = { 'x': vector == null ? null : vector.x, 'y': vector == null ? null : vector.y }
        return JSON.parse(JSON.stringify(logObj))
    }
    log() {
        const objToLog = {
            'id': this.id, 'm': this.m, 'radius': this.radius,
            'v': this.logVector(this.v), 'vhalf': this.logVector(this.vhalf),
            'r': this.logVector(this.r), 'rnext': this.logVector(this.rnext), 'deltat': this.deltat, 'G': this.G
        }

        console.log(JSON.parse(JSON.stringify(objToLog)))
    }


    display() {
        stroke(255);
        fill(255, 100);
        ellipse(this.r.x, this.r.y, this.radius * 2, this.radius * 2);

        this.v.mag() !== 0 && drawArrow(this.r, this.v, 255);
    }

    distance(body2) {
        return Math.sqrt((this.r.x - body2.pos.x)(this.r.x - body2.pos.x) + (this.r.y - body2.pos.y) * (this.r.y - body2.pos.y));
    }

    overlaps(body2) {
        console.log('overlaps')
        const distance = this.distance(body2);
        return (this.radius + body2.r) >= distance;
    }

    force(body2, presentPosition) {
        // console.log(body2);
        if (this.id == body2.id) { return createVector(0, 0) }

        // console.log('force for body', this.id, 'and', body2.id)
        // this.log()
        const r21 = body2.r.copy().sub(presentPosition ? this.r : this.rnext);
        // console.log('r21', r21);
        // this.log()
        // body2.log()
        let f21 = r21.copy().normalize();
        // console.log('r21 vector:', r21, r21.magSq());
        const forceMag = this.m * body2.m * this.G / r21.magSq();

        const returnForceVect = f21.mult(forceMag);
        // console.log('force:', returnForceVect)
        // console.log('forceMag', forceMag)
        return returnForceVect;
    }

    getAcceleration(bodies, presentPosition = true) {
        // console.log('accel for id:', this.id)
        // console.log('accel body')
        // this.log();
        let a = createVector(0, 0);
        for (let body of bodies) {
            const df = this.force(body, presentPosition);
            a = a.add(df.div(this.m));
        }
        // console.log('acceleration:', a)
        return a;
    }
    updateR(bodies) {
        // console.log('Update r with id:', this.id);

        const a = this.getAcceleration(bodies);

        this.vhalf = this.v.copy().add(a.mult(this.deltat / 2));
        this.rnext = this.r.copy().add(this.vhalf.copy().mult(this.deltat));

    }

    updateVelocity(bodies) {
        // console.log('Update velocity for id', this.id);
        const a = this.getAcceleration(bodies, false);
        this.v = this.vhalf.copy().add(a.mult(this.deltat / 2));
        this.r = this.rnext.copy();
    }
}


class Coso {
    constructor(a) {
        this.a = a
    }

    updateA(items) {
        this.a = items.length;
    }
}