// ============================================================
// Gym Tracker — Jeff Nippard Ultimate Push Pull Legs System
// ============================================================
// Program: 3 phases (Hypertrophy 6w, Maximum Effort 4w, Supercompensation 3w)
// 4 days/week: Legs, Push, Pull, Full Body
// Data encoded from PDF: warm-up set counts + working set prescriptions
// ============================================================

// ── Exercise builder helpers ──
// ex(name, warmup, work, sub, notes)
// work: array of {sets,reps,rpe,rest}
function ex(name, warmup, work, sub, notes) {
  return { name: name, origName: name, warmup: warmup, work: work, sub: sub || [], notes: notes || '' };
}
function w(sets, reps, rpe, rest) { return { sets: sets, reps: reps, rpe: rpe, rest: rest }; }

// ── Phase 1 base templates ──
// Only primary lift reps vary per week; everything else is fixed.
// Week 6 is a semi-deload (defined separately at the end).

// Phase 1 — week-varying reps for primary lifts
var P1_SQUAT_REPS  = { 1:'2–4', 2:'3–5', 3:'4–6', 4:'3–5', 5:'2–4' };
var P1_BENCH_REPS  = { 1:'3–5', 2:'3–5', 3:'2–4', 4:'2–4', 5:'3–5' };
var P1_DEAD_REPS   = { 1:'5',   2:'4',   3:'3',   4:'2',   5:'1'   };

function p1Legs(week) {
  var sqReps = P1_SQUAT_REPS[week];
  return [
    ex('Back Squat', 4, [w(1, sqReps, '8–9', '~3–4 min')],
      ['Hack Squat', 'DB Bulgarian Split Squat'],
      'Sit back and down, keep upper back tight to bar.'),
    ex('Pause Squat (Back-off)', 0, [w(2, '5', '8–9', '~3–4 min')],
      ['Pause Hack Squat', 'Pause DB Bulgarian Split Squat'],
      'Drop ~25% from top set. 2-second pause at bottom.'),
    ex('Dumbbell RDL', 2, [w(3, '8–10', '8–9', '~2–3 min')],
      ['Barbell RDL', '45° Hyperextension'],
      'Neutral lower back, hips back, don\'t round spine.'),
    ex('Reverse Lunge', 1, [w(2, '10/leg', '8–9', '~2–3 min')],
      ['DB Step-Up', 'Goblet Squat'],
      'Medium strides, minimize push-off from rear leg.'),
    ex('Seated Leg Curl', 1, [w(3, '10–12', '9–10', '~1–2 min')],
      ['Lying Leg Curl', 'Nordic Ham Curl'],
      'Squeeze hamstrings to move the weight.'),
    ex('Standing Calf Raise', 1, [w(4, '10–12', '9–10', '~1–2 min')],
      ['Seated Calf Raise', 'Leg Press Toe Press'],
      'Press all the way up, stretch calves at bottom, no bounce.'),
    ex('Decline Plate-Weighted Crunch', 1, [w(3, '10–12', '9–10', '~1–2 min')],
      ['Cable Crunch', 'Machine Crunch'],
      'Hold plate to chest, crunch hard.')
  ];
}

function p1Push(week) {
  var bReps = P1_BENCH_REPS[week];
  return [
    ex('DB Bench Press', 4, [w(1, bReps, '8–9', '~3–4 min')],
      ['Bench Press', 'Machine Chest Press'],
      'Comfortable arch, quick pause on chest, explode up.'),
    ex('DB Bench Press (No Leg Drive)', 0, [w(2, '10', '8–9', '~3–4 min')],
      ['Larsen Press', 'Machine Chest Press (No Leg Drive)'],
      'Shoulder blades retracted and depressed. No leg drive.'),
    ex('Standing DB Arnold Press', 2, [w(3, '8–10', '8–9', '~2–3 min')],
      ['Seated DB Shoulder Press', 'Machine Shoulder Press'],
      'Elbows in front, palms facing in. Rotate palms forward as you press.'),
    ex('A1: DB Flye', 1, [w(2, '12–15', '9–10', '0 min — superset')],
      ['Press-Around (Cable)', 'Deficit Push-Up'],
      'Brace with non-working arm, squeeze pecs pressing cable across body.'),
    ex('A2: Pec Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')],
      [], 'Hold pec stretch at ~7/10 intensity.'),
    ex('Cross-Body Cable Y-Raise (Side Delt)', 1, [w(3, '12–15', '9–10', '~1–2 min')],
      ['DB Lateral Raise', 'Machine Lateral Raise'],
      'Swing cable out and up as if "drawing a sword" from your side.'),
    ex('Squeeze-Only Triceps Pressdown + Stretch-Only OHT Extension', 1, [w(3, '8+8', '9–10', '~1–2 min')],
      ['Triceps Pressdown (12–15)', 'DB Skull Crusher (12–15)'],
      'Second half of ROM for pressdowns ("the squeeze"), first half for overhead extensions ("the stretch").'),
    ex('N1-Style Cross-Body Triceps Extension', 0, [w(2, '10–12', '10', '~1–2 min')],
      ['Single-Arm Tricep Pressdown', 'Single-Arm Cable Tricep Kickback'],
      'Arm more out to the side than a regular pressdown.')
  ];
}

function p1Pull(week) {
  // Pull is identical weeks 1–5 (only RPE changes slightly in week 6 deload)
  return [
    ex('Lat Pulldown — Feeder Sets', 0, [w(4, '10', 'See notes', '~2–3 min')],
      ['Machine Pulldown', 'Pull-Up'],
      'Set 1: RPE 4–5. Set 2: RPE 6–7. Set 3: RPE 7–8. Set 4: to failure. After Set 4 dropset: strip 30–50%, do 5 more reps.'),
    ex('Lat Pulldown — Failure + Dropset', 0, [w(1, '10+5', '10', '~2–3 min')],
      ['Machine Pulldown', 'Pull-Up'],
      'Hit failure at ~10 reps, strip 30–50%, do 5 more reps.'),
    ex('Cable Seated Row', 2, [w(3, '10–12', '8–9', '~2–3 min')],
      ['Incline CS DB Row', 'Machine Chest-Supported Row'],
      '3 working sets with different grips (wide → medium → close).'),
    ex('A1: Bottom-Half DB Lat Pullover', 1, [w(2, '10–12', '9–10', '0 min — superset')],
      ['Cable Lat Pullover', '1-Arm Lat Pull-In'],
      'Stay entirely in the stretched (bottom half) aspect of the lift.'),
    ex('A2: Lat Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')],
      [], 'Hold lat stretch at ~7/10 intensity.'),
    ex('Omni-Direction Face Pull', 1, [w(3, '12–15', '9–10', '~1–2 min')],
      ['Reverse Cable Flye', 'Bent-Over Reverse DB Flye'],
      'Set 1: low-to-high. Set 2: mid-range. Set 3: high-to-low.'),
    ex('EZ-Bar Curl', 1, [w(3, '6–8', '9–10', '~1–2 min')],
      ['DB Curl', 'Cable Curl'],
      'Arc bar "out" not "up", minimize torso momentum.'),
    ex('Bottom-Half Preacher Curl', 0, [w(2, '10–12', '10', '~1–2 min')],
      ['Bottom-Half Spider Curl', 'Bottom-Half Bayesian Curl'],
      'Stay entirely in the stretched (bottom half) aspect.')
  ];
}

