const menu=document.querySelector(".menu"),nav=document.querySelector("#nav");
menu?.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o);menu.textContent=o?"CLOSE":"MENU"});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");if(menu)menu.textContent="MENU"}));
const progress=document.querySelector(".progress");
function onScroll(){const d=document.documentElement;const max=d.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%"}addEventListener("scroll",onScroll,{passive:true});onScroll();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

// Ambient café films: muted autoplay + continuous loop. No play button interruption.
document.querySelectorAll(".video-card video").forEach(v=>{
  v.muted=true; v.loop=true; v.playsInline=true;
  const play=()=>v.play().catch(()=>{});
  play();
  v.addEventListener("ended",()=>{v.currentTime=0;play()});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden&&v.paused)play()});
});

const guide=document.querySelector(".cat-guide"),toggle=document.querySelector(".cat-toggle"),bubble=document.querySelector(".bubble");
function catSay(text){bubble.textContent=text;guide.classList.add("talking");clearTimeout(catSay.t);catSay.t=setTimeout(()=>guide.classList.remove("talking"),2300)}
toggle?.addEventListener("click",()=>{const o=guide.classList.toggle("open");toggle.setAttribute("aria-expanded",o);catSay(o?"where to?":"mrrp?")});
function jump(sel){document.querySelector(sel)?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});guide.classList.remove("open");guide.classList.add("excited");setTimeout(()=>guide.classList.remove("excited"),900)}
document.querySelectorAll(".cat-menu button,.cat-action").forEach(b=>b.addEventListener("click",()=>{jump(b.dataset.target);catSay(b.dataset.target==="#eat"?"food this way →":b.dataset.target==="#motion"?"watch this →":b.dataset.target==="#visit"?"found it →":"up we go ↑")}));
const sectionWords={eat:"smells good…",motion:"watch this one",visit:"need directions?"};
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&sectionWords[e.target.id])catSay(sectionWords[e.target.id])}),{threshold:.55});["eat","motion","visit"].forEach(id=>{const e=document.getElementById(id);if(e)cio.observe(e)});
let idle;function resetIdle(){clearTimeout(idle);idle=setTimeout(()=>catSay("…still here"),14000)}["scroll","pointerdown","keydown"].forEach(ev=>addEventListener(ev,resetIdle,{passive:true}));resetIdle();