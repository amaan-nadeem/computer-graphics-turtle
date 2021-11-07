const scene = new THREE.Scene();

var fac = new factory(0, 5, 50, 100); //factory arguments (position_X, position_Y, position_Y, Length)

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

initialize();

animate();
//Declare or Initialize variables here..
var point,
  initAngle = 0,
  t;

//Code your logic here..
function initialize() {
  point = new THREE.Vector2(0, 0);
  initAngle = 90;

  const map = {
    atom: "F+F",
    rule: {},
    F: "FF-[-F+F+F]+[+F-F-F]",
    X: "FF-[-F+F+F]+[+F-F-F]",
    angle: 30,
    order: 5,
  };

  const generalNavigation = new GeneralNavigation(point, initAngle, scene);
  const modifiedAtomString = generalNavigation.produceString(map.atom, map, 2);
  console.log("modifiedAtomString >>>", modifiedAtomString);
  generalNavigation.generateString();
  generalNavigation.drawStringThroughProducedString(modifiedAtomString, 30);
}

function animate() {
  requestAnimationFrame(animate);

  fac.renderScene();
}
