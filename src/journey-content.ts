import {forms,getTopic} from './content';
import type {Bilingual,WorkedExample} from './schema';
export type TimeGroup='Present'|'Past'|'Future';
export type Aspect='Simple'|'Continuous'|'Perfect'|'Perfect continuous';
export type JourneyVerb={id:string;base:string;past:string;participle:string;ing:string;subject:string;plural:boolean;object:string;reference:string;referenceLabel:string};
export const journeyVerbs:JourneyVerb[]=[
 {id:'complete',base:'complete',past:'completed',participle:'completed',ing:'completing',subject:'Aina',plural:false,object:'the report',reference:'before the teacher arrived',referenceLabel:'Teacher arrived'},
 {id:'plant',base:'plant',past:'planted',participle:'planted',ing:'planting',subject:'They',plural:true,object:'the trees',reference:'before the rain began',referenceLabel:'Rain began'},
 {id:'eat',base:'eat',past:'ate',participle:'eaten',ing:'eating',subject:'Amanda',plural:false,object:'the cake',reference:'before the guests arrived',referenceLabel:'Guests arrived'},
 {id:'read',base:'read',past:'read',participle:'read',ing:'reading',subject:'The pupils',plural:true,object:'a story',reference:'before the lesson began',referenceLabel:'Lesson began'},
 {id:'write',base:'write',past:'wrote',participle:'written',ing:'writing',subject:'Mei',plural:false,object:'a letter',reference:'before the post office closed',referenceLabel:'Post office closed'},
 {id:'see',base:'see',past:'saw',participle:'seen',ing:'seeing',subject:'Marcia',plural:false,object:'the film',reference:'before it reached the cinemas',referenceLabel:'Film released'}
];
export function journeyTopic(group:TimeGroup,aspect:Aspect,planned=false):string{
 if(group==='Future'&&aspect==='Simple')return planned?'going-to':'will';
 const prefix=group.toLowerCase();return prefix+'-'+(aspect==='Perfect continuous'?'perfect-continuous':aspect.toLowerCase());
}
export const journeyTitle=(id:string)=>getTopic(id).title.replace(' perfect simple',' perfect')+(id==='will'?'':' tense');
const definitions:Record<string,Bilingual>={
 'present-simple':{en:'Routines, facts and states.',bm:'Rutin, fakta dan keadaan.'},
 'present-continuous':{en:'An action in progress at or around now.',bm:'Perbuatan yang sedang berlangsung sekitar sekarang.'},
 'present-perfect':{en:'An earlier action connected to now.',bm:'Perbuatan terdahulu yang berkait dengan masa kini.'},
 'present-perfect-continuous':{en:'An activity continuing up to now, or recently stopped.',bm:'Perbuatan yang berterusan hingga sekarang, atau baru berhenti.'},
 'past-simple':{en:'A finished action at a past time.',bm:'Perbuatan yang selesai pada masa lampau.'},
 'past-continuous':{en:'An action in progress at a past time.',bm:'Perbuatan yang sedang berlangsung pada masa lampau.'},
 'past-perfect':{en:'An action completed before another past action or time.',bm:'Perbuatan yang selesai sebelum perbuatan atau masa lampau yang lain.'},
 'past-perfect-continuous':{en:'The duration of an activity up to a past point.',bm:'Tempoh perbuatan hingga suatu waktu lampau.'},
 will:{en:'A prediction, promise or decision about the future.',bm:'Ramalan, janji atau keputusan tentang masa hadapan.'},
 'going-to':{en:'A future plan, or a prediction based on evidence.',bm:'Rancangan masa hadapan atau ramalan berdasarkan bukti.'},
 'future-continuous':{en:'An action in progress at a future time.',bm:'Perbuatan yang sedang berlangsung pada masa hadapan.'},
 'future-perfect':{en:'An action completed by a future point.',bm:'Perbuatan yang selesai sebelum atau pada suatu waktu hadapan.'},
 'future-perfect-continuous':{en:'The duration of an activity up to a future point.',bm:'Tempoh perbuatan hingga suatu waktu hadapan.'}
};
export const journeyDefinition=(id:string)=>definitions[id];
export function journeyExample(topicId:string,verb:JourneyVerb):WorkedExample{
 const topic=getTopic(topicId),template=topic.examples[verb.plural?1:0],form=forms(topicId,verb);
 const time=topicId==='past-perfect'?verb.reference:template.time;
 const tokens=[{id:'s',text:verb.subject,role:'subject' as const,wordClass:verb.subject==='They'?'pronoun' as const:verb.subject==='The pupils'?'phrase' as const:'noun' as const},...(form.aux?[{id:'a',text:form.aux,role:'auxiliary' as const,wordClass:'verb' as const}]:[]),{id:'v',text:form.verb,role:'verb' as const,wordClass:'verb' as const},{id:'o',text:verb.object,role:'object' as const,wordClass:'phrase' as const},{id:'t',text:time,role:'time' as const,wordClass:time==='already'?'adverb' as const:'phrase' as const}];
 return {...verb,id:'journey-'+topicId+'-'+verb.id,time,tokens,context:journeyDefinition(topicId),timeline:{...template.timeline,label:journeyDefinition(topicId),note:topicId==='past-perfect'?{en:'The first action is complete before the later past event.',bm:'Perbuatan pertama selesai sebelum peristiwa lampau yang kemudian.'}:template.timeline.note},tree:{label:'Main clause',children:tokens.map(t=>({label:t.role,tokenIds:[t.id]}))}};
}
export const availableJourneyVerbs=(id:string)=>id.includes('continuous')?journeyVerbs.filter(v=>v.id!=='see'):journeyVerbs;
