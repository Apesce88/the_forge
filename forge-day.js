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

// ── Screen: Day Detail ─────────────────────────────────────────────────────
function renderDay(index) {
  var d = state.days[index];
  var c = d.color;
  var html = '<div class="day-detail-header">'
    + '<button class="back-btn" onclick="goBack()"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>Back</button>'
    + '<div class="day-detail-badge">'
    + '<div class="day-detail-num ' + c + '">' + d.num + '</div>'
    + '<div class="day-detail-info"><h1>' + d.title + '</h1><div class="detail-sub ' + c + '">' + d.sub + '</div></div>'
    + '</div></div>'
    + '<div class="day-focus-text">' + d.focus + '</div>'
    + '<div class="detail-divider"></div>';

  if (d.tiers) {
    var wColor = d.color === 'red' ? 'var(--red)' : d.color === 'grey' ? 'var(--text-sec)' : 'var(--lime)';
    var wBg = d.color === 'red' ? 'rgba(239,68,68,0.06)' : d.color === 'grey' ? 'rgba(160,160,160,0.06)' : 'rgba(163,230,53,0.06)';
    var wGlow = d.color === 'red' ? 'rgba(239,68,68,0.25)' : d.color === 'grey' ? 'rgba(160,160,160,0.15)' : 'rgba(163,230,53,0.25)';
    html += '<div style="padding: 0 16px 16px;display:flex;justify-content:center;">'
      + '<button onclick="startWorkout(' + index + ')" style="'
      + 'width:70%;padding:11px;border-radius:14px;'
      + 'border:1.5px solid ' + wColor + ';'
      + 'background:' + wBg + ';color:' + wColor + ';'
      + 'font-size:14px;font-family:var(--font-body);letter-spacing:0.1em;'
      + 'font-weight:700;cursor:pointer;'
      + 'box-shadow:0 0 12px ' + wGlow + ';">START WORKOUT</button>'
      + '</div>';
  }
  
  if (d.field) {
    html += '<div style="padding: 0 16px 16px;display:flex;justify-content:center;">'
      + '<button onclick="startWorkout(' + index + ')" style="'
      + 'width:70%;padding:11px;border-radius:14px;'
      + 'border:1.5px solid var(--red);'
      + 'background:rgba(239,68,68,0.06);color:var(--red);'
      + 'font-size:14px;font-family:var(--font-body);letter-spacing:0.1em;'
      + 'font-weight:700;cursor:pointer;'
      + 'box-shadow:0 0 12px rgba(239,68,68,0.25);">START WORKOUT</button>'
      + '</div>';

    // Static warmup
    html += '<div class="tier-section">'
      + '<div class="field-step dc-' + c + '">' + (d.field[0] && d.field[0].icon ? '<div class="field-step-icon">'+d.field[0].icon+'</div>' : '') + '<div class="field-step-text">' + d.field[0].text + '</div></div>';
    
    // Customizable exercises (up to 3)
    var fieldExes = d.exercises || [];
    if (fieldExes.length === 0) {
      html += '<div class="day-empty-tier">No exercises added yet</div>';
    } else {
      fieldExes.forEach(function(ex, ei) {
        var key = 'field-' + index + '-' + ei;
        var menuOpen = state.openMenuId === key;
        html += '<div class="ex-card dc-' + c + (ex.cat ? ' cat-' + ex.cat : '') + '">'
          + '<div class="ex-card-header">'
          + '<div class="ex-name">' + ex.name + '</div>'
          + '<button class="ex-menu-btn" onclick="toggleMenu(\'' + key + '\')">•••</button>'
          + '</div>';
        if (menuOpen) {
          html += '<div class="ex-actions">'
            + '<button class="ex-action-btn ex-action-remove" onclick="removeFieldEx(' + index + ',' + ei + ')">📋 Remove</button>'
            + '</div>';
        }
        if (ex.cat === 'dynamic') {
          html += dynOptsHTML(ex);
        } else if (ex.fw) {
          html += '<div class="equip-content">' + ex.fw + '</div>';
        }
        html += '</div>';
      });
    }

    if (fieldExes.length < 3) {
      html += '<button class="add-ex-btn" onclick="openFieldExModal(' + index + ')">+ Add Exercise</button>';
    }

    // Static cooldown
var lastField = d.field[d.field.length - 1];
    html += '<div class="field-step dc-' + c + '" style="margin-top:8px;">' + (lastField.icon ? '<div class="field-step-icon">'+lastField.icon+'</div>' : '') + '<div class="field-step-text">' + lastField.text + '</div></div>'      + '</div>';
  }
 
  if (d.recovery) {
      html += '<div style="padding: 0 16px 16px;display:flex;justify-content:center;">'
      + '<button onclick="startWorkout(' + index + ')" style="'
      + 'width:70%;padding:11px;border-radius:14px;'
      + 'border:1.5px solid #a0a0a0;'
      + 'background:rgba(200,200,200,0.06);color:#d0d0d0;'
      + 'font-size:14px;font-family:var(--font-body);letter-spacing:0.1em;'
      + 'font-weight:700;cursor:pointer;'
      + 'box-shadow:0 0 12px rgba(200,200,200,0.25);">START WORKOUT</button>'
      + '</div>';
    d.recovery.forEach(function(r){
      html += '<div class="recovery-card dc-' + c + '">' + (r.icon ? '<div class="recovery-icon">'+r.icon+'</div>' : '') + '<div class="recovery-title">'+r.title+'</div><div class="recovery-desc">'+r.desc+'</div></div>';
    });
  }
 
  if (d.tiers) {
    d.tiers.forEach(function(tier, ti) {
      html += '<div class="tier-section">'
        + '<div class="tier-label"><span class="tier-icon">'+tier.icon+'</span><span class="tier-name '+c+'">'+tier.label+'</span></div>';

      if (tier.exercises.length === 0) {
        html += '<div class="day-empty-tier">No exercises added yet</div>';
      }
        else {
        tier.exercises.forEach(function(ex, ei) {
          var key = index + '-' + ti + '-' + ei;
          var activeTab = state.equipTabs[key] || 0;
          var vals = [ex.fw, ex.mb, ex.bw];
          var isSimple = ex.fw === ex.mb && ex.mb === ex.bw;
          var menuOpen = state.openMenuId === key;
 
          html += '<div class="ex-card dc-' + c + (ex.cat ? ' cat-' + ex.cat : '') + '" data-key="' + key + '">'
            + '<div class="ex-card-header">'
            + '<div style="display:flex;align-items:center;gap:8px;">'
            + '<div class="ex-name">' + ex.name + '</div>'
            + (ex.mainLift ? '<span style="font-size:8px;font-family:var(--font-body);letter-spacing:0.12em;color:var(--gold-metal);border:1px solid var(--gold-metal);border-radius:4px;padding:2px 6px;box-shadow:0 0 6px rgba(200,146,42,0.3);">MAIN</span>' : '')
            + '</div>'
            + '<button class="ex-menu-btn" onclick="toggleMenu(\'' + key + '\')">•••</button>'
            + '</div>';
 
          if (menuOpen) {
            html += '<div class="ex-actions">'
              + '<button class="ex-action-btn ex-action-edit" onclick="openEditDayModal(' + index + ',' + ti + ',' + ei + ')">Edit</button>'
              + '<button class="ex-action-btn" style="background:rgba(200,146,42,0.08);border-color:rgba(200,146,42,0.4);color:var(--gold-metal);" onclick="setMainLift(' + index + ',' + ti + ',' + ei + ')">' + (ex.mainLift ? 'Unset Main' : 'Main Lift') + '</button>'
              + '<button class="ex-action-btn ex-action-remove" onclick="removeDayEx(' + index + ',' + ti + ',' + ei + ')">Remove</button>'
              + '</div>';
          }
 
if (ex.cat === 'dynamic') {
            html += dynOptsHTML(ex);
          } else if (!isSimple) {
            html += '<div class="equip-tabs">'
              + ['Free Weight','Machine/Band','Bodyweight'].map(function(t,i){
                  return '<button class="equip-tab'+(i===activeTab?' active':'')+'" onclick="switchTab(\''+key+'\','+i+')">'+t+'</button>';
                }).join('')
              + '</div>'
              + '<div class="equip-content">'+vals[activeTab]+'</div>';
          } else {
            html += '<div class="equip-content">'+ex.fw+'</div>';
          }

          if (ex.notes) {
            html += '<div class="ex-notes">' + escHtml(ex.notes) + '</div>';
          }

          html += '</div>';
        });
      }
      
      html += '<button class="add-ex-btn" onclick="openAddDayModal(' + index + ',' + ti + ')">'
        + '+ Add Exercise'
        + '</button>';
      html += '</div>';
    });
  }
 
  if (d.note) html += '<div class="day-note dc-' + c + '">'+d.note+'</div>';
  html += '<div class="forge-mark">The Forge &nbsp;·&nbsp; Beta v0.6</div>';
  return html;
}
 
