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

`