const mistyGrid1 = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

varying vec3 v_normal;
varying vec2 v_texcoord;

mat2 rot(float a){
    float ca = cos(a);
    float sa = sin(a);
    return mat2(ca, sa, -sa, ca);
}

vec3 fractal(vec3 p){
    for(float i = 0.0; i < 5.0; i++){
        float t = u_time+i;
        p.xy *= rot(t);
        p.yz *= rot(t*0.7);
        p=abs(p);
        p-=0.3;
    }
    return p;
}

float sphSDF(vec3 p, float r){
    return length(p) - r;
}

float sdBox(vec3 p, vec3 s){
    p=abs(p)-s;
    return max(p.x, max(p.y, p.z));
}



float map(vec3 p){
    vec3 p2 = fractal(p);
    float sphere = sphSDF(p2, 1.0);
    return sphere;
}

//practice box 
// float sdBox(vec3 p, vec3 s){
//      p = abs(p) - s;
//      return max(p.x, max(p.y, p.z));
//}
float counter = 0.;
void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -10.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    vec3 p = s; 
    // float i = 0.;
    for(float i = 0.; i < 100.; i++){
        float d=map(p);
        counter = i;
        if(d<0.001){
            break;
        }
        p+=r*d;
    }
    
    vec3 color = vec3(0.0);
    color += pow(1.-counter/101.0, 8.);
    gl_FragColor = vec4(color,
        1.0);
}`

const mistyGrid2 = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

varying vec3 v_normal;
varying vec2 v_texcoord;

mat2 rot(float a){
    float ca = cos(a);
    float sa = sin(a);
    return mat2(ca, sa, -sa, ca);
}

vec3 fractal(vec3 p){
    for(float i = 0.0; i < 5.0; i++){
        float t = u_time+i;
        p.xy *= rot(t);
        p.yz *= rot(t*0.7);
        p=abs(p);
        p-=0.3;
    }
    return p;
}

float sphSDF(vec3 p, float r){
    return length(p) - r;
}

float sdBox(vec3 p, vec3 s){
    p=abs(p)-s;
    return max(p.x, max(p.y, p.z));
}



float map(vec3 p){
    vec3 p2 = fractal(p);
    float sphere = sphSDF(p2, 1.0);
    float box = sdBox(p2, vec3(1.0, 0.3, 4.0));
    return box;
}

//practice box 
// float sdBox(vec3 p, vec3 s){
//      p = abs(p) - s;
//      return max(p.x, max(p.y, p.z));
//}

float counter = 0.0;
void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -10.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    vec3 p = s; 
    // float i = 0.;
    for(float i = 0.; i < 100.; i++){
        counter = i;
        float d=map(p);
        if(d<0.001){
            break;
        }
        p+=r*d;
    }
    
    vec3 color = vec3(0.0);
    color += pow(1.-counter/101.0, 8.);
    gl_FragColor = vec4(color,
        1.0);
}`

const mistyGrid3=`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

varying vec3 v_normal;
varying vec2 v_texcoord;

mat2 rot(float a){
    float ca = cos(a);
    float sa = sin(a);
    return mat2(ca, sa, -sa, ca);
}

vec3 fractal(vec3 p){
    for(float i = 0.0; i < 5.0; i++){
        float t = u_time*0.2+i;
        p.xy *= rot(t);
        p.yz *= rot(t*0.7);
        
        float dist = 10.0;
        p=(fract(p/dist-.5)-.5)*dist;
        p=abs(p);
        p-=1.;
    }
    return p;
}

float sphSDF(vec3 p, float r){
    return length(p) - r;
}

float sdBox(vec3 p, vec3 s){
    p=abs(p)-s;
    return max(p.x, max(p.y, p.z));
}



float map(vec3 p){
    vec3 p2 = fractal(p);
    float sphere = sphSDF(p2, 1.0);
    float box = sdBox(p2, vec3(1.0, 0.3, 4.0));
    box = max(box, -length(p.xy)+15.);
    return box;
}

//practice box 
// float sdBox(vec3 p, vec3 s){
//      p = abs(p) - s;
//      return max(p.x, max(p.y, p.z));
//}
float counter = 0.0;
void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -15.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    vec3 p = s; 
    // float i = 0.;
    for(float i = 0.; i < 100.; i++){
        counter = i;
        float d=map(p);
        if(d<0.001){
            break;
        }
        p+=r*d;
    }
    
    vec3 color = vec3(0.0);
    color += pow(1.-counter/101.0, 8.);
    gl_FragColor = vec4(color,
        1.0);
}`

const mistyGrid4 =`
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

varying vec3 v_normal;
varying vec2 v_texcoord;

mat2 rot(float a){
    float ca = cos(a);
    float sa = sin(a);
    return mat2(ca, sa, -sa, ca);
}

vec3 fractal(vec3 p, float t){
    float s = 0.6 - exp(-fract(u_time)) * 0.4;
    for(float i = 0.0; i < 5.0; i++){
        float t2 = t+i;
        p.xy *= rot(t2);
        p.yz *= rot(t2*0.7);
        
        float dist = 10.0;
        p=(fract(p/dist-.5)-.5)*dist;
        p=abs(p);
        p-=s;
    }
    return p;
}

float sphSDF(vec3 p, float r){
    return length(p) - r;
}

float sdBox(vec3 p, vec3 s){
    p=abs(p)-s;
    return max(p.x, max(p.y, p.z));
}

float at = 0.;
float map(vec3 p){
    vec3 p2 = fractal(p, u_time*0.2);
    vec3 p3 = fractal(p+vec3(3.0, 0.0, 0.0), u_time*0.23);
//    float sphere = sphSDF(p2, 1.0);
    float box = sdBox(p2, vec3(1.0, 0.3, 4.0));
    float box2 = sdBox(p2, vec3(3.0, 2.0, 0.3));
    float d = max(abs(box), abs(box2))-0.1;
    
    float f = p.z + u_time*4.0;
    p.x += sin(f*0.1)*4.0;
    p.y += sin(f*0.33)*4.0;
    d = max(d, -length(p.xy)+3.0);
    at += 0.3/(0.13+d);
//    vec3 col = vec3(p.x, p.y, 0.0);
//    d = smoothstep(d, 1.0, p.z);
//    float f = mix(d, 0.0, p.y - 2.0);
//    float q = mix(d, 1.0, -p.x);
//    d = mix(d, 1.0, p.x);
//    return min(f, q);
    return d;
}
float counter = 0.;
void main(void)
{
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -1.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    vec3 p = s; 
    float i = 0.;
    float _d = 0.;
    
    for(i = 0.; i < 100.; i++){
        counter = i;
        float d=abs(map(p));
        _d = d;
        if(d<0.001){
        d = 0.1;
//            break;
        }
        p+=r*d;
    }
    
    vec3 color = vec3(0.0);
//    vec3 col = vec3(p.x, p.y, 1.0);
//    color += pow(1.-counter/100.0, 8.);
    color += at * 0.01 * vec3(1.0, 0.5, 0.3);
//    color = mix(color, col, _d);
//    color *= col;
    gl_FragColor = vec4(color,
        1.0);
}`