const day05_00=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D water;
uniform sampler2D image3;
uniform sampler2D image4;

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
    vec4 textCol = texture2D(image, sin(r) + cos(q) - sin(s));
    vec4 textCol2 = texture2D(image2, sin(r));
    vec4 textCol3 = texture2D(image3, sin(r) + cos(q));
    vec4 monster = mix(textCol, textCol3, f);
    float newR = mix(textCol.r, r.y, f);
    float newG = mix(textCol.g, q.x, f);
    float newB = mix(textCol.b, r.x, f);
    vec3 newColor = vec3(newR, newG, newB);
    vec3 noiseyBoy = vec3(textCol.r * f, textCol.g * f, textCol.b * f);
    vec3 color = vec3(1.0);
    
    gl_FragColor = vec4(noiseyBoy, textCol.a + f);
    textCol.r *= sin(u_time);
    gl_FragColor = vec4(textCol);
//    gl_FragColor = vec4(monster);
//    gl_FragColor = vec4(newColor, 0.5);
}`