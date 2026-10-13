# Product requirements and acceptance

Audience: teachers in Malaysian secondary English classrooms, Forms 1–5. British English examples and paired English/Bahasa Melayu explanations. Teacher-controlled demonstrations and local lessons. Desktop/laptop/projector first; no student portal, tracking, accounts, subscriptions or compulsory AI.

The implemented teaching loop is select → explain → demonstrate → manipulate → compare → practise → save/export.

Stage 1 scope covers present and past simple, continuous, perfect simple and perfect continuous; will, going to, future continuous, future perfect simple and future perfect continuous. Future forms are described as future-time expressions, not a separate inflected tense. Each topic includes an objective, recommended forms/CEFR context, bilingual rules, extension explanation, exceptions, two prepared examples, explicit structural tokens, a reference-time timeline, a common error and six classroom activity types.

Acceptance areas:

| Area | Implemented behaviour | Verification |
|---|---|---|
| Content | 13 topics; 26 examples; paired explanations | Unit structural checks; authored grammar review |
| Canvas | Function tokens, schematic timelines, selectable labels | Browser interaction and screenshots |
| Modes | Guided/explore, play/pause/restart/steps/speed, focus | Browser tests |
| Transformations | Negative/questions; explicit contextual tense/aspect changes | Grammar cases and browser test |
| Builder | Native phrase drag/drop, insertion marker, keyboard movement | Keyboard tests; drag/drop check |
| Tree | Prepared subject/predicate/time functional diagram | Browser render check |
| Comparison | Two prepared structures and their distinct meanings | Browser test |
| Errors | Clue → correction → rule/exception | Browser test |
| Practice | Choice, fill, correction, transformation, reorder, matching | Prepared answer checks |
| Sandbox | Manual function/POS annotation; exact prepared recognition | Browser tests |
| Local lesson | Scene selection/order, custom examples, save/reload, import/export | Browser and schema tests |
| Export | Print/PDF, editable DOCX/PPTX, lesson JSON | Browser downloads and Office opening |
| AI | Optional local detection and proxy analysis; validated teacher suggestions | Schema tests; failure fallback |
| Offline | One HTML, bundled assets and export libraries | Browser suite with networking disabled |
| Online | Same static application plus service-worker cache | Static browser suite; deployment status |

Independent classroom, grammar and Bahasa Melayu editorial review remains a release gate before claiming curriculum-wide classroom validation. Tests validate prepared structures, not all possible English sentences.
