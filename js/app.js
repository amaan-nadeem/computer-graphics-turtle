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

  // Tree
  // const map = {
  //   atom: "F+F",
  //   rule: {},
  //   F: "FF-[-F+F+F]+[+F-F-F]",
  //   angle: 30,
  //   startAngle: 90,
  //   order: 5,
  // };

  // const map = {
  //   atom: "F",
  //   rule: {},
  //   F: "F[-FF]F[+FF]F",
  //   angle: 25,
  //   startAngle: 45,
  //   order: 5,
  // };

  // const map = {
  //   atom: "X",
  //   rule: {},
  //   X: "F[-X][+X]",
  //   angle: 25,
  //   startAngle: 45,
  //   order: 5,
  // };

  // const map = {
  //   atom: "F++F++F",
  //   rule: {},
  //   F: "F-F++F-F",
  //   angle: 60,
  //   order: 4
  // };

  // const map = {
  //   atom: "F",
  //   rule: {},
  //   F: "F[+F[+F][-F]F][-F[+F][-F]F]F[+F][-F]F",
  //   angle: 30,
  // };

  // const map = {
  //   atom: "X",
  //   rule: {},
  //   X: "F[+X][-X]FX",
  //   F: "FF",
  //   angle: 25,
  // };

  // const map = {
  //   atom: "FX",
  //   rule: {},
  //   Y: "-FX-Y",
  //   X: "X+YF+",
  //   angle: 90,
  //   order: 9
  // };

  const map = {
    atom: "X",
    rule: {},
    F: "FF",
    X: "F-[[X]+X]+F[+FX]-X",
    angle: 22.5,
    order: 5,
  };

  // const map = {
  //   atom: "F",
  //   rule: {},
  //   X: "-F+X+F-",
  //   F: "+X-F-X+",
  //   angle: 60,
  //   order: 7
  // };

  const generalNavigation = new GeneralNavigation(point, initAngle, scene);
  const modifiedAtomString = generalNavigation.produceString(
    map.atom,
    map,
    map.order
  );
  console.log("modifiedAtomString >>>", modifiedAtomString);
  generalNavigation.generateString();

  generalNavigation.drawStringThroughProducedString(
    modifiedAtomString,
    map.angle
  );
}

function animate() {
  requestAnimationFrame(animate);

  fac.renderScene();
}
