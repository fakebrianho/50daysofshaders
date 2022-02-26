const day10_00=`
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

void main(void)
{
    vec2 uv =  6.0 * v_texcoord;
    uv += vec2(0.7 / sin(uv.y + time + 0.3) + 0.8, 0.4 / sin(uv.x + time + 0.3) + 1.6);
    vec3 color = vec3(0.5 * sin(uv.x) + 0.5, 0.5 * sin(uv.y) + 0.5, sin(uv.x + uv.y));
    gl_FragColor = vec4(
        color,
        1.0);
}`