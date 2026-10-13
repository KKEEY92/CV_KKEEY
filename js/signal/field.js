/** Original differentiable lattice value-noise curl field; no borrowed shader sources. */
export const FIELD = `
float hash3(vec3 p){p=fract(p*vec3(.1031,.11369,.13787));p+=dot(p,p.yzx+19.19);return fract((p.x+p.y)*p.z);}
vec3 noiseGradient(vec3 p){
 vec3 i=floor(p),f=fract(p);vec3 u=f*f*f*(f*(f*6.-15.)+10.);vec3 du=30.*f*f*(f*(f-2.)+1.);
 float a=hash3(i),b=hash3(i+vec3(1,0,0)),c=hash3(i+vec3(0,1,0)),d=hash3(i+vec3(1,1,0));
 float e=hash3(i+vec3(0,0,1)),g=hash3(i+vec3(1,0,1)),h=hash3(i+vec3(0,1,1)),j=hash3(i+vec3(1,1,1));
 float dx=mix(mix(b-a,d-c,u.y),mix(g-e,j-h,u.y),u.z)*du.x;
 float dy=mix(mix(c-a,d-b,u.x),mix(h-e,j-g,u.x),u.z)*du.y;
 float dz=(mix(mix(e,g,u.x),mix(h,j,u.x),u.y)-mix(mix(a,b,u.x),mix(c,d,u.x),u.y))*du.z;
 return vec3(dx,dy,dz);
}
vec3 curlField(vec3 p,float t){
 p=p*1.35+vec3(t*.10,-t*.07,t*.04);
 vec3 x=noiseGradient(p+vec3(0,11.7,23.1));vec3 y=noiseGradient(p+vec3(31.8,0,7.2));vec3 z=noiseGradient(p+vec3(13.4,27.6,0));
 return vec3(z.y-y.z,x.z-z.x,y.x-x.y)*1.35;
}
`;