function p1FullBody(week) {
  var dReps = P1_DEAD_REPS[week];
  return [
    ex('Deadlift', 4, [w(1, dReps, '8–9', '~3–5 min')],
      ['Trap Bar Deadlift', 'Barbell Hip Thrust'],
      'Brace lats, chest tall, pull the slack out of bar before lifting.'),
    ex('Stiff-Leg Deadlift', 0, [w(2, '8', '8–9', '~3–4 min')],
      ['Barbell RDL', 'DB RDL'],
      'High-hip conventional deadlift with slight knee bend.'),
    ex('Close-Grip Barbell Incline Press', 3, [w(3, '8, 5, 12', '8–9', '~3–4 min')],
      ['Close-Grip DB Incline Press', 'Close-Grip Machine Press'],
      '~45° incline, grip just outside shoulder width.'),
    ex('Chin-Up', 2, [w(2, '8–10', '8–9', '~2–3 min')],
      ['Underhand Lat Pulldown', 'Pull-Up'],
      'Underhand grip, pull chest to bar, add weight if needed.'),
    ex('Leg Press', 3, [w(3, '10–12', '8–9', '~2–3 min')],
      ['Goblet Squat', 'Reverse Lunge'],
      'Medium-width feet, don\'t let lower back round.'),
    ex('Kroc Row', 2, [w(2, '10–12', '8–9', '~2–3 min')],
      ['Single-Arm DB Row', 'Meadows Row'],
      'Mild cheating, slightly more upright posture. Use straps if needed.'),
    ex('Diamond Push-Up', 0, [w(1, 'AMRAP', '10', '0 min')],
      ['Close-Grip Push-Up', 'Kneeling Modified Push-Up'],
      'Hands close together forming diamond, smooth tempo.')
  ];
}

// Phase 1 Week 6 — Semi-Deload
var P1_W6 = {
  Legs: [
    ex('Back Squat', 4, [w(1, '1–3', '7', '~3–4 min')], ['Hack Squat', 'DB Bulgarian Split Squat'], 'Semi-deload — stay light.'),
    ex('Pause Squat (Back-off)', 0, [w(2, '5', '7', '~3–4 min')], ['Pause Hack Squat', 'Pause DB Bulgarian Split Squat'], '2-second pause.'),
    ex('Dumbbell RDL', 2, [w(2, '8–10', '7', '~2–3 min')], ['Barbell RDL', '45° Hyperextension']),
    ex('Reverse Lunge', 1, [w(2, '10/leg', '7', '~2–3 min')], ['DB Step-Up', 'Goblet Squat']),
    ex('Seated Leg Curl', 1, [w(2, '10–12', '8', '~1–2 min')], ['Lying Leg Curl', 'Nordic Ham Curl']),
    ex('Standing Calf Raise', 1, [w(2, '10–12', '8', '~1–2 min')], ['Seated Calf Raise', 'Leg Press Toe Press']),
    ex('Decline Plate-Weighted Crunch', 1, [w(2, '10–12', '8', '~1–2 min')], ['Cable Crunch', 'Machine Crunch'])
  ],
  Push: [
    ex('DB Bench Press', 4, [w(1, '3–5', '7', '~3–4 min')], ['Bench Press', 'Machine Chest Press']),
    ex('DB Bench Press (No Leg Drive)', 0, [w(2, '10', '7', '~3–4 min')], ['DB Bench (No Leg Drive)', 'Machine (No Leg Drive)']),
    ex('Standing DB Arnold Press', 2, [w(2, '8–10', '7', '~2–3 min')], ['Seated DB Press', 'Machine Shoulder Press']),
    ex('A1: DB Flye', 1, [w(2, '12–15', '8', '0 min — superset')], ['Press-Around (Cable)', 'Deficit Push-Up']),
    ex('A2: Pec Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')], []),
    ex('Cross-Body Cable Y-Raise (Side Delt)', 1, [w(2, '12–15', '8', '~1–2 min')], ['DB Lateral Raise', 'Machine Lateral Raise']),
    ex('Squeeze-Only Triceps Pressdown + Stretch-Only OHT Extension', 1, [w(2, '8+8', '8', '~1–2 min')], ['Triceps Pressdown', 'DB Skull Crusher']),
    ex('N1-Style Cross-Body Triceps Extension', 0, [w(2, '10–12', '8', '~1–2 min')], ['Single-Arm Tricep Pressdown', 'Single-Arm Cable Tricep Kickback'])
  ],
  Pull: [
    ex('Lat Pulldown — Feeder Sets', 0, [w(4, '10', 'See notes', '~2–3 min')], ['Machine Pulldown', 'Pull-Up'], 'Progressive feeder sets (RPE 4–5 → 6–7 → 7–8 → failure). Dropset on last set.'),
    ex('Lat Pulldown — Failure + Dropset', 0, [w(1, '10+5', '10', '~2–3 min')], ['Machine Pulldown', 'Pull-Up']),
    ex('Cable Seated Row', 2, [w(3, '10–12', '7', '~2–3 min')], ['Incline CS DB Row', 'Machine Chest-Supported Row'], '3 grips: wide → medium → close.'),
    ex('A1: Bottom-Half DB Lat Pullover', 1, [w(2, '10–12', '8', '0 min — superset')], ['Cable Lat Pullover', '1-Arm Lat Pull-In']),
    ex('A2: Lat Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')], []),
    ex('Omni-Direction Face Pull', 1, [w(3, '12–15', '7–8', '~1–2 min')], ['Reverse Cable Flye', 'Bent-Over Reverse DB Flye']),
    ex('EZ-Bar Curl', 1, [w(2, '6–8', '8', '~1–2 min')], ['DB Curl', 'Cable Curl']),
    ex('Bottom-Half Preacher Curl', 0, [w(2, '10–12', '8', '~1–2 min')], ['Bottom-Half Spider Curl', 'Bottom-Half Bayesian Curl'])
  ],
  'Full Body': [
    ex('Deadlift', 4, [w(1, '4', '7', '~3–5 min')], ['Trap Bar Deadlift', 'Barbell Hip Thrust'], 'Semi-deload.'),
    ex('Stiff-Leg Deadlift', 0, [w(2, '8', '7', '~3–4 min')], ['Barbell RDL', 'DB RDL']),
    ex('Close-Grip Barbell Incline Press', 3, [w(2, '8, 5', '7', '~3–4 min')], ['Close-Grip DB Incline Press', 'Close-Grip Machine Press']),
    ex('Chin-Up', 2, [w(2, '8–10', '7', '~2–3 min')], ['Underhand Lat Pulldown', 'Pull-Up']),
    ex('Leg Press', 3, [w(2, '10–12', '7', '~2–3 min')], ['Goblet Squat', 'Reverse Lunge']),
    ex('Kroc Row', 2, [w(2, '10–12', '7', '~2–3 min')], ['Single-Arm DB Row', 'Meadows Row']),
    ex('Diamond Push-Up', 0, [w(1, 'AMRAP', '10', '0 min')], ['Close-Grip Push-Up', 'Kneeling Modified Push-Up'])
  ]
};

