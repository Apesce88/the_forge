function renderGrounds() {
  return '<div>'
    + '<div class="lib-header">'
    +   '<div class="home-eyebrow">Enter The Arena</div>'
    +   '<div class="lib-title">The Proving Grounds</div>'
    +   '<div class="lib-sub">Test your limits · Earn your legacy</div>'
    + '</div>'
    + '<div class="pg-divider">'
    +   '<div class="pg-divider-line"></div>'
    +   '<div class="pg-divider-mark">⚔</div>'
    +   '<div class="pg-divider-line"></div>'
    + '</div>'
    + '<div class="pg-cards">'

    // Gauntlet card
    +   '<div class="pg-card gauntlet" onclick="openGroundsSection(\'gauntlet\')">'
    +     '<div class="pg-card-inner">'
    +       '<div class="pg-card-tag">⚔️ Challenge Space</div>'
    +       '<div class="pg-card-title">The Gauntlet</div>'
    +       '<div class="pg-card-desc">Personal challenges. Gym events. Local races. Global battles — Hyrox, Spartan, and beyond. Find your next test on the map.</div>'
    +       '<div class="pg-preview-strip">'
    +         '<span class="pg-preview-pip">Spartan</span>'
    +         '<span class="pg-preview-pip">Hyrox</span>'
    +         '<span class="pg-preview-pip">Flag Football</span>'
    +         '<span class="pg-preview-pip">PR Board</span>'
    +       '</div>'
    +       '<div class="pg-card-divider"></div>'
    +       '<div class="pg-card-cta">Enter The Gauntlet →</div>'
    +     '</div>'
    +     '<div class="pg-card-glow"></div>'
    +   '</div>'

    // Signet card
    +   '<div class="pg-card signet" onclick="openGroundsSection(\'signet\')">'
    +     '<div class="pg-card-inner">'
    +       '<div class="pg-card-tag">🛡️ Your Archetype</div>'
    +       '<div class="pg-card-title">The Signet</div>'
    +       '<div class="pg-card-desc">Choose the archetype that defines you. Your Signet shapes your training split, your focus, and your legacy.</div>'
    +       '<div class="pg-signet-slots">'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🔨</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🏛️</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">💨</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">⚡</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🫁</div></div>'
    +       '</div>'
    +       '<div class="pg-signet-slots">'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🛡️</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">⚖️</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">⚔️</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🧘</div></div>'
    +         '<div class="pg-signet-slot"><div class="pg-signet-slot-icon">🧭</div></div>'
    +       '</div>'
    +       '<div class="pg-card-divider"></div>'
    +       '<div class="pg-card-cta">Forge Your Path →</div>'
    +     '</div>'
    +     '<div class="pg-card-glow"></div>'
    +   '</div>'

    + '</div>'
    + '<div class="pg-lore">The Proving Grounds · Where Iron Meets Will<br/>'
    +   '<span style="color:var(--text-mute);font-size:10px;letter-spacing:0.08em;">The chains will break</span>'
    + '</div>'
    + '</div>';
}

// ── Gauntlet Events ────────────────────────────────────────────────────────
var GAUNTLET_EVENTS = [
  {
    type: 'OBSTACLE RACE',
    name: 'Spartan Race',
    meta: '5K–21K · 20+ obstacles · Regional events',
    desc: 'Mud, walls, rope climbs, and barbed wire. The Spartan series tests raw grit across Sprint, Super, and Beast distances.',
    tags: ['Endurance', 'Grip Strength', 'Mental Toughness'],
    color: 'red',
    wp: { x: 25, y: 32 }
  },
  {
    type: 'FITNESS RACE',
    name: 'Hyrox',
    meta: '8km Run + 8 Stations · Indoor arena',
    desc: 'Run 1km, complete a functional fitness station, repeat 8 times. Sled push, rowing, burpee broad jumps — the world\'s fastest growing fitness race.',
    tags: ['Running', 'Sled Push', 'Rowing', 'Functional Fitness'],
    color: 'gold',
    wp: { x: 65, y: 20 }
  },
  {
    type: 'TEAM SPORT',
    name: 'Flag Football',
    meta: 'Weekly league · 7v7 · Your primary sport',
    desc: 'Your arena. Every Windrunner and Gladiator rep is built for this — speed off the line, route running, reading the field.',
    tags: ['Speed', 'Agility', 'Explosiveness', 'Team Sport'],
    color: 'lime',
    wp: { x: 78, y: 55 }
  },
  {
    type: 'TEAM SPORT',
    name: 'Basketball',
    meta: 'Pick-up · League · Rec',
    desc: 'Lateral quickness, vertical, conditioning. Every sprint baseline to baseline is a test of your lower body work paying off.',
    tags: ['Lateral Speed', 'Vertical', 'Conditioning'],
    color: 'gold',
    wp: { x: 38, y: 68 }
  },
  {
    type: 'RUNNING EVENT',
    name: '5K Run',
    meta: '3.1 miles · Road or trail',
    desc: 'The benchmark. Whether it\'s a timed time trial or a local race, 5K is where Stonelung signets prove their engine.',
    tags: ['Endurance', 'Pacing', 'Cardio Base'],
    color: 'lime',
    wp: { x: 18, y: 72 }
  }
];


