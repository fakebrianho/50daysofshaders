const day04_00 = `#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5
#define COUNTER 0
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rect(in vec2 st, in vec2 size){
    size = 0.25-size*0.25;
    vec2 uv = step(size,st*(1.0-st));
    return uv.x*uv.y;
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
mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

float pattern( in vec2 p, out vec2 q, out vec2 r )
{
    q.x = fbm6( p + vec2(0.0,0.0) + u_time * 0.3);
    q.y = fbm6( p + vec2(5.2,1.3) - u_time * 0.1);

    r.x = fbm6( p + 4.0*q + vec2(1.7,9.2) + abs(sin(u_time) * 0.3));
    r.y = fbm6( p + 4.0*q + vec2(8.3,2.8) );

    return fbm6( p + 4.0*r );
}

//f(p) = fbm(p+fbm(p+fbm(p))) 
void main(void)
{

    vec2 uv = v_texcoord;
    vec4 color1 = vec4(0.9, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.03, 1.0);
    vec4 color = vec4(1.0, 0.40, 0.3, 1.0);
    vec2 t1 = vec2(0.0);
    vec2 t2 = vec2(0.0);
    float f = pattern(uv, t1, t2);
//    f*= u_time;
    vec2 newMix = mix(t1, t2, f); 
//    color = vec4(f, t2.x, t1.y, 1.0);
    color = vec4(f, newMix, 1.0);
//    float f = fbm6(uv);
//    float mixer = smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f);
//    color = mix(color1, color2, mixer);
//    color = vec4(f);

    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin) * 0.4;
    float temp = uv.x;
//    temp *= u_resolution.x/u_resolution.y;
//    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
//    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
//    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
//    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
//    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
//    gl_FragColor = vec4(color.rgb, 1.0);
}`