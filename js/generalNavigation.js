class GeneralNavigation extends Turtle {
  static drawnString;
  static scene;

  constructor(point, initAngle, scene) {
    super(point, initAngle);
    this.drawnString = [];
    this.scene = scene;
  }

  produceString(atom, map, order) {
    let atomString = atom;
    let modifiedString = [];
    for (let i = 0; i < order; i++) {
      modifiedString = []
      for (let j = 0; j < atomString.length; j++) {
        if(map[atomString[j]]){
          modifiedString.push(map[atomString[j]]);
        } else {
          modifiedString.push(atomString[j])
        }
      }
      atomString = modifiedString.join("")
    }
    return modifiedString.join("");
  }

  turnLeft(angle){
    this.CD += angle
  }
  turnRight(angle){
    this.CD -= angle;
  }

  drawStringThroughProducedString(string, turnAngle) {
    let forward = 1
    console.log("drawnString >>>", this.CD);
    for (let char of string) {
      switch (char.toLowerCase()) {
        case "f":
          this.forward(forward, true);
          break;
        case "+":
          this.turnLeft(turnAngle);
          break;
        case "-":
          this.turnRight(turnAngle);
          break;
        default:
          break;
      }
    }
    this.scene.add(this.drawTurtle());
  }

  drawString(turnAngle) {
    let forward = 1
    for (let char of this.drawnString) {
      console.log("drawnString >>>", this.CP);
      switch (char.toLowerCase()) {
        case "f":
          this.forward(forward, true);
          break;
        case "+":
          this.turnLeft(turnAngle);
          break;
        case "-":
          this.turnRight(turnAngle);
          break;
        default:
          break;
      }
    }
    this.scene.add(this.drawTurtle());
  }
  generateString() {
    const element = document.querySelector(".body");
    element.addEventListener("click", (e) => {
      console.log("hello world", e);
    });
    element.addEventListener("keydown", (evt) => {
      console.log("evt.key >>>", evt.key);
      switch (evt.key) {
        case "f":
          this.drawnString.push("f");
          console.log("forward >>>");
          break;
        case "+":
          this.drawnString.push("+");
          console.log("right turn >>>");
          break;
        case "-":
          this.drawnString.push("-");
          console.log("left turn >>>");
          break;
        case "Enter":
          this.drawString(60);

        default:
          break;
      }
    });
  }
}
