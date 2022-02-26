const day07_01=`#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

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

void main(void)
{
    const float pi = 3.14159265359;
    float size = resolution.y / 1.0; // cell size in pixel
    vec2 uv = v_texcoord;
    vec2 test = gl_FragCoord.xy / resolution.y;
    vec2 p1 = gl_FragCoord.xy / size; // normalized pos
    vec2 p2 = fract(p1) - 0.5; // relative pos from cell center

    // random number
    float r2 = noise(uv);
    float rnd = noise(uv * u_time * 0.003 );
//    float rnd = dot(floor(p1), vec2(12.9898, 78.233));
//    rnd = fract(sin(rnd) * 43758.5453);

    // rotation matrix
    float phi = rnd * pi * 10. + u_time * 0.4 + 9000.;
    mat2 rot = mat2(cos(phi), -sin(phi), sin(phi), cos(phi));

    vec2 p3 = rot * p2 * 0.1; // apply rotation
//    vec2 p3 = p2;
    p3.y += sin(p3.x * 14. + u_time * 2.) * 0.009; // wave
    p3.x += cos(p3.y * 12. + u_time * 2.) * 0.007; // wave
//
    float rep = fract(rnd * 13.285) * 6. + 2.; // line repetition
//    float rep = r2;
//    float gr = fract(p3.y * p3.x *+ time * 0.08); // repeating gradient
    float gr = fract(p3.x *+ u_time * 0.008); // repeating gradient

    // make antialiased line by saturating the gradient
    float c = clamp((0.25 - abs(0.5 - gr)) * size * 0.75 / rep, 0., 1.);
//    c *= max(0., 1. - length(p2) * 0.6); // darken corners
//
//    vec2 bd = (0.5 - abs(p2)) * size - 2.; // border lines
//    c *= clamp(min(bd.x, bd.y), 0., 1.);
//    gr *= clamp(min(bd.x, bd.y), 0., 1.);

    gl_FragColor = vec4(c);
}`