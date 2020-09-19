function Body(m, r, x, y, vx, vy) {
    this.m = m;
    this.r = r;
    this.pos = createVector(x,y);
    this.v = createVector(vx,vy);
    this.deltat = 0.1; 

    this.display = () => {
        stroke(255);
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    this.distance = (body2) => {
        return Math.sqrt((this.pos.x - body2.pos.x)(this.pos.x - body2.pos.x) + (this.pos.y - body2.pos.y) * (this.pos.y - body2.pos.y));
    }

    this.overlaps = (body2) => {
        const distance = this.distance(body2);
        return (this.r + body2.r) >= distance;
    }

    this.getAcceleration = ()=> {

    }

    this.update = (forcex, forcey, deltat)=>{
        const ax = forcex/this.m;
        const ay = forcey/this.m;

        const vhalfx = this.vx + ax*this.deltat/2;
        const vhalfy = this.vy + ay*this.deltat/2;

        this.x = this.x + vhalfx*this.deltat;
        this.y = this.y + vhalfy*this.deltat;

        this.vx = vhalfx + ax
    }
}