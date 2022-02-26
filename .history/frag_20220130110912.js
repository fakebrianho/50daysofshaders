const frag = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D image;
uniform sampler2D image2;

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
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
    
    //get the angle and radius
    //this will be how far from center
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
//    radius = 1.0;
    angle /= PI;
    angle = fract(angle);
    angle = 10.0+u_time;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = vec4(1.0, 1.0, .0, 1.0);
    color = texture2D(image2, point);
    
    gl_FragColor = color;
}

`

const frag2 = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D image;
uniform sampler2D image2;

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
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
    
    //get the angle and radius
    //this will be how far from center
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    angle = fract(angle);
    angle += u_time;
    
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = vec4(1.0, 1.0, .0, 1.0);
    color = texture2D(image2, point);
    
    gl_FragColor = color;
}
`

const frag3 = `
#ifdef GL_ES
precision highp float;
#endif

#define SEGMENTS 12.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

uniform sampler2D image2;

varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;
    uv *= 2.0;
    uv -= 1.0;
    
    //get the angle and radius
    //this will be how far from center
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    angle /= PI * 2.0;
    angle *= SEGMENTS;
    
    if(mod(angle, 2.0) >= 1.0){
        angle = fract(angle);
    }else{
        angle = 1.0 - fract(angle);
    }
    
    angle += u_time * sin(u_time) * 0.3;
    
    angle /= SEGMENTS;
    angle *= PI * 2.0;
    
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);
    
    vec4 color = vec4(1.0, 1.0, .0, 1.0);
    color = texture2D(image2, point);
    
    gl_FragColor = color;
}
`


const day1 = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform sampler2D disp;
uniform sampler2D disp2;

varying vec2 v_texcoord;


vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}

void main(void)
{
    vec2 uv = v_texcoord;
    vec2 point = fract(uv * 0.1 + u_time * 0.1);
    vec4 dispValue = texture2D(disp2, point);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
//    float dispX = 0.5 * sin(time);
//    float dispY = 0.25 * sin(time * 0.25);
    float dispX = mix(-0.5, 0.5, dispValue.r);
    float dispY = mix(-0.5, 0.5, dispValue.r);
    
    vec4 color = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    gl_FragColor = color;
}
`

const day00 =  `
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform sampler2D disp;
uniform sampler2D disp2;

varying vec2 v_texcoord;


vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}

void main(void)
{
    vec2 uv = v_texcoord;
    float rVal = smoothstep(0.0, 0.33, uv.x);
    float gVal = smoothstep(0.33, 0.66, uv.x);
    float bVal = smoothstep(0.66, 1.0, uv.x);
    if(uv.x > 0.33){
    rVal = 0.0;
    }
    if(uv.x > 0.66){
    gVal = 0.0;
    }
//    float mixer =  mix(rVal, gVal, uv.x);
   
    vec4 color = vec4(rVal, gVal, bVal, 1.0);
    gl_FragColor = color;
}
`

const day00_1 = `
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform sampler2D disp;
uniform sampler2D disp2;

varying vec2 v_texcoord;


vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}

void main(void)
{
    vec2 uv = v_texcoord;
//    float rVal = smoothstep(0.0, 0.33, uv.x);
//    float gVal = smoothstep(0.33, 0.66, uv.x);
//    float bVal = smoothstep(0.66, 1.0, uv.x);
    float rVal = step(0.0, uv.x);
    float gVal = step(0.33, uv.x);
    float bVal = step(0.66, uv.x);
//    float bVal = smoothstep(1.0, uv.x);
    if(uv.x > 0.33){
    rVal = 0.0;
    }
    if(uv.x > 0.66){
    gVal = 0.0;
    }
//    float mixer =  mix(rVal, gVal, uv.x);
   
    vec4 color = vec4(rVal, gVal, bVal, 1.0);
    gl_FragColor = color;
}`

const day00_2 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3((angle/TWO_PI*u_time*26.)+0.5,radius,1.0));

    gl_FragColor = vec4(color,1.0);
}
`

