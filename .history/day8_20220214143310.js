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