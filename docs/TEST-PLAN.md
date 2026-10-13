# Test plan

Run `npm test` for content invariants, singular/plural auxiliaries, do-support, explicit timeline references, versioned lesson validation, unknown-field rejection, custom annotation round trips, AI sentence preservation and endpoint restrictions.

Run `npm run test:browser` for both distributions. Standalone HTML uses `file://` with networking disabled. The static build uses a real local HTTP server. Test service-worker installation and an offline reload after caching. On the restricted Windows tool host, browser downloads require native Windows test access. This checks actual assets, DOM, IndexedDB, downloads, interactions and the cache lifecycle.

Exercise all 13 topics and 26 prepared examples. Verify steps, language state preservation, playback, transformations, annotation undo, comparisons, keyboard builder, progressive error reveal, answer feedback, custom labels, AI failure, local save/reload, backups, malformed imports and real document downloads. Inspect 1280×720, 1440×900 and 1920×1080 images; check no horizontal overflow and controls remain usable in focus mode.

Open generated DOCX and PPTX in Microsoft Word/PowerPoint using read-only automation. Count paragraphs/slides/shapes and render representative output pages/slides where supported. Verify browser-generated PDFs with a compatible PDF reader/rendering engine. Do not count a download alone as export compatibility.

Release verification additionally requires independent grammar/Bahasa Melayu editorial review and a projector/classroom pilot. Live Ollama/proxy success requires an installed model and configured endpoint; absence is checked as a graceful failure, not a successful AI integration claim.