const day00_03=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y ,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3((angle/TWO_PI + u_time * 0.1)+0.05,radius*0.8,1.2));

    gl_FragColor = vec4(color,1.0);
}
`

const day00_04=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y ,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3((angle/TWO_PI)+0.05 * u_time * mouse.x,radius * mouse.y ,1.2));

    gl_FragColor = vec4(color,1.0);
}
`

const day00_05=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

void main(){
    vec2 point = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = rgbify(240.0, 240.0, 240.0);
    vec3 color_b = rgbify(92.0, 92.0, 173.0);
    vec3 rectColor = mix(color_b, color_a, point.y);
    
    
    vec3 color = mix(color_a, color_b, point.y);
    color = mix(color, rectColor, rect(point, vec2(0.04,0.34)));

    gl_FragColor = vec4(color,1.0);
}
`

const day00_06 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

void main(){
    vec2 point = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = rgbify(240.0, 240.0, 240.0);
    vec3 color_b = rgbify(92.0, 92.0, 173.0);
    vec3 rectColor = mix(color_b, color_a, point.y);
    
    
    vec3 color = mix(color_a, color_b, point.y);
    color = mix(color, rectColor, rect(vec2(point.x + 0.18, point.y), vec2(0.04,0.34)));
    color = mix(color, rectColor, rect(vec2(point.x - 0.18, point.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color,1.0);
}
`

const day00_07 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

