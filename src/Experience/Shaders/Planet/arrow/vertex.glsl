uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;
varying float vRandom; 

varying vec2 vUV;
// varying float vElevation;

void main(){


  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.y += sin(modelPosition.x * 5.0 - uTime) * 0.1;

  vec4 viewPosition= viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vUV = uv;
}