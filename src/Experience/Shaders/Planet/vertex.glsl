varying vec2 vUv;
varying vec3 vNormal;

void main(){
  vUv = uv;//give us uv coordinate by default
  vNormal = vNormal = normalize( normalMatrix * normal );

  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}