// ── Phase 2 — Maximum Effort (4 weeks, identical each week) ──
// Full Body alternates: odd weeks = Hack Squat, even weeks = Deadlift

var P2_LEGS = [
  ex('Squat or Machine Squat', 4, [w(1, '3–5', '8–9', '~3–5 min')],
    ['Machine Squat', 'Bulgarian Split Squat'],
    'Sit back and down, keep upper back tight to bar.'),
  ex('Dumbbell RDL', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['Barbell RDL', '45° Hyperextension'],
    'Neutral lower back, hips back.'),
  ex('Leg Extension', 2, [w(2, '6–8', '10', '~2–3 min')],
    ['DB Step-Up', 'Goblet Squat'],
    'Squeeze quads to move the weight.'),
  ex('Seated Calf Raise', 2, [w(3, '4–6', '10', '~2–3 min')],
    ['Standing Calf Raise', 'Leg Press Toe Press'],
    'Full stretch at bottom, no bounce.'),
  ex('Cable Crunch', 2, [w(3, '6–8', '10', '~2–3 min')],
    ['Plate-Weighted Crunch', 'Machine Crunch'],
    'Round your back as you crunch.')
];

var P2_PUSH = [
  ex('DB Bench Press', 4, [w(1, '3–5', '8–9', '~3–5 min')],
    ['Bench Press', 'Machine Chest Press'],
    'Comfortable arch, quick pause on chest.'),
  ex('High-Incline Smith Machine Press', 2, [w(2, '4–6', '10', '~3–4 min')],
    ['Incline DB Press', 'Incline Machine Press'],
    '45–60° incline, touch bar to upper chest with control.'),
  ex('Egyptian Cable Lateral Raise', 2, [w(2, '6–8', '10', '~2–3 min')],
    ['DB Lateral Raise', 'Machine Lateral Raise'],
    'Lean away from cable. Squeeze delts.'),
  ex('Overhead Cable Triceps Extension', 2, [w(2, '4–6', '10', '~2–3 min')],
    ['DB Floor Skull Crusher', 'DB French Press'],
    'Both arms at once, resist the negative.'),
  ex('Cable Triceps Kickback', 1, [w(2, '6–8', '10', '~2–3 min')],
    ['DB Triceps Kickback', 'Triceps Pressdown'],
    'Lean slightly forward, lock elbow behind torso.')
];

var P2_PULL = [
  ex('Neutral-Grip Lat Pulldown', 3, [w(3, '4–6', '10', '~3–4 min')],
    ['Neutral-Grip Pull-Up', 'Machine Pulldown'],
    'Pull elbows down against sides.'),
  ex('Pendlay Row', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['Meadows Row', 'Single-Arm Row'],
    'Squeeze shoulder blades, pull to lower chest, no momentum.'),
  ex('Reverse Pec Deck', 2, [w(2, '6–8', '10', '~2–3 min')],
    ['Reverse Cable Flye', 'Bent-Over Reverse DB Flye'],
    'Swing weight "out", not "back".'),
  ex('EZ-Bar Curl', 2, [w(2, '4–6', '10', '~2–3 min')],
    ['DB Curl', 'Cable Curl'],
    'Arc bar "out" not "up", squeeze biceps.'),
  ex('Hammer Cheat Curl', 1, [w(1, '4–6', '10', '0 min')],
    ['Inverse Zottman Curl', 'DB Curl'],
    'Slight momentum on concentric, control eccentric with elbows stationary.')
];

// P2 Full Body — Hack Squat version (weeks 1 & 3)
var P2_FB_A = [
  ex('Hack Squat', 4, [w(2, '4–6', '9–10', '~3–5 min')],
    ['Machine Squat', 'Bulgarian Split Squat'],
    'Knees forward past toes, focus tension on quads.'),
  ex('Seated DB Shoulder Press', 3, [w(2, '6–8', '10', '~3–4 min'), w(2, '4–6', '10', '~3–4 min')],
    ['Machine Shoulder Press', 'Standing DB Arnold Press'],
    'Bring DBs all the way down, torso upright.'),
  ex('Close-Grip Seated Cable Row', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['T-Bar Row', 'Incline CS DB Row'],
    'Squeeze shoulder blades together, drive elbows down and back.'),
  ex('Weighted Dip', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['Machine Chest Press', 'DB Bench Press'],
    'Elbows 45°, torso forward 15°, shoulder-width or slightly wider grip.'),
  ex('Seated Leg Curl', 2, [w(2, '4–6', '10', '~2–3 min')],
    ['Lying Leg Curl', 'Nordic Ham Curl'],
    'Squeeze hamstrings to move the weight.'),
  ex('Machine Lateral Raise', 2, [w(2, '6–8', '10', '~2–3 min')],
    ['DB Lateral Raise', 'Cable Lateral Raise'],
    'Squeeze lateral delt to move the weight.')
];

// P2 Full Body — Deadlift version (weeks 2 & 4)
var P2_FB_B = [
  ex('Deadlift', 4, [w(2, '4–6', '8–9', '~3–5 min')],
    ['Trap Bar Deadlift', 'Barbell Hip Thrust'],
    'Can pull sumo or conventional, whichever you\'re stronger at.'),
  ex('Seated DB Shoulder Press', 3, [w(2, '6–8', '10', '~3–4 min'), w(2, '4–6', '10', '~3–4 min')],
    ['Machine Shoulder Press', 'Standing DB Arnold Press'],
    'Bring DBs all the way down, torso upright.'),
  ex('Close-Grip Seated Cable Row', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['T-Bar Row', 'Incline CS DB Row'],
    'Squeeze shoulder blades, drive elbows down and back.'),
  ex('Weighted Dip', 3, [w(2, '4–6', '10', '~3–4 min')],
    ['Machine Chest Press', 'DB Bench Press'],
    'Elbows 45°, torso forward 15°, shoulder-width grip.'),
  ex('Seated Leg Curl', 2, [w(2, '4–6', '10', '~2–3 min')],
    ['Lying Leg Curl', 'Nordic Ham Curl'],
    'Squeeze hamstrings.'),
  ex('Machine Lateral Raise', 2, [w(2, '6–8', '10', '~2–3 min')],
    ['DB Lateral Raise', 'Cable Lateral Raise'],
    'Squeeze lateral delt.')
];

// ── Phase 3 — Supercompensation (3 weeks) ──
// Weeks 1 & 2 identical; Week 3 = full deload

var P3_LEGS_BASE = [
  ex('Front Squat', 3, [w(3, '15', '7–8', '~2–3 min')],
    ['High-Bar Box Squat', 'Goblet Squat'],
    'Torso upright. Be humble with weight; don\'t miss reps.'),
  ex('Dumbbell RDL', 1, [w(3, '20', '9', '~2–3 min')],
    ['Barbell RDL', '45° Hyperextension'],
    'Emphasize hamstring stretch, prevent lower back rounding.'),
  ex('Reverse Lunge', 1, [w(3, '10/leg', '9', '~2–3 min')],
    ['DB Step-Up', 'Goblet Squat'],
    'Medium strides, minimize push-off.'),
  ex('SLOW Seated Leg Curl (3s up, 3s down)', 1, [w(3, '8', '10', '~1–2 min')],
    ['Lying Leg Curl', 'Nordic Ham Curl'],
    '3 seconds positive, 3 seconds negative.'),
  ex('Standing Calf Raise', 1, [w(3, '20', '10', '~1–2 min')],
    ['Seated Calf Raise', 'Leg Press Toe Press'],
    'Full range, stretch at bottom.'),
  ex('LLPT Plank', 0, [w(3, '20 reps', '10', '~1–2 min')],
    ['Ab Wheel Rollout', 'Plank'],
    'Squeeze glutes, elbows under eyes.')
];

