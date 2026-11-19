/* ================= UNITS DATA (data/units.js) =================
   Enemy type / kind tables, personality numbers and difficulty
   tables, externalized from the main script in v68. Pure data
   literals, moved verbatim; loaded ahead of the main script.
   */

var ENEMY_TYPES = {
  gentle:     { name: 'マグロ', cols: [0x2e4a73, 0xcfd8de, 0x22364f] },
  normal:     { name: 'ブリ',   cols: [0x86a8bd, 0xdfe7ea, 0xe8c33a] },
  aggressive: { name: 'アカ',   cols: [0xb6493f, 0xe8c9b8, 0x8e352d] }
};

/* enemy kinds （種類） dealt over the roster independently of
   personality: fast / ranged / heavy mixed into the middle game,
   never in the opening pair, and the LAST slot is always the boss */
var ENEMY_KINDS = {
  normal: { scale: 1,    hp: 60, r: 0.85, speedMul: 1,    pushMul: 1,    shotMul: 1 },
  fast:   { scale: 0.8,  hp: 30, r: 0.68, speedMul: 1.5,  pushMul: 1.1,  shotMul: 1,
            name: 'サンマ',     cols: [0x8fa8b8, 0xe8eef0, 0x5b7a8c] },
  heavy:  { scale: 1.3,  hp: 120, r: 1.1,  speedMul: 0.72, pushMul: 0.35, shotMul: 0.5, armor: true,
            name: '重装マグロ', cols: [0x39424e, 0x9aa4ac, 0x232a31] },
  ranged: { scale: 0.95, hp: 50, r: 0.8,  speedMul: 1.0,  pushMul: 1,    shotMul: 1,
            name: 'テッポウウオ', cols: [0x3e7d6e, 0xd8e8d2, 0x2a5a4e] },
  boss:   { scale: 3.0,  hp: 450, r: 2.55, speedMul: 0.9,  pushMul: 0.12, shotMul: 1, armor: true,
            name: '大将ブリ',   cols: [0xa8bfd4, 0xf2ead8, 0xffc84d], person: 'boss' }
};

/* difficulty tables must be initialized before the roster
   build below reaches diffCfg() during initial evaluation */
var DIFFS = {
  easy:   { label: 'かんたん',   eHp: 0.7, eDmg: 0.6, time: 1.25 },
  normal: { label: 'ふつう',     eHp: 1.0, eDmg: 1.0, time: 1.0 },
  hard:   { label: 'むずかしい', eHp: 1.4, eDmg: 1.4, time: 0.85 }
};

var PERSONALITIES = {
  gentle:     { label: 'おとなしい', detectR: 9,  chaseProb: 0.15, decInt: 1.4,
                wanderSpeed: 0.7,  chaseSpeed: 1.25, atkRange: 1.9,
                atkProb: 0.35, windup: 0.85, dmg: 80,  cdMin: 2.6, cdMax: 4.2 },
  normal:     { label: 'ふつう',     detectR: 13, chaseProb: 0.55, decInt: 1.0,
                wanderSpeed: 0.9,  chaseSpeed: 1.9,  atkRange: 1.95,
                atkProb: 0.7,  windup: 0.65, dmg: 100, cdMin: 1.8, cdMax: 3.0 },
  aggressive: { label: '好戦的',     detectR: 18, chaseProb: 0.95, decInt: 0.6,
                wanderSpeed: 1.05, chaseSpeed: 2.6,  atkRange: 2.0,
                atkProb: 1.0,  windup: 0.5,  dmg: 120, cdMin: 1.1, cdMax: 2.0 },
  boss:       { label: '大将',       detectR: 30, chaseProb: 1.0, decInt: 0.5,
                wanderSpeed: 1.0,  chaseSpeed: 1.9,  atkRange: 4.6,
                atkProb: 1.0,  windup: 1.0, dmg: 160, cdMin: 1.3, cdMax: 2.0 }
};

/* ================= PLAYER WEAPON DATA (v71, v91) =================
   The 特殊射撃 slot: thrown buri-bombs that settle as TIMED
   mines (a homage to BALDR SKY's ギガマイン — planted ordnance
   whose blast does not care whose side you are on). v91: the
   proximity trigger is gone — a settled bomb counts down its
   fuse and blows on schedule, and the damage went up by half
   across the board, because ordnance you have to wait out
   (and clear out of) should pay like it. All numbers live
   here as content; the program in index.html only reads
   them. The stage names are player-facing: the charge glow
   and the ammo chip label speak them. */
var MINE_DATA = {
  names: ['鰤爆弾', 'メガマイン', 'ギガマイン'],
  dmg: [60, 80, 120],             // v91: blast damage by stage — 1.5x the v71 values (40/55/80)
  blastR: [2.6, 3.0, 3.6],        // blast radius (m), unchanged in v91; the TNT barrel is 40 dmg / 3.2m, for scale
  fuseT: [2.5, 3.0, 3.5],         // v91: seconds from touchdown to detonation, by stage — the bigger bomb burns longer
  throwSpd: [5.5, 9.5, 14],       // throw speed by stage = reach: roughly 5m / 11m / 22m
  size: [0.95, 1.3, 1.8],         // fish-bomb scale by stage
  chargeT: [0.55, 1.15],          // hold seconds to reach stage 2 / stage 3
  maxSet: 3,                      // mines standing on the field at once (a further throw retires the oldest)
  ammoMax: 3, reload: 4.0,        // magazine size / reload seconds (VS rule: reload only from empty; reload stays 4.0 by user decision)
  cooldown: 1.2                   // per-throw cooldown (the old SP_CD)
};
