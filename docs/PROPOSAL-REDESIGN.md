# Tenses Teaching Aids - AceBee

The 13 October 2026 redesign follows the supplied handwritten proposal's five-screen sequence. It keeps short explanations and direct tap feedback rather than presenting the complete teacher workspace on entry.

1. **Landing:** generated Tenses title artwork; the actual supplied five-second AceBee MP4 animates beneath “Powered by”. Playback is muted by default, with a sound control.
2. **Time:** Present, Past and Future bubbles surround Tenses.
3. **Aspect:** Simple, Continuous, Perfect and Perfect continuous bubbles surround the selected time category.
4. **Verb:** original root words appear first. Tapping one reveals its reviewed auxiliary and verb form with a coloured, bold italic transformation. Tapping again opens its example. Future Simple retains separate will and going-to choices.
5. **Example:** an animated timeline sits above the root-to-form card, contextual sentence and matched action illustration. Returning to the verb screen resets the word display so another root can be chosen.

Six illustrated roots are available: complete, plant, eat, read, write and see. See is excluded from continuous demonstrations to avoid introducing an unqualified stative-verb usage. Present perfect uses has/have plus the participle; past perfect uses had plus the participle. The sketch's “has completed” under Past Perfect was corrected in line with the supplied past-perfect reference pages.

## Existing teaching functions

Teaching tools opens the retained studio for the selected tense. Demonstrate, Compare, Sentence builder, Error detective, Practise, Sandbox, local lesson storage, backups, DOCX/PPTX/PDF exports, optional AI, independent floating bars and the adjustable eraser remain available. The existing studio continues to use its reviewed complete/plant prepared curriculum examples; the illustrated journey supplies the additional root contexts. The studio stays mounted when returning to the journey so unsaved studio state is retained within the page session.

The new example screen reuses the ink layer and partial-erasure geometry, with separate undo/redo history for its active illustrated scene. Its feature and control bars minimise independently. Fullscreen targets their enclosing journey element; opening the studio exits that fullscreen element before showing the studio, preventing controls from being stranded outside it.

## Source materials

- CamScanner 13-10-2026 15.50.pdf: handwritten layout/workflow proposal.
- CamScanner 13-10-2026 15.36.pdf: present-perfect reference uses and examples.
- CamScanner 13-10-2026 15.35.pdf: past-perfect reference uses and examples.
- WhatsApp Video 2026-10-13 at 15.55.22.mp4: the five-second, 1280 x 720 AceBee logo animation.

The scanned PDF pages are references and are not published as page images. The supplied MP4 is copied unchanged into the project. New title/action PNGs were generated with ImageGen. Runtime WebP copies were encoded losslessly and checked for identical visible pixels and alpha; original PNGs are retained. All media and the local font are embedded in the standalone HTML, with no runtime asset CDN requirement.

## Verification

- 32 existing grammar/integration/eraser checks passed.
- 72 illustrated example combinations across 13 tense/aspect variants passed.
- 27 existing browser groups and 14 retained floating-control groups passed after connecting the journey.
- Journey browser checks cover the supplied MP4's exact bytes, decoding and playback offline; five-screen navigation; root-first transformations; changing contexts/images; timeline play/pause/reset and point-action pulse; ink/partial erasing/undo; fullscreen handoff; every tense/aspect path; and 1920, 1440, 1280, 1024, 640 and 390 pixel layouts.

All **20 journey browser groups passed** across both distributions. Detailed evidence: `test-results/journey-results.json`. Run `npm run test:journey` and `npm run test:journey:browser` after a production build. Native browser F11 is not automated; the Fullscreen API and normal projector-sized viewports are tested.