var P3_PUSH_BASE = [
  ex('Low Incline DB Press', 2, [w(3, '20', '9', '~2–3 min')],
    ['Low Incline Machine Press', 'Low Incline Smith Machine Press'],
    '15° bench angle, tuck elbows on negative, flare as you press.'),
  ex('Machine Shoulder Press', 2, [w(3, '15', '9', '~2–3 min')],
    ['DB Shoulder Press', 'Standing DB Arnold Press'],
    'No stops between reps, smooth controlled tension.'),
  ex('Cable Crossover Ladder', 1, [w(3, '20', '10', '~1–2 min')],
    ['Flat-To-Incline DB Flye', 'Pec Deck'],
    'Set 1: low cable. Set 2: medium cable. Set 3: high cable.'),
  ex('A1: Lean-In DB Lateral Raise (Constant Tension)', 1, [w(3, '15', '10', '0 min — superset')],
    ['Constant-Tension Cable Lateral Raise', 'Constant-Tension Machine Lateral Raise'],
    'Lean into a bench. Keep tension — don\'t rest arm at bottom.'),
  ex('A2: Side Delt Static Stretch', 0, [w(3, '30s hold', 'N/A', '0 min — superset')],
    [], 'Hold at ~7/10 intensity.'),
  ex('Overhead Triceps Extension', 1, [w(3, '20', '10', '~1–2 min')],
    ['DB Floor Skull Crusher', 'DB French Press'],
    'Both arms, resist the negative.'),
  ex('Med-Ball Close-Grip Push-Up', 0, [w(1, 'AMRAP', '10', '0 min')],
    ['Close-Grip Push-Up', 'Kneeling Modified Push-Up'],
    'Hands on medicine ball, smooth controlled reps.')
];

var P3_PULL_BASE = [
  ex('1-Arm Half Kneeling Lat Pulldown', 1, [w(2, '20', '9', '~1–2 min')],
    ['1-Arm Lat Pull-In', 'Cable Lat Pullover'],
    'Chest tall, elbow tucked in close, squeeze lat to move weight.'),
  ex('Omni-Grip Lat Pulldown', 1, [w(3, '20', '9', '~2–3 min')],
    ['Omni-Grip Pull-Up', 'Chin-Up'],
    'Set 1: wide overhand. Set 2: medium overhand. Set 3: close underhand.'),
  ex('Machine Low Row', 2, [w(4, '20', '10', '~2–3 min')],
    ['Helms Row', 'Incline CS DB Row'],
    'Squeeze shoulder blades on each rep.'),
  ex('Cable Shrug-In', 1, [w(3, '20', '9–10', '~1–2 min')],
    ['DB Shrug', 'Plate Shrug'],
    'Two cable handles low — shrug up and in. Squeeze upper traps.'),
  ex('Reverse Pec Deck', 1, [w(3, '20', '10', '~1–2 min')],
    ['Reverse Cable Flye', 'Bent-Over Reverse DB Flye'],
    'Swing weight "out", not "back".'),
  ex('EZ-Bar Curl (Heavy)', 2, [w(1, '4–6', '9', '~1–2 min')],
    ['DB Curl', 'Cable Curl'],
    'Arc bar "out" not "up".'),
  ex('A1: EZ-Bar Modified Bicep 21s', 0, [w(2, '21', '10', '0 min — superset')],
    ['DB Curl 21s', 'Cable Curl 21s'],
    '7 reps seated, 7 reps standing full ROM, 7 reps bottom-half curls.'),
  ex('A2: Bicep Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')],
    [], 'Hold bicep stretch at ~7/10 intensity.')
];

var P3_FB_BASE = [
  ex('Deadlift', 4, [w(2, '8', '9', '~3–4 min')],
    ['Trap Bar Deadlift', 'Barbell Hip Thrust'],
    'Brace lats, chest tall, pull the slack out.'),
  ex('Bench Press — Top Set', 4, [w(1, '2–4', '8–9', '~3–4 min')],
    ['Bench Press', 'Machine Chest Press'],
    'Comfortable arch, pause on chest.'),
  ex('Bench Press — Back-Off AMRAP', 0, [w(1, 'AMRAP (~60% of top set)', '10', '~3–4 min')],
    ['Bench Press', 'Machine Chest Press'],
    'Use ~60% of top set load, AMRAP. Aim 10–20+ reps. Use spotter + safety bars.'),
  ex('Pull-Up — Cluster Sets', 2, [w(6, '3', '7–8', '15 sec between clusters')],
    ['Lat Pulldown', 'Machine Pulldown'],
    '6 cluster sets: 3 reps, rest 15s, repeat 6×. Smooth form.'),
  ex('Leg Press', 3, [w(2, '20', '9', '~2–3 min')],
    ['Goblet Squat', 'Reverse Lunge'],
    'Medium-width feet, don\'t let lower back round.'),
  ex('Wide-Grip Cable Row — Cluster Sets', 2, [w(10, '3', '7–8', '15 sec between clusters')],
    ['Wide-Grip Machine Row', 'Wide-Grip T-Bar Row'],
    '10 cluster sets: 3 reps, rest 15s, repeat 10×. Keep form tight.'),
  ex('Standing DB Arnold Press', 2, [w(3, '15', '9', '~2–3 min')],
    ['Seated DB Shoulder Press', 'Machine Shoulder Press'],
    'Elbows in front, rotate palms forward as you press.')
];

