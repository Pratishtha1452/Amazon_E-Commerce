class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo(){
    const trunk = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model} km/hr${this.speed} ${trunk}`);
  }
  go(){
    if(this.isTrunkOpen){return};
    this.speed += 5;
    if(this.speed > 200) {this.speed = 200};
    
  }
  brake(){
    this.speed -= 5;
    if(this.speed < 0) {this.speed = 0};   
  }
  openTrunk(){
    this.isTrunkOpen = true;
    if(this.speed != 0){
    this.isTrunkOpen = false;
    }
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
  go(){
    this.speed += this.acceleration;
    if(this.speed > 300){
      this.speed = 300;
    }
  }
  openTrunk(){
    console.log('RaceCars do not have a trunk')
  }
  closeTrunk(){
    console.log('Racecars do not have a trunk')
  }
}

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});
const car1 = new Car({
  brand : 'Toyota',
  model : 'Corolla'
});

const car2 = new Car({
  brand : 'tesla',
  model : 'model 3'
});

console.log(car1);
console.log(car2);

car1.go();
car1.brake();
car1.brake();
for(let i = 0; i < 102; i++){
  car1.go();
}

car1.displayInfo();
car2.displayInfo();

raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();