"use strict";
class Particle
{
  constructor(pos,color,size,ttl)
  {
      this.vel = createVector(random(-1, 1), random(-1, 1));
      this.pos = pos.copy();
      this.ttl = 90;
      this.color = 255;

      if(color)
      {
          this.color = color;
      }
      if(size)
      {
        this.size = size;
      }
      if(ttl)
      {
        this.ttl = ttl;
      }
      let ttlVariation = 10
      this.ttl = this.ttl + random(-ttlVariation, ttlVariation) //slight variation in particle lifetime
  }

  updateAndRender()
  {
    if(this.ttl > 0)
    {
        stroke(this.color);
        strokeWeight(this.size);
        point(this.pos.x,this.pos.y);

        this.ttl--;
        this.pos.add(this.vel);

        if(!onCanvas(this.pos.x,this.pos.y))
        {
            this.ttl=0;
        }
    }
  }
}

class ParticleSystem
{
    constructor()
    {
        this._size = 10000
        this._particles =  Array(this._size).fill(null);
        this._nextPos = 0;
        this.countParticles = true;
        this.particleCount = 0;
    }

    addParticle(pos,color,size,ttl)
    {
      this._particles[this._nextPos] = new Particle(pos,color,size,ttl);
      this._nextPos++;
      if(this._nextPos >= this._size)
      {
        this._nextPos = 0;
      }
    }

    addParticleSpray(pos,color,size,ttl,count)
    {
        if(count)
        {
            for(let i=0;i<count;i++)
            {
                this.addParticle(pos,color,size,ttl);
            }
        }
    }

    run()
    {
       this.particleCount=0;
       for(let i = 0; i < this._particles.length; i++)
       {
         let p = this._particles[i];
         if(p != null)
         {
           p.updateAndRender();
           if(this.countParticles && p.ttl > 0)
           {
               this.particleCount++;
           }
         }
       }
    }
}