uniform sampler2D map;
varying vec2 vUv;
varying vec3 vNormal;

void main(){
  vec3 diffuse = texture2D( map, vUv ).xyz;

  float intensity=0.65-dot( vNormal,vec3(0.8,0.3,0.0) );

  vec3 atmosphere=vec3(1.0,0.3,0.)*pow(intensity, 2.0);
  
  gl_FragColor = vec4( diffuse + atmosphere, 1.0 );
}