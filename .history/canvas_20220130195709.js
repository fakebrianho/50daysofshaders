let framerate = 30;
var capturer = new CCapture( {  format: 'webm',  framerate,  name: 'noise_visualization',  quality: 100,} );

const _canvas = document.querySelector('div.canvas-holder canvas');
const sandbox = new GlslCanvas(_canvas);
canvas = _canvas;

const calcSize = function () {
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let dpi = window.devicePixelRatio;

  let s = Math.min(vh, vw);

  _canvas.width = s * dpi;
  _canvas.height = s * dpi;
  _canvas.style.width = s +'px';
  _canvas.style.height = s +'px';
  capturer.start();
}
calcSize();

window.addEventListener('resize', calcSize);
sandbox.load(day02_01);
sandbox.setUniform('image2', 'k3.jpg');
sandbox.setUniform('disp2', 'displacement1.jpg');