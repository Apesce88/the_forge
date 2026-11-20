// ============================================================
// THE FORGE — Day / Home / Library screens
// Plain script (not an ES module): everything stays global.
// Loaded before the main inline script; functions only, no load-time code.
// ============================================================

// ── Screen: Plan ───────────────────────────────────────────────────────────
function renderPlan() {
  var cardsHTML = state.days.map(function(d, i) {
    return '<button class="day-card ' + d.color + '" onclick="tapDay(' + i + ')">'
      + '<div class="day-number">Day ' + d.num + '</div>'
      + '<div class="day-title">' + d.title + '</div>'
      + '<div class="day-subtitle">' + d.sub + '</div>'
      + '<div class="day-bar"></div>'
      + '</button>';
  }).join('');
 
  return '<div class="home-header">'
    + '<div class="home-eyebrow">7-Day Program</div>'
    + '<div class="home-title">The Forge</div>'
    + '<div class="home-subtitle">Hypertrophy &nbsp;·&nbsp; Power &nbsp;·&nbsp; Speed</div>'
    + '</div>'
    + '<div class="stats-row">'
    + '<div class="stat-card"><div class="stat-num">2</div><div class="stat-label">Upper Days</div></div>'
    + '<div class="stat-card"><div class="stat-num">2</div><div class="stat-label">Lower Days</div></div>'
    + '<div class="stat-card"><div class="stat-num">1+1</div><div class="stat-label">Speed + Aux</div></div>'
    + '</div>'
    + '<div class="day-grid">' + cardsHTML + '</div>'
    + '<div class="forge-mark">The Forge &nbsp;·&nbsp; Beta v0.6</div>';
}
