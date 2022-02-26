const day06_00=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D water;
uniform sampler2D j2;
uniform sampler2D image3;
uniform sampler2D fire;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float noise( in vec2 p )
{
    return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.02;
    f += 0.1250*noise( p ); p = m*p*2.02;
    f += 0.0625*noise( p );
    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;
    f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
    f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
    f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
    f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.02;
    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2(fbm4(p), fbm4(p+vec2(7.8)));
}

vec2 fbm6_2( vec2 p )
{
    return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
}


float pattern( in vec2 p, out vec2 q, out vec2 r, out vec2 s )
{
    float movement1 = (0.01);
    float movement2 = (0.07);
    
    q.x = fbm6( p + vec2(0.0,0.0) + (u_time * movement1));
    q.y = fbm6( p + vec2(5.2,1.3) - (u_time * movement2));

    r.x = fbm4( p + 4.0*q + vec2(1.7,9.2) + u_time * movement2);
    r.y = fbm4( p + 4.0*q + vec2(8.3,2.8) - u_time * movement1);
//    
    s.x = fbm4( p + 4.0*r + vec2(13.7,9.2) + u_time * movement2);
    s.y = fbm4( p + 4.0*r + vec2(18.3,12.8) - u_time * movement1);

    return fbm6( p + 4.0*r );
}

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    
//    textCol.g = 0.0;
//    textCol.b = 0.0;
    vec2 q = vec2(0.0);
    vec2 r = vec2(0.0);
    vec2 s = vec2(0.0);
    float f = pattern(uv, q ,r, s);
    vec4 textCol = texture2D(water, sin(r) + cos(q) - sin(s));
    vec4 textCol2 = texture2D(j2, sin(r));
    vec4 textCol3 = texture2D(fire, sin(r) + cos(q));
    float mixer = smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f);
    vec4 monster = mix(textCol3, textCol, mixer); 
    float newR = mix(textCol.r, r.y, f);
    float newG = mix(textCol.g, q.x, f);
    float newB = mix(textCol.b, r.x, f);
    vec3 newColor = vec3(newR, newG, newB);
    vec3 noiseyBoy = vec3(textCol.r * f, textCol.g * f, textCol.b * f);
    vec3 color = vec3(1.0);
    
    gl_FragColor = vec4(noiseyBoy, textCol.a + f);
    textCol.r *= sin(u_time);
    gl_FragColor = vec4(textCol);
    gl_FragColor = vec4(monster);