// ── Main Lift toggle — one per day max ─────────────────────────────────────
function setMainLift(di, ti, ei) {
  var target = state.days[di].tiers[ti].exercises[ei];
  var wasMain = target.mainLift === true;
  // Clear all main lift flags on this day — only one allowed
  state.days[di].tiers.forEach(function(tier) {
    tier.exercises.forEach(function(ex) { delete ex.mainLift; });
  });
  // Toggle: if it wasn't main, set it; if it was, leave all cleared
  if (!wasMain) target.mainLift = true;
  saveDays();
  state.openMenuId = null;
  render();
}

// ── Remove exercise from day → add to library ──────────────────────────────
function removeDayEx(di, ti, ei) {
  var ex = state.days[di].tiers[ti].exercises[ei];
  // Add to library if not already there
  var exists = state.library.some(function(e){ return e.name === ex.name; });
  if (!exists) {
    state.library.push({ id: genId(), name: ex.name, cat: 'upper', fw: ex.fw, mb: ex.mb, bw: ex.bw });
    saveLibrary();
  }
  state.days[di].tiers[ti].exercises.splice(ei, 1);
  saveDays();
  state.openMenuId = null;
  render();
}
 
// ── Edit exercise in day ───────────────────────────────────────────────────
function openEditDayModal(di, ti, ei) {
  var ex = state.days[di].tiers[ti].exercises[ei];
  openModal({ mode:'editDay', di:di, ti:ti, ei:ei, name:ex.name, cat:'upper', fw:ex.fw, mb:ex.mb, bw:ex.bw, notes:ex.notes||'' });
}
 
