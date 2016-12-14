var rotateY = 0
var rotateX = 0
var perspective = 1000
var perspectiveOrigin = 50
var backfaceVisibility = true
var transformOrigin = 50
function show3d(type, value) {
  document.getElementById(type).innerHTML = type + '(' + value + ')'
  var state = document.getElementById('stage')
  var camera = document.getElementById('camera')
  var cube = document.getElementsByClassName('cube')
  var translateZ = 0
  var rotate3d = 0
  console.log(cube)
  switch (type) {
    case 'rotateY':
      rotateY = value
      state.style.transform = 'rotateY(' + value + 'deg) rotateX(' + rotateX + 'deg)'
      break
    case 'rotateX':
      rotateX = value
      state.style.transform = 'rotateY(' + rotateY + 'deg) rotateX(' + value + 'deg)'
      break
    case 'rotate3d':
      rotate3d = value;
      state.style.transform = 'rotate3d(1,1,1,' + value + 'deg)'
    case 'perspective':
      perspective = value
      camera.style.perspective = value + 'px'
      break
    case 'perspectiveOrigin':
      perspectiveOrigin = value
      camera.style.perspectiveOrigin = value + '% ' + value + '%'
    case 'transformOrigin':
      transformOrigin = value
      state.style.transformOrigin = value + '% ' + value + '%'
      break
    case 'translateZ':
      translateZ = value
      state.style.transform = 'translateZ(' + value + 'px)'
      break
    case 'backfaceVisibility':
      cube[0].style.backfaceVisibility = value ? 'visible' : 'hidden'
      cube[1].style.backfaceVisibility = value ? 'visible' : 'hidden'
      cube[2].style.backfaceVisibility = value ? 'visible' : 'hidden'
      cube[3].style.backfaceVisibility = value ? 'visible' : 'hidden'
      cube[4].style.backfaceVisibility = value ? 'visible' : 'hidden'
      cube[5].style.backfaceVisibility = value ? 'visible' : 'hidden'

      for (let j = 0; j++; j < cube.length) {
        cube[j].style.backfaceVisibility = value ? 'visible' : 'hidden'
      }
      break
  }
  state.style.transition = 'all 5s'
}


var toggleAnim = document.querySelector('.toggleAnim');
var ball1 = document.getElementsByClassName('ball1');
var ball2 = document.getElementsByClassName('ball2');
var animating = false;

toggleAnim.addEventListener('click', function (e) {
  animating = !animating;
  toggleAnim.textContent = animating ? 'Stop' : 'Start';

  Array.prototype.forEach.call(ball1, function (ball) {
    ball.className = animating ? 'ball ball1 ball1-running' : 'ball ball1';
  });

  Array.prototype.forEach.call(ball2, function (ball) {
    ball.className = animating ? 'ball ball2 ball2-running' : 'ball ball2';
  });
});