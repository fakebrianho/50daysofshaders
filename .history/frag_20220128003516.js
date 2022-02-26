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