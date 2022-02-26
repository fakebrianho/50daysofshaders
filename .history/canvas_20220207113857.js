let framerate = 30;var capturer = new CCapture( {  format: 'webm',  framerate,  name: 'noise_visualization',  quality: 100,} );

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
sandbox.load(day05_00);
sandbox.setUniform('image2', 'k3.jpg');
sandbox.setUniform('disp2', 'displacement1.jpg');
sandbox.setUniform('water', 'artem-militonian-UYW6FZLlnL8-unsplash.jpg');
sandbox.setUniform('image3', 'jb.jpg');
sandbox.setUniform('image4', 'j2.jpg');
sandbox.setUniform('jb', 'jb.jpg');
sandbox.setUniform('j2', 'j2.jpg');