// Phase 3 Week 3 — Full Deload
var P3_W3 = {
  Legs: [
    ex('Front Squat', 3, [w(2, '10', '6', '~2–3 min')], ['High-Bar Box Squat', 'Goblet Squat'], 'Stay light, keep torso upright.'),
    ex('Dumbbell RDL', 1, [w(2, '12', '6', '~2–3 min')], ['Barbell RDL', '45° Hyperextension']),
    ex('Reverse Lunge', 1, [w(2, '8/leg', '6', '~2–3 min')], ['DB Step-Up', 'Goblet Squat']),
    ex('SLOW Seated Leg Curl (3s up, 3s down)', 1, [w(2, '8', '7', '~1–2 min')], ['Lying Leg Curl', 'Nordic Ham Curl']),
    ex('Standing Calf Raise', 1, [w(2, '12', '7', '~1–2 min')], ['Seated Calf Raise', 'Leg Press Toe Press']),
    ex('LLPT Plank', 0, [w(1, '30s hold', '7', '~1–2 min')], ['Ab Wheel Rollout', 'Plank'])
  ],
  Push: [
    ex('Low Incline DB Press', 2, [w(2, '12', '6', '~2–3 min')], ['Low Incline Machine Press', 'Low Incline Smith Machine Press']),
    ex('Machine Shoulder Press', 2, [w(2, '12', '6', '~2–3 min')], ['DB Shoulder Press', 'Arnold Press']),
    ex('Cable Crossover Ladder', 1, [w(2, '15', '7', '~1–2 min')], ['Flat-To-Incline DB Flye', 'Pec Deck']),
    ex('A1: Lean-In DB Lateral Raise (Constant Tension)', 1, [w(2, '12', '7', '0 min — superset')], ['CT Cable Lateral', 'CT Machine Lateral']),
    ex('A2: Side Delt Static Stretch', 0, [w(2, '30s hold', 'N/A', '0 min — superset')], []),
    ex('Overhead Triceps Extension', 1, [w(2, '15', '7', '~1–2 min')], ['DB Floor Skull Crusher', 'DB French Press']),
    ex('Med-Ball Close-Grip Push-Up', 0, [w(1, 'AMRAP', '7', '0 min')], ['Close-Grip Push-Up', 'Kneeling Modified Push-Up'])
  ],
  Pull: [
    ex('1-Arm Half Kneeling Lat Pulldown', 1, [w(2, '12', '6', '~1–2 min')], ['1-Arm Lat Pull-In', 'Cable Lat Pullover']),
    ex('Omni-Grip Lat Pulldown', 1, [w(3, '12', '6', '~2–3 min')], ['Omni-Grip Pull-Up', 'Chin-Up']),
    ex('Machine Low Row', 2, [w(2, '12', '6', '~2–3 min')], ['Helms Row', 'Incline CS DB Row']),
    ex('Cable Shrug-In', 1, [w(2, '12', '7', '~1–2 min')], ['DB Shrug', 'Plate Shrug']),
    ex('Reverse Pec Deck', 1, [w(2, '12', '7', '~1–2 min')], ['Reverse Cable Flye', 'Bent-Over Reverse DB Flye']),
    ex('EZ-Bar Curl (Heavy)', 2, [w(1, '4–6', '7', '~1–2 min')], ['DB Curl', 'Cable Curl']),
    ex('A1: EZ-Bar Modified Bicep 21s', 0, [w(1, '21', '7', '0 min — superset')], ['DB Curl 21s', 'Cable Curl 21s']),
    ex('A2: Bicep Static Stretch', 0, [w(1, '30s hold', 'N/A', '0 min — superset')], [])
  ],
  'Full Body': [
    ex('Deadlift', 4, [w(1, '8', '6', '~3–4 min')], ['Trap Bar Deadlift', 'Barbell Hip Thrust']),
    ex('DB Bench Press', 4, [w(1, '2–4', '6', '~3–4 min')], ['Bench Press', 'Machine Chest Press']),
    ex('Pull-Up — Cluster Sets', 2, [w(4, '3', '6', '15 sec between clusters')], ['Lat Pulldown', 'Machine Pulldown']),
    ex('Leg Press', 3, [w(1, '12', '6', '~2–3 min')], ['Goblet Squat', 'Reverse Lunge']),
    ex('Wide-Grip Cable Row — Cluster Sets', 2, [w(6, '3', '6', '15 sec between clusters')], ['Wide-Grip Machine Row', 'Wide-Grip T-Bar Row']),
    ex('Standing DB Arnold Press', 2, [w(2, '12', '6', '~2–3 min')], ['Seated DB Shoulder Press', 'Machine Shoulder Press'])
  ]
};

// ── Program resolver ──
var DAYS = ['Legs', 'Push', 'Pull', 'Full Body'];
var PHASES = [
  { name: 'Phase 1 — Hypertrophy', shortName: 'P1 Hypertrophy', weeks: 6, note: 'Week 6 is a semi-deload.' },
  { name: 'Phase 2 — Maximum Effort', shortName: 'P2 Max Effort', weeks: 4, note: 'FB alternates: odd weeks = Hack Squat, even weeks = Deadlift.' },
  { name: 'Phase 3 — Supercompensation', shortName: 'P3 Supercomp', weeks: 3, note: 'Week 3 is a full deload.' }
];

function getProgramDay(phase, week, dayIdx) {
  var day = DAYS[dayIdx];
  if (phase === 0) {
    if (week === 6) return deepCopy(P1_W6[day]);
    return deepCopy(phase === 0 ? getP1Day(day, week) : []);
  }
  if (phase === 1) {
    if (day === 'Full Body') return deepCopy(week % 2 !== 0 ? P2_FB_A : P2_FB_B);
    if (day === 'Legs') return deepCopy(P2_LEGS);
    if (day === 'Push') return deepCopy(P2_PUSH);
    return deepCopy(P2_PULL);
  }
  // Phase 3
  if (week === 3) return deepCopy(P3_W3[day]);
  if (day === 'Legs') return deepCopy(P3_LEGS_BASE);
  if (day === 'Push') return deepCopy(P3_PUSH_BASE);
  if (day === 'Pull') return deepCopy(P3_PULL_BASE);
  return deepCopy(P3_FB_BASE);
}

function getP1Day(day, week) {
  if (day === 'Legs') return p1Legs(week);
  if (day === 'Push') return p1Push(week);
  if (day === 'Pull') return p1Pull(week);
  return p1FullBody(week);
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ── Session management ──
var STORAGE_KEY = 'gym-tracker-v2';
var state = {
  phase: 0,   // 0–2
  week: 1,    // 1–N
  dayIdx: 0,  // 0–3
  sessions: {},
  theme: 'dark'
};

function loadState() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch (e) { }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function sessionKey(phase, week, dayIdx) {
  return phase + '-' + week + '-' + dayIdx;
}

function newSession(phase, week, dayIdx) {
  var template = getProgramDay(phase, week, dayIdx);
  var exercises = template.map(function (tmpl) {
    var sets = [];
    tmpl.work.forEach(function (prescription) {
      for (var i = 0; i < prescription.sets; i++) {
        sets.push({
          targetReps: prescription.reps,
          rpe: prescription.rpe,
          rest: prescription.rest,
          weight: '',
          reps: '',
          done: false
        });
      }
    });
    return {
      origName: tmpl.origName,
      name: tmpl.name,
      notes: tmpl.notes,
      warmup: tmpl.warmup,
      sub: tmpl.sub.slice(),
      sets: sets
    };
  });
  return {
    phase: phase, week: week, dayIdx: dayIdx,
    day: DAYS[dayIdx],
    startedAt: null,
    completedAt: null,
    exercises: exercises
  };
}

function getSession(phase, week, dayIdx) {
  var key = sessionKey(phase, week, dayIdx);
  if (!state.sessions[key]) {
    state.sessions[key] = newSession(phase, week, dayIdx);
  }
  return state.sessions[key];
}

function currentSession() {
  return getSession(state.phase, state.week, state.dayIdx);
}

// Find the best weight logged for an exercise (by origName) in any prior session
function findPriorBest(origName, currentKey) {
  var keys = Object.keys(state.sessions).sort();
  var best = null;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === currentKey) break;
    var session = state.sessions[keys[i]];
    for (var j = 0; j < session.exercises.length; j++) {
      var ex2 = session.exercises[j];
      if (ex2.origName !== origName) continue;
      for (var k = 0; k < ex2.sets.length; k++) {
        var s = ex2.sets[k];
        if (!s.done || !s.weight) continue;
        var w2 = parseFloat(s.weight);
        if (!isNaN(w2) && (!best || w2 > best.weight)) {
          best = { weight: w2, reps: s.reps, phase: session.phase, week: session.week };
        }
      }
    }
  }
  return best;
}

