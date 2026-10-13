import React,{useEffect,useRef,useState} from 'react';
import type {Stroke} from './schema';
import {eraseInk,type Point} from './annotations';
export type InkMode='none'|'pen'|'highlight'|'eraser';
type Gesture={id:number;before:Stroke[];ink:Stroke[];last:Point;draft?:Stroke};
export function AnnotationCanvas({strokes,mode,eraserSize,onChange}:{strokes:Stroke[];mode:InkMode;eraserSize:number;onChange:(ink:Stroke[])=>void}){
 const svg=useRef<SVGSVGElement>(null),gesture=useRef<Gesture|null>(null);
 const [preview,setPreview]=useState<Stroke[]|null>(null),[cursor,setCursor]=useState<Point|null>(null),[size,setSize]=useState({width:1000,height:600});
 useEffect(()=>{const layer=svg.current,parent=layer?.parentElement,content=parent?.querySelector('.demonstration-grid') as HTMLElement|null;if(!layer||!parent)return;const resize=()=>setSize({width:parent.clientWidth,height:Math.max(parent.clientHeight,content?content.offsetTop+content.offsetHeight:0)});const observer=new ResizeObserver(resize);observer.observe(parent);if(content)observer.observe(content);resize();return()=>observer.disconnect();},[]);
 useEffect(()=>{setCursor(null);},[mode]);
 const point=(e:React.PointerEvent<SVGSVGElement>):Point=>{const r=e.currentTarget.getBoundingClientRect();return [Math.max(0,Math.min(1000,(e.clientX-r.left)/r.width*1000)),Math.max(0,Math.min(600,(e.clientY-r.top)/r.height*600))];};
 const finish=(e:React.PointerEvent<SVGSVGElement>)=>{const g=gesture.current;if(!g||g.id!==e.pointerId)return;const next=g.draft?[...g.before,g.draft]:g.ink;gesture.current=null;if(next!==g.before)onChange(next);setPreview(null);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);};
 const ink=preview??strokes;
 return <svg ref={svg} className={'whiteboard '+(mode!=='none'?'drawing ':'')+(mode==='eraser'?'erasing':'')} style={{height:size.height}} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-label="Annotation overlay"
  onPointerDown={e=>{if(mode==='none'||e.button!==0||gesture.current)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);const p=point(e);setCursor(p);const g:Gesture={id:e.pointerId,before:strokes,ink:strokes,last:p};if(mode==='eraser')g.ink=eraseInk(strokes,p,p,eraserSize/2,size);else g.draft={colour:mode==='highlight'?'#ffc533':'#b94d32',kind:mode==='highlight'?'highlight':'pen',width:mode==='highlight'?20:3,points:[p]};gesture.current=g;setPreview(g.draft?[...strokes,g.draft]:g.ink);}}
  onPointerMove={e=>{const p=point(e);setCursor(p);const g=gesture.current;if(!g||g.id!==e.pointerId)return;if(g.draft){g.draft={...g.draft,points:[...g.draft.points,p]};setPreview([...g.before,g.draft]);}else{g.ink=eraseInk(g.ink,g.last,p,eraserSize/2,size);setPreview(g.ink);}g.last=p;}}
  onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={e=>{if(gesture.current)finish(e);}} onPointerLeave={()=>{if(!gesture.current)setCursor(null);}}>
  {ink.map((s,i)=>s.points.length===1?<ellipse key={i} data-ink={s.kind??'pen'} cx={s.points[0][0]} cy={s.points[0][1]} rx={(s.width??3)/2/size.width*1000} ry={(s.width??3)/2/size.height*600} fill={s.colour} opacity={s.kind==='highlight'?0.4:1}/>:<polyline key={i} data-ink={s.kind??'pen'} points={s.points.map(p=>p.join(',')).join(' ')} fill="none" stroke={s.colour} strokeWidth={s.width??3} opacity={s.kind==='highlight'?0.4:1} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>)}
  {mode==='eraser'&&cursor&&<ellipse className="eraser-cursor" cx={cursor[0]} cy={cursor[1]} rx={eraserSize/2/size.width*1000} ry={eraserSize/2/size.height*600} fill="#ffffff" fillOpacity="0.45" stroke="#246bff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" pointerEvents="none"/>}
 </svg>;
}
