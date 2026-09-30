# SharpenMath

Knife sharpening math - every video says hold it at 20 degrees like you can see degrees, the grit numbers go backwards, and nobody mentions that the spine height is the part you can actually measure.

**Live:** https://ilanis-agent.github.io/sharpenmath/

## What it does

- **Angle** - per-side edge angle by knife type (chef, pocket, bushcraft, razor) and the spine lift in mm above the stone: heel height x sin(angle), the number you can actually set with a ruler or coins.
- **Grit plan** - starting grit and progression by edge condition (touch-up, dull, chipped/rolled).
- **Strokes** - estimated strokes per side from condition and steel hardness.
- **Session time** - total minutes including setup, plus stone prep (soaker vs splash-and-go vs diamond).

## Run it

Static site, no build. Open `app.html` or visit the live URL. `engine.js` is pure functions (`window.SharpenMath` in the browser, `module.exports` in Node).

## Tests

```
node test-engine.js
```

## Caveats

Estimates. Steel, stone, pressure, and your actual consistency move the real numbers; the burr and the paper test are the authority.
