varying vec3 vNormal;
void main(){
  float intensity = 0.5 - dot( vNormal, vec3( 0.5, 0, 0 ) );
 
  gl_FragColor=vec4(0.8,0.5,0.0,1.0) * intensity;
}