// All logged bests per exercise (for history view)
function allBests() {
  var map = {};
  Object.keys(state.sessions).sort().forEach(function (key) {
    var session = state.sessions[key];
    session.exercises.forEach(function (ex2) {
      var best = null;
      ex2.sets.forEach(function (s) {
        if (!s.done || !s.weight) return;
        var w2 = parseFloat(s.weight);
        if (!isNaN(w2) && (!best || w2 > best.weight)) best = { weight: w2, reps: s.reps };
      });
      if (!best) return;
      if (!map[ex2.origName]) map[ex2.origName] = [];
      map[ex2.origName].push({
        phase: session.phase, week: session.week, day: session.day,
        name: ex2.name, best: best
      });
    });
  });
  return map;
}

// ── DOM helpers ──
function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }
function el(tag, props, children) {
  var e = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach(function (k) {
      if (k === 'class') e.className = props[k];
      else if (k === 'html') e.innerHTML = props[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), props[k]);
      else e.setAttribute(k, props[k]);
    });
  }
  if (children) {
    (Array.isArray(children) ? children : [children]).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }
  return e;
}

// ── Tab routing ──
function showTab(name) {
  $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.tab === name); });
  $$('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + name); });
  if (name === 'today')   renderToday();
  if (name === 'program') renderProgram();
  if (name === 'history') renderHistory();
  if (name === 'settings') renderSettings();
}

// ── Today view ──
function renderToday() {
  renderTodayNav();
  renderTodaySession();
}

function renderTodayNav() {
  var c = $('#today-nav');
  c.innerHTML = '';

  // Phase selector
  var phaseRow = el('div', { class: 'phase-selector' });
  PHASES.forEach(function (ph, pi) {
    phaseRow.appendChild(el('button', {
      class: 'phase-chip' + (pi === state.phase ? ' active' : ''),
      onclick: function () { state.phase = pi; state.week = 1; saveState(); renderToday(); }
    }, 'Phase ' + (pi + 1)));
  });
  c.appendChild(phaseRow);

  // Week + Day navigation
  var navRow = el('div', { class: 'nav-bar' });
  navRow.appendChild(el('button', {
    class: 'nav-arrow', onclick: prevWorkout, 'aria-label': 'Previous'
  }, '\u2190'));

  var center = el('div', { class: 'nav-center' });
  center.appendChild(el('div', { class: 'nav-week' }, 'Week ' + state.week + ' / ' + PHASES[state.phase].weeks));
  var dayRow = el('div', { class: 'day-chips' });
  DAYS.forEach(function (d, i) {
    var isComplete = false;
    var key = sessionKey(state.phase, state.week, i);
    if (state.sessions[key] && state.sessions[key].completedAt) isComplete = true;
    dayRow.appendChild(el('button', {
      class: 'day-chip' + (i === state.dayIdx ? ' active' : '') + (isComplete ? ' done' : ''),
      onclick: function () { state.dayIdx = i; saveState(); renderToday(); }
    }, d + (isComplete ? ' ✓' : '')));
  });
  center.appendChild(dayRow);
  navRow.appendChild(center);

  navRow.appendChild(el('button', {
    class: 'nav-arrow', onclick: nextWorkout, 'aria-label': 'Next'
  }, '\u2192'));
  c.appendChild(navRow);
}

function prevWorkout() {
  if (state.week > 1) { state.week--; }
  else if (state.phase > 0) { state.phase--; state.week = PHASES[state.phase].weeks; }
  saveState(); renderToday();
}

function nextWorkout() {
  if (state.week < PHASES[state.phase].weeks) { state.week++; }
  else if (state.phase < PHASES.length - 1) { state.phase++; state.week = 1; }
  saveState(); renderToday();
}

