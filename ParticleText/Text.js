function Text(factor_) {
    this.particles = [];
    this.factor = factor_;
}

    Text.prototype.createText = function(tText_, tSize_, tWidth_) {
        var tSize = tSize_;
        var tText = tText_;
        var tWidth = tWidth_;
        translate(-width*0.5,-height*0.5, 0);

        var points = font.textToPoints(
            tText, 
            width*0.5-tWidth*0.5, 
            height*0.5, 
            tSize, {
            sampleFactor: this.factor
        });

        if (this.particles.length == 0) {
            for (var i = 0; i < points.length; i++) {
                var pt = points[i];
                var vehicle = new Particle(pt.x, pt.y, 0);
                this.particles.push(vehicle);
            }
        }
        else if(points.length >= this.particles.length) {

            for (var i = 0; i < points.length; i++) {
                var pt = points[i];

                if (i < this.particles.length) {
                    if (i > this.particles.length - 100)
                    this.particles[i].blow(20);
                    else this.particles[i].blow(6);
                    this.particles[i].target = createVector(pt.x, pt.y, 0);
                }
                else {
                    var vehicle = new Particle(pt.x, pt.y, 0);
                    this.particles.push(vehicle);
                }
            }
        }
        else if (points.length < this.particles.length) {

            for (var i = 0; i < this.particles.length; i++) {
                if (i < points.length) {
                    var pt = points[i];

                    this.particles[i].blow(10);
                    this.particles[i].target = createVector(pt.x, pt.y, 0);
                }
            }
        }

        var diff = this.particles.length - points.length;
        for(var i = 0; i < diff; i++) {
            this.particles.pop();
        }
    }

    Text.prototype.go = function() {
        translate(-width*0.5,-height*0.5, 0);
        for (var i = 0; i < this.particles.length; i++) {
        var v = this.particles[i];
        v.behaviors();
        v.update();
        v.show();    
      }
    }

    Text.prototype.light = function() {
        camera (
            (mouseX - width*0.5)/13, 
            0, 
            map(mouseY, 0, height*0.5, -200, 0)
        );
        
        pointLight(255, 0, 0, 0, 0, 1);
        directionalLight(255, 255, 0, 3, 2, 0.5);
        ambientMaterial(255);
    }