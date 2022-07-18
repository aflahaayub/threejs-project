// precision mediump float; //precision will let us decide how preciese can a float be  //USE IT WHEN USING RAWSHADERMATERIAL 
// varying float vRandom; //v is varying
uniform vec3 uColor;
uniform sampler2D uTexture; //specific type for texture
varying vec2 vUV;
// varying float vElevation;

void main(){
  
  // vec4 textureColor = texture2D(uTexture, vUV); //first param is the texture, scnd param is where on that texture we want to take the color
  // textureColor.rgb *= vElevation * 3.0 + 0.5;
  // gl_FragColor=textureColor;

  //test values on the screen
  gl_FragColor = vec4(0.8, 0.3, 0.0, 1.0);
}