function renderTodaySession() {
  var c = $('#today-session');
  c.innerHTML = '';
  var session = currentSession();
  var key = sessionKey(session.phase, session.week, session.dayIdx);

  // Deload banner
  if ((state.phase === 0 && state.week === 6) ||
      (state.phase === 2 && state.week === 3)) {
    c.appendChild(el('div', { class: 'deload-banner' },
      state.phase === 0 ? 'Semi-deload week. Avoid failure, train lighter.' :
                          'Full deload week. Avoid failure, train very light.'));
  }

  session.exercises.forEach(function (exercise, exIdx) {
    var card = el('div', { class: 'ex-card' });

    // Header
    var header = el('div', { class: 'ex-header' });
    var nameWrap = el('div', { class: 'ex-name-wrap' });
    nameWrap.appendChild(el('span', { class: 'ex-name' + (exercise.name !== exercise.origName ? ' modified' : '') }, exercise.name));
    if (exercise.name !== exercise.origName) {
      nameWrap.appendChild(el('span', { class: 'ex-modified-badge' }, 'edited'));
    }
    header.appendChild(nameWrap);
    header.appendChild(el('button', {
      class: 'ex-edit-btn', 'aria-label': 'Edit exercise',
      onclick: function () { openEditEx(exIdx); }
    }, '\u22EE'));
    card.appendChild(header);

    // Warm-up hint
    if (exercise.warmup > 0) {
      card.appendChild(el('div', { class: 'warmup-hint' },
        '\u26A1 ' + exercise.warmup + ' warm-up set' + (exercise.warmup > 1 ? 's' : '') + ' before working sets'));
    }

    // Notes
    if (exercise.notes) {
      var notesEl = el('div', { class: 'ex-notes-toggle' });
      notesEl.appendChild(el('span', { class: 'notes-icon' }, '\u2139'));
      notesEl.appendChild(el('span', { class: 'notes-text' }, exercise.notes));
      card.appendChild(notesEl);
    }

    // Prior best
    var prior = findPriorBest(exercise.origName, key);
    if (prior) {
      card.appendChild(el('div', { class: 'prior-best' },
        'Previous best: ' + prior.weight + ' kg \u00D7 ' + prior.reps +
        ' (P' + (prior.phase + 1) + ' W' + prior.week + ')'));
    }

    // Sets table
    var setsTable = el('div', { class: 'sets-table' });
    var th = el('div', { class: 'sets-row sets-header' });
    th.appendChild(el('div', { class: 'col-set' }, '#'));
    th.appendChild(el('div', { class: 'col-target' }, 'Target'));
    th.appendChild(el('div', { class: 'col-weight' }, 'kg'));
    th.appendChild(el('div', { class: 'col-reps' }, 'Reps'));
    th.appendChild(el('div', { class: 'col-done' }, ''));
    setsTable.appendChild(th);

    exercise.sets.forEach(function (set, setIdx) {
      var row = el('div', { class: 'sets-row' + (set.done ? ' set-done' : '') });

      row.appendChild(el('div', { class: 'col-set' }, String(setIdx + 1)));

      // Editable target (reps + RPE)
      var targetWrap = el('div', { class: 'col-target' });
      var trInput = el('input', {
        type: 'text', class: 'target-input',
        value: set.targetReps, 'aria-label': 'Target reps',
        onchange: function () { set.targetReps = trInput.value.trim(); saveState(); }
      });
      targetWrap.appendChild(trInput);
      if (set.rpe !== 'N/A') {
        var rpeWrap = el('div', { class: 'rpe-wrap' });
        rpeWrap.appendChild(document.createTextNode('RPE '));
        var rpeInput = el('input', {
          type: 'text', class: 'rpe-input',
          value: set.rpe, 'aria-label': 'RPE',
          onchange: function () { set.rpe = rpeInput.value.trim(); saveState(); }
        });
        rpeWrap.appendChild(rpeInput);
        targetWrap.appendChild(rpeWrap);
      }
      row.appendChild(targetWrap);

      var wInput = el('input', {
        type: 'number', inputmode: 'decimal', class: 'set-input',
        placeholder: prior ? String(prior.weight) : '—',
        value: set.weight,
        onchange: function () { set.weight = wInput.value; saveState(); }
      });
      row.appendChild(wInput);

      var rInput = el('input', {
        type: 'number', inputmode: 'numeric', class: 'set-input',
        placeholder: '—', value: set.reps,
        onchange: function () { set.reps = rInput.value; saveState(); }
      });
      row.appendChild(rInput);

      var doneBtn = el('button', {
        class: 'done-btn' + (set.done ? ' done' : ''),
        'aria-label': set.done ? 'Undo' : 'Mark done',
        onclick: function () {
          set.done = !set.done;
          if (set.done && !session.startedAt) session.startedAt = Date.now();
          saveState();
          renderTodaySession();
        }
      }, set.done ? '\u2713' : '');
      row.appendChild(doneBtn);

      // Rest time tooltip on done button
      if (set.rest && set.rest !== '0 min') {
        doneBtn.setAttribute('title', 'Rest: ' + set.rest);
      }

      setsTable.appendChild(row);
    });

    // Add / remove set buttons
    var setControls = el('div', { class: 'set-controls' });
    setControls.appendChild(el('button', {
      class: 'set-ctrl-btn',
      onclick: function () {
        var last = exercise.sets[exercise.sets.length - 1];
        exercise.sets.push({
          targetReps: last ? last.targetReps : '—',
          rpe: last ? last.rpe : '—',
          rest: last ? last.rest : '—',
          weight: '', reps: '', done: false
        });
        saveState(); renderTodaySession();
      }
    }, '+ set'));
    if (exercise.sets.length > 1) {
      setControls.appendChild(el('button', {
        class: 'set-ctrl-btn danger',
        onclick: function () {
          exercise.sets.pop();
          saveState(); renderTodaySession();
        }
      }, '− set'));
    }
    setsTable.appendChild(setControls);
    card.appendChild(setsTable);

    // Substitutions
    if (exercise.sub.length) {
      var subRow = el('div', { class: 'sub-row' });
      subRow.appendChild(el('span', { class: 'sub-label' }, 'Swap: '));
      exercise.sub.forEach(function (s) {
        subRow.appendChild(el('button', {
          class: 'sub-btn',
          onclick: function () { exercise.name = s; saveState(); renderTodaySession(); }
        }, s));
      });
      card.appendChild(subRow);
    }

    c.appendChild(card);
  });

  // Finish button
  var allDone = session.exercises.length > 0 && session.exercises.every(function (ex2) {
    return ex2.sets.every(function (s) { return s.done; });
  });
  // Add exercise button
  c.appendChild(el('button', {
    class: 'add-ex-btn',
    onclick: openAddEx
  }, '+ Add exercise'));

  var finBtn = el('button', {
    class: 'finish-btn' + (session.completedAt ? ' completed' : '') + (!allDone && !session.completedAt ? ' disabled' : ''),
    onclick: function () {
      if (session.completedAt || !allDone) return;
      session.completedAt = Date.now();
      saveState(); renderTodaySession(); renderTodayNav();
    }
  }, session.completedAt ? '✓ Workout complete!' : (allDone ? 'Finish workout' : 'Complete all sets to finish'));
  c.appendChild(finBtn);
}

// ── Edit exercise modal ──
var editExIdx = -1;
function openEditEx(idx) {
  editExIdx = idx;
  var ex2 = currentSession().exercises[idx];
  $('#edit-ex-name').value = ex2.name;
  $('#edit-ex-notes').value = ex2.notes || '';
  $('#edit-ex-warmup').value = ex2.warmup;
  $('#modal-edit-ex').classList.remove('hidden');
  setTimeout(function () { $('#edit-ex-name').focus(); }, 50);
}
function closeEditEx() { $('#modal-edit-ex').classList.add('hidden'); editExIdx = -1; }
function saveEditEx() {
  if (editExIdx < 0) return;
  var ex2 = currentSession().exercises[editExIdx];
  var val = $('#edit-ex-name').value.trim();
  ex2.name = val || ex2.origName;
  ex2.notes = $('#edit-ex-notes').value.trim();
  var wu = parseInt($('#edit-ex-warmup').value, 10);
  ex2.warmup = isNaN(wu) ? 0 : Math.max(0, wu);
  saveState(); closeEditEx(); renderTodaySession();
}
function resetEditEx() {
  if (editExIdx < 0) return;
  $('#edit-ex-name').value = currentSession().exercises[editExIdx].origName;
}
function removeExercise() {
  if (editExIdx < 0) return;
  confirmAction('Remove exercise', 'Remove this exercise from the current session?', function () {
    currentSession().exercises.splice(editExIdx, 1);
    saveState(); closeEditEx(); renderTodaySession();
  });
}

// ── Add exercise modal ──
function openAddEx() {
  $('#add-ex-name').value = '';
  $('#add-ex-warmup').value = '0';
  $('#add-ex-sets').value = '3';
  $('#add-ex-reps').value = '';
  $('#add-ex-rpe').value = '';
  $('#add-ex-rest').value = '~2–3 min';
  $('#modal-add-ex').classList.remove('hidden');
  setTimeout(function () { $('#add-ex-name').focus(); }, 50);
}
function closeAddEx() { $('#modal-add-ex').classList.add('hidden'); }
function saveAddEx() {
  var name = $('#add-ex-name').value.trim();
  if (!name) { $('#add-ex-name').focus(); return; }
  var warmup = Math.max(0, parseInt($('#add-ex-warmup').value, 10) || 0);
  var numSets = Math.max(1, parseInt($('#add-ex-sets').value, 10) || 1);
  var reps = $('#add-ex-reps').value.trim() || '—';
  var rpe = $('#add-ex-rpe').value.trim() || '—';
  var rest = $('#add-ex-rest').value.trim() || '—';
  var sets = [];
  for (var i = 0; i < numSets; i++) {
    sets.push({ targetReps: reps, rpe: rpe, rest: rest, weight: '', reps: '', done: false });
  }
  currentSession().exercises.push({
    origName: name, name: name, notes: '', warmup: warmup, sub: [], sets: sets
  });
  saveState(); closeAddEx(); renderTodaySession();
}