function renderGauntlet(view) {
  state.gauntletView = view;

  var backBtn = '<button class="pg-back-btn" onclick="navigate(\'grounds\')">'
    + '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><polyline points="15 18 9 12 15 6"/></svg>'
    + 'Back</button>';

  var header = '<div class="gnt-header">'
    + '<div class="pg-eye">Challenge Arena</div>'
    + '<div class="gnt-title">The Gauntlet</div>'
    + '<div class="gnt-sub">Find your next test · Own the map</div>'
    + '</div>';

  var toggle = '<div class="gnt-toggle">'
    + '<button class="gnt-toggle-btn' + (view === 'map' ? ' active' : '') + '" onclick="renderGauntlet(\'map\')">🗺 MAP</button>'
    + '<button class="gnt-toggle-btn' + (view === 'list' ? ' active' : '') + '" onclick="renderGauntlet(\'list\')">☰ LIST</button>'
    + '</div>';

  var content = view === 'map' ? buildGauntletMap() : buildGauntletList();

  document.getElementById('screen').innerHTML = backBtn + header + toggle + content
    + '<div class="forge-mark">The Gauntlet · Find Your Test</div>';
}

function buildGauntletMap() {
  var pairs = [[0,1],[1,2],[2,3],[3,4],[0,4],[1,3]];
  var lines = pairs.map(function(p) {
    var a = GAUNTLET_EVENTS[p[0]].wp, b = GAUNTLET_EVENTS[p[1]].wp;
    return '<line x1="' + a.x + '%" y1="' + a.y + '%" x2="' + b.x + '%" y2="' + b.y + '%"'
      + ' stroke="rgba(163,230,53,0.12)" stroke-width="1" stroke-dasharray="4 7"/>';
  }).join('');

  var waypoints = GAUNTLET_EVENTS.map(function(ev, i) {
    return '<div class="gnt-wp gnt-wp-' + ev.color + '" style="left:' + ev.wp.x + '%;top:' + ev.wp.y + '%;" onclick="showGauntletEvent(' + i + ')">'
      + '<div class="gnt-wp-ring"></div>'
      + '<div class="gnt-wp-dot"></div>'
      + '<div class="gnt-wp-label">' + ev.name + '</div>'
      + '</div>';
  }).join('');

  return '<div class="gnt-map-wrap">'
    + '<div class="gnt-scan"></div>'
    + '<div class="gnt-corner gnt-tl"></div>'
    + '<div class="gnt-corner gnt-tr"></div>'
    + '<div class="gnt-corner gnt-bl"></div>'
    + '<div class="gnt-corner gnt-br"></div>'
    + '<div class="gnt-hud-tl">34°03\'N 118°14\'W</div>'
    + '<div class="gnt-hud-tr">EVENTS: ' + GAUNTLET_EVENTS.length + '<br/>STATUS: LIVE</div>'
    + '<svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">' + lines + '</svg>'
    + waypoints
    + '</div>'
    + '<div class="gnt-legend">'
    + '<div class="gnt-leg-item"><div class="gnt-leg-dot" style="background:var(--lime);box-shadow:0 0 5px rgba(163,230,53,0.7);"></div><span>Athletics</span></div>'
    + '<div class="gnt-leg-item"><div class="gnt-leg-dot" style="background:var(--red);box-shadow:0 0 5px rgba(239,68,68,0.7);"></div><span>Obstacle</span></div>'
    + '<div class="gnt-leg-item"><div class="gnt-leg-dot" style="background:var(--gold);box-shadow:0 0 5px rgba(245,158,11,0.7);"></div><span>Fitness Race</span></div>'
    + '</div>';
}

