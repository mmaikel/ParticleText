function Particle(x, y, z) {
  this.pos = createVector(
      random(100, width+350), 
      random(-200, height+200), 
      random(500, 1000)
  );
  this.target = createVector(x, y, z);
  this.vel = p5.Vector.random3D();
  this.acc = createVector();
  this.r = 1.2;
  this.maxSpeed = 10;
  this.maxForce = 0.5;
}

    Particle.prototype.behaviors = function() {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY, 0);
        var flee = this.flee(mouse);
        flee.mult(5);
        this.applyForce(arrive);
        this.applyForce(flee);
    }
    
    Particle.prototype.applyForce = function(force) {
        this.acc.add(force)
    }
    
    Particle.prototype.update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    
    Particle.prototype.arrive = function(target) {
        var desired = p5.Vector.sub(target, this.pos);
        var dm = desired.mag();
        var speed = this.maxSpeed;
        if (dm < 100) {
            speed = map(dm, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        
        return steer;
    }
    
    Particle.prototype.flee = function(target) {
        var desired = p5.Vector.sub(target, this.pos);
        var dm = desired.mag();
        var speed = this.maxSpeed;
        if (dm < 50) {
            speed = map(dm, 0, 100, 0, this.maxSpeed);
        
        desired.setMag(speed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        steer.add(0, 0, random(-1, 2));
        return steer;
        } 
        else return createVector(0, 0);
    }
    
    Particle.prototype.show = function() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        box(this.r, this.r, this.r);   
        pop();
    }
    
    Particle.prototype.blow = function(f) {
        this.applyForce(
            createVector(random(-f,f),random(-f,f), random(-f,f))
        );
    }