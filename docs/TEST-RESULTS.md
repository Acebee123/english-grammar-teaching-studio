# Verification results

12 October 2026. Stage 0/1 prototype prepared for teacher review.

- TypeScript strict checking and Vite production build: passed.
- Grammar/content/integration tests: **25 passed**, covering 13 topics and 26 prepared examples, bilingual fields, reference-time constraints, auxiliaries, contractions, input schemas, custom annotation persistence and AI boundaries.
- Browser acceptance groups: **27 passed** across standalone HTML and real HTTP static distribution, including hosted asset caching and offline reload.
- All 13 topics and both prepared examples rendered. Playback, pause, replay, steps, language preservation, negative/questions/contextual tense changes, real drag/drop, keyboard arrangement, comparisons, progressive error reveal, prepared answers, manual annotation, AI failure, custom edits, save/reload and validated backups passed.
- DOCX/PPTX/lesson JSON downloads succeeded with networking disabled. Browser-generated A4 PDF rendered successfully.
- Microsoft Word opened both distribution samples read-only: 43 paragraphs, 2 pages and editable text. PowerPoint opened both samples read-only: 14 slides with 70 native text shapes, plus editable timeline shapes. Word pages, all sample slides and print output were rendered and visually inspected.
- Desktop/focus layouts inspected at 1280×720, 1440×900 and 1920×1080. A focus-mode grid error was fixed, and the canvas now scrolls independently while the dock reserves its own space.
- No browser page errors in the completed acceptance suite.

The restricted Windows tool sandbox initially cancelled browser downloads and blocked separate-process loopback access. Running the bounded acceptance tests with native Windows access resolved both; final checks used a real local HTTP server. This is a test-host restriction, not a runtime dependency of the application.

The skill's LibreOffice DOCX renderer could not run because LibreOffice is absent. Installed Microsoft Word was used to open the generated DOCX files and export their pages to PDF; Poppler rendered page images for visual inspection. Installed PowerPoint rendered the slide images. Compatible-application opening was verified rather than inferred from ZIP structure.

## Known limitations

- Only Tenses & Aspects is implemented. The other seven modules are explicitly Planned.
- Prepared deterministic transformations use reviewed complete/plant lexemes and exact prepared examples. The sandbox does not parse unrestricted English automatically.
- Optional Ollama/proxy adapters were checked for schema safety and graceful connection failure. No installed local model or teacher-configured online endpoint was available to validate successful live AI output.
- Local storage is browser/origin/path-specific. Keep a reusable lesson backup. Whiteboard strokes apply to the active scene; changing prepared examples clears the overlay.
- The prepared diagram is a functional phrase breakdown, not a complete syntax tree for arbitrary or ambiguous sentences.
- Independent Malaysian teacher review of grammar/Bahasa Melayu and an actual classroom/projector pilot remain necessary before a wider rollout. The earlier Solar System benchmark files were not available in this workspace.
- Editable exports preserve teaching content as document paragraphs and sequential slides; they do not preserve website interaction or whiteboard playback.

Detailed automated evidence: `test-results/browser-results.json`. The source distribution includes the test scripts; generated QA files are excluded from the source archive.

Additional export stress check: all 13 topics in combined English/Bahasa Melayu at advanced depth generated offline. Word opened the 7-page, 237-paragraph document; PowerPoint opened the 79-slide deck with 413 native text shapes. The 16-page A4 PDF parsed and rendered successfully.

13 October 2026 theme verification: the production build and all 27 browser acceptance groups passed again after applying Canvas First. The standalone file still works with networking disabled, including bundled artwork/font and document downloads. Highlighting, illustration visibility and previous/next topic navigation also passed. Screenshots were inspected at 1672×940 and 1280×720, including focus mode. The independent teaching canvas scrolls at smaller desktop heights so the floating dock and bottom navigation stay available. Screen theme overrides do not change the document export content.

13 October 2026 floating toolbar/eraser revision: strict production build passed; grammar/integration and eraser geometry/schema checks now total **32 passed**. The existing **27 browser acceptance groups** passed again. An additional **14 interaction groups** passed across the real HTTP build and standalone HTML with networking disabled: independent collapse/expand and keyboard focus, pen/highlighter drawing, adjustable circular erasing, partial stroke removal with original text/diagram protection, undo/redo, state preservation, actual Fullscreen API entry/exit and all six features inside fullscreen. Desktop/projector/narrow layout checks covered 1920×1080, 1440×900, 1280×720, 1024×768 and 640×800; canvas drag remains usable outside ink mode. Native browser F11 was not automated; normal-mode controls were checked at projector-sized viewports. Evidence is in `test-results/floating-results.json`; run `npm run test:floating` after building.

Proposal redesign: production build passed; 32 established unit/integration checks and 72 illustrated example combinations passed. Existing 27 browser groups and 14 studio floating-control groups passed again after connecting the new flow. The journey suite verifies both HTTP and fully offline distributions, including the supplied video's exact bytes, decoding/playback, root-first transformations, updated action images, genuine timeline playback, independent collapse, partial erasing and undo, fullscreen containment and safe return to the studio, every tense/aspect route and small-screen layout. See `test-results/journey-results.json` and `docs/PROPOSAL-REDESIGN.md`.