function buildGauntletList() {
  return '<div class="gnt-list">'
    + GAUNTLET_EVENTS.map(function(ev, i) {
        return '<div class="gnt-event-card gnt-ev-' + ev.color + '" onclick="showGauntletEvent(' + i + ')">'
          + '<div class="gnt-event-inner">'
          + '<div class="gnt-event-type">' + ev.type + '</div>'
          + '<div class="gnt-event-name">' + ev.name + '</div>'
          + '<div class="gnt-event-meta">' + ev.meta + '</div>'
          + '<div class="gnt-event-desc">' + ev.desc + '</div>'
          + '<div class="gnt-event-tags">'
          + ev.tags.map(function(t) { return '<span class="gnt-event-tag">' + t + '</span>'; }).join('')
          + '</div>'
          + '</div>'
          + '<div class="gnt-event-glow"></div>'
          + '</div>';
      }).join('')
    + '</div>';
}

function showGauntletEvent(idx) {
  var ev = GAUNTLET_EVENTS[idx];
  var accentVar = ev.color === 'red' ? 'var(--red)' : ev.color === 'gold' ? 'var(--gold)' : 'var(--lime)';

  document.getElementById('screen').innerHTML = ''
    + '<button class="pg-back-btn" onclick="renderGauntlet(state.gauntletView)">'
    + '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><polyline points="15 18 9 12 15 6"/></svg>'
    + 'Back</button>'
    + '<div style="padding:20px 20px 12px;">'
    + '<div style="font-size:10px;font-family:var(--font-body);letter-spacing:0.14em;color:' + accentVar + ';margin-bottom:6px;">' + ev.type + '</div>'
    + '<div style="font-size:26px;font-weight:700;font-family:var(--font-title);color:var(--text-pri);margin-bottom:4px;">' + ev.name + '</div>'
    + '<div style="font-size:11px;color:var(--text-mute);font-family:var(--font-body);letter-spacing:0.06em;margin-bottom:16px;">' + ev.meta + '</div>'
    + '<div style="font-size:13px;color:var(--text-sec);line-height:1.7;margin-bottom:20px;">' + ev.desc + '</div>'
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;">'
    + ev.tags.map(function(t) {
        return '<span style="font-size:10px;font-family:var(--font-body);letter-spacing:0.06em;padding:3px 10px;border-radius:4px;background:rgba(255,255,255,0.04);border:1px solid var(--grey-light);color:var(--text-sec);">' + t + '</span>';
      }).join('')
    + '</div>'
    + '<div style="padding:14px;border-radius:12px;border:1px dashed var(--grey-muted);text-align:center;font-size:11px;color:var(--text-mute);font-family:var(--font-body);letter-spacing:0.08em;">REGISTRATION &amp; TRACKING · COMING SOON</div>'
    + '</div>'
    + '<div class="forge-mark">The Gauntlet · Test Your Limits</div>';
}

