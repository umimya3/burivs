/* ================= GAME DATA (data/stage_data.js) =================
   Data/program separation (v62 in-file block, externalized in
   v68): everything that GROWS when content is added — the
   stage's shape and dressing, the props layout, the mission/
   wave recipe — lives here as plain data; the program in
   index.html only reads it. Loaded by a classic <script> tag
   ahead of the main script, so it shares the global scope and
   works from file:// in the same folder. Values are the
   playtest-confirmed ones, moved verbatim. (The mission recipe
   stays here until modes.js exists; see generalization_design
   section 7.) */
var GAME_DATA = {
  stage: {
    id: 'beach',
    fieldR: 38,
    seaRadius: 75, seaColor: 0x2f6d8f,
    sandColor: 0xdcc79c,
    wetSandColor: 0xc8ad7d, wetRingOuter: 3.4,
    foamColor: 0xeaf6fb, foamOpacity: 0.75, foamRingOuter: 3.75,
    skyStops: [[0.0, '#2e7cd6'], [0.45, '#63aae6'], [0.78, '#a9d6f5'], [1.0, '#e8f6fd']],
    fogColor: 0xcfeaf8, fogNear: 26, fogFar: 95,
    fence: { posts: 56, woodColor: 0x7a5a3d, railHeights: [0.42, 0.82] },
    scatter: { seed: 20261105, count: 36, pineChance: 0.52, rockChance: 0.74,
               trunkColor: 0x5d4230, pineColors: [0x2f5d3a, 0x386840, 0x2a5233],
               rockColor: 0x8d9299 },
    windbreak: { count: 16, ringOff: 3.2, radSpan: 3.2, scaleMin: 1.5, scaleSpan: 0.7 }
  },
  props: {
    seed: 777001, count: 11, minDist: 4.2, minR: 6.5,
    barrelEvery: 3, crateHp: 2, barrelHp: 3, crateR: 0.62, barrelR: 0.5,
    crateColor: 0x9a7448, ringColor: 0x45454e, edgeColor: 0x5f4226
  },
  mission: {
    time: 300,
    kindQuotas: [['fast', 0.27], ['ranged', 0.2], ['heavy', 0.2]],
    kindSlotFrom: 2,
    spawn: { angle0: 0.8, angleStep: 2.39996, rMin: 9, rSpan: 13, soloR: 11 }
  }
};

/* v101: the stage REGISTRY (space_separation_design_v1). GAME_DATA.stage
   above stays the beach's own entry and the compat alias; stages grow
   by appending entries here — a colour/time variant reuses a builder
   with palette overrides, a new terrain adds one builder key. The
   active stage is GAME_DATA.stages[GAME_DATA.activeStage || 0]. */
GAME_DATA.stages = [ GAME_DATA.stage ];
GAME_DATA.activeStage = 0;
