# Architecture decisions

**ADR 01 — Data-driven teaching.** Typed content is independent of React. Eight module records define the curriculum architecture; only Tenses & Aspects is populated. Explanations share rule IDs across languages. Form mappings identify recommended contexts, with a source and qualification rather than invented learning-standard codes.

**ADR 02 — Deterministic prepared engine.** Prepared examples include subject number, verb lexeme forms, functional phrase tokens, context, tree data and timeline/reference data. Transformations use auxiliaries and explicit base forms. Known complete/plant lexemes are supported; the engine is not an unrestricted morphology or parsing library. Negative/question transformations preserve the original event reference; switching tense/aspect deliberately selects a different prepared context and warns that meaning changes.

**ADR 03 — Honest sentence analysis.** Prepared annotation is recognised by exact normalised matching. Unrestricted sentences begin with teacher annotation. Phrases are labelled as phrases, not incorrectly classified as single word classes. AI must preserve the words and use allowlisted labels. Suggestions are displayed separately until accepted, and accepted labels remain editable.

**ADR 04 — Local projects.** Format identifier `grammar-studio`, schema version 1. Only known fields are retained on import; limits constrain file size, scenes, text, tokens and drawing points. Unknown prepared IDs and unsupported versions are rejected. React escapes imported text. Credentials and executable content are absent from the project schema. A future version should migrate v1 through an explicit validated migration rather than silently reinterpret fields.

**ADR 05 — Two distributions.** Vite builds a static site with bundled dependencies. Rollup inlines dynamic dependencies to eliminate chunk fetching from the offline file. The packaging step embeds JS and CSS into one inline-module HTML. File mode skips service workers. Hosted HTTPS mode caches only same-origin static assets. Browser storage behaviour is origin/path-specific; export backups are the portability mechanism.

**ADR 06 — Exports.** `docx` emits editable Word paragraphs; `pptxgenjs` emits native PowerPoint text, editable timeline shapes and teaching slides. Print CSS emits activities and a separate teacher key. Project JSON is distinct from material exports. Website interaction and drawing playback are not claimed to survive in Word or PowerPoint.

**ADR 07 — Optional AI.** Local Ollama adapter uses explicit model detection and JSON responses. Online adapter expects a teacher-controlled secure chat-completions proxy; no backend is needed for core functions. Timeout, transport and schema failures leave manual/prepared work intact. Session tokens stay in memory. No analytics or unsolicited external connections are present.

**ADR 08 — Rendering convention.** Functional phrase anatomy: subject, auxiliary, main verb, object/complement and time adjunct. The prepared tree groups subject and predicate separately from the time adjunct; time phrases containing subordinate clauses are not presented as a complete word-level parse. Dots represent events; duration bars represent an activity spanning a reference; curved dashed arrows connect completion to reference. All positions are schematic. Speaking time is always NOW.

