(() => {
'use strict';
const slides=[...document.querySelectorAll('.slide')],main=slides.filter(s=>s.dataset.kind==='main');
const select=document.querySelector('#slide-select'),panel=document.querySelector('#notes-panel'),notes=document.querySelector('#notes');
let current=0,lastMain=0;
const aliases={'sovereignty-history':'detail-sovereignty-history','long-korea':'closing','american-precedent':'detail-sovereignty-history','joseon-continuity':'detail-sovereignty-history','historical-continuity':'detail-sovereignty-history','north-korea':'north-endurance','north-in-view':'north-endurance','robots':'work-and-generations','birth-rate':'work-and-generations','possible-futures':'detail-possible-futures','unification':'detail-possible-futures','armistice':'detail-possible-futures','first-thoughts':'first-thoughts','tower-reveal':'neenah','size':'wisconsin-scale','where':'wisconsin-scale','in-common':'familiar-lives','cabbage':'familiar-lives','different':'familiar-lives','wisconsin-war':'wisconsin-remembers','charles-dickman':'detail-wisconsin-remembers','medal-roster':'wisconsin-people','wisconsin-trade':'wisconsin-work','wisconsin-ginseng':'wisconsin-makers','oshkosh-hanwha':'wisconsin-makers','culture':'everyday-korea','deterrence':'north-security','russia':'north-security','north-regions':'north-recovery','faith':'learning-together','jikji':'paper-partnership','korean-words':'korean-words'};
const openingViews=['orbit','cities','language','outline'];
const openingTitle=document.querySelector('#opening h1').textContent;
function setOpeningView(view){
 const opening=document.querySelector('#opening');
 opening.dataset.openingView=view;
 openingViews.forEach(name=>opening.querySelector('.opening-'+name).setAttribute('aria-hidden',String(view!==name)));
 opening.querySelector('h1').textContent=view==='language'?'Start with a letter and two words':view==='outline'?'Outline':openingTitle;
 const button=opening.querySelector('.opening-advance');
 button.textContent=view==='orbit'?'Reveal cities →':view==='cities'?'우리 · 사랑 →':view==='language'?'Outline →':'Words and People →';
 button.setAttribute('aria-label',view==='orbit'?'Reveal Pyongyang and Seoul photographs':view==='cities'?'Learn ㄹ through 우리 and 사랑':view==='language'?'Show the three-part outline':'Continue to Words and People');
 window.scrollTo(0,0);
 if(current===0)document.querySelector('#previous').disabled=view==='orbit';
}
function syncNavigation(){
 const states=[...slides[current].querySelectorAll('.visual-step')];
 const active=states.findIndex(state=>!state.hidden);
 const moreSteps=active>=0&&active<states.length-1;
 document.querySelector('#next').disabled=(current===main.length-1||current===slides.length-1)&&!moreSteps;
}
function setVisualStep(slide,index){
 const states=[...slide.querySelectorAll('.visual-step')];
 states.forEach((state,i)=>state.hidden=i!==index);
 const active=states[index];if(!active)return;
 if(['first-thoughts','alliance-autonomy','wisconsin-remembers','korea-and-europe','wisconsin-work','familiar-lives','closing'].includes(slide.id))window.scrollTo(0,0);
 const stepControl=slide.querySelector('.step-advance');if(stepControl)stepControl.textContent=active.dataset.nextLabel||(index===states.length-1?'Continue':index===0?'Reveal first generation':'Reveal next generation');
 if(active.dataset.stepTitle!==undefined)document.getElementById(slide.id+'-title').textContent=active.dataset.stepTitle;
 for(const [key,selector] of [['stepBottom','.step-bottom'],['stepSource','.step-source']]){
  const target=slide.querySelector(selector);
  if(target&&active.dataset[key]!==undefined){target.textContent=active.dataset[key];target.hidden=!active.dataset[key];}
 }
 syncNavigation();
}
function show(index){
 current=Math.max(0,Math.min(slides.length-1,index));
 slides.forEach((s,i)=>{s.hidden=i!==current;if(i!==current)s.querySelectorAll('video').forEach(v=>v.pause());});
 const active=slides[current],isMain=active.dataset.kind==='main';
 if(isMain)lastMain=current;
 const revealed=active.querySelector('.reveal');if(revealed){revealed.hidden=true;active.querySelector('.reveal-trigger').hidden=false;}
 select.value=active.id;
 setVisualStep(active,0);
 document.querySelector('#count').textContent=isMain?`${current+1} / ${main.length}`:`Support ${current-main.length+1} / ${slides.length-main.length}`;
 document.querySelector('#previous').disabled=current===0;
 if(active.id==='opening')setOpeningView('orbit');
 syncNavigation();
 document.querySelector('#section-time').textContent=isMain?active.dataset.section:'';
 document.querySelector('#notes-content').innerHTML=active.querySelector('.speaker-notes').innerHTML;
 document.querySelector('#additional').textContent=isMain?'Supporting material':'Back to talk';
 document.querySelector('#progress').style.width=(isMain?(current+1)/main.length:1)*100+'%';
 history.replaceState(null,'','#'+active.id);window.scrollTo(0,0);
}
function advance(){
 if(slides[current].id==='opening'){
  const view=openingViews.indexOf(slides[current].dataset.openingView);
  if(view<openingViews.length-1){setOpeningView(openingViews[view+1]);return;}
 }
 const reveal=slides[current].querySelector('.reveal[hidden]');
 if(reveal){reveal.hidden=false;slides[current].querySelector('.reveal-trigger').hidden=true;return;}
 const steps=[...slides[current].querySelectorAll('.visual-step')];
 const active=steps.findIndex(s=>!s.hidden);
 if(active>=0&&active<steps.length-1){setVisualStep(slides[current],active+1);return;}
 if(current!==main.length-1)show(current+1);
}
function retreat(){if(slides[current].id==='opening'){const view=openingViews.indexOf(slides[current].dataset.openingView);if(view>0){setOpeningView(openingViews[view-1]);return;}}const steps=[...slides[current].querySelectorAll('.visual-step')];const active=steps.findIndex(s=>!s.hidden);if(active>0){setVisualStep(slides[current],active-1);return;}show(current-1);}
function closeNotes(){panel.hidden=true;notes.setAttribute('aria-expanded','false');notes.focus();}
document.body.classList.add('ready');
document.querySelector('#previous').addEventListener('click',retreat);
document.querySelector('#next').addEventListener('click',advance);
select.addEventListener('change',()=>{show(slides.findIndex(s=>s.id===select.value));select.blur();});
document.querySelector('#additional').addEventListener('click',()=>show(current<main.length?main.length:lastMain));
notes.addEventListener('click',()=>{panel.hidden=!panel.hidden;notes.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)document.querySelector('#close-notes').focus();});
document.querySelector('#close-notes').addEventListener('click',closeNotes);
document.querySelectorAll('.step-advance').forEach(button=>button.addEventListener('click',advance));
document.querySelectorAll('.reveal-trigger').forEach(button=>button.addEventListener('click',()=>{button.previousElementSibling.hidden=false;button.hidden=true;}));
document.querySelector('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.querySelector('#fullscreen').textContent='Full screen unavailable';}});
document.addEventListener('fullscreenchange',()=>{document.querySelector('#fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!panel.hidden){closeNotes();return;}if(ev.target.closest('select,input,textarea,video')||!panel.hidden||document.querySelector('dialog[open]'))return;if(ev.key===' '&&ev.target.closest('button,a'))return;if(['ArrowRight','ArrowLeft','PageDown','PageUp','Home','End',' '].includes(ev.key))ev.preventDefault();if(['ArrowRight','PageDown',' '].includes(ev.key))advance();if(['ArrowLeft','PageUp'].includes(ev.key))retreat();if(ev.key==='Home')show(0);if(ev.key==='End')show(main.length-1);if(ev.key==='n')notes.click();});
const dialog=document.querySelector('#clip-dialog');
const clipPlayer=document.querySelector('#clip-player');
let clipTrigger=null;
function closeClip(){clipPlayer.replaceChildren();dialog.close();clipTrigger?.focus({preventScroll:true});}
document.querySelector('#close-clip').addEventListener('click',closeClip);
dialog.addEventListener('cancel',()=>clipPlayer.replaceChildren());
dialog.addEventListener('close',()=>clipPlayer.replaceChildren());
document.querySelector('#reload-clip').addEventListener('click',()=>{const frame=clipPlayer.querySelector('iframe');if(frame)frame.src=frame.src;});
document.querySelectorAll('.inline-clip').forEach(button=>button.addEventListener('click',()=>{
 clipTrigger=button;
 const frame=document.createElement('iframe');
 frame.src=`https://www.youtube-nocookie.com/embed/${button.dataset.video}?start=${button.dataset.start}&end=${button.dataset.end}&autoplay=1&rel=0&playsinline=1`;
 frame.title=button.dataset.title;
 frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
 frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
 document.querySelector('#clip-title').textContent=button.dataset.title;
 document.querySelector('#clip-external').href=`https://www.youtube.com/watch?v=${button.dataset.video}&t=${button.dataset.start}s`;
 clipPlayer.replaceChildren(frame);dialog.showModal();
}));
// Maps remain inspectable on narrow screens without loading another service.
document.querySelectorAll('img.map-img').forEach(img=>{img.tabIndex=0;img.style.cursor='zoom-in';img.setAttribute('aria-label',img.alt+'; open full-size map');const open=()=>window.open(img.currentSrc||img.getAttribute('src'),'_blank','noopener');img.addEventListener('click',open);img.addEventListener('keydown',ev=>{if(ev.key==='Enter')open();});});
function hashIndex(){const key=decodeURIComponent(location.hash.slice(1));return slides.findIndex(s=>s.id===(aliases[key]||key));}
window.addEventListener('hashchange',()=>{const i=hashIndex();if(i>=0)show(i);});show(Math.max(0,hashIndex()));
})();
