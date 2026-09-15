const menu=document.querySelector(".menu"),nav=document.querySelector("#nav");
menu?.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o);menu.textContent=o?"CLOSE":"MENU"});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");if(menu)menu.textContent="MENU"}));
const progress=document.querySelector(".progress");
function onScroll(){const d=document.documentElement,max=d.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+"%"}addEventListener("scroll",onScroll,{passive:true});onScroll();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.08});document.querySelectorAll(".reveal").forEach(e=>io.observe(e));
// Ambient café films: muted autoplay and continuous looping, with no player UI.
document.querySelectorAll(".video-card video").forEach(v=>{v.muted=true;v.loop=true;v.playsInline=true;v.controls=false;const play=()=>v.play().catch(()=>{});play();v.addEventListener("ended",()=>{v.currentTime=0;play()});document.addEventListener("visibilitychange",()=>{if(!document.hidden&&v.paused)play()})});