void main(){
    vec2 point = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = rgbify(240.0, 240.0, 240.0);
    vec3 color_b = rgbify(92.0, 92.0, 173.0);
    vec3 rectColor = mix(color_b, color_a, point.y * sin(u_time));
//    vec3 rectColor = smoothstep(color_b, color_a, point.y);
    
    vec3 color = mix(color_a, color_b, point.y);
    color = mix(color, rectColor, rect(vec2(point.x + 0.18, point.y), vec2(0.04,0.34)));
    color = mix(color, rectColor, rect(vec2(point.x - 0.18, point.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color,1.0);
}
`

const day01_00 =`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    return step(radius, length(position));
}

void main(){
    vec2 point = -1. +2. * gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = vec3(drawCircle(point, 0.4), 0.0, 0.0);
    vec3 color_b = vec3(0.0, 0.0,drawCircle(point, 0.4));

//    
//    vec3 color = vec3(drawCircle(point, 0.4));
    vec3 color = vec3(0.0);
    color = mix(color_a, color_b, length(point));
 
    gl_FragColor = vec4(color,1.0);
}
`
const day01_01=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    return step(radius, length(position));
}

void main(){
    vec2 point = -1. +2. * gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = vec3(drawCircle(point, 0.4), 0.0, 0.0);
    vec3 color_b = vec3(0.0, 0.0,drawCircle(point, 0.4));
    color_a = vec3(1.0, 0.0, 0.0);
    color_b = vec3(0.0, 0.0, 1.0);

//    
//    vec3 color = vec3(drawCircle(point, 0.4));
    vec3 color = vec3(0.0);
    color = mix(color_a, color_b, length(point));
 
    gl_FragColor = vec4(color,1.0);
}
`
const day01_02=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

void main(){
    vec2 point = -1. +2. * gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    vec3 color_a = vec3(drawCircle(point, 0.4), 0.0, 0.0);
    vec3 color_b = vec3(0.0, 0.0,drawCircle(point, 0.4));
    color_a = vec3(1.0, 0.0, 0.0);
    color_b = vec3(0.0, 0.0, 1.0);
    vec3 color = vec3(0.0);
    vec3 gradColor = mix(color_a, color_b, length(point));
    color = vec3(drawCircle(point, 0.4));
    color = mix(gradColor, color, length(point));
//    color = mix(color_a, color_b, length(point));
    gl_FragColor = vec4(color,1.0);
}
`

const day01_03 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

vec4 circle(vec2 position,  vec3 color) {
    vec2 pos = u_resolution.xy * 0.5;
    float radius = 0.3 * u_resolution.y;
    float d = length(pos - position) - radius;
    float t = clamp(d, 0.0, 1.0);
    
    position.x = position.x / u_resolution.x; 
    position.y = position.y / u_resolution.y;
   
    color.b = position.x;
    color.g = position.y;
    

    return vec4(color, 1.0-t);
}

vec2 calculateEdge(vec2 position, float radius){
    float temp = step(radius, length(position));
     if(temp == 0.0){
        return position;
    }
}

void main(){
    vec2 point = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;

    vec3 color_a = vec3(1.0, 0.0, 0.0);
    vec4 layer1 = vec4(1.0); 

    vec4 color = vec4(1.0);
    vec4 circleLayer = circle(point, color_a);
    color = mix(layer1, circleLayer, circleLayer.a);
    gl_FragColor = color;
}
`

day01_04 = `#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D disp2;
varying vec2 v_texcoord;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

vec4 circle(vec2 position,  vec3 color) {
    vec2 pos = u_resolution.xy * 0.5;
    float radius = 0.3 * u_resolution.y;
    float d = length(pos - position) - radius;
    float t = clamp(d, 0.0, 1.0);
    
    position.x = position.x / u_resolution.x; 
    position.y = position.y / u_resolution.y;
   
    color.b = position.x;
    color.g = position.y;
    

    return vec4(color, 1.0-t);
}

vec2 calculateEdge(vec2 position, float radius){
    float temp = step(radius, length(position));
     if(temp == 0.0){
        return position;
    }
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}


void main(){
    vec2 point = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;
    vec2 uv = v_texcoord;
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
    vec4 layer1 = vec4(1.0); 
    float dispX = mix(-0.5, 0.5, dispValue.r);
    float dispY = mix(-0.5, 0.5, dispValue.r);
    
    vec4 color_b = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color = vec4(1.0);
    vec4 circleLayer = circle(point, color_b.rgb);
    color = mix(layer1, circleLayer, circleLayer.a);
    gl_FragColor = color;
}
`

const day01_05=`
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D disp2;
varying vec2 v_texcoord;

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

vec4 circle(vec2 position,  vec3 color) {
    vec2 pos = u_resolution.xy * 0.5;
    float radius = 0.3 * u_resolution.y;
    float d = length(pos - position) - radius;
    float t = clamp(d, 0.0, 1.0);
    
    position.x = position.x / u_resolution.x; 
    position.y = position.y / u_resolution.y;
   
    color.b = position.x;
    color.g = position.y;
    

    return vec4(color, 1.0-t);
}

vec2 calculateEdge(vec2 position, float radius){
    float temp = step(radius, length(position));
     if(temp == 0.0){
        return position;
    }
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}


void main(){
    vec2 point = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;
    vec2 uv = v_texcoord;
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
    vec4 layer1 = vec4(1.0); 
    vec4 layer2 = vec4(
        abs(sin(cos(u_time*0.001+3.*uv.y)*2.*uv.x+(u_time ))),
        abs(cos(sin(u_time*0.001+2.*uv.x)*3.*uv.y+(u_time ))),
        0.,
        1.0);
    float dispX = mix(-0.5, 0.5, dispValue.r);
    float dispY = mix(-0.5, 0.5, dispValue.r);
    
    vec4 color_b = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color = vec4(1.0);
    vec4 circleLayer = circle(point, color_b.rgb);
    color = mix(layer2, circleLayer, circleLayer.a);
    gl_FragColor = color;
}
`

day01_06 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define NUM_OCTAVES 5

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D disp2;
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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

vec4 circle(vec2 position,  vec3 color) {
    vec2 pos = u_resolution.xy * 0.5;
    float radius = 0.3 * u_resolution.y;
    float d = length(pos - position) - radius;
    float t = clamp(d, 0.0, 1.0);
    
    position.x = position.x / u_resolution.x; 
    position.y = position.y / u_resolution.y;
   
    color.b = position.x;
    color.g = position.y;
    

    return vec4(color, 1.0-t);
}

vec2 calculateEdge(vec2 position, float radius){
    float temp = step(radius, length(position));
     if(temp == 0.0){
        return position;
    }
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}


void main(){
    vec2 point = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;
    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
    vec4 layer1 = vec4(1.0); 
    float f = fbm(uv*6.);
    f*=40.0;
    f+=u_time*3.0;
    f = fract(f);
    vec4 layer2 = mix(color1, color2, f);
    float dispX = mix(-0.5, 0.5, dispValue.r*4.0);
    float dispY = mix(-0.5, 0.5, dispValue.r*4.0);
    
    vec4 color_b = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color = vec4(1.0);
    vec4 circleLayer = circle(point, color_b.rgb);
    color = mix(layer2, circleLayer, circleLayer.a);
    gl_FragColor = color;
}
`

day01_07=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;
uniform sampler2D disp2;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main(void)
{
//    vec2 uv = -1. + 2. * v_texcoord;
    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    float f = fbm(uv*6.);
    f*=5.0;
    f+=u_time;
    f = fract(f);
    vec4 color = mix(color1, color2, f);
    gl_FragColor = vec4(color);
}
`

day01_08=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;
uniform sampler2D disp2;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5

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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}



