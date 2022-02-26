const day03_00=`
#ifdef GL_ES
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
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
    float grain = mix(-0.1, 0.1, rand(uv));
    float f = fbm(vec2(sin(u_time * 0.5), uv.x));
//    f*= 60.0;
//    f+=grain;
//    f+=u_time*0.2;
//    f = fract(f);
    float mixer = (smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f));
    vec4 color = mix(color1, color2, mixer);
    
    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin);


//    float temp = uv.x;
//    temp *= u_resolution.x/u_resolution.y;
//    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
//    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
//    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
//    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
//    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
}`

const day03_01=`
#ifdef GL_ES
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
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
    float grain = mix(-0.1, 0.1, rand(uv));
//    float f = fbm(vec2(sin(u_time * 0.5), uv.x));
//    float r = fbm(uv*0.4);
    vec2 q = vec2(0.0);
    q.x = fbm(uv * u_time);
    q.y = fbm(uv + 1.0);
    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q * u_time * 0.14);
    r.y = fbm(uv + .0 * q * u_time * 6.3);
    float f = fbm(uv + r);
//    float mixed = smoothstep(r, f, f);
//    f*= 60.0;
//    f+=grain;
//    r+=grain;
//    r+=u_time*0.2;
//    f+=u_time*0.2;
//    f = fract(f);
    float mixer = (smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f));
//    float mixer = (smoothstep(0.1, 0.5, mixed) - smoothstep(0.5, 1.0, mixed));
    vec4 color = mix(color1, color2, mixer);
    
    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin);


//    float temp = uv.x;
//    temp *= u_resolution.x/u_resolution.y;
//    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
//    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
//    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
//    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
//    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
}`

const day03_02=`
#ifdef GL_ES
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

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

void main(void)
{

    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
    float grain = mix(-0.1, 0.1, rand(uv));
    vec2 q = vec2(0.0);
    q.x = fbm(uv + u_time * 0.1);
    q.y = fbm(uv + u_time * 0.0001);
    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q * u_time * 0.14);
    r.y = fbm(uv + .0 * q * u_time * .3);
    //movement 
    vec2 movement = vec2(1.0);
    movement *= rotation2d(u_time*0.35);
    float f = fbm(uv + r + movement);
    float mixer = (smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f));
    vec4 color = mix(color1, color2, mixer);
    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin);


//    float temp = uv.x;
//    temp *= u_resolution.x/u_resolution.y;
//    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
//    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
//    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
//    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
//    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
}`

const day03_03=`
#ifdef GL_ES
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

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

void main(void)
{

    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
    float grain = mix(-0.1, 0.1, rand(uv));
    vec2 q = vec2(0.0);
    q.x = fbm(uv + u_time * 0.1);
    q.y = fbm(uv + u_time * 0.0001);
    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q * u_time * 0.014);
    r.y = fbm(uv + .0 * q * u_time * .3);
    //movement 
    vec2 movement = vec2(1.0);
    movement *= rotation2d(u_time*0.25);
    float f = fbm(uv + r + movement);
    float mixer = (smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f));
    vec4 color = mix(color1, color2, mixer);
    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin);


//    float temp = uv.x;
//    temp *= u_resolution.x/u_resolution.y;
//    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
//    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
//    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
//    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
//    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
}`

const day03_04=`
#ifdef GL_ES
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

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

void main(void)
{

    vec2 uv = v_texcoord;
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
    float weight = mix(1.0, 70.0, abs(sin(u_time*0.4)));
    float grain = mix(-0.1, 0.1, rand(uv));
    vec2 q = vec2(0.0);
    q.x = fbm(uv + u_time * 0.1);
    q.y = fbm(uv + u_time * 0.0001);
    vec2 r = vec2(0.0);
    r.x = fbm(uv + 1.0 * q * u_time * 0.0014);
    r.y = fbm(uv + .0 * q * u_time * .3);
    //movement 
    vec2 movement = vec2(1.0);
    movement *= rotation2d(u_time*0.25);
    float f = fbm(uv + r);
    float mixer = (smoothstep(0.1, 0.5, f) - smoothstep(0.5, 1.0, f));
    vec4 color = mix(color1, color2, mixer);
    vec2 origin = (gl_FragCoord.xy / u_resolution.xy) - vec2(0.5);
    float vignette = length(origin);


    float temp = uv.x;
    temp *= u_resolution.x/u_resolution.y;
    vec3 rectColor = vec3(temp, uv.y, abs(sin(u_time)));
    float gray = dot(rectColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(gray);
//    grayscale *= 0.5;
    color = mix(color, vec4(grayscale, 1.0), rect(vec2(uv.x + 0.18, uv.y), vec2(0.04,0.34)));
    color = mix(color, vec4(grayscale,1.0), rect(vec2(uv.x - 0.18, uv.y), vec2(0.04,0.34)));
    gl_FragColor = vec4(color.rgb * (1.0 - vignette), 1.0);
}`