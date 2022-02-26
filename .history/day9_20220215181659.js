const day09_00=`
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
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

float rectangle(vec2 pos, vec2 edge, vec2 thickness){
    float edgeX = step(edge.x, pos.x + thickness.x * 0.5) - step(edge.x, pos.x - thickness.x * 0.5);
    float edgeY = step(edge.y, pos.y + thickness.y * 0.5) - step(edge.y, pos.y - thickness.y * 0.5);
    return edgeX * edgeY;
}

void main(void)
{
    vec2 uv = -1.0 + 2.0 * v_texcoord;
    uv.x*=resolution.x/resolution.y;
    vec2 st = -1.0 + 2.0 * v_texcoord;
    vec3 color = vec3(1.0);
    float rect = rectangle(uv, vec2(0.5), vec2(0.05));
//    float circle = step(length(uv)+vec2(0.2*sin(time), 0.2*cos(time))), 0.5);
    float d = length(uv - vec2(0.2*sin(time), 0.2*cos(time))) - 0.5;
    float md = mod(d, 0.1);
    float nd = abs(d/0.1);
    vec3 col = vec3(0.);
     if(abs(md) < 0.01)
    {
        if(d<0.0){
            col=vec3(1.0, 0.0, 0.0)/nd;
        }
        else{
            col=vec3(0.0, 1.0, 0.0)/nd;
        }
        
    }
    if(abs(d) < 0.03)
    {
        col = vec3(1.);
    }
    color = vec3(col);
    gl_FragColor = vec4(color,
        1.0);
}`

const day09_01=`
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
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

float rectangle(vec2 pos, vec2 edge, vec2 thickness){
    float edgeX = step(edge.x, pos.x + thickness.x * 0.5) - step(edge.x, pos.x - thickness.x * 0.5);
    float edgeY = step(edge.y, pos.y + thickness.y * 0.5) - step(edge.y, pos.y - thickness.y * 0.5);
    return edgeX * edgeY;
}

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

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main(void)
{
    vec2 uv = -1.0 + 2.0 * v_texcoord;
    uv.x*=resolution.x/resolution.y;
    vec2 st = -1.0 + 2.0 * v_texcoord;
    
    float n = noise(vec2(sin(time * 0.3), cos(time * 0.2)));
    float mn = map(n, 0.0, 1.0, 0.01, 0.1);
    
    vec3 color = vec3(1.0);
    float rect = rectangle(uv, vec2(0.5), vec2(0.05));
//    float circle = step(length(uv)+vec2(0.2*sin(time), 0.2*cos(time))), 0.5);
    float d = length(uv) - 0.5;
    float md = mod(d, mn);
    float nd = abs(d/ mn);
    vec3 col = vec3(0.);
     if(abs(md) < 0.01)
    {
        if(d<0.0){
            col=vec3(1.0, 0.0, 0.0)/nd;
        }
        else{
            col=vec3(0.0, 1.0, 0.0)/nd;
        }
        
    }
    if(abs(d) < 0.01)
    {
        col = vec3(1.);
    }
    color = vec3(col);
    gl_FragColor = vec4(color,
        1.0);
}`

const day09_02=`
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
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

float rectangle(vec2 pos, vec2 edge, vec2 thickness){
    float edgeX = step(edge.x, pos.x + thickness.x * 0.5) - step(edge.x, pos.x - thickness.x * 0.5);
    float edgeY = step(edge.y, pos.y + thickness.y * 0.5) - step(edge.y, pos.y - thickness.y * 0.5);
    return edgeX * edgeY;
}

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

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main(void)
{
    vec2 uv = -1.0 + 2.0 * v_texcoord;
    uv.x*=resolution.x/resolution.y;
    vec2 st = -1.0 + 2.0 * v_texcoord;
    
    float n = noise(vec2(sin(time * 0.3), cos(time * 0.2)));
    float mn = map(n, 0.0, 1.0, 0.01, 0.2);
    
    vec3 color = vec3(1.0);
    float rect = rectangle(uv, vec2(0.5), vec2(0.05));
//    float circle = step(length(uv)+vec2(0.2*sin(time), 0.2*cos(time))), 0.5);
    float d = length(uv - vec2(sin(time * 0.2), cos(time * 0.2))) - 0.5;
    float md = mod(d, mn);
    float nd = abs(d / mn);
    vec3 col = vec3(0.);
     if(abs(md) < 0.2)
    {
        if(d<0.0){
            col=vec3(250.0/255.0, 150.0/255.0, 27.0/255.0)/nd;
        }
        else{
            col=vec3(255.0/255.0, 228.0/255.0, 105./255.)/nd;
        }
        
    }
    if(abs(d) < 0.01)
    {
        col = vec3(1.);
    }
    color = vec3(col);
    gl_FragColor = vec4(color,
        1.0);
}`