// ── Signet Data ────────────────────────────────────────────────────────────
// TO CHANGE STATS: find the signet by name below, edit the numbers in stats: {}
// Scale is 1–5: 1=Very Low, 2=Low, 3=Medium, 4=High, 5=Extreme
// Commander is all 0s — his stats are custom/user-defined (future feature)
var SIGNETS = [
  {
    id: 'ironheart', name: 'Ironheart', advantage: 'Strength',
    icon: '🔨', color: '#c0392b', colorDim: 'rgba(192,57,43,0.15)',
    tagline: 'Unbreakable will. Relentless strength.',
    desc: 'Ironheart is built for those who live under the bar. Progressive overload every week — maximal strength through compound lifts, heavy singles, and iron discipline. Your split pushes your 1RM higher every cycle.',
    stats: { Power:3, Strength:5, Size:3, Speed:1, Endurance:2, Mobility:1, Dexterity:1, Balance:2 }
  },
  {
    id: 'colossus', name: 'Colossus', advantage: 'Size',
    icon: '🏛️', color: '#c8922a', colorDim: 'rgba(200,146,42,0.15)',
    tagline: 'Built through volume. Stand above the rest.',
    desc: 'Colossus is bodybuilding in its purest form. High volume, controlled tempo, hypertrophy-focused splits. Every set is designed to maximize time under tension and metabolic stress.',
    stats: { Power:2, Strength:3, Size:5, Speed:1, Endurance:3, Mobility:1, Dexterity:1, Balance:2 }
  },
  {
    id: 'windrunner', name: 'Windrunner', advantage: 'Speed',
    icon: '💨', color: '#00c9b1', colorDim: 'rgba(0,201,177,0.12)',
    tagline: 'Move like the wind. Leave everything behind.',
    desc: 'Windrunner trains for pure athletic speed — acceleration, top-end velocity, reactive agility. Plyometrics, sprint mechanics, and change-of-direction drills define your week. Built for the field, not the mirror.',
    stats: { Power:4, Strength:2, Size:1, Speed:5, Endurance:3, Mobility:4, Dexterity:4, Balance:3 }
  },
  {
    id: 'tempest', name: 'Tempest', advantage: 'Power',
    icon: '⚡', color: '#7c3aed', colorDim: 'rgba(124,58,237,0.15)',
    tagline: 'Raw power. Strike with force.',
    desc: 'Tempest is explosive output — Olympic-style lifts, power cleans, plyometric chains. You train to generate maximum force in minimum time. Every session sharpens your ability to explode off the line.',
    stats: { Power:5, Strength:4, Size:2, Speed:4, Endurance:2, Mobility:2, Dexterity:3, Balance:2 }
  },
  {
    id: 'stonelung', name: 'Stonelung', advantage: 'Endurance',
    icon: '🫁', color: '#3b82f6', colorDim: 'rgba(59,130,246,0.12)',
    tagline: 'Breathe deep. Outlast all.',
    desc: 'Stonelung is built for those who never quit. Zone 2 cardio foundations, lactate threshold work, and aerobic capacity training. Your engine outlasts everyone in the room — and on the course.',
    stats: { Power:1, Strength:2, Size:1, Speed:3, Endurance:5, Mobility:2, Dexterity:2, Balance:3 }
  },
  {
    id: 'centurion', name: 'Centurion', advantage: 'Longevity',
    icon: '🛡️', color: '#16a34a', colorDim: 'rgba(22,163,74,0.12)',
    tagline: 'Built to last. Stronger with time.',
    desc: 'Centurion trains for decades, not seasons. Joint health, movement quality, and sustainable strength are the pillars. You\'re building a body that performs at 40, 50, and beyond.',
    stats: { Power:2, Strength:3, Size:2, Speed:2, Endurance:4, Mobility:4, Dexterity:3, Balance:5 }
  },
  {
    id: 'warrior', name: 'Warrior', advantage: 'Balance',
    icon: '⚖️', color: '#d97706', colorDim: 'rgba(217,119,6,0.12)',
    tagline: 'Master of all. Weak to none.',
    desc: 'Warrior is the true generalist — well-rounded across every physical domain. Science-backed periodization across strength, conditioning, and athleticism. The path of the complete athlete.',
    stats: { Power:3, Strength:3, Size:3, Speed:3, Endurance:3, Mobility:3, Dexterity:3, Balance:4 }
  },
  {
    id: 'gladiator', name: 'Gladiator', advantage: 'Athlete Hybrid',
    icon: '⚔️', color: '#dc2626', colorDim: 'rgba(220,38,38,0.12)',
    tagline: 'Train for every edge. Perform anywhere.',
    desc: 'Gladiator is the sport-performance archetype. Strength meets conditioning meets athleticism in a program designed to make you dangerous in any arena — gym, field, or competition floor.',
    stats: { Power:4, Strength:3, Size:2, Speed:4, Endurance:3, Mobility:3, Dexterity:4, Balance:3 }
  },
  {
    id: 'monk', name: 'Monk', advantage: 'Mobility',
    icon: '🧘', color: '#0d9488', colorDim: 'rgba(13,148,136,0.12)',
    tagline: 'Fluid in motion. Control your body, control the battle.',
    desc: 'Monk trains the body as a precision instrument. Mobility, body control, and movement mastery are prioritized. Calisthenics, flow patterns, and structural balance define the split.',
    stats: { Power:2, Strength:2, Size:1, Speed:3, Endurance:3, Mobility:5, Dexterity:5, Balance:5 }
  },
  {
    id: 'commander', name: 'Commander', advantage: 'Custom',
    icon: '🧭', color: '#f59e0b', colorDim: 'rgba(245,158,11,0.12)',
    tagline: 'Your plan. Your rules. Master your path.',
    desc: 'Commander is fully customizable. Allocate your focus across all stats and build your own training split from the ground up. No preset path — you define the archetype.',
    stats: { Power:0, Strength:0, Size:0, Speed:0, Endurance:0, Mobility:0, Dexterity:0, Balance:0 }
  }
];