//    gl_FragColor = vec4(newColor, 0.5);
}`


const day07_00=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 resolution;

varying vec2 v_texcoord;

#define NUM_OCTAVES 5

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float noise( in vec2 p )
{
    return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*snoise( p ); p = m*p*2.02;
    f += 0.2500*snoise( p ); p = m*p*2.02;
    f += 0.1250*snoise( p ); p = m*p*2.02;
    f += 0.0625*snoise( p );
    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;
    f += 0.500000*(0.5+0.5*snoise( p )); p = m*p*2.02;
    f += 0.500000*(0.5+0.5*snoise( p )); p = m*p*2.02;
    f += 0.500000*(0.5+0.5*snoise( p )); p = m*p*2.02;
    f += 0.250000*(0.5+0.5*snoise( p )); p = m*p*2.02;
    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2(fbm4(p), fbm4(p+vec2(7.8)));
}

vec2 fbm6_2( vec2 p )
{
    return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
}


float pattern( in vec2 p, out vec2 q, out vec2 r, out vec2 s )
{
    float movement1 = (0.01);
    float movement2 = (0.008);
    
    q.x = fbm6( p + vec2(0.0,0.0) + (u_time * movement1));
    q.y = fbm6( p + vec2(5.2,1.3) - (u_time * movement2));

    r.x = fbm4( p + 2.0*q + vec2(1.7,9.2) + u_time * movement2);
    r.y = fbm4( p + 2.0*q + vec2(8.3,2.8) - u_time * movement1);
//    
    s.x = fbm4( p + 2.0*r + vec2(13.7,9.2) + u_time * movement2);
    s.y = fbm4( p + 4.0*r + vec2(18.3,12.8) - u_time * movement1);

    return fbm6( p + 2.0*r );
}


void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    vec3 color1 = vec3(0.933, 0.608, 0.0);
    vec3 color11 = vec3(0.792, 0.404, 0.08);
    vec3 color2 = vec3(0.682, 0.125, 0.071);
    vec3 color22 = vec3(0.608, 0.133, 0.149);    
    vec3 color3 = vec3(0.0, 0.373, 0.451);
    vec3 color33 = vec3(0.39, 0.576, 0.588); 

    
    vec2 q = vec2(0.0);
    vec2 r = vec2(0.0);
    vec2 s = vec2(0.0);
    float f = pattern(uv, q, r, s);
    vec3 noiseyBoy = vec3(f);
    vec3 color = mix(color1, color11, clamp((f*f), 0.2, 1.0));
    color = mix(color, color2, clamp(length(q.x), 0.480, 0.92));
    color = mix(color, color22, clamp(length(q.y), 0.6, 0.87));
    color = mix(color, color2, vec3(q.x, 0.3, 0.6));
    color = mix(color, color22, vec3(q.y, 0.1, 0.8));
    color = mix(color, color3, vec3(r, 0.40));
    color = mix(color, color33, vec3(s, 0.30));
    gl_FragColor = vec4(color, 1.0);
}
`
const day07_01=`#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

void main(void)
{
    const float pi = 3.14159265359;
    float size = resolution.y / 1.0; // cell size in pixel
    vec2 uv = v_texcoord;
    vec2 test = gl_FragCoord.xy / resolution.y;
    vec2 p1 = gl_FragCoord.xy / size; // normalized pos
    vec2 p2 = fract(p1) - 0.5; // relative pos from cell center

    // random number
    float r2 = noise(uv);
    float rnd = noise(uv * u_time * 0.003 );
//    float rnd = dot(floor(p1), vec2(12.9898, 78.233));
//    rnd = fract(sin(rnd) * 43758.5453);

    // rotation matrix
    float phi = rnd * pi * 10. + u_time * 0.4 + 9000.;
    mat2 rot = mat2(cos(phi), -sin(phi), sin(phi), cos(phi));

    vec2 p3 = rot * p2 * 0.1; // apply rotation
//    vec2 p3 = p2;
    p3.y += sin(p3.x * 14. + u_time * 2.) * 0.009; // wave
    p3.x += cos(p3.y * 12. + u_time * 2.) * 0.007; // wave
//
    float rep = fract(rnd * 13.285) * 6. + 2.; // line repetition
//    float rep = r2;
//    float gr = fract(p3.y * p3.x *+ time * 0.08); // repeating gradient
    float gr = fract(p3.x *+ u_time * 0.008); // repeating gradient

    // make antialiased line by saturating the gradient
    float c = clamp((0.25 - abs(0.5 - gr)) * size * 0.75 / rep, 0., 1.);
//    c *= max(0., 1. - length(p2) * 0.6); // darken corners
//
//    vec2 bd = (0.5 - abs(p2)) * size - 2.; // border lines
//    c *= clamp(min(bd.x, bd.y), 0., 1.);
//    gr *= clamp(min(bd.x, bd.y), 0., 1.);

    gl_FragColor = vec4(c);
}`

const day07_02=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

