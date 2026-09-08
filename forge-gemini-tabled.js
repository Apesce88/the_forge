var EXERCISE_DB = {
  chest: { fw: ["Barbell Bench Press","Incline DB Press","Decline Press","Chest Fly"], mb: ["Machine Chest Press","Cable Fly","Pec Deck"], bw: ["Push-Ups","Dips","Incline Push-Ups"] },
  back: { fw: ["Bent-Over Row","Deadlift","Pendlay Row","T-Bar Row"], mb: ["Lat Pulldown","Seated Cable Row","Assisted Pull-Up"], bw: ["Pull-Ups","Inverted Row","Superman"] },
  shoulders: { fw: ["Overhead Press","Arnold Press","Lateral Raise","Front Raise"], mb: ["Machine Shoulder Press","Cable Lateral Raise"], bw: ["Pike Push-Up","Handstand Hold"] },
  biceps: { fw: ["Barbell Curl","Hammer Curl","Preacher Curl"], mb: ["Cable Curl","Machine Curl"], bw: ["Chin-Up"] },
  triceps: { fw: ["Close-Grip Bench","Skull Crusher","Overhead Extension"], mb: ["Cable Pushdown","Machine Dip"], bw: ["Dips","Diamond Push-Up"] },
  legs: { fw: ["Back Squat","Front Squat","Romanian Deadlift","Lunge"], mb: ["Leg Press","Leg Extension","Leg Curl"], bw: ["Bodyweight Squat","Walking Lunge","Pistol Squat"] },
  calves: { fw: ["Standing Calf Raise"], mb: ["Seated Calf Raise Machine"], bw: ["Calf Raise"] },
  core: { fw: ["Weighted Sit-Up"], mb: ["Cable Woodchop","Ab Machine"], bw: ["Plank","Crunch","Russian Twist","Hollow Hold"] },
  explosiveness: { fw: ["Power Clean"], mb: ["Box Jump Machine"], bw: ["Box Jump","Broad Jump","Lateral Bound"] }
};

var KEYWORDS=[
  {w:["bench","chest","press","fly","dip"],g:"chest"},
  {w:["row","pull","deadlift","lat","back"],g:"back"},
  {w:["shoulder","press","raise","overhead"],g:"shoulders"},
  {w:["squat","lunge","leg","quad","hamstring"],g:"legs"},
  {w:["curl","bicep","hammer curl","reverse curl","preacher"],g:"biceps"},
  {w:["tricep","pushdown","skull crusher","dip","close-grip","overhead extension"],g:"triceps"},
  {w:["calf","calf raise","pogo"],g:"calves"},
  {w:["plank","crunch","sit-up","russian twist","leg raise","hollow","v-up","oblique","woodchop","ab ","core"],g:"core"},
  {w:["jump","box jump","broad jump","bound","explosive","power clean","lateral bound"],g:"explosiveness"},
];

function detectGroup(t){
  if(!t) return null;
  var l=t.toLowerCase();
  for(var i=0;i<KEYWORDS.length;i++){
    if(KEYWORDS[i].w.some(function(k){return l.includes(k);})) return KEYWORDS[i].g;
  }
  return null;
}

  function autoFill(name,fw,mb,bw){
    var g=detectGroup(name)||detectGroup(fw)||detectGroup(mb)||detectGroup(bw);
    if(!g||!EXERCISE_DB[g]) return null;
    var db=EXERCISE_DB[g];
    var used=[fw,mb,bw].filter(Boolean).map(function(s){return s.toLowerCase();});
    var pick=function(arr){
      var av=arr.filter(function(e){
        return !used.some(function(u){
          return e.toLowerCase().includes(u.slice(0,5))||u.includes(e.toLowerCase().slice(0,5));
        });
      });
      var pool=av.length?av:arr;
      return pool[Math.floor(Math.random()*pool.length)];
    };
    return{fw:fw||pick(db.fw),mb:mb||pick(db.mb),bw:bw||pick(db.bw)};
  }

  Extract tabled Gemini code
