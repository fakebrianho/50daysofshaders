const day10_00=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

void main(void)
{
    vec2 uv =  6.0 * v_texcoord;
    uv += vec2(0.7 / sin(uv.y + u_time + 0.3) + 0.8, 0.4 / sin(uv.x + u_time + 0.3) + 1.6);
    vec3 color = vec3(0.5 * sin(uv.x) + 0.5, 0.5 * sin(uv.y) + 0.5, sin(uv.x + uv.y));
    gl_FragColor = vec4(
        color,
        1.0);
}`

const day10_01=`#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

void main(void)
{
    vec2 uv =  6.0 * v_texcoord;
    for(int n = 1; n < 80; n++){
        float i = float(n);
        uv += vec2(0.7 / i *sin(i * uv.y * 2.0 + u_time + 300.3 * i) + 0.18, 0.4 / i * sin(uv.x + u_time * 2. + 0.3 * i) + 1.6);
    }
    
    vec3 color = vec3(0.5 * sin(uv.x) + 0.5, 0.5 * sin(uv.y) + 0.5, sin(uv.x + uv.y));
    gl_FragColor = vec4(
        color,
        1.0);
}`

const day10_02=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

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
    vec2 uv =  6.0 * v_texcoord;
    for(int n = 1; n < 80; n++){
        float i = float(n);
        uv += vec2(0.7 / i * sin(i * uv.y * 2.0 + u_time + 300.3 * i) + 0.18, 0.4 / i * sin(uv.x + u_time * 2. + 0.3 * i) + 1.6);
        uv.y *= sin(uv.x * u_time * 0.0003 + 0.7);
    }
    vec2 q = vec2(0.0);
    vec2 r = vec2(0.0);
    vec2 s = vec2(0.0);
    float f = pattern(uv, q, r, s);
    float mixer = smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f);
    vec3 color = vec3(0.5 * sin(uv.x) + 0.5, 0.5 * sin(uv.y) + 0.5, sin(uv.x + uv.y));
    vec3 color1 = vec3(0.933, 0.608, 0.0);
    vec3 color11 = vec3(0.792, 0.404, 0.08);
    vec3 color2 = mix(color1, color11, clamp((f*f), 0.2, 1.0));
//    color = mix(color, color2, mixer);
    gl_FragColor = vec4(
        color * color2,
        1.0);
}`