void main(void)
{
    float starter = 4000.0 + u_time;
    const float pi = 3.14159265359;
    float size = resolution.y / 1.0; // cell size in pixel
    vec2 uv = v_texcoord;
    vec2 test = gl_FragCoord.xy / resolution.y;
    vec2 p1 = gl_FragCoord.xy / size; // normalized pos
    vec2 p2 = fract(p1) - 0.5; // relative pos from cell center

    // random number
    float r2 = noise(uv);
    float rnd = noise(uv * starter * 0.003);
//    float rnd = dot(floor(p1), vec2(12.9898, 78.233));
//    rnd = fract(sin(rnd) * 43758.5453);

    // rotation matrix
    float phi = rnd * pi * 10. + starter * 0.4;
    mat2 rot = mat2(cos(phi), -sin(phi), sin(phi), cos(phi));

//    vec2 p3 = rot * p2; // apply rotation
    vec2 p3 = p2;
    p3.y += sin(p3.x * 14. + starter * 2.) * 0.09; // wave
    p3.x += cos(p3.y * 12. + starter * 2.) * 0.07; // wave
//
    float rep = fract(rnd * 13.285) * 6. + 2.; // line repetition
//    float rep = r2;
//    float gr = fract(p3.y * p3.x *+ time * 0.08); // repeating gradient
    float gr = fract(p3.x *+ starter * 0.008); // repeating gradient

    // make antialiased line by saturating the gradient
    float c = clamp((0.25 - abs(0.5 - gr)) * size * 0.75 / rep, 0., 1.);
//    c *= max(0., 1. - length(p2) * 0.6); // darken corners
//
//    vec2 bd = (0.5 - abs(p2)) * size - 2.; // border lines
//    c *= clamp(min(bd.x, bd.y), 0., 1.);
//    gr *= clamp(min(bd.x, bd.y), 0., 1.);

    gl_FragColor = vec4(c);
}`

const day07_03=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

void main(void)
{
    const float pi = 3.14159265359;
    float size = u_resolution.y / 10.0; // cell size in pixel
    vec2 uv = v_texcoord;
    vec2 test = gl_FragCoord.xy / u_resolution.y;
    vec2 p1 = gl_FragCoord.xy / size; // normalized pos
    vec2 p2 = fract(p1) - 0.5; // relative pos from cell center

    // random number
//    float rnd = noise(uv * u_time * 0.003);
    float rnd = dot(floor(p1), vec2(12.9898, 78.233));
    rnd = fract(sin(rnd) * 43758.5453);

    // rotation matrix
    float phi = rnd * pi * 10. + u_time * 0.4;
    mat2 rot = mat2(cos(phi), -sin(phi), sin(phi), cos(phi));

    vec2 p3 = rot * p2; // apply rotation
//    vec2 p3 = p2;
    p3.y += sin(p3.x * 8. + u_time * 2.) * 0.12; // wave
    p3.x += cos(p3.y * 2. + u_time * 2.) * 0.12; // wave
//
    float rep = fract(rnd * 13.285) * 60. + 2.; // line repetition
    float gr = fract(p3.y * p3.x *+ u_time * 0.0028); // repeating gradient

    // make antialiased line by saturating the gradient
//    float c = clamp((0.25 - abs(0.5 - gr)) * size * 0.75 / rep, 0., 1.);
//    c *= max(0., 1. - length(p2) * 0.6); // darken corners
//
//    vec2 bd = (0.5 - abs(p2)) * size - 2.; // border lines
//    c *= clamp(min(bd.x, bd.y), 0., 1.);

    gl_FragColor = vec4(gr);
}`

const day07_04=`#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

void main(void)
{
    const float pi = 3.14159265359;
    float size = u_resolution.y / 10.0; // cell size in pixel
    vec2 uv = v_texcoord;
    vec2 test = gl_FragCoord.xy / u_resolution.y;
    vec2 p1 = gl_FragCoord.xy / size; // normalized pos
    vec2 p2 = fract(p1) - 0.5; // relative pos from cell center

    // random number
//    float rnd = noise(uv * time * 0.003);
    float rnd = dot(floor(p1), vec2(12.9898, 78.233));
    rnd = fract(sin(rnd) * 43758.5453);

    // rotation matrix
    float phi = rnd * pi * 10. + u_time * 0.4;
    mat2 rot = mat2(cos(phi), -sin(phi), sin(phi), cos(phi));

    vec2 p3 = rot * p2; // apply rotation
//    vec2 p3 = p2;
    p3.y += sin(p3.x * 8. + u_time * 2.) * 0.12; // wave
    p3.x += cos(p3.y * 2. + u_time * 2.) * 0.12; // wave
//
    float rep = fract(rnd * 13.285) * 60. + 2.; // line repetition
    float gr = fract(p3.y * p3.x *+ u_time * 0.0028); // repeating gradient

    // make antialiased line by saturating the gradient
//    float c = clamp((0.25 - abs(0.5 - gr)) * size * 0.75 / rep, 0., 1.);
//    c *= max(0., 1. - length(p2) * 0.6); // darken corners
//
//    vec2 bd = (0.5 - abs(p2)) * size - 2.; // border lines
//    c *= clamp(min(bd.x, bd.y), 0., 1.);

    gl_FragColor = vec4(gr);
}`