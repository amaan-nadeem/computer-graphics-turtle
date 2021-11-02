class GeneralNavigation extends Turtle {
  static drawnString;
  static scene;

  constructor(point, initAngle, scene) {
    super(point, initAngle);
    this.drawnString = [];
    this.scene = scene;
  }

  produceString(atom, ruleTerminal, rule, order) {
    let atomString = atom;
    let modifiedString = [];
    for (let i = 0; i < order; i++) {
      modifiedString = []
      for (let j = 0; j < atomString.length; j++) {
        switch (atomString[j]) {
          case ruleTerminal:
            modifiedString.push(rule);
            break;
          default:
            modifiedString.push(atomString[j])
            break;
        }
      }
      atomString = modifiedString.join("")
    }
    return modifiedString.join("");
  }
  drawStringThroughProducedString(string, turnAngle) {
    let forward = 0;
    let point, initAngle;
    point = new THREE.Vector2(0, 0);
    initAngle = 0;
    t = new Turtle(point, initAngle);
    for (let char of string) {
      switch (char.toLowerCase()) {
        case "f":
          forward++;
          t.forward(forward, true);
          break;
        case "+":
          t.turn(turnAngle);
          forward = 0;
          break;
        case "-":
          t.turn(-turnAngle);
          forward = 0;
          break;
        default:
          break;
      }
    }
    this.scene.add(t.drawTurtle());
  }

  drawString(turnAngle) {
    let forward = 0;
    let point, initAngle;
    point = new THREE.Vector2(0, 0);
    initAngle = 0;
    t = new Turtle(point, initAngle);
    for (let char of this.drawnString) {
      switch (char) {
        case "f":
          forward++;
          t.forward(forward, true);
          break;
        case "+":
          t.turn(turnAngle);
          forward = 0;
          break;
        case "-":
          t.turn(-turnAngle);
          forward = 0;
          break;
        default:
          break;
      }
    }
    this.scene.add(t.drawTurtle());
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
          this.drawString(90);

        default:
          break;
      }
    });
  }
}
