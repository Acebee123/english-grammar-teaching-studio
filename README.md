# English Grammar Teaching Studio

Stage 0 foundation and Stage 1 working Tenses & Aspects prototype. React + TypeScript + Vite, with no mandatory backend, paid API, account or runtime CDN.

The Canvas First theme follows the supplied classroom reference: a pale blue workspace, rounded white teaching canvas, navy headings, pastel grammar tokens, a warm reading illustration and a yellow Remember card. The floating dock provides playback, highlighting, annotation, settings and focus mode; topic and demonstration navigation remain at the bottom. Topics start collapsed to leave more space for teaching.

The illustration and Nunito font are bundled locally and embedded in the offline HTML. The illustration was generated for this project. Nunito's SIL Open Font License is included in `src/assets/Nunito-OFL.txt`.

## Open the application

For standalone Windows use, open `offline/Grammar-Teaching-Studio.html` in current Chrome or Edge. It is one self-contained HTML file. Keep it at a stable path, and export lesson backups before moving it or clearing browser data.

For development, install Node.js 22.12+ or 24 and run these commands in this directory:

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Alternatively use pnpm 11.25 with the included lockfile (`pnpm install`, `pnpm dev`). On the restricted Codex Windows host, `node scripts/install.mjs` uses its bundled pnpm runtime and a local package store. The documented compatibility shim replaces native path resolution with Node's synchronous resolver under the same filesystem permissions.

```sh
npm run build
npm test
npm run test:browser
```

Browser tests require current Google Chrome installed. The tests run both the self-contained file with networking disabled and the actual static build from a local HTTP server, including service-worker offline reload. See the verification limitations in `docs/TEST-RESULTS.md`.

## Distributions

- `dist/`: deployable static site. Upload its contents to a static HTTPS host. It includes a service worker for offline asset caching after a successful first visit.
- `offline/Grammar-Teaching-Studio.html`: standalone distribution. Requires no hosted server, service worker, installation or internet connection.
- Core lesson persistence uses IndexedDB, with a localStorage fallback and explicit error reporting. If browser storage is unavailable, Export → Reusable lesson remains available.
- DOCX and PPTX libraries are bundled into both distributions. PDF uses the browser print dialog. Exported documents remain editable; web interactions become sequential teaching slides.

## Classroom workflow

1. Choose a topic and prepared example. Use form filters as teaching recommendations.
2. Use Guided mode and the bottom dock to reveal context, structure, time and meaning. Arrow keys step; Space plays/pauses.
3. Use Explore for a complete view, or open Compare, Sentence builder, Error detective, Practise or Sandbox.
4. Change explanation language or depth without resetting the demonstration. Focus mode enlarges projected content.
5. Add scenes to the lesson sequence, reorder them in My lessons, save locally and export a file backup.

The sandbox recognises **exact prepared sentences** and supports unrestricted manual annotation. It does not pretend to parse arbitrary English. Teacher annotations can be saved, reloaded and edited. Optional AI suggestions are validated and require teacher acceptance.

## Optional AI

For local AI, separately install Ollama and a suitable model; start the server and configure browser CORS access. Use Detect local models to check availability. This prototype does not download models. File origins, HTTPS pages, browser local-network permissions and mixed-content restrictions can affect connectivity.

For online AI, configure an HTTPS OpenAI-compatible chat-completions **proxy** endpoint and model. Provider credentials should remain on your proxy. A limited session proxy token can be entered in the browser; it stays in memory and is never exported or stored. The browser exposes in-memory credentials to page scripts. No external request is made until the teacher requests detection or analysis. The entered sentence is sent to the selected service.

## Source structure

```text
src/
  schema.ts          Typed grammar, curriculum, lesson and AI entities
  content.ts         Original bilingual topics and prepared examples
  engine.ts          Deterministic transformations and schema validation
  storage.ts         IndexedDB persistence, fallback, downloads
  ai.ts              Optional Ollama and HTTPS proxy adapters
  exports.ts         Print materials, editable DOCX and PPTX generation
  Transformation.tsx Progressive structure and meaning changes
  main.tsx           Teacher interaction state and teaching views
  style.css          Base canvas, activities, export and print layout
  theme.css          Canvas First palette, type, components and responsiveness
  theme-fit.css      Compact teaching toolbar and screen layout adjustments
  assets/            Bundled classroom illustration, Nunito font and licence
scripts/
  build.mjs          Type check, static build, offline package
  offline.mjs        Single-file bundling and service-worker generation
  dev.mjs            Local Vite preview
  serve.mjs          Static distribution preview
  test.mjs           Compile and run grammar/integration tests
tests/
  engine.test.ts     Content, grammar, imports and AI boundary checks
  browser.mjs        Browser interactions and export checks
docs/                Requirements, decisions, roadmap and validation
```

The other seven modules are explicitly marked Planned. Review this prototype before expanding. Stage 2 adds Sentence Structure & Parts of Speech and Subject–Verb Agreement, following the same content-driven architecture.