void main(void)
{
//    vec2 uv = -1. + 2. * v_texcoord;
    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 1.0, 0.0, 1.0);
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
    float f = fbm(uv*6.);
    f*=50.0;
    f+=u_time*2.0;
    f = fract(f);
    vec4 layer2 = mix(color1, color2, f);
    float dispX = mix(-0.5, 0.5, dispValue.r*4.0);
    float dispY = mix(-0.5, 0.5, dispValue.r*4.0);
    
    vec4 color_a = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color = mix(color_a, color2, f);
    gl_FragColor = vec4(color);
}`

day01_09 = `
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define NUM_OCTAVES 5

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D disp2;
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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
}

vec3 rgbify(float _r, float _g, float _b){
    return vec3(_r/255.0, _g/255.0, _b/255.0);
}

float drawCircle(vec2 position, float radius){
    float temp = step(radius, length(position));
    if(temp == 1.0){
        temp = 0.0;
    }else{
        temp = 1.0;
    }
    return temp;
}

vec4 circle(vec2 position,  vec3 color) {
    vec2 pos = u_resolution.xy * 0.5;
    float radius = 0.3 * u_resolution.y;
    float d = length(pos - position) - radius;
    float t = clamp(d, 0.0, 1.0);
    
    position.x = position.x / u_resolution.x; 
    position.y = position.y / u_resolution.y;
   
    color.b = position.x;
    color.g = position.y;
    

    return vec4(color, 1.0-t);
}

vec2 calculateEdge(vec2 position, float radius){
    float temp = step(radius, length(position));
     if(temp == 0.0){
        return position;
    }
}

vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}


void main(){
    vec2 point = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;
    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 dPoint = fract(uv * 0.1 + u_time * 0.03);
    vec4 dispValue = texture2D(disp2, dPoint);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
 
    vec4 layer1 = vec4(1.0); 
    float f = fbm(uv*6.);
    f*=weight;
    f+=u_time*3.0;
    f = fract(f);
    float dispX = mix(-0.5, 0.5, dispValue.r*4.0);
    float dispY = mix(-0.5, 0.5, dispValue.r*4.0);
    
    vec4 color_b = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color_a = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispY),
        uv.y + dispY);
    vec4 color = vec4(1.0);
    vec4 layer2 = mix(color1, color2, f);
    vec4 circleLayer = circle(point, color_b.rgb);
    color = mix(layer2, circleLayer, circleLayer.a);
    gl_FragColor = color;
}
`

day01_10=`
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

#define NUM_OCTAVES 5
#define COUNTER 0

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

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main(void)
{
//    vec2 uv = -1. + 2. * v_texcoord;
    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
//    float f = 0.5 * noise(2.0 * uv);
//    f+=0.25*noise(4.0*uv);
//    f+=0.125*noise(8.0*uv);
//    f+=0.0625*noise(16.0*uv);
//    f+=0.0625*noise(32.0*uv);
//    float weight = smoothstep(2.0, 40.0, sin(u_time*);
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
//    float weight = mix(1.0, 70.0, 1.0);
    float f = fbm(uv*6.);
    f*= weight;
    f+=u_time*2.0;
    f = fract(f);
    vec4 color = mix(color1, color2, f);
    gl_FragColor = vec4(color);
}`