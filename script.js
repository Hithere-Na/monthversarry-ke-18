const CONFIG = {
  nama:  "Nadiaaa",
  dari:  "gantengmuu",
  foto:  "IMG-20261005-WA0004.jpg",
  bulan: 18
};
const q = new URLSearchParams(location.search);
for (const k of Object.keys(CONFIG)) if (q.get(k)) CONFIG[k] = q.get(k);
CONFIG.bulan = parseInt(CONFIG.bulan) || 18;
const esc = s => String(s).replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));

document.title = "Happy " + CONFIG.bulan + " Bulan 🤍";
document.getElementById('untuk').textContent = "untuk " + CONFIG.nama + " 💕";
document.getElementById('untuk2').textContent = CONFIG.nama;
document.getElementById('sign').textContent = "dari " + CONFIG.dari + ", buat cayangkuu 🤍";
document.getElementById('foto').src = CONFIG.foto;

const MSG = `happy 18th monthversaryy sayanggkuu, cintaaakuu, cantiikuuuu.

ga kerasa yaa sayangg, udah 18 bulan kita bareng-bareng. kalo inget dari awal kita mulai semuanya, banyak banget hal yang udah kita lewatin sampai akhirnya kita bisa ketemu langsung, walaupun cuma sebentar. rasanya seneng banget bisa akhirnya ketemu ayangg setelah selama ini kita jalanin hubungan dari jauh. semoga nanti kita bisa punya lebih banyak waktu buat bareng-bareng yaa, cintaaakuu.

makasiii udah bertahan sama akuu sampai sejauh ini. aku tau hubungan kita ga selalu gampang, ada masalah, salah paham, capee, dan banyak hal yang harus kita lewatin. tapi setelah 18 bulan ini, aku masih mau terus milih ayangg, terus belajar jadi lebih baik, dan terus berjuang buat hubungan kitaa.

aku harap di bulan-bulan berikutnya kita bisa makin dewasa, makin ngerti satu sama lain, dan suatu saat nanti ga perlu lagi ngerasain kangen dari jauh. i lovee youuu so muchhh, sayanggkuu. happy 18 monthsaryy, cintaaakuuu. semoga cerita kita masih panjang dan kita bisa terus bareng sampai hari-hari yang selama ini cuma bisa kita bayangin akhirnya jadi nyata.`;
const cv = document.getElementById('fx'), cx = cv.getContext('2d');
let W, H, parts = [], trail = [];
function size(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
addEventListener('resize', size); size();

function confetti(x = W/2, y = H/2){
  const cols = ['#ff5c9a','#ffb3d1','#fff','#ffd166','#c77dff','#ff86b3'];
  for(let i=0;i<120;i++){
    const a = Math.random()*Math.PI*2, s = 3+Math.random()*7;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-4,g:.18,r:3+Math.random()*4,c:cols[i%cols.length],life:100+Math.random()*60,rot:Math.random()*6,heart:Math.random()<.3});
  }
}
function spark(x,y){ for(let i=0;i<2;i++) trail.push({x,y,vx:(Math.random()-.5)*1.5,vy:Math.random()*-1.5,life:30,s:2+Math.random()*3}); }
addEventListener('pointermove', e => spark(e.clientX, e.clientY));
addEventListener('pointerdown', e => spark(e.clientX, e.clientY));

function loop(){
  cx.clearRect(0,0,W,H);
  parts = parts.filter(p => p.life > 0);
  for(const p of parts){
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.life--; p.rot += .15;
    cx.save(); cx.globalAlpha = Math.min(1, p.life/40); cx.translate(p.x,p.y); cx.rotate(p.rot); cx.fillStyle = p.c;
    if(p.heart){ cx.font = p.r*4+'px serif'; cx.fillText('♥',0,0); } else cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
    cx.restore();
  }
  trail = trail.filter(t => t.life > 0);
  for(const t of trail){
    t.x += t.vx; t.y += t.vy; t.life--;
    cx.globalAlpha = t.life/30; cx.fillStyle = '#ff5c9a'; cx.font = t.s*4+'px serif'; cx.fillText('✦', t.x, t.y);
  }
  cx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

function rain(n = 30){
  const em = ['💗','💖','🌸','🎀','✨','🤍'];
  for(let i=0;i<n;i++){
    const s = document.createElement('span');
    s.className = 'float'; s.textContent = em[Math.floor(Math.random()*em.length)];
    s.style.left = Math.random()*100 + 'vw';
    s.style.fontSize = 16 + Math.random()*26 + 'px';
    s.style.animationDuration = 4 + Math.random()*4 + 's';
    s.style.animationDelay = Math.random()*2 + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 10000);
  }
}
setInterval(() => rain(3), 2500);

function countUp(el, to){
  let n = 0; const t = setInterval(() => { el.textContent = ++n; if(n >= to) clearInterval(t); }, 90);
}
function type(el, txt, i = 0){
  if(i <= txt.length){ el.textContent = txt.slice(0,i); setTimeout(() => type(el, txt, i+1), 20); }
}

const env = document.getElementById('env');
env.addEventListener('click', () => {
  env.classList.add('open');
  confetti(W/2, H/2);
  setTimeout(() => {
    env.style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('card').style.display = 'block';
    countUp(document.getElementById('num'), CONFIG.bulan);
    setTimeout(() => type(document.getElementById('msg'), MSG), 1700);
    rain(40);
  }, 1300);
}, {once:true});

document.getElementById('boom').onclick = e => confetti(e.clientX, e.clientY);
document.getElementById('hearts').onclick = () => rain(45);
