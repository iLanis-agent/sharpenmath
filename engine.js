/* SharpenMath engine - knife sharpening math. Pure functions, no DOM. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SharpenMath = api;
}(typeof self !== 'undefined' ? self : this, function () {

  // Per-side edge angle (degrees) by knife type.
  var ANGLES = { chef: 15, pocket: 22, bushcraft: 27, razor: 12 };

  function angleFor(type) {
    return ANGLES[type] || 20;
  }

  // Spine lift above the stone: blade heel height * sin(per-side angle).
  // This is the gap you measure or prop with coins.
  function spineLift(heelHeightMm, angleDeg) {
    return Math.round(heelHeightMm * Math.sin(angleDeg * Math.PI / 180) * 10) / 10;
  }

  // Grit plan: [start grit, progression, stroke multiplier] by edge condition.
  var PLANS = {
    touchup: { start: 1000, steps: [1000, 3000, 8000], mult: 1.0 },
    dull: { start: 400, steps: [400, 1000, 3000], mult: 2.5 },
    damaged: { start: 220, steps: [220, 400, 1000, 3000], mult: 4.0 }
  };

  function gritPlan(condition) {
    return PLANS[condition] || PLANS.dull;
  }

  var HARDNESS = { soft: 0.8, medium: 1.0, hard: 1.4 };

  // Estimated strokes per side on the starting stone.
  function strokesFor(condition, hardness, base) {
    var b = base || 40;
    var plan = gritPlan(condition);
    var h = HARDNESS[hardness] || 1.0;
    return Math.round(b * plan.mult * h / 5) * 5;
  }

  // Total session minutes: both sides on the starting stone, plus setup.
  function sessionMinutes(strokesPerSide, secPerStroke, setupMin) {
    var s = secPerStroke || 2;
    var setup = setupMin === undefined ? 5 : setupMin;
    return Math.round((2 * strokesPerSide * s) / 60) + setup;
  }

  // Stone prep by stone type.
  function stonePrep(stone) {
    var m = {
      soaker: '10-15 min soak until the bubbles stop',
      splash: 'splash and go - no soak, keep it wet',
      diamond: 'no soaking - rinse and a little water as lube'
    };
    return m[stone] || m.splash;
  }

  return {
    angleFor: angleFor,
    spineLift: spineLift,
    gritPlan: gritPlan,
    strokesFor: strokesFor,
    sessionMinutes: sessionMinutes,
    stonePrep: stonePrep
  };
}));
