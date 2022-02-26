
const canvas = document.querySelector('div.canvas-holder canvas');
const sandbox = new GlslCanvas(canvas);

const calcSize = function () {
  console.log('asdf');
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let dpi = window.devicePixelRatio;

  let s = Math.min(vh, vw);

  canvas.width = s * dpi;
  canvas.height = s * dpi;
  canvas.style.width = s +'px';
  canvas.style.height = s +'px';

}
calcSize();

window.addEventListener('resize', calcSize);
sandbox.load(day00_05);
sandbox.setUniform('image2', 'k3.jpg');
sandbox.setUniform('disp2', 'displacement1.jpg');