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
float fcounter = 0.;
vec3 fractal(vec3 p, float t){
    float s = 0.6 - exp(-fract(u_time)) * 0.4;
    for(float i = 0.0; i < 5.0; i++){
        // fcounter = i;
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
    
    for(float i = 0.; i < 100.; i++){
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
/*------------------------------
Block
------------------------------*/
// float sdfBox(float p, float s){
//     p = abs(p) - s;

//     return max(p.x, max(p.y, pz));


// }

// mat2 rot (float a){
//     float ca = cos(a);
//     float sa = sin(a);
//     return mat2(ca, sa, -sa, ca);
// }

const mistyGrid5 = `#ifdef GL_ES
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
    float s = 0.8 - exp(-fract(u_time * 0.25)) * 0.6;
//    s = 0.8;
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
float at2 = 0.;
float map(vec3 p){

    vec3 shapeP = p;
    p.xy *= rot(sin(p.z + u_time)*0.3);
    p.yz *= rot(cos(p.z*0.03)*0.1);
    float t = u_time*0.3;
    vec3 p2 = fractal(p, t*0.2);
    vec3 p3 = fractal(p+vec3(3.0, 0.0, 0.0), t*0.23);
//    float sphere = sphSDF(p2, 1.0);
    float box = sdBox(p2, vec3(1.0, 1.3, 4.0));
    float box2 = sdBox(p2, vec3(3.0, 0.7, 0.4));
    
    float d = max(abs(box), abs(box2))-0.2;
    float dist = 1.0;
    vec3 p4 = (fract(p2/dist-0.5)-.5)*dist;
    float box3 = sdBox(p4, vec3(0.4 ));
//    d = max(d, -box3);
//    d = d - box3*0.4; 
    
    float f = p.z + u_time*4.0;
    p.x += sin(f*0.05)*6.0;
    p.y += sin(f*0.12)*4.0;
    d = max(d, -length(p.xy)+10.0);
    at += 0.13/(0.13+abs(d));
    
    float box4 = length(shapeP.xy) - 10.0;
    at2 += 0.13/(0.13+abs(box4));

    return d;
}


void cam(inout vec3 p){
    float t = u_time*0.3;
    p.yz *= rot(t);
    p.zx *= rot(t*1.2);
}


void main(void)
{   
    vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y/u_resolution.y);
    uv -= 0.5;
    uv /= vec2(u_resolution.y/ u_resolution.x, 1.0);
//    vec2 uv = -1. + 2. * v_texcoord;
//    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -20.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    cam(s);
    cam(r);
    vec3 p = s; 
    float i = 0.;
    float _d = 0.;
    
    for(i = 0.; i < 80.; i++){
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
//    color += pow(1.-i/100.0, 8.);
    vec3 sky = mix(vec3(1.0, 0.5, 0.3), vec3(0.2, 1.5, 0.7), pow(abs(r.z),14.0));
    sky = mix(sky, vec3(0.4, 0.5, 1.7), pow(abs(r.y),8.0));

    float brightness = 0.122;
    color += pow(at2 * brightness, 2.0) * sky;
//    color += pow(at * brightness, 2.0) * sky;
    color += sky * 0.2; 

    gl_FragColor = vec4(color,
        1.0);
}`

const mistyGrid6 = `#ifdef GL_ES
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
    float s = 0.8 - exp(-fract(u_time * 0.25)) * 0.6;
    s = 0.8;
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
float at2 = 0.;
float map(vec3 p){

    vec3 shapeP = p;
    p.xy *= rot(sin(p.z * 0.13 + u_time * 0.1)*0.3);
    p.yz *= rot(sin(p.z*0.17)*0.1);
    float t = u_time*0.3;
    vec3 p2 = fractal(p, t*0.2);
    vec3 p3 = fractal(p+vec3(3.0, 0.0, 0.0), t*0.23);
//    float sphere = sphSDF(p2, 1.0);
    float box = sdBox(p2, vec3(1.0, 1.3, 4.0));
    float box2 = sdBox(p2, vec3(3.0, 0.7, 0.4));
    
    float d = max(abs(box), abs(box2))-0.2;
    float dist = 1.0;
    vec3 p4 = (fract(p2/dist-0.5)-.5)*dist;
    float box3 = sdBox(p4, vec3(0.4 ));
//    d = max(d, -box3);
//    d = d - box3*0.4; 
    
    float f = p.z + u_time*4.0;
    p.x += sin(f*0.05)*6.0;
    p.y += sin(f*0.12)*4.0;
    d = max(d, -length(p.xy)+10.0);
    at += 0.13/(0.13+abs(d));
    
    float box4 = length(shapeP.xy) - 10.0;
    at2 += 0.13/(0.13+abs(box4));

    return d;
}


void cam(inout vec3 p){
    float t = u_time*0.3;
    p.yz *= rot(t);
    p.zx *= rot(t*1.2);
}


void main(void)
{   
    vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y/u_resolution.y);
    uv -= 0.5;
    uv /= vec2(u_resolution.y/ u_resolution.x, 1.0);
//    vec2 uv = -1. + 2. * v_texcoord;
//    uv.x *= u_resolution.x / u_resolution.y;
    
    vec3 s = vec3(0.0, 0.0, -20.0);
    vec3 r = normalize(vec3(-uv, 1.0));
    cam(s);
    cam(r);
    vec3 p = s; 
    float i = 0.;
    float _d = 0.;
    
    for(i = 0.; i < 80.; i++){
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
//    color += pow(1.-i/100.0, 8.);
    vec3 sky = mix(vec3(1.0, 0.5, 0.3), vec3(0.2, 1.5, 0.7), pow(abs(r.z),14.0));
    sky = mix(sky, vec3(0.4, 0.5, 1.7), pow(abs(r.y),8.0));

    float brightness = 0.122;
    color += pow(at2 * brightness, 2.0) * sky;
//    color += pow(at * brightness, 2.0) * sky;
    color += sky * 0.2; 

    gl_FragColor = vec4(color,
        1.0);
}`

const practice3 = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

mat2 rot(float a){
    float ca = cos(a);
    float sa = sin(a);
    return mat2(ca, sa, -sa, ca);
}

float sdfSphere(vec3 p, float r){
    return length(p) - r;
}

float sdfBox(vec3 p, vec3 s){
    p = abs(p) - s;
    return max(p.x, max(p.y, p.z));
}

float map(vec3 p){
    // float g = p.x;
    p.xz *= rot(u_time);
    float s = sdfSphere(p+vec3(sin(u_time), 0.0, 0.0), 0.4);
    float b1 = sdfBox(p+vec3(0.0, -1.0, -1.0), vec3(0.7));
    return min(s, b1);
}

vec3 norm(vec3 p){
    vec2 offset = vec2(0.001, 0.0);
    return normalize(map(p) - vec3(map(p - offset.xyy), map(p-offset.yxy), map(p-offset.yyx)));
}

float RayMarch(vec3 ro, vec3 rd){
    float d0 = 0.0;
    for(int i = 0; i < 100; i++){
        vec3 p = ro + rd * d0;
        float ds = map(p); 
        d0 += ds;
        if(ds < 0.01){
            break;
        }
    }
    return d0;
}

void main(void){
    vec2 uv = -1. + 2. * v_texcoord;
    uv.x *= u_resolution.x / u_resolution.y;
    vec3 ro = vec3(0.0, 1.0, -3.0);
    vec3 rd = normalize(vec3(uv, 1.0));
    float d = RayMarch(ro, rd);
    vec3 p = ro + rd * d;
    vec3 n = norm(p);
    vec3 l = normalize(vec3(1.0, 1.0, -1.0));
    vec3 color = vec3(0.0);
    color += max(0.0, dot(n, l));
    gl_FragColor = vec4(color, 1.0); 
}
`