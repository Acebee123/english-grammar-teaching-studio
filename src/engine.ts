import type {WorkedExample,TransformationStep,Role,WordClass,LocalLessonProject,AIAnalysisSuggestion} from './schema';
import {topics,sentence} from './content';
export const roles:Role[]=['subject','auxiliary','verb','object','complement','time','other'];
export const classes:WordClass[]=['noun','verb','pronoun','adjective','adverb','determiner','preposition','conjunction','phrase','unknown'];
const contractions:Record<string,string>={"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"hasn't":'has not',"haven't":'have not',"hadn't":'had not',"doesn't":'does not',"don't":'do not',"didn't":'did not',"won't":'will not'};
const literalWords=(s:string)=>s.trim().toLowerCase().replace(/[.,?!]/g,'').replace(/\s+/g,' ');
export const normalise=(s:string)=>s.trim().toLowerCase().replaceAll('’',"'").replace(/\b(?:isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't)\b/g,m=>contractions[m]).replace(/[.,?!]/g,'').replace(/\s+/g,' ');
export function transform(e:WorkedExample,topicId:string,kind:'negative'|'question'):TransformationStep{
 const aux=e.tokens.find(t=>t.role==='auxiliary')?.text;
 let a=aux??(topicId==='past-simple'?'did':e.plural?'do':'does');
 let verb=aux?e.tokens.find(t=>t.role==='verb')!.text:e.base;
 const [first,...rest]=a.split(' ');
 const subject=kind==='question'&&e.subject==='They'?'they':e.subject;
 const after=kind==='negative'?`${e.subject} ${first} not ${[...rest,verb,e.object,e.time].join(' ')}.`:`${first[0].toUpperCase()+first.slice(1)} ${subject} ${[...rest,verb,e.object,e.time].join(' ')}?`;
 return {before:sentence(e),after,explanation:{en:aux?'Use the first auxiliary for negation or move it before the subject for a question. The remaining verb phrase stays together.':'Add do/does/did. It carries tense and agreement, so the main verb returns to its base form.',bm:aux?'Gunakan kata kerja bantu pertama untuk ayat negatif atau pindahkannya sebelum subjek untuk soalan. Kekalkan baki frasa kerja bersama.':'Tambahkan do/does/did. Kata kerja bantu ini membawa kala dan penyesuaian subjek, maka kata kerja utama kembali kepada bentuk dasar.'}};
}
export function validOrder(order:string[],e:WorkedExample):boolean{const ids=e.tokens.map(t=>t.id);return order.join('|')===ids.join('|')||order.join('|')===['t',...ids.filter(x=>x!=='t')].join('|');}
export function validateProject(value:unknown):LocalLessonProject{
 if(!value||typeof value!=='object')throw Error('This is not a lesson project.');
 const v=value as Record<string,unknown>;
 const text=(x:unknown,max=500)=>typeof x==='string'&&x.length<=max;
 const int=(x:unknown,max:number)=>Number.isInteger(x)&&Number(x)>=0&&Number(x)<=max;
 if(v.format!=='grammar-studio'||v.version!==1)throw Error('Unsupported lesson format or version.');
 if(!text(v.id,100)||!text(v.title,120)||!text(v.updatedAt,100)||!['en','bm','both'].includes(String(v.language))||!['simple','advanced'].includes(String(v.level)))throw Error('Invalid lesson settings.');
 if(!Array.isArray(v.sequence)||v.sequence.length<1||v.sequence.length>100||!v.sequence.every(x=>x&&topics.some(t=>t.id===x.topicId&&t.examples.some(e=>e.id===x.exampleId))))throw Error('The lesson contains an unknown prepared example.');
 if(!int(v.active,v.sequence.length-1)||!int(v.step,3))throw Error('Invalid lesson position.');
 if(!Array.isArray(v.customExamples)||v.customExamples.length>100||!v.customExamples.every(x=>x&&text(x.id,100)&&text(x.text,2000)&&Array.isArray(x.tokens)&&x.tokens.length>0&&x.tokens.length<=200&&x.tokens.every((t:any)=>t&&text(t.id,100)&&text(t.text,200)&&roles.includes(t.role)&&classes.includes(t.wordClass))&&new Set(x.tokens.map((t:any)=>t.id)).size===x.tokens.length&&normalise(x.tokens.map((t:any)=>t.text).join(' '))===normalise(x.text)&&Array.isArray(x.annotations)&&x.annotations.length<=200&&x.annotations.every((a:any)=>a&&text(a.tokenId,100)&&x.tokens.some((t:any)=>t.id===a.tokenId)&&roles.includes(a.role)&&classes.includes(a.wordClass)&&['prepared','manual','suggested'].includes(a.source))))throw Error('Invalid custom annotations.');
 if(!Array.isArray(v.strokes)||v.strokes.length>300||!v.strokes.every(s=>s&&/^#[0-9a-f]{6}$/i.test(s.colour)&&(s.kind===undefined||['pen','highlight'].includes(s.kind))&&(s.width===undefined||(typeof s.width==='number'&&Number.isFinite(s.width)&&s.width>=1&&s.width<=64))&&Array.isArray(s.points)&&s.points.length<=2000&&s.points.every((p:any)=>Array.isArray(p)&&p.length===2&&p.every((n:any)=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=1000))))throw Error('Invalid whiteboard data.');
 // Build an allowlisted object; imported unknown fields are discarded.
 return {format:'grammar-studio',version:1,id:String(v.id),title:String(v.title),updatedAt:String(v.updatedAt),language:v.language as LocalLessonProject['language'],level:v.level as LocalLessonProject['level'],sequence:v.sequence.map(x=>({topicId:x.topicId,exampleId:x.exampleId})),customExamples:v.customExamples.map(x=>({id:x.id,text:x.text,tokens:x.tokens.map((t:any)=>({id:t.id,text:t.text,role:t.role,wordClass:t.wordClass})),annotations:x.annotations.map((a:any)=>({tokenId:a.tokenId,role:a.role,wordClass:a.wordClass,source:a.source}))})),strokes:v.strokes.map(s=>({colour:s.colour,points:s.points,...(s.kind!==undefined?{kind:s.kind}:{}),...(s.width!==undefined?{width:s.width}:{})})),active:Number(v.active),step:Number(v.step)};
}
export function validateAI(value:unknown,original:string):AIAnalysisSuggestion{
 const v=value as AIAnalysisSuggestion;
 if(!v||!Array.isArray(v.tokens)||v.tokens.length<1||v.tokens.length>150||typeof v.explanation!=='string'||v.explanation.length>4000)throw Error('AI response does not match the annotation schema.');
 if(v.tokens.some(t=>!t||typeof t.text!=='string'||t.text.length>200||!roles.includes(t.role)||!classes.includes(t.wordClass)))throw Error('AI supplied an unsupported grammatical label.');
 if(literalWords(v.tokens.map(t=>t.text).join(' '))!==literalWords(original))throw Error('AI changed the sentence. Its annotations were rejected.');
 return {tokens:v.tokens.map((t,i)=>({id:String(i),text:t.text,role:t.role,wordClass:t.wordClass})),explanation:v.explanation,confidence:'uncertain'};
}
