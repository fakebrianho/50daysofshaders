const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;

uniform sampler2D displacement;

varying vec2 v_texcoord;


vec4 rgb(float r, float g, float b){
    return vec4(r/255.0, g/255.0, b/255.0, 1.0);
}

void main(void)
{
    vec2 uv = v_texcoord;
    //fract will make it always between 0 and 1 
    vec2 point = fract(uv*0.1+u_time*0.08);
    //texture 2d takes a texture and sample point
    vec4 dispColor = texture2D(displacement, 1.0 - point);
    
//    catColor.r = sin(time);
    
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0., 255., 224.);
    vec4 bl = rgb(250., 255., 0.);
    vec4 br = rgb(231., 244., 255.);
    
    float dispX = mix(-0.5, 0.5, dispColor.r);
    float dispY = mix(-0.5, 0.5, dispColor.r);
    
    vec4 color = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x + dispX),
        uv.y +dispY);
        
    gl_FragColor = color; 
}


`