// ── Signet Hub Screen ──────────────────────────────────────────────────────
// Builds the 2-column selection grid of all 10 archetypes.
// Commander gets full-width (grid-column span) because he's the special case.
function renderSignetHub() {
  var grid = '';

  SIGNETS.forEach(function(s) {
    var isCommander = s.id === 'commander';
    grid += '<div class="sgt-card" '
      + 'style="--sa:' + s.color + ';--sa2:' + s.colorDim + ';" '
      + 'onclick="openSignet(\'' + s.id + '\')">'
      + '<div class="sgt-emblem">' + s.icon + '</div>'
      + '<div class="sgt-card-name">' + s.name + '</div>'
      + '<div class="sgt-card-adv">Advantage: ' + s.advantage + '</div>'
      + ''
      + '<div class="sgt-card-glow"></div>'
      + '</div>';
  });

  document.getElementById('screen').innerHTML = ''
    + '<button class="pg-back-btn" onclick="navigate(\'grounds\')">'
    + '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><polyline points="15 18 9 12 15 6"/></svg>'
    + 'Back</button>'
    + '<div class="sgt-header">'
    + '<div class="pg-eye">Choose Your Archetype</div>'
    + '<div class="sgt-title">The Signet</div>'
    + '<div class="sgt-sub">Your Signet defines your training path. Select the one that resonates.</div>'
    + '</div>'
    + '<div class="sgt-divider">'
    + '<div class="sgt-divider-line"></div>'
    + '<div class="sgt-divider-text">CHOOSE YOUR SIGNET</div>'
    + '<div class="sgt-divider-line"></div>'
    + '</div>'
    + '<div class="sgt-grid">' + grid + '</div>'
    + '<div class="forge-mark" style="padding-bottom:20px;">Your Signet · Your Legacy</div>';
}

// ── Signet Detail Screen ───────────────────────────────────────────────────
// Called when user taps a signet card.
// Finds the signet by id, renders emblem + stats + description + CTA.
// Stat pips: loop 1–5, fill if i <= stat value.
// Back button returns to the hub (not the Proving Grounds home).
function openSignet(id) {
  var s = SIGNETS.find(function(x) { return x.id === id; });
  if (!s) return;

  var LEVEL_LABELS = ['', 'VERY LOW', 'LOW', 'MEDIUM', 'HIGH', 'EXTREME'];

  var statsHTML = Object.keys(s.stats).map(function(stat) {
    var val = s.stats[stat];
    var pips = '';
    for (var i = 1; i <= 5; i++) {
      pips += '<div class="sgt-pip' + (i <= val ? ' sgt-pip-filled' : '') + '"></div>';
    }
    var label = val === 0 ? 'CUSTOM' : LEVEL_LABELS[val];
    return '<div class="sgt-stat-row">'
      + '<div class="sgt-stat-label">' + stat + '</div>'
      + '<div class="sgt-stat-pips">' + pips + '</div>'
      + '<div class="sgt-stat-level">' + label + '</div>'
      + '</div>';
  }).join('');

  var isCommander = id === 'commander';

  document.getElementById('screen').innerHTML = ''
    + '<button class="pg-back-btn" onclick="renderSignetHub()">'
    + '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><polyline points="15 18 9 12 15 6"/></svg>'
    + 'Signets</button>'
    + '<div class="sgt-detail-header" style="--sa:' + s.color + ';--sa2:' + s.colorDim + ';">'
    + '<div class="sgt-detail-emblem">' + s.icon + '</div>'
    + '<div class="sgt-detail-name">' + s.name + '</div>'
    + '<div class="sgt-detail-adv">' + s.advantage + '</div>'
    + '<div class="sgt-detail-tagline">' + s.tagline + '</div>'
    + '</div>'
    + '<div class="sgt-stats-block" style="--sa:' + s.color + ';--sa2:' + s.colorDim + ';">'
    + '<div class="sgt-stats-title">STAT PROFILE</div>'
    + statsHTML
    + '</div>'
    + '<div class="sgt-desc-block">'
    + '<div class="sgt-desc-title">TRAINING PHILOSOPHY</div>'
    + '<div class="sgt-desc-text">' + s.desc + '</div>'
    + '</div>'
    + '<button class="sgt-forge-btn" style="--sa:' + s.color + ';--sa2:' + s.colorDim + ';" '
    + 'onclick="alert(\'Signet forging coming in Phase 9 — your split will be built here.\')">'
    + (isCommander ? '🧭 Build Your Own Path' : '⚔️ Forge This Path')
    + '</button>'
    + '<div class="forge-mark" style="padding-bottom:20px;">Your Signet · Your Legacy</div>';
}
  
function openGroundsSection(section) {
  if (section === 'gauntlet') {
    renderGauntlet(state.gauntletView);
  } else if (section === 'signet') {
    renderSignetHub();
  }
}

Extract Proving Grounds
