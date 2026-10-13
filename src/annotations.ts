import type {Stroke} from './schema';
export type Point=[number,number];
const mix=(a:Point,b:Point,t:number):Point=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const dot=(a:Point,b:Point)=>a[0]*b[0]+a[1]*b[1];
const sub=(a:Point,b:Point):Point=>[a[0]-b[0],a[1]-b[1]];
const close=(a:Point,b:Point)=>Math.hypot(a[0]-b[0],a[1]-b[1])<1e-7;
const distance=(p:Point,a:Point,b:Point)=>{const d=sub(b,a),l=dot(d,d),t=l?Math.max(0,Math.min(1,dot(sub(p,a),d)/l)):0;const q=sub(p,mix(a,b,t));return dot(q,q);};
/** Clip ink against the swept, round eraser in screen pixels. Original teaching content never enters this function. */
export function eraseInk(strokes:Stroke[],from:Point,to:Point,radius:number,size:{width:number;height:number}):Stroke[]{
 const pixel=(p:Point):Point=>[p[0]*size.width/1000,p[1]*size.height/600];
 const a=pixel(from),b=pixel(to),sweep=sub(b,a),length=Math.hypot(...sweep),axis:Point=length?[sweep[0]/length,sweep[1]/length]:[1,0];
 const output:Stroke[]=[];let changed=false;
 for(const stroke of strokes){
  const r=radius+(stroke.width??3)/2,inside=(p:Point)=>distance(pixel(p),a,b)<=r*r;
  if(stroke.points.length<2){if(stroke.points.some(inside)){changed=true;}else output.push(stroke);continue;}
  const fragments:Point[][]=[];let current:Point[]=[];
  const flush=()=>{if(current.length>1)fragments.push(current);current=[];};
  for(let i=1;i<stroke.points.length;i++){
   const start=stroke.points[i-1],end=stroke.points[i],p=pixel(start),v=sub(pixel(end),p),cuts=[0,1];
   const add=(t:number)=>{if(t>0&&t<1)cuts.push(t);};
   for(const centre of [a,b]){const q=sub(p,centre),A=dot(v,v),B=2*dot(q,v),C=dot(q,q)-r*r,disc=B*B-4*A*C;if(A&&disc>=0){add((-B-Math.sqrt(disc))/(2*A));add((-B+Math.sqrt(disc))/(2*A));}}
   if(length){const q=sub(p,a),along=dot(q,axis),speed=dot(v,axis),across=q[0]*axis[1]-q[1]*axis[0],sideSpeed=v[0]*axis[1]-v[1]*axis[0];if(speed){add(-along/speed);add((length-along)/speed);}if(sideSpeed){add((r-across)/sideSpeed);add((-r-across)/sideSpeed);}}
   cuts.sort((x,y)=>x-y);
   for(let k=1;k<cuts.length;k++){const lo=cuts[k-1],hi=cuts[k];if(hi-lo<1e-10)continue;if(inside(mix(start,end,(lo+hi)/2))){changed=true;flush();}else{const first=mix(start,end,lo),last=mix(start,end,hi);if(current.length&&!close(current[current.length-1],first))flush();if(!current.length)current.push(first);if(!close(current[current.length-1],last))current.push(last);}}
  }
  flush();for(const points of fragments)output.push({...stroke,points});
 }
 return changed?output:strokes;
}
