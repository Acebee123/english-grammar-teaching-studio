export type Bilingual = {en:string;bm:string};
export type Role = 'subject'|'auxiliary'|'verb'|'object'|'complement'|'time'|'other';
export type WordClass = 'noun'|'verb'|'pronoun'|'adjective'|'adverb'|'determiner'|'preposition'|'conjunction'|'phrase'|'unknown';
export interface GrammarModule {id:string;title:string;status:'ready'|'planned';topicIds:string[]}
export interface CurriculumMapping {forms:number[];cefr:string;status:'recommended'|'verified-extension';source:string;note:string}
export interface GrammarRule {id:string;explanation:Bilingual;advanced:Bilingual;exception:Bilingual;formula:string}
export interface SentenceToken {id:string;text:string;role:Role;wordClass:WordClass}
export interface GrammaticalAnnotation {tokenId:string;role:Role;wordClass:WordClass;source:'prepared'|'manual'|'suggested'}
export interface SentenceTree {label:string;children?:SentenceTree[];tokenIds?:string[]}
export interface TimelineEvent {kind:'habit'|'point'|'ongoing'|'perfect'|'perfect-progressive';start:number;end:number;reference:number;label:Bilingual;note:Bilingual}
export interface WorkedExample {id:string;tokens:SentenceToken[];timeline:TimelineEvent;context:Bilingual;subject:string;plural:boolean;object:string;base:string;past:string;participle:string;ing:string;time:string;tree:SentenceTree}
export interface TransformationStep {before:string;after:string;explanation:Bilingual}
export interface ComparisonExample {leftTopicId:string;rightTopicId:string;note:Bilingual}
export type ExerciseKind = 'choice'|'fill'|'reorder'|'matching'|'correction'|'transformation';
export interface AnswerExplanation {answers:string[];explanation:Bilingual}
export interface Exercise {id:string;kind:ExerciseKind;prompt:Bilingual;options?:string[];answer:AnswerExplanation}
export interface GrammarTopic {id:string;title:string;short:string;group:'Present'|'Past'|'Future';mapping:CurriculumMapping;objective:Bilingual;rule:GrammarRule;examples:WorkedExample[];mistake:{wrong:string;correct:string;why:Bilingual};exercises:Exercise[];compareWith:string}
export interface Lesson {topicId:string;exampleId:string}
export interface Stroke {points:[number,number][];colour:string}
export interface CustomExample {id:string;text:string;tokens:SentenceToken[];annotations:GrammaticalAnnotation[]}
export interface LocalLessonProject {format:'grammar-studio';version:1;id:string;title:string;updatedAt:string;language:'en'|'bm'|'both';level:'simple'|'advanced';sequence:Lesson[];customExamples:CustomExample[];strokes:Stroke[];active:number;step:number}
export interface AIAnalysisSuggestion {tokens:SentenceToken[];explanation:string;confidence:'uncertain'|'supported'}
