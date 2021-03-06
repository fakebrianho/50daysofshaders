const day08_00 =`
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;

varying vec3 v_normal;
varying vec2 v_texcoord;

float fade(float x) { return x * x * x * (x * (x * 6. - 15.) + 10.); }

float phash(float p)
{
    p = fract(7.8233139 * p);
    p = ((2384.2345 * p - 1324.3438) * p + 3884.2243) * p - 4921.2354;
    return fract(p) * 2. - 1.;
}

float noise(float p)
{
    float ip = floor(p);
    float fp = fract(p);
    float d0 = phash(ip     ) *  fp;
    float d1 = phash(ip + 1.) * (fp - 1.);
    return mix(d0, d1, fade(fp));
}

void main(void)
{
    vec2 uv = vec2(v_texcoord);
    float movement = time * 0.3;
    float movement2 = sin(uv.y * 13.) * time * 0.2;
//    uv.y += sin(uv.y) + cos(time);
    uv.x += movement2;
    uv.x *= 15.0;
    float f = fract(uv.x) * 10.;
    float p = gl_FragCoord.x * 10. / resolution.x;
    p += time * 2. - 10.;
    gl_FragColor = vec4(f);
}`