function saveEditDayExercise() {
  var m = state.modal;
  if (!m || !m.name.trim()) return;
  var prevEx = state.days[m.di].tiers[m.ti].exercises[m.ei] || {};
  state.days[m.di].tiers[m.ti].exercises[m.ei] = {
    name: m.name.trim(), fw: m.fw.trim(), mb: m.mb.trim(), bw: m.bw.trim(),
    cat: prevEx.cat || '',
    mainLift: prevEx.mainLift || false,
    notes: (m.notes || '').trim()
  };
  saveDays();
  closeModal();
}

// Dynamic exercises show Distance / Volume / Rest instead of equipment variants.
// One renderer so library, picker, and day card can never drift apart again.
function toggleLibExpand(id) {
  state.libExpanded[id] = !state.libExpanded[id];
  render();
}

function dynOptsHTML(ex) {
  return '<div class="lib-ex-options">'
    + '<div class="lib-ex-option">DIST: <span>' + escHtml(ex.fw || '—') + '</span></div>'
    + '<div class="lib-ex-option">VOL: <span>' + escHtml(ex.mb || '—') + '</span></div>'
    + '<div class="lib-ex-option">REST: <span>' + escHtml(ex.bw || '—') + '</span></div>'
    + '</div>';
}

// Same three values on one line, for the session card header
function dynInlineHTML(ex) {
  return '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;padding:8px 10px;'
    + 'background:var(--grey-mid);border-radius:8px;font-size:11px;'
    + 'font-family:var(--font-body);color:var(--text-mute);letter-spacing:0.04em;">'
    + '<span>DIST: <span style="color:var(--text-pri);">' + escHtml(ex.fw || '—') + '</span></span>'
    + '<span>VOL: <span style="color:var(--text-pri);">' + escHtml(ex.mb || '—') + '</span></span>'
    + '<span>REST: <span style="color:var(--text-pri);">' + escHtml(ex.bw || '—') + '</span></span>'
    + '</div>';
}
  
