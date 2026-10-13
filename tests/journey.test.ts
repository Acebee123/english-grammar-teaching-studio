import assert from 'node:assert/strict';
import {journeyVerbs,journeyTopic,journeyExample,availableJourneyVerbs,journeyDefinition,type TimeGroup,type Aspect} from '../src/journey-content';
import {forms} from '../src/content';
let checked=0;
for(const group of ['Present','Past','Future'] as TimeGroup[])for(const aspect of ['Simple','Continuous','Perfect','Perfect continuous'] as Aspect[])for(const planned of group==='Future'&&aspect==='Simple'?[false,true]:[false]){
 const id=journeyTopic(group,aspect,planned);assert(journeyDefinition(id).en&&journeyDefinition(id).bm);
 for(const verb of availableJourneyVerbs(id)){const e=journeyExample(id,verb),form=forms(id,verb);assert.equal(e.base,verb.base);assert.equal(e.tokens.find(t=>t.role==='verb')!.text,form.verb);assert(e.tokens.find(t=>t.role==='subject'));assert(e.timeline.start<=e.timeline.end);assert.equal(e.tokens.find(t=>t.role==='auxiliary')?.text??'',form.aux);checked++;}
}
const complete=journeyVerbs[0],eat=journeyVerbs.find(v=>v.id==='eat')!;
assert.equal(forms('past-perfect',complete).aux,'had');assert.equal(forms('present-perfect',complete).aux,'has');assert.equal(forms('past-perfect',eat).verb,'eaten');assert.equal(forms('past-simple',eat).verb,'ate');assert(!availableJourneyVerbs('present-continuous').some(v=>v.id==='see'));
console.log(JSON.stringify({status:'passed',exampleChecks:checked,forms:13,verbs:journeyVerbs.length}));
