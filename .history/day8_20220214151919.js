const day08_01=`
#ifdef GL_ES
precision highp float;

#endif
#define S(a, b, t) smoothstep(a, b, t)
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

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= .7;
    uv.y -= sqrt(abs(uv.x)) * .5;
    float r = 0.1;
    float d = length(uv);
//    float c = smoothstep(r, r+0.01, distance(uv, vec2(0.5)));
    float c = S(.3, .28, d);
    vec3 col1 = vec3(192.0 / 255.0, 0.0, 0.0);
    vec3 col2 = vec3(255.0 / 255.0, 111.0 / 255.0, 119.0 / 255.0);
    vec3 mixed = mix(col1, col2, d);
    vec3 color = vec3(c + mixed);
    gl_FragColor = vec4(color, 1.0);
}
`

const day08_02=`
#ifdef GL_ES
precision highp float;

#endif
#define S(a, b, t) smoothstep(a, b, t)
uniform float u_time;
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

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= .7;
    uv.y -= sqrt(abs(uv.x)) * .5;
    float r = 0.1;
    float d = length(uv);
//    float c = smoothstep(r, r+0.01, distance(uv, vec2(0.5)));
    float c = S(.3, .28, d);
    vec3 col1 = vec3(202.0 / 255.0, 0.0, 0.0);
    vec3 col2 = vec3(255.0 / 255.0, 176.0 / 255.0, 200.0 / 255.0);
    vec3 mixed = mix(col1, col2, abs(sin(u_time)));
    vec3 color = vec3(c * mixed + mixed);
    gl_FragColor = vec4(color, 1.0);
}`

const day08_03=`
#ifdef GL_ES
precision highp float;

#endif
#define S(a, b, t) smoothstep(a, b, t)
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

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= .7;
    uv.y -= sqrt(abs(uv.x)) * .5;
    float r = 0.1;
    float d = length(uv);
//    float c = smoothstep(r, r+0.01, distance(uv, vec2(0.5)));
    float c = S(.3, .28, d);
    vec3 col1 = vec3(0.0, 1.0, 1.0);
    vec3 col2 = vec3(0.0 / 255.0, 150.0 / 255.0, 175.0 / 255.0);
    vec3 mixed = mix(col2, col1, abs(sin(time)));
//    vec3 mixed = mix(col2, col1, 1.);
    vec3 color = vec3(c - mixed);
    gl_FragColor = vec4(color, 1.0);
}`

day08_04=`
#ifdef GL_ES
precision highp float;

#endif
#define S(a, b, t) smoothstep(a, b, t)
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

void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= .7;
    uv.y -= sqrt(abs(uv.x)) * .5;
    float r = abs(sin(time)) * 0.28;
    r = clamp(r, 0.1, 0.28);
    float d = length(uv);
//    float c = smoothstep(r, r+0.01, distance(uv, vec2(0.5)));
    
    float c = S(.3, r, d);
    vec3 col1 = vec3(0.0, 1.0, 1.0);
    vec3 col2 = vec3(0.0 / 255.0, 150.0 / 255.0, 175.0 / 255.0);
    vec3 mixed = mix(col2, col1, abs(sin(time)));
//    vec3 mixed = mix(col2, col1, 1.);
    vec3 color = vec3(c - mixed);
    gl_FragColor = vec4(color, 1.0);
}`

const day08_05=`
#ifdef GL_ES
precision highp float;

#endif
#define S(a, b, t) smoothstep(a, b, t)
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

float smax(float a, float b, float k){
    float h = clamp((b-a)/k+.5, 0., 1.);
    return mix(a, b, h) + h*(1.-h)*k*.5;
}

float Heart(vec2 uv, float size, float timing){
    uv = uv*size;
    uv.x *= .7;
    uv.y -= smax(sqrt(abs(uv.x)) * .5, 0.07, .1);
    float r = abs(sin(time*timing)) * 0.28;
    r = clamp(r, 0.1, 0.28);
    float radius = .3;
    float blur = 0.08 ;
    float d = length(uv);
    float c = S(r+blur, r-blur, d);
    return c;
}
void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    vec3 col1 = vec3(0.0, 1.0, 1.0);
    vec3 col2 = vec3(0.0 / 255.0, 150.0 / 255.0, 175.0 / 255.0);
    vec3 mixed = mix(col2, col1, abs(sin(time)));
    float c = Heart(uv, 2.0, 1.7);
    float c2 = Heart(vec2(uv.x + 0.7, uv.y + 0.7), 3.0, 1.6); 
    float c3 = Heart(vec2(uv.x - 0.8, uv.y + 0.5), 2.0,  3.0); 
    float c4 = Heart(vec2(uv.x - 0.65, uv.y - 0.7), 3.0, 1.8);
    float c5 = Heart(vec2(uv.x - 0.35, uv.y - 0.4), 2.0, 1.3);
    float c6 = Heart(vec2(uv.x + 0.4, uv.y + 0.2), 4.2, 1.9);
    float c7 = Heart(vec2(uv.x - 0.2, uv.y + 0.3), 2.6, .9);
    float c8 = Heart(vec2(uv.x - 0.73, uv.y - 0.16), 1.6, 0.6);
    float c9 = Heart(vec2(uv.x - 0.13, uv.y + 0.7), 1.3, 0.75);
    float c10 = Heart(vec2(uv.x + 0.33, uv.y - 0.55), 1.3, 1.05);
    float c11 = Heart(vec2(uv.x + 0.7, uv.y - 0.15), 2.3, 1.35);
//    float c12 = Heart(vec2(uv), 0.08, 0.35);
    vec3 color = vec3( c11 + c10 + c9 + c8 + c7 + c6+ c5 + c4 + c3 + c2 + c - mixed);
    gl_FragColor = vec4(color, 1.0);
}`