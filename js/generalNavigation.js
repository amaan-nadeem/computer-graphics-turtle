class GeneralNavigation extends Turtle {
  static drawnString;
  static scene;
  static isStorePoints;
  static storedPoints;
  static storedPattern;
  static childParentTree;
  static childParentTreeIndex;
  static childParentTreeLevels;
  static levels;

  constructor(point, initAngle, scene) {
    super(point, initAngle);
    this.drawnString = [];
    this.isStorePoints = false;
    this.storedPoints = [];
    this.storedPattern = [];
    this.childParentTree = [];
    this.isStorePointsArray = [];
    this.childParentTreeIndex = -1;
    this.childParentTreeLevels = 1;
    this.levels = 0;
    this.scene = scene;
  }

  produceString(atom, map, order) {
    let atomString = atom;
    let modifiedString = [];
    for (let i = 0; i < order; i++) {
      modifiedString = [];
      for (let j = 0; j < atomString.length; j++) {
        if (map[atomString[j]]) {
          modifiedString.push(map[atomString[j]]);
        } else {
          modifiedString.push(atomString[j]);
        }
      }
      atomString = modifiedString.join("");
    }
    return modifiedString.join("");
  }

  turnLeft(angle) {
    this.CD += angle;
  }
  turnRight(angle) {
    this.CD -= angle;
  }

  storeBrackets(bracket) {
    // const levels = this?.childParentTree?.[this.childParentTreeIndex]?.levels;
    // const childParentTreeIndex = this.childParentTreeIndex;
    // const currentLevelObj = this.childParentTree?.[childParentTreeIndex];
    if (bracket == "[") {
      if (this.isStorePoints) {
        this.storedPoints.push(false);
        this.levels = this.levels + 1;
        // this.childParentTree[childParentTreeIndex] = {
        //   ...currentLevelObj,
        //   levels: levels + 1,
        //   actualLevels: levels + 1,
        // };
      } else {
        // console.log("levels >>>", levels);
        // if (levels > 1) {
        //   this.childParentTree[childParentTreeIndex] = {
        //     ...currentLevelObj,
        //     levels: levels - 1,
        //     actualLevels: levels + 1,
        //   };
        // } else {
        //   this.childParentTreeIndex = this.childParentTreeIndex + 1;
        //   this.childParentTree[this.childParentTreeIndex] = {
        //     bracket: "[",
        //     levels: 1,
        //   };
        // }
      }
      console.log("");
      this.levels = 1;
      this.isStorePoints = true;
    } else {
      this.levels = this.levels - 1;
      this.isStorePoints = false;
    }
  }

  savePattern(char) {
    // const levels = this?.childParentTree?.[this.childParentTreeIndex]?.levels;
    // const childParentTreeIndex = this.childParentTreeIndex;
    // const currentLevelObj = this.childParentTree?.[childParentTreeIndex];

    if (this.isStorePoints) {
      this.storedPoints.push(this.CP);
      this.storedPattern.push(char);

      // if (!currentLevelObj[levels]) {
      //   this.childParentTree[childParentTreeIndex][levels] = [char];
      // } else {
      //   this.childParentTree[childParentTreeIndex] = {
      //     ...currentLevelObj,
      //     [levels]: [...currentLevelObj[levels], char],
      //   };
      // }
    }
  }
  restorePattern() {
    // console.log("this.storedPoints.slice(0, i)", this.storedPoints);
    let isNotEmpty = false;
    for (let i = this.storedPoints.length - 1; i > 0; i--) {
      const point = this.storedPoints[i];
      if (!point) {
        const storedPoints = [...this.storedPoints.slice(0, i)];
        this.storedPoints = [...storedPoints];
        this.storedPattern = this.storedPattern.slice(0, i);
        // console.log("point index >>>", {
        //   storedPoints: JSON.parse(JSON.stringify(this.storedPoints)),
        // });
        isNotEmpty = true;
        // break;
      } else {
        this.path.lineTo(point.x, point.y);
        this.CP = point;
      }
    }
    // console.log("this.storedPoints", {
    //   storedPoints: JSON.parse(JSON.stringify(this.storedPoints)),
    //   storedPattern: JSON.parse(JSON.stringify(this.storedPattern)),
    //   childParentTree: JSON.parse(JSON.stringify(this.childParentTree)),
    // });
    if (!isNotEmpty) {
      this.storedPoints = [];
      this.storedPattern = [];
    }
  }
  drawStringThroughProducedString(string, turnAngle) {
    let forward = 1;

    for (let index in string) {
      const char = string[index];
      switch (char.toLowerCase()) {
        case "f":
          this.forward(forward, true);
          this.savePattern(char);
          break;
        case "+":
          this.turnLeft(turnAngle);
          this.savePattern(char);
          break;
        case "-":
          this.turnRight(turnAngle);
          this.savePattern(char);
          break;
        case "[":
          this.storeBrackets(char);
          break;
        case "]":
          this.storeBrackets(char);
          this.restorePattern();
          break;
        default:
          break;
      }
    }
    console.log("this >>>", {
      levels: this.levels,
    });
    this.scene.add(this.drawTurtle());
  }

  drawString(turnAngle) {
    let forward = 1;
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