// ── Program view ──
var progPhaseIdx = 0;
function renderProgram() {
  var nav = $('#program-phase-nav');
  nav.innerHTML = '';
  PHASES.forEach(function (ph, pi) {
    nav.appendChild(el('button', {
      class: 'phase-chip' + (pi === progPhaseIdx ? ' active' : ''),
      onclick: function () { progPhaseIdx = pi; renderProgram(); }
    }, 'Phase ' + (pi + 1)));
  });

  var c = $('#program-body');
  c.innerHTML = '';
  var ph = PHASES[progPhaseIdx];
  c.appendChild(el('h2', { class: 'prog-h2' }, ph.name));
  c.appendChild(el('p', { class: 'prog-meta' }, ph.weeks + ' weeks · 4 days/week'));
  if (ph.note) c.appendChild(el('p', { class: 'prog-note' }, ph.note));

  // Show week 1 as representative (or note variation)
  DAYS.forEach(function (day, di) {
    var exercises = getProgramDay(progPhaseIdx, 1, di);
    var sec = el('div', { class: 'prog-day' });
    sec.appendChild(el('h3', { class: 'prog-day-name' }, day));
    exercises.forEach(function (exercise) {
      var row = el('div', { class: 'prog-ex-row' });
      var head = el('div', { class: 'prog-ex-head' });
      head.appendChild(el('span', { class: 'prog-ex-name' }, exercise.name));
      if (exercise.warmup > 0) {
        head.appendChild(el('span', { class: 'prog-warmup-badge' }, exercise.warmup + 'wu'));
      }
      row.appendChild(head);
      exercise.work.forEach(function (p) {
        row.appendChild(el('div', { class: 'prog-ex-sets' },
          p.sets + ' × ' + p.reps + (p.rpe !== 'N/A' ? ' @ RPE ' + p.rpe : '') + ' — rest ' + p.rest));
      });
      if (exercise.sub.length) {
        row.appendChild(el('div', { class: 'prog-ex-sub' }, 'Subs: ' + exercise.sub.join(', ')));
      }
      if (exercise.notes) {
        row.appendChild(el('div', { class: 'prog-ex-note' }, exercise.notes));
      }
      sec.appendChild(row);
    });
    c.appendChild(sec);
  });
}

// ── History view ──
function renderHistory() {
  var c = $('#history-body');
  c.innerHTML = '';
  var bests = allBests();
  var names = Object.keys(bests).sort();
  if (!names.length) {
    c.appendChild(el('div', { class: 'empty-msg' }, 'No data yet. Log some sets in Today view.'));
    return;
  }
  names.forEach(function (name) {
    var entries = bests[name];
    var card = el('div', { class: 'hist-card' });
    card.appendChild(el('div', { class: 'hist-name' }, name));
    var overallBest = entries.reduce(function (b, e) { return e.best.weight > b.best.weight ? e : b; });
    card.appendChild(el('div', { class: 'hist-best' },
      'Best: ' + overallBest.best.weight + ' kg × ' + overallBest.best.reps));
    var list = el('div', { class: 'hist-list' });
    entries.forEach(function (e) {
      var row = el('div', { class: 'hist-row' });
      row.appendChild(el('span', { class: 'hist-tag' }, 'P' + (e.phase + 1) + ' W' + e.week + ' · ' + e.day));
      row.appendChild(el('span', { class: 'hist-val' }, e.best.weight + ' kg × ' + e.best.reps));
      list.appendChild(row);
    });
    card.appendChild(list);
    c.appendChild(card);
  });
}

// ── Settings view ──
function renderSettings() {
  var total = 0, done = 0;
  PHASES.forEach(function (ph, pi) {
    for (var w2 = 1; w2 <= ph.weeks; w2++) {
      for (var d = 0; d < DAYS.length; d++) {
        total++;
        var s = state.sessions[sessionKey(pi, w2, d)];
        if (s && s.completedAt) done++;
      }
    }
  });
  var pct = total ? Math.round(done / total * 100) : 0;
  var pEl = $('#settings-progress');
  pEl.innerHTML = '';
  pEl.appendChild(el('div', { class: 'prog-stat' }, done + ' / ' + total + ' workouts complete'));
  var bar = el('div', { class: 'prog-bar' });
  bar.appendChild(el('div', { class: 'prog-fill', style: 'width:' + pct + '%' }));
  pEl.appendChild(bar);

  $('#theme-toggle').checked = state.theme === 'light';
  $('#update-status').classList.add('hidden');
}

// ── Confirm ──
function confirmAction(title, msg, fn) {
  $('#confirm-title').textContent = title;
  $('#confirm-msg').textContent = msg;
  $('#modal-confirm').classList.remove('hidden');
  var btn = $('#btn-confirm-ok');
  var fresh = btn.cloneNode(true);
  btn.parentNode.replaceChild(fresh, btn);
  fresh.addEventListener('click', function () {
    $('#modal-confirm').classList.add('hidden');
    fn();
  });
}

// ── Export / Import ──
function exportData() {
  var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url;
  a.download = 'gym-tracker-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click(); URL.revokeObjectURL(url);
}
function importData(file) {
  var r = new FileReader();
  r.onload = function () {
    try {
      Object.assign(state, JSON.parse(r.result));
      saveState(); applyTheme(); showTab('today');
    } catch (e) { alert('Import failed: ' + e.message); }
  };
  r.readAsText(file);
}

// ── Theme ──
function applyTheme() {
  var light = state.theme === 'light';
  document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', light ? '#f0f0f5' : '#111114');
}

// ── Init ──
function init() {
  loadState();
  applyTheme();

  $$('.tab').forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.dataset.tab); });
  });

  $('#btn-edit-ex-save').addEventListener('click', saveEditEx);
  $('#btn-edit-ex-reset').addEventListener('click', resetEditEx);
  $('#btn-edit-ex-cancel').addEventListener('click', closeEditEx);
  $('#btn-edit-ex-remove').addEventListener('click', removeExercise);
  $('#btn-add-ex-save').addEventListener('click', saveAddEx);
  $('#btn-add-ex-cancel').addEventListener('click', closeAddEx);
  $('#btn-confirm-cancel').addEventListener('click', function () { $('#modal-confirm').classList.add('hidden'); });

  $('#theme-toggle').addEventListener('change', function () {
    state.theme = this.checked ? 'light' : 'dark';
    saveState(); applyTheme();
  });

  $('#btn-reset-progress').addEventListener('click', function () {
    confirmAction('Reset all progress', 'This deletes all workout data. Cannot be undone.', function () {
      state.sessions = {}; state.phase = 0; state.week = 1; state.dayIdx = 0;
      saveState(); showTab('today');
    });
  });

  $('#btn-update').addEventListener('click', function () {
    var s = $('#update-status');
    s.classList.remove('hidden'); s.textContent = 'Checking…';
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg) reg.update().then(function () { s.textContent = 'Updated. Reloading…'; setTimeout(function () { location.reload(true); }, 600); });
        else location.reload(true);
      });
    } else { location.reload(true); }
  });

  $('#btn-export').addEventListener('click', exportData);
  $('#btn-import').addEventListener('click', function () { $('#import-file').click(); });
  $('#import-file').addEventListener('change', function () { if (this.files[0]) importData(this.files[0]); });

  showTab('today');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () { });
  }
}

document.addEventListener('DOMContentLoaded', init);
