uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength); //fisrt and scnd value have to has the same type (uniform, vec, etc), if the thrid value is 0 , take first param color, if the value is 1, take scnd color, if 0.5 then it will be the mix of the color
    
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
}