// ── Screen: My Exercises Library ───────────────────────────────────────────
function renderLibrary() {
  var cats = [
    { id:'upper',    label:'Upper',    color:'lime' },
    { id:'lower',    label:'Lower',    color:'red' },
    { id:'power',    label:'Power',    color:'lime' },
    { id:'dynamic', label:'Dynamic', color:'red' },
    { id:'core',     label:'Core',     color:'gold' },
    { id:'recovery', label:'Recovery', color:'grey' },
  ];
 
  var filtered = state.library.filter(function(e){ return e.cat === state.libCat; });
 
  var tabsHTML = cats.map(function(c){
    return '<button class="cat-tab cat-' + c.id + (state.libCat === c.id ? ' active' : '') + '" onclick="setLibCat(\'' + c.id + '\')">' + c.label + '</button>';
  }).join('');
 
  var exHTML = '';
  if (filtered.length === 0) {
    exHTML = '<div class="lib-empty"><div class="lib-empty-icon">📋</div>No exercises in this category yet.<br/>Tap + to add one.</div>';
  } else {
    filtered.forEach(function(ex) {
      var menuOpen = state.openMenuId === ex.id;
      var isOpen = !!state.libExpanded[ex.id];
      exHTML += '<div class="lib-ex-card' + (ex.cat ? ' cat-' + ex.cat : '') + '" onclick="toggleLibExpand(\''+ex.id+'\')">'
        + '<div class="lib-ex-header">'
        + '<div><div class="lib-ex-name">'+ex.name+'</div></div>'
        + '<div style="display:flex;align-items:center;gap:8px;">'
        + '<span style="font-size:10px;color:var(--text-mute);">' + (isOpen ? '▲' : '▼') + '</span>'
        + '<button class="lib-ex-menu-btn" onclick="event.stopPropagation();toggleMenu(\''+ex.id+'\')">•••</button>'
        + '</div>'
        + '</div>';
 
      if (menuOpen) {
        exHTML += '<div class="lib-ex-actions" onclick="event.stopPropagation();">'
          + '<button class="lib-ex-action lib-ex-edit" onclick="event.stopPropagation();openEditLibModal(\''+ex.id+'\')">✏️ Edit</button>'
          + '<button class="lib-ex-action lib-ex-delete" onclick="event.stopPropagation();deleteLibEx(\''+ex.id+'\')">🗑 Delete</button>'
          + '</div>';
      }
 
      if (isOpen) {
        exHTML += (ex.cat === 'dynamic'
          ? dynOptsHTML(ex)
          : '<div class="lib-ex-options">'
            + '<div class="lib-ex-option">Weighted: <span>'+ex.fw+'</span></div>'
            + '<div class="lib-ex-option">Machine/Band: <span>'+ex.mb+'</span></div>'
            + '<div class="lib-ex-option">Bodyweight: <span>'+ex.bw+'</span></div>'
            + '</div>')
          + (ex.notes ? '<div class="ex-notes"><span style="color:var(--text-mute);">Notes: </span>' + escHtml(ex.notes) + '</div>' : '');
      }
      exHTML += '</div>';
    });
  }
 
  return '<div class="lib-header">'
    + '<div class="home-eyebrow">Exercise Bank</div>'
    + '<div class="lib-title">My Exercises</div>'
    + '<div class="lib-sub">' + state.library.length + ' exercises · tap ••• to edit or delete</div>'
    + '</div>'
    + '<div class="cat-tabs">' + tabsHTML + '</div>'
    + '<div class="lib-section-pad">'
    + exHTML
    + '<button class="lib-add-btn" onclick="openAddLibModal()">+ Add Exercise</button>'
    + '</div>'
    + '<div class="forge-mark">The Forge &nbsp;·&nbsp; Beta v0.6</div>';
}
