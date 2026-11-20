// Keep hover and scroll videos off the network until they are actually used.
function loadInteractionVideo(video){
 let changed=false;
 video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');changed=true;});
 if(changed){video.preload='auto';video.load();}
}
const slides=[...document.querySelectorAll('.slide')], dots=[...document.querySelectorAll('.hero-dots button')], progress=document.querySelector('.progress-track i'), current=document.querySelector('.progress-current'), intro=document.querySelector('.intro'), film=document.querySelector('.scroll-film'), copySlides=[...document.querySelectorAll('.slide-content')];let scrollProgress=0,rafPending=false;
window.addEventListener('scroll',()=>{
 if(!matchMedia('(max-width:720px), (prefers-reduced-motion:reduce)').matches&&!navigator.connection?.saveData)loadInteractionVideo(film);
},{passive:true,once:true});
function smoothstep(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function renderScroll(){rafPending=false;const rect=intro.getBoundingClientRect(),travel=intro.offsetHeight-window.innerHeight;scrollProgress=Math.max(0,Math.min(1,-rect.top/Math.max(1,travel)));updateCoverMotion();const fade=smoothstep((scrollProgress-.10)/.25);const profileReveal=document.querySelector('.profile-reveal');if(profileReveal){profileReveal.classList.toggle('profile-entered',scrollProgress>.16)}copySlides.forEach((copy,i)=>{copy.style.opacity=i===1?String(fade):'1';copy.style.transform='none';copy.style.clipPath='none';copy.style.visibility=i===1&&fade===0?'hidden':'visible';copy.inert=i===1&&fade<.99});const stage=fade<.5?0:1;dots.forEach((dot,i)=>dot.classList.toggle('selected',i===stage));progress.style.width=`${Math.max(4,scrollProgress*100)}%`;current.textContent=`0${stage+1}`;document.querySelector('.cursor-hint').style.opacity=String(1-smoothstep(scrollProgress/.18));if(film.readyState>=2&&Number.isFinite(film.duration)){const target=film.duration*scrollProgress;if(Math.abs(film.currentTime-target)>.035)film.currentTime=target}}
function requestRender(){if(!rafPending){rafPending=true;requestAnimationFrame(renderScroll)}}function goToProgress(value){const travel=intro.offsetHeight-window.innerHeight;window.scrollTo({top:intro.offsetTop+travel*Math.max(0,Math.min(1,value)),behavior:'smooth'})}
film.addEventListener('loadeddata',()=>{film.classList.add('ready');requestRender()});film.addEventListener('error',()=>{film.classList.remove('ready')});window.addEventListener('scroll',requestRender,{passive:true});window.addEventListener('resize',requestRender);requestRender();
document.querySelector('.hero-next').addEventListener('click',()=>{if(scrollProgress<.98)goToProgress(1);else document.querySelector('#portfolio-intro').scrollIntoView({behavior:'smooth'})});dots.forEach((dot,i)=>dot.addEventListener('click',()=>goToProgress(i)));
const media=(folder,items)=>items.map(name=>({folder,name}));
const projects={
  screw:{title:'Screw Master',type:'PUZZLE · GAME UI',description:'围绕螺母配对与拆装整理的休闲解谜项目。以颜色识别为核心，结合机械质感、清晰的操作区与奖励反馈，探索轻松解压的游戏体验。',sections:[
    {title:'效果图',items:media('screw',['Appicon(gp_512.png','Loading.png','桌面.png','玩法界面.png','关卡开启过场.png','设置.png','通关过场.png','胜利结算.png','失败过场.png','转场 拷贝.png','转场2 拷贝.png','图鉴.png','图鉴拼图.png','图鉴详细页.png','道具购买.png','七日签到.png','砸金蛋.png','砸金蛋-Mini.png','小额真提现转盘.png','Cash-Everyday.png','Cash-Everyday-提现弹窗.png','Cash-Everyday-提现弹窗输入.png','ChestOpen.png','LUCKY-CASH2-.png','LUCKY-COIN.png','mini.png','major.png','grand.png','提现界面.png'])},
    {title:'五图',items:media('screw-five',['ipad1.png','ipad2.png','ipad3.png','ipad4.png','ipad5.png','iphone1.png','iphone2.png','iphone3.png','iphone4.png','iphone5.png'])},
    {title:'录屏',items:[{folder:'screw-video',name:'screen-from-20s.mp4',kind:'video'}]}
  ]},
  bingo:{title:'Ultimate Bingo',type:'CASUAL · GAME UI',description:'以宾果连线为核心的休闲游戏视觉设计。用明快的蓝紫配色、亲切的角色和丰富的奖励图标，串联玩法教学、活动与结算体验。',sections:[
    {title:'效果图',items:media('bingo',['AppIcon.png','Loading.png','teaching.png','主界面.png','主界面_tips.png','游戏.png','biongo1.png','biongo2.png','biongo3.png','Game-Over.png','过场.png','宝箱奖励.png','刮刮卡1.png','刮刮卡2.png','刮刮卡-奖励.png','老虎机.png','设置.png','气泡奖励.png','奖励.png','结算.png','碎片.png','碎片奖励.png','小额提现-1.png','小额提现-2.png','提现1.png','提现2.png','提现3.png','提现4.png','提现渠道.png','提现验证码.png','好评引导.png','退出弹窗.png'])},
    {title:'延伸玩法',items:media('bingo-extra',['appicon.png','loading-ios.png','IOS_A面主界面.png','迷宫玩法.png','IOS_A面关卡说明.png','IOS_A面卡片收集.png','IOS_A面签到.png','IOS_A面商店.png','IOS_A面星星奖励.png'])}
  ]},
  bird:{title:'Little Bird Merge',type:'MERGE · GAME UI',description:'以小鸟收集与合成为主题的休闲游戏项目。通过鲜明的角色轮廓、成长层级与状态提示，让基础合成和竞技场中的信息更容易辨认。',sections:[{title:'效果图',items:media('bird',['ICON.png','基础玩法-主界面.png','竞技-主界面.png','竞技场-排名.png','竞技场-任务.png','竞技场-任务通知.png','竞技-购买道具.png','竞技-购买道具-2.png','竞技-购买时间.png','竞技-GameOver1.png','竞技-GameOver2.png','VIP等级-0.png','VIP等级-1.png','VIP等级-2.png','提现.png'])}]},
  crystal:{title:'Lucky Crystal Mania',type:'SLOT · VISUAL DESIGN',description:'以阿拉伯幻想为背景的宝石主题视觉设计。将神灯、宝石、金边纹样和紫粉色光影融入符号、主界面与奖励系统，营造华丽而梦幻的寻宝氛围。',sections:[{title:'效果图',items:media('crystal',['icon.png','loading.png','主界面.png','pay table.png','scatter.png','scatter2.png','free spin.png','re spin.png','CASH FEATURE.png','cake house.png','mini game.png','mini.png','minor.png','major.png','grand.png','money.png','special win1_.png','special win2.png','special win3.png','special win4.png','special win5.png','win cash.png','翻倍.png','宝箱.png','刮刮卡.png','解锁格子.png','bank.png','弹幕.png','提示页.png','弹窗.png','设置.png','提现.png','提现账号.png','提现验证码.png'])}]},
  eliminate:{title:'Eliminate Big Battle',type:'GAME ART',description:'围绕消除玩法展开的休闲游戏 UI 设计。以饱满明亮的图标和清晰的操作入口，组织新手引导、道具、任务及胜负结算，让奖励信息更直观。',sections:[{title:'效果图',items:media('eliminate',['appicon.png','loading界面.png','玩法界面.png','新手引导.png','道具获得.png','气球.png','解锁格子.png','任务界面2.png','任务领取.png','累积旗子奖励.png','现金旗子奖励.png','转盘1.png','转盘2.png','转盘奖励.png','转盘奖励-额度1.png','转盘奖励-额度2.png','胜利界面.png','失败界面.png','好评引导.png','设置界面.png','提现界面.png','提现界面-1.png','提现界面-2.png','提现界面-提现渠道.png','提现界面-账号验证.png','提现卡兑换.png'])}]},
  puzzletaire:{title:'Puzzletaire',type:'PUZZLE GAME',description:'将纸牌解谜与风景拼图结合的界面设计项目。以柔和场景承托关卡操作，通过道具提示、完成反馈与每日挑战，呈现逐步探索的节奏。',sections:[{title:'效果图',items:media('puzzletaire',['icon.png','开屏.png','开屏页-隐私弹窗.png','MAIN.png','发牌-新手引导.png','发牌.png','发牌-放大.png','发牌-火苗.png','发牌-龙卷风.png','发牌完成.png','关卡困难页.png','困难关卡开始激励.png','超困难关卡开始激励.png','困难弹窗.png','关卡内-冰封.png','关卡内-冰封牌.png','关卡完成页.png','场景完成.png','场景弹窗.png','道具不足.png','提示.png','设置.png','连击反馈.png','每日挑战.png','奖杯页面.png','排位赛解锁.png','排位赛规则弹窗.png','排位赛积分获取.png','排位赛宝箱奖励.png','排位赛 拼图完成.png','排位赛-个人排行.png','个人资料弹窗.png','新赛季开始.png','赛季结束.png'])}]}
};
projects.tribes={title:'Tribes Match Battle',type:'CASUAL · GAME UI',description:'部落主题休闲游戏视觉设计。以石牌、木质与自然元素建立统一的题材语言，覆盖角色品牌、场景、道具图标，以及玩法、商店和任务等界面。',sections:[{title:'tribes-showcase',items:[]}]};
const projectIcons={screw:'screw.png',bingo:'bingo.png',bird:'bird.png',crystal:'crystal.png',eliminate:'eliminate.png',puzzletaire:'puzzletaire.png',tribes:'tribes.png'};
const modal=document.querySelector('.modal'),gallery=document.querySelector('.modal-gallery');let activeProject='screw';
function renderScreen(item,p,label,index,kind='interface'){
  if(item.kind==='video')return `<figure class="gallery-video"><video controls preload="metadata"><source src="assets/portfolio/${item.folder}/${encodeURIComponent(item.name)}" type="video/mp4"></video><figcaption>${label}</figcaption></figure>`;
  return `<figure class="${kind}-frame"><span class="device-glow"></span><button type="button" class="image-preview-trigger" aria-label="放大查看 ${p.title} ${label} ${index+1}"><img src="assets/portfolio/${item.folder}/${encodeURIComponent(item.name)}" alt="${p.title} ${label} ${index+1}" loading="lazy"></button><figcaption>${label} · ${String(index+1).padStart(2,'0')}</figcaption></figure>`;
}
let stopProjectImages=()=>{};
function deferredProjectMarkup(markup){
 return markup.replace(/<img\b[^>]*>/g,tag=>tag.replace(/\bsrc=(["'])(.*?)\1/,(_,quote,src)=>{
  const preview=projectPreviews[decodeURIComponent(src)];
  return `data-project-src="${preview||src}" data-full-src="${src}"`;
 }).replace(/\sloading="[^"]*"/g,''));
}
function prepareProjectImages(){
 stopProjectImages();
 const panel=document.querySelector('.modal-panel');
 const records=[...panel.querySelectorAll('img[data-project-src]')].map(img=>({img,src:img.dataset.projectSrc,state:'idle',attempts:0,retryAt:0}));
 const timers=new Set();let ended=false,frame=0,active=0;
 function schedule(){if(!ended&&!frame)frame=requestAnimationFrame(scan);}
 function scan(){
  frame=0;if(ended||!modal.classList.contains('open'))return;
  const bounds=panel.getBoundingClientRect();
  const nearby=records.filter(record=>{
   if(record.state!=='idle'||record.retryAt>Date.now())return false;
   const box=record.img.getBoundingClientRect();
   return box.bottom>=bounds.top-300&&box.top<=bounds.bottom+500;
  });
  nearby.sort((a,b)=>Math.abs(a.img.getBoundingClientRect().top-bounds.top)-Math.abs(b.img.getBoundingClientRect().top-bounds.top));
  for(const record of nearby){if(active>=4)break;start(record);}
 }
 function start(record){
  const {img}=record;record.state='loading';record.attempts++;active++;
  // Explicit src assignment bypasses native lazy-loading in embedded browsers.
  img.loading='eager';
  const url=new URL(record.attempts===3?img.dataset.fullSrc:record.src,document.baseURI);
  if(record.attempts>1)url.searchParams.set('retry',String(record.attempts));
  img.src=url.href;
  const timeout=setTimeout(()=>{timers.delete(timeout);fail(record);},20000);
  record.timeout=timeout;timers.add(timeout);
 }
 function fail(record){
  if(ended||record.state!=='loading')return;
  clearTimeout(record.timeout);timers.delete(record.timeout);
  active--;record.state=record.attempts<3?'idle':'failed';
  record.retryAt=Date.now()+record.attempts*1000;
  if(record.state==='idle'){
   const timer=setTimeout(()=>{timers.delete(timer);schedule();},record.attempts*1000+20);timers.add(timer);
  }
  schedule();
 }
 records.forEach(record=>{
  const {img}=record;
  img.decoding='async';
  img.addEventListener('load',()=>{
   if(ended||record.state!=='loading')return;
   clearTimeout(record.timeout);timers.delete(record.timeout);
   record.state='loaded';active--;schedule();
  });
  img.addEventListener('error',()=>fail(record));
 });
 function reconnect(){records.forEach(record=>{if(record.state==='failed'){record.state='idle';record.attempts=0;record.retryAt=0;}});schedule();}
 panel.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);window.addEventListener('online',reconnect);
 stopProjectImages=()=>{ended=true;cancelAnimationFrame(frame);timers.forEach(clearTimeout);panel.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('online',reconnect);};
 schedule();
}
function designNoteArrow(){return '';}
// Use a regular image viewport so local and HTTP previews share the same loading path.
function renderNoteCrop(src,w,h,box,label){
 const [x,y,cw,ch]=box.split(/\s+/).map(Number);
 const safeLabel=label.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
 return `<div class="screw-note-crop note-crop-viewport" style="aspect-ratio:${cw}/${ch};--crop-ratio:${cw/ch}"><img src="${encodeURI(src)}" alt="${safeLabel}" decoding="async" style="width:${w/cw*100}%;height:${h/ch*100}%;left:${-x/cw*100}%;top:${-y/ch*100}%"></div>`;
}
const projectDesignNotes={"bingo": {"title": "连线之外，让期待发生", "items": [{"src": "assets/portfolio/bingo/游戏.png", "w": 752, "h": 1628, "box": "30 651 692 635", "heading": "数字识别 · 连线一目了然", "body": "用五列字母与整齐数字建立阅读秩序，选中格的粉色爪印与未选格形成状态差异。", "label": "字母、数字、标记共同识别"}, {"src": "assets/portfolio/bingo/游戏.png", "w": 752, "h": 1628, "box": "90 147 572 293", "heading": "信息层级 · 先看当前号码", "body": "将当前号码与剩余球数放在棋盘上方，缩短观察号码和寻找格子的视线距离。", "label": "当前号码 → 棋盘"}, {"src": "assets/portfolio/bingo/宝箱奖励.png", "w": 752, "h": 1628, "box": "38 407 677 781", "heading": "奖励体验 · 让达成有分量", "body": "宝箱与奖励弹窗作为阶段性的视觉落点。设计重点是突出奖励内容与下一步行动，减少无关信息。", "label": "达成之后，集中展示奖励"}, {"src": "assets/portfolio/bingo/游戏.png", "w": 752, "h": 1628, "box": "0 456 752 374", "heading": "角色陪伴 · 建立亲切感", "body": "老虎角色、圆润字标与明亮配色串联玩法和奖励，让数字游戏拥有轻松热闹的性格。", "label": "角色与字标统一氛围"}]}, "bird": {"title": "小鸟成长，看得见的层次", "items": [{"src": "assets/portfolio/bird/基础玩法-主界面.png", "w": 1080, "h": 2340, "box": "43 749 994 1147", "heading": "角色识别 · 轮廓比细节更快", "body": "用鸟喙、冠羽、体型和色彩区分角色；在小尺寸下仍保留主要特征，方便寻找与配对。", "label": "颜色 × 轮廓 × 等级"}, {"src": "assets/portfolio/bird/基础玩法-主界面.png", "w": 1080, "h": 2340, "box": "22 468 1037 585", "heading": "成长路径 · 进阶有参照", "body": "枝条承托不同角色，等级数字辅助建立成长顺序。设计重点是让解锁状态与当前目标容易辨认。", "label": "沿着枝条观察成长"}, {"src": "assets/portfolio/bird/竞技场-排名.png", "w": 1080, "h": 2340, "box": "22 515 1037 1287", "heading": "竞技信息 · 比较要有秩序", "body": "排名界面集中展示竞争关系。用一致的条目组织玩家信息，让名次与奖励成为主要阅读线索。", "label": "名次与奖励分层阅读"}, {"src": "assets/portfolio/bird/基础玩法-主界面.png", "w": 1080, "h": 2340, "box": "22 1849 1037 468", "heading": "行动入口 · 聚焦下一步", "body": "将主要行动放在底部，以更大的体积和醒目轮廓强调入口，同时与角色区域保持分工。", "label": "角色在上，行动在下"}]}, "crystal": {"title": "让异域幻想，有清晰的秩序", "items": [{"src": "assets/portfolio/crystal/主界面.png", "w": 1080, "h": 2340, "box": "32 1053 1015 1076", "heading": "符号系统 · 华丽也要易辨", "body": "宝石花色与字母共用金边语言，再用主体颜色和轮廓区分。设计重点是保留缩小后的识别度。", "label": "统一金边，区分主体"}, {"src": "assets/portfolio/crystal/主界面.png", "w": 1080, "h": 2340, "box": "22 538 1037 562", "heading": "主题塑造 · 神灯串联世界观", "body": "灯神与神灯居于转轮上方，紫粉光影和鎏金装饰共同建立阿拉伯幻想的视觉记忆。", "label": "角色、神灯与暮光"}, {"src": "assets/portfolio/crystal/主界面.png", "w": 1080, "h": 2340, "box": "43 140 994 445", "heading": "奖励层级 · 数值各有位置", "body": "将不同奖池集中在上方，并以大小和分组区分层级。设计重点是让华丽装饰服务于数值阅读。", "label": "奖池信息集中分组"}, {"src": "assets/portfolio/crystal/主界面.png", "w": 1080, "h": 2340, "box": "22 2083 1037 257", "heading": "操作聚焦 · 主按钮容易找到", "body": "底部承接数值与转动操作，绿色行动按钮与紫金环境拉开对比，形成稳定的操作落点。", "label": "视线最终落到行动"}]}, "eliminate": {"title": "轻盈的气球，明确的操作", "items": [{"src": "assets/portfolio/eliminate/玩法界面.png", "w": 752, "h": 1628, "box": "53 537 647 749", "heading": "主体识别 · 用色彩建立节奏", "body": "高饱和气球围绕中心角色展开，轮廓圆润、颜色鲜明。设计重点是让可操作物件与背景保持区分。", "label": "明亮主体，柔和背景"}, {"src": "assets/portfolio/eliminate/玩法界面.png", "w": 752, "h": 1628, "box": "0 1351 752 277", "heading": "工具表达 · 外形说明用途", "body": "底部道具用手势、刷子与锤子的具象外形传达作用，数量标记补充使用信息。", "label": "图形先识别，数量后阅读"}, {"src": "assets/portfolio/eliminate/任务界面2.png", "w": 752, "h": 1628, "box": "23 374 707 895", "heading": "任务引导 · 把目标拆成步骤", "body": "任务界面承接阶段目标与奖励。设计重点是让任务内容、进度和领取操作按同一阅读方向排列。", "label": "目标 → 进度 → 奖励"}, {"src": "assets/portfolio/eliminate/胜利界面.png", "w": 752, "h": 1628, "box": "23 309 707 977", "heading": "结果反馈 · 给一局明确收尾", "body": "胜利界面将结果从玩法中独立出来。以明确标题和行动入口衔接下一步，避免奖励信息同时争抢视线。", "label": "完成之后，知道去哪"}]}, "puzzletaire": {"title": "把风景，一张张拼回来", "items": [{"src": "assets/portfolio/puzzletaire/发牌.png", "w": 1179, "h": 2556, "box": "47 358 1085 1610", "heading": "棋盘秩序 · 让观察更轻松", "body": "等距卡牌与统一牌背构成稳定网格，边界清楚，方便玩家判断位置和空位。", "label": "统一网格，稳定阅读"}, {"src": "assets/portfolio/puzzletaire/发牌-新手引导.png", "w": 1179, "h": 2556, "box": "24 77 1132 1661", "heading": "轻量教学 · 在操作处给提示", "body": "将提示与棋盘放在同一画面，围绕当前动作引导理解。设计重点是减少长文字带来的学习负担。", "label": "看见提示，就能尝试"}, {"src": "assets/portfolio/puzzletaire/场景完成.png", "w": 1179, "h": 2556, "box": "47 358 1085 1687", "heading": "完成价值 · 从卡牌到风景", "body": "完整风景成为解谜后的视觉回报，以画面揭示承接完成感，强化逐步收集与探索的动机。", "label": "拼图完成，风景显现"}, {"src": "assets/portfolio/puzzletaire/每日挑战.png", "w": 1179, "h": 2556, "box": "47 256 1085 1789", "heading": "挑战延伸 · 建立持续目标", "body": "每日挑战为主线之外提供独立入口。设计重点是清晰呈现挑战状态和奖励，使额外目标易于理解。", "label": "主线之外，保留新目标"}]}, "tribes": {"title": "把部落语言，融进每块石牌", "items": [{"src": "assets/portfolio/tribes/主界面.png", "w": 752, "h": 1628, "box": "75 554 602 749", "heading": "图案识别 · 小石牌也要清楚", "body": "石牌采用统一外框，内部以动物、工具和食物等具象符号区分，帮助玩家快速寻找相同图案。", "label": "同一外框，不同符号"}, {"src": "assets/portfolio/tribes/主界面.png", "w": 752, "h": 1628, "box": "60 358 632 228", "heading": "状态提示 · 收纳区单独成层", "body": "上方槽位与下方牌堆分开呈现，让已收集的内容拥有稳定位置，减少观察时的信息混杂。", "label": "收纳状态与牌堆分开"}, {"src": "assets/portfolio/tribes/主界面.png", "w": 752, "h": 1628, "box": "0 1319 752 309", "heading": "题材统一 · 工具也属于部落", "body": "道具以自然材质与饱满造型融入场景。设计重点是保持轮廓识别，同时延续石块、木质的题材语言。", "label": "道具与场景说同一种语言"}, {"src": "assets/portfolio/tribes/任务奖励.png", "w": 752, "h": 1628, "box": "30 326 692 961", "heading": "奖励节奏 · 为阶段目标收尾", "body": "任务奖励页面集中承接达成后的反馈。设计重点是突出所得内容与确认动作，保持清晰的收尾节奏。", "label": "目标完成，奖励集中呈现"}]}};
function renderProjectDesignNotes(key){
 const notes=projectDesignNotes[key];if(!notes)return '';
 return `<section class="screw-notebook project-design-notebook" aria-label="${projects[key].title} 设计思考"><header><span>DESIGN NOTES</span><h3>${notes.title}<span class="note-doodle">✳</span></h3><p>结合项目画面，拆解识别、信息与体验的设计重点。</p></header><div class="screw-note-grid">${notes.items.map((n,i)=>`<article class="screw-note note-${['colors','motion','detail','workshop'][i]}"><div class="note-picture">${renderNoteCrop(n.src,n.w,n.h,n.box,n.heading+" · 界面局部")}${designNoteArrow()}<span class="note-pencil-label">${n.label}</span></div><div class="note-copy"><span class="note-index">0${i+1}</span><h4>${n.heading}</h4><p>${n.body}</p></div></article>`).join('')}</div><footer>${projects[key].title}<span>视觉识别 · 信息层级 · 体验节奏</span></footer></section>`;
}

function screwDesignNotes(){
  const crop=(box,label)=>renderNoteCrop('assets/portfolio/screw/玩法界面.png',1080,2340,box,label);
  const arrow=designNoteArrow();
  return `<section class="screw-notebook" aria-label="Screw Master 设计思考"><header><span>DESIGN NOTES / 01</span><h3>小小螺母，大有讲究<span class="note-doodle">✳</span></h3><p>从真实界面里，拆解四个设计重点。</p></header><div class="screw-note-grid">
  <article class="screw-note note-colors"><div class="note-picture">${crop('35 945 1000 345','玩法局部：红、紫、蓝、青色螺母')}${arrow}<span class="note-pencil-label">先看颜色，再做配对</span></div><div class="note-copy"><span class="note-index">01</span><h4>视觉优先 · 颜色先被看见</h4><p>用颜色建立第一识别通道，再以轮廓、光影与金属质感补充体积。让玩家一眼找到同色螺母。</p><small>优化方向：加强近似色区分，并用纹样或明度辅助色弱识别。</small></div></article>
  <article class="screw-note note-motion"><div class="note-picture">${crop('330 960 440 330','玩法局部：螺母与空出的螺杆')}${arrow}<span class="note-pencil-label">滑动 → 卡入 → 轻轻回弹</span></div><div class="note-copy"><span class="note-index">02</span><h4>反馈节奏 · 把“解压”做出来</h4><p>让每一步操作都有回应：拖拽时顺滑跟随，归位时轻微回弹，成功时用粒子收尾。</p><small>动效设计目标：让移动、卡入与完成形成连贯的爽感。</small></div></article>
  <article class="screw-note note-focus"><div class="note-picture">${crop('0 520 1080 1190','玩法局部：中央螺杆和螺母组成的谜题区')}${arrow}<span class="note-pencil-label">留白，把视线还给谜题</span></div><div class="note-copy"><span class="note-index">03</span><h4>信息降噪 · 谜题是主角</h4><p>将螺杆与螺母集中在中央操作区，保留组与组之间的空间。工具和奖励入口沿边缘安排。</p><small>设计重点：继续控制外围按钮的视觉权重，让解题路径更清晰。</small></div></article>
  <article class="screw-note note-workshop"><div class="note-picture workshop-pictures"><img src="assets/screw-showcase/icon_historty_BenchVise.png" alt="项目工具图鉴：台钳" loading="lazy"><img src="assets/screw-showcase/icon_historty_Screwdriver.png" alt="项目工具图鉴：螺丝刀" loading="lazy">${arrow}<span class="note-pencil-label">金属高光 × 工具轮廓</span></div><div class="note-copy"><span class="note-index">04</span><h4>机械工坊 · 留下题材记忆</h4><p>螺丝、螺母与工具图鉴共同构建机械工坊。相较倒水排序，拆装结构与金属触感是更鲜明的视觉记忆点。</p><small>从玩法物件延伸到收集内容，让题材语言保持统一。</small></div></article>
  </div><footer>SCREW MASTER <span>观察 · 拆解 · 配对 · 归位</span></footer></section>`;
}
function screwCaseIntro(){
  const tools=[['icon_historty_ArchimedesScrew.png','阿基米德螺旋'],['icon_historty_BenchVise.png','台钳'],['icon_historty_BowDrill.png','弓钻'],['icon_historty_Caliper.png','卡尺'],['icon_historty_MetalLathe.png','车床'],['icon_historty_Screwdriver.png','螺丝刀'],['icon_historty_ScrewPress.png','压螺机'],['icon_historty_WoodenScrew.png','木螺钉']];
  return `<section class="case-intro"><div class="game-overview overview-without-icon"><div class="overview-copy"><img src="assets/screw-showcase/LOGO.png" alt="Screw Master 标志" class="game-logo"><p>一款以拆解、配对与收纳螺丝为核心的轻度解谜游戏。玩家需要观察结构、规划拆卸顺序，在逐步升级的关卡中完成整理挑战，并收集各式工具图鉴。</p><div class="audience-tags"><span>轻度解谜</span><span>短局解压</span><span>收集养成</span><span>休闲玩家</span></div><div class="overview-stats"><span><b>核心玩法</b>拆解螺丝</span><span><b>体验节奏</b>短局关卡</span><span><b>设计模块</b>奖励 · 图鉴</span></div></div></div><div class="showcase-heading"><span>01</span><h4>特别玩法</h4><i></i></div><article class="feature-spotlight"><div class="feature-copy"><h3>连续签到<br><em>现金奖励</em></h3><p>以高饱和奖励、现金与道具图标，强化连续登录时的领取期待与即时反馈。</p></div><img src="assets/screw-showcase/ui_Sign in_money_7.png" alt="Screw Master 连续签到奖励图标"></article><div class="showcase-heading"><span>02</span><h4>AI ICON 生成工具图鉴</h4><i></i></div><div class="tool-icon-wall">${tools.map(([file,name])=>`<figure><img src="assets/screw-showcase/${file}" alt="${name}"><figcaption>${name}</figcaption></figure>`).join('')}</div></section>`;
}
function bingoCaseIntro(){
  const rewards=[['icon_main_bbcoin.png','金币'],['icon_main_bbcash.png','现金'],['icon_main_bbchest.png','宝箱'],['icon_main_bbslot.png','幸运转盘'],['icon_main_bingowinner.png','Bingo 奖励']];
  return `<section class="bingo-case-intro"><article class="bingo-design-notes"><p class="feature-number">PROJECT OVERVIEW</p><h3>轻松连线，收获惊喜</h3><p>Ultimate Bingo 是以宾果连线为核心的休闲游戏。本项目展示了从玩法教学、主界面到奖励、活动及结算的 UI 视觉设计，以明快的色彩和夸张的奖励表现营造轻松、热闹的游戏氛围。</p><div class="audience-tags"><span>宾果连线</span><span>卡通风格</span><span>短局体验</span><span>奖励反馈</span></div><h4>目标体验与用户</h4><div class="bingo-note-grid"><div><b>碎片时间 · 轻松上手</b><p>面向通勤、等候与休息时的短局体验，让玩法入口和关键操作容易找到。</p></div><div><b>休闲玩家 · 清晰引导</b><p>通过醒目的按钮、数字和状态区分，帮助玩家理解点选、连线及结算过程。</p></div><div><b>奖励期待 · 收集乐趣</b><p>用宝箱、金币与活动入口建立清晰的奖励识别，让达成目标后的反馈更有记忆点。</p></div></div><h4>UI 配色与视觉层级</h4><div class="bingo-palette"><span style="--swatch:#2546c7">深蓝 · 背景</span><span style="--swatch:#6731b7">紫色 · 氛围</span><span style="--swatch:#ffc82f">金黄 · 奖励</span><span style="--swatch:#53c944">绿色 · 行动</span><span style="--swatch:#f568b7">粉色 · 点缀</span></div><p class="bingo-note-caption">以蓝紫色承托高饱和图标，金黄色强调奖励价值，绿色突出行动入口；通过明暗对比区分背景、内容和主要操作。</p></article><div class="bingo-reward-stage"><span class="reward-spark spark-a"></span><span class="reward-spark spark-b"></span><span class="reward-spark spark-c"></span><span class="reward-spark spark-d"></span><span class="reward-spark spark-e"></span><span class="reward-spark spark-f"></span><div class="bingo-stage-copy"><p class="feature-number">REWARD ICON SYSTEM</p><h3>奖励图标<br><em>一眼识别</em></h3><p>用明亮的体积感、清晰轮廓和高对比色彩，让金币、现金与宝箱成为每一次点击的期待。</p></div><div class="bingo-reward-icons">${rewards.map(([file,name])=>`<figure><img src="assets/bingo-showcase/${file}" alt="${name}"><figcaption>${name}</figcaption></figure>`).join('')}</div></div><div class="showcase-heading"><span>01</span><h4>Bingo 样式系统</h4><i></i></div><p class="bingo-section-note">将宾果棋盘、彩球与宝箱组合成核心视觉。弹性缩放强调奖励到达的瞬间，大小不一、错时扩散的星光补充庆祝氛围，让视线先聚焦主体，再感知周围的动态细节。</p><div class="celebration-stage bingo-style-stage" role="img" aria-label="BINGO 奖励弹出与星光扩散动效"><div class="celebration-rays"></div><div class="celebration-halo"></div><img class="celebration-art" src="assets/bingo-showcase/ui_main_logo.png" alt="BINGO 宝箱、金币和宾果棋盘">${Array.from({length:16},(_,i)=>`<span class="celebration-star" style="--angle:${i*22.5+(i%3)*7}deg;--delay:${(i%5)*.08}s;--distance:${125+(i%5)*24}px;--star-size:${[14,35,21,48,17,27,40,12,31,19,44,24,16,37,22,29][i]}px">✦</span>`).join('')}<div class="celebration-flash"></div></div><button class="celebration-replay" type="button">重播动效 ↻</button><div class="showcase-heading"><span>02</span><h4>老虎主视觉</h4><i></i></div><article class="bingo-tiger-feature"><div><p class="feature-number">CHARACTER VISUAL · 01</p><h3>好运登场<br><em>宾果开局</em></h3><p>以老虎角色建立亲切、热闹的开局氛围，同时承接宾果玩法与奖励主题。</p></div><img class="tiger-animation" src="assets/bingo-showcase/tiger-transparent.webp" alt="Ultimate Bingo 老虎动画"></article></section>`;
}
function birdCaseIntro(){
  const icons=[['icon_main_egg.png','鸟蛋'],['icon_main_goldenegg.png','金蛋'],['icon_main_prop.png','道具'],['icon_main_time.png','时间'],['icon_main_vip.png','VIP'],['icon_mian_coin.png','金币'],['icon_mian_cash.png','现金'],['icon_main_ranking.png','排名']];
  return `<section class="bird-case"><div class="showcase-heading"><span>01</span><h4>部分游戏道具展示</h4><i></i></div><div class="bird-icons">${icons.map(([file,label])=>`<figure><img src="assets/bird-showcase/icons/${file}" alt="${label}" loading="lazy"><figcaption>${label}</figcaption></figure>`).join('')}</div><div class="showcase-heading"><span>02</span><h4>小鸟家族 · 动态展示</h4><i></i></div><div class="bird-motion-controls"><button type="button" data-bird-action="idle" aria-pressed="true">动作一 · 待机</button><button type="button" data-bird-action="flight" aria-pressed="false">动作二 · 飞翔</button><button type="button" data-bird-pause>暂停动画</button></div><div class="bird-flock">${Array.from({length:10},(_,i)=>`<figure><div class="bird-sprite" data-bird="${i+1}" role="img" aria-label="小鸟 ${String(i+1).padStart(2,'0')} 待机动画"></div><figcaption data-bird-caption>小鸟 ${String(i+1).padStart(2,'0')} · 待机</figcaption></figure>`).join('')}</div></section>`;
}
let stopBirdMotion=()=>{};
function startBirdMotion(){
  stopBirdMotion();
  if(activeProject!=='bird')return;
  const sprites=[...gallery.querySelectorAll('.bird-sprite')];let action='idle',paused=matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,last=0,raf=0,ended=false;
  const pause=gallery.querySelector('[data-bird-pause]');
  const render=()=>sprites.forEach(el=>{const label=`小鸟 ${el.dataset.bird.padStart(2,'0')} · ${action==='idle'||el.dataset.bird==='9'?'待机':'飞翔'}动画`;el.setAttribute('aria-label',label);el.parentElement.querySelector('[data-bird-caption]').textContent=label.replace('动画','');const idleAction=['1','9'].includes(el.dataset.bird)?'2':'4';const sourceAction=el.dataset.bird==='9'?'2':action==='idle'?idleAction:(idleAction==='2'?'4':'2');const sequence=birdSequences.find(s=>s.id===`${el.dataset.bird}-${sourceAction}`);const n=frame%sequence.count;el.style.backgroundImage=`url('assets/bird-showcase/normalized/${sequence.id}.webp')`;el.style.backgroundSize=`1000% ${sequence.rows*100}%`;el.style.backgroundPosition=`${(n%10)/9*100}% ${sequence.rows===1?0:Math.floor(n/10)/(sequence.rows-1)*100}%`;});
  const tick=t=>{if(ended)return;if(!paused&&!document.hidden&&t-last>=1000/24){frame++;render();last=t;}raf=requestAnimationFrame(tick);};
  gallery.querySelectorAll('[data-bird-action]').forEach(button=>button.addEventListener('click',()=>{action=button.dataset.birdAction;frame=0;gallery.querySelectorAll('[data-bird-action]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
  pause.textContent=paused?'播放动画':'暂停动画';pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'播放动画':'暂停动画';});render();raf=requestAnimationFrame(tick);stopBirdMotion=()=>{ended=true;cancelAnimationFrame(raf);};
}
new MutationObserver(()=>{if(modal.classList.contains('open'))startBirdMotion();else stopBirdMotion();}).observe(modal,{attributes:true,attributeFilter:['aria-hidden']});
function crystalCaseIntro(){
  const symbols=[[2,'蓝色宝石'],[3,'深蓝宝石'],[4,'绿色梅花'],[7,'紫色爱心'],[9,'红色黑桃'],[1,'A'],[6,'K'],[8,'Q'],[5,'J'],[0,'10']];
  const specials=[[27,'Scatter · 神灯',28],[29,'Wild · 红宝石',30],[19,'Free Spin · 飞毯',21],[22,'Grand · 卷轴',23],[14,'Bonus · 魔法书',null]];
  const rewards=[[31,'宝箱'],[32,'开启宝箱'],['key-hd','钥匙'],[34,'存钱罐'],['coins-hd','金币'],['cash-hd','现金']];
  const cards=items=>items.map(([id,label])=>`<figure><button class="image-preview-trigger" type="button" aria-label="放大查看${label}"><img src="assets/crystal-showcase/asset-${id}.png" alt="${label}" loading="lazy"></button><figcaption>${label}</figcaption></figure>`).join('');
  return `<section class="crystal-case"><div class="showcase-heading"><span>01</span><h4>旗子图案 · 宝石与花色</h4><i></i></div><div class="crystal-symbols">${cards(symbols)}</div><div class="crystal-specials">${specials.map(([id,label,overlay])=>`<figure><div class="crystal-special-art"><button class="image-preview-trigger" type="button" aria-label="放大查看${label}"><img src="assets/crystal-showcase/asset-${id}.png" alt="${label}" loading="lazy"></button>${overlay===null?'':`<img class="crystal-symbol-title" src="assets/crystal-showcase/asset-${overlay}.png" alt="" loading="lazy">`}</div><figcaption>${label}</figcaption></figure>`).join('')}</div><div class="showcase-heading"><span>02</span><h4>奖励与道具图标</h4><i></i></div><div class="crystal-rewards">${cards(rewards)}</div><div class="showcase-heading"><span>03</span><h4>阿拉丁神灯 · 动态展示</h4><i></i></div><article class="crystal-genie-feature"><div class="crystal-genie-copy"><p class="feature-number">ARABIAN FANTASY</p><h3>神灯奇遇<br><em>绮丽秘境</em></h3><p>踏入阿拉伯神话的绮丽秘境，神灯浮于云霞之上，穹顶城池浸在紫粉暮光里。</p><p>整体画面鎏金铺陈、璀璨华贵，以梦幻柔和的渐变色调，搭配繁复精致的金边纹样，打造金碧辉煌的异域幻想氛围。</p><p>灵趣的灯神、宝石与神灯符号点缀转轮，光影通透绚烂，每一处细节都包裹着神秘浪漫的童话质感，开启一场满载惊喜的寻宝奇遇。</p></div><div class="crystal-genie-media"><video class="crystal-genie-video" autoplay muted loop playsinline preload="metadata" aria-label="阿拉丁神灯动画"><source src="assets/crystal-showcase/aladdin-animation.mp4" type="video/mp4">你的浏览器不支持视频播放。</video></div><button type="button" class="genie-motion-toggle" aria-label="播放或暂停神灯动画">暂停动画</button></article></section>`;
}
const projectKeywords={
 screw:['休闲益智','螺母配对','机械质感','收集养成'],
 bingo:['宾果连线','卡通角色','短局体验','奖励反馈'],
 bird:['合成进阶','小鸟收集','自然主题','竞技挑战'],
 crystal:['阿拉伯幻想','宝石花色','鎏金质感','奖励反馈'],
 eliminate:['轻松消除','缤纷气球','道具策略','任务奖励'],
 puzzletaire:['纸牌解谜','风景拼图','每日挑战','成就收集'],
 tribes:['部落主题','石牌配对','自然材质','道具策略']
};
function puzzletaireIconShowcase(){
 const group=(title,caption,items)=>`<section class="gallery-section project-icon-section puzzle-icon-section"><div class="showcase-heading"><span>ICON</span><h4>${title}</h4><i></i></div><p class="icon-group-caption">${caption}</p><div class="project-icon-grid">${items.map(([file,label])=>`<figure><button type="button" class="image-preview-trigger" aria-label="放大查看 ${label}"><img src="assets/puzzletaire-showcase/${file}.png" alt="${label}" loading="lazy"></button><figcaption>${label}</figcaption></figure>`).join('')}</div></section>`;
 return group('主界面入口','用直观的日历、领奖台和拼图，区分每日挑战、排行与场景收集。',[
 ['icon_main_daily','日历 · 每日挑战'],['icon_main_leaderboard','排行榜入口'],['icon_main_puzzle','风景拼图入口']])
 +group('等级徽章','从银色到虹彩，以材质、颜色和轮廓层次表现进阶。',[
 ['icon_Badge_intermediate','进阶徽章'],['icon_Badge_skilled','熟练徽章'],['icon_Badge_expert','专家徽章'],['icon_Badge_master','大师徽章'],['icon_Badge_grandmaster','宗师徽章'],['icon_Badge_legend','传奇徽章']])
 +`<details class="novice-badge-extra"><summary>查看新手徽章</summary><img src="assets/puzzletaire-showcase/icon_Badge_novice.png" alt="新手徽章" loading="lazy"></details>`
 +group('挑战奖杯','统一金色质感，通过宝石、星形和冠饰形成不同的成就记忆点。',Array.from({length:6},(_,i)=>[`gold-trophy-${i+1}`,`成就奖杯 · 0${i+1}`]));
}
function eliminateIconShowcase(){
 const group=(title,items)=>`<section class="gallery-section project-icon-section eliminate-icon-section"><div class="showcase-heading"><span>ICON</span><h4>${title}</h4><i></i></div><div class="project-icon-grid">${items.map(([file,label])=>`<figure><button class="image-preview-trigger" type="button" aria-label="放大查看${label}"><img src="assets/eliminate-showcase/${file}.png" alt="${label}" loading="lazy"></button><figcaption>${label}</figcaption></figure>`).join('')}</div></section>`;
 return group('玩法道具 · 独立图标',[['reward-exchange','交换道具'],['reward-brush','刷子道具'],['reward-hammer','锤子道具']])
 +group('卡券与纸币',[['reward-ticket','转盘卡券'],['reward-cash','纸币奖励'],['reward-gold-card','金色奖励卡']])
 +group('手绘风格 · 功能图标',[['reward-brush-multi','多重刷子'],['reward-hammer-multi','连击锤'],['reward-exchange','交换道具']]);
}

function renderSection(section,p,key){
  if(key==='tribes')return tribesShowcase().replace('</section>',`</section>${renderProjectDesignNotes(key)}`);
  if(section.title==='效果图'){
    const screens=section.items.slice(1);
    const intro=key==='screw'?screwCaseIntro():key==='bingo'?bingoCaseIntro():key==='bird'?birdCaseIntro():key==='crystal'?crystalCaseIntro():key==='puzzletaire'?puzzletaireIconShowcase():key==='eliminate'?eliminateIconShowcase():'';
    const showcaseTags=`<div class="showcase-meta">${projectKeywords[key].map(tag=>`<span>${tag}</span>`).join('')}</div>`;
    const brand=`<div class="showcase-brand ${key==='crystal'?'crystal-brand':''}" style="--project-cover:url('assets/icons/${projectIcons[key]}')"><div class="showcase-brand-copy"><span class="showcase-kicker">GAME UI SHOWCASE</span>${key==='crystal'?'':`<h3>${p.title}</h3>`}<p>${p.type}</p>${showcaseTags}<p class="project-cover-description">${p.description}</p></div><img src="assets/icons/${projectIcons[key]}" alt="${p.title} 图标" class="showcase-icon"><span class="spark spark-one">✦</span><span class="spark spark-two">✦</span></div>`;
    const interfaceContent=`<div class="showcase-heading"><span>${key==='crystal'?'04':'03'}</span><h4>界面展示</h4><i></i></div><div class="interface-grid">${screens.map((item,i)=>renderScreen(item,p,'界面展示',i,'interface')).join('')}</div>`;
    const landingPage=key==='screw'?`<section class="gallery-section landing-page-showcase"><div class="showcase-heading"><span>04</span><h4>官网落地页</h4><i></i></div><figure><button type="button" class="image-preview-trigger" aria-label="放大查看官网落地页"><img src="assets/screw-showcase/website-landing.png" alt="Screw Master 官网落地页" loading="lazy"></button></figure></section>`:'';
    return `<section class="gallery-section showcase-section bingo-brand-first">${brand}</section>${key==='screw'?screwDesignNotes():renderProjectDesignNotes(key)}${intro}<section class="gallery-section showcase-section">${interfaceContent}</section>${key==='bingo'?`<figure class="bingo-chapter-transition"><img src="assets/bingo-showcase/chapter-transition.png" alt="Bingo 老虎主题过渡插画" loading="lazy"></figure>`:''}${landingPage}`;
  }
  if(key==='bingo'&&section.title==='延伸玩法'){
    const icon=section.items[0],screens=section.items.slice(1);
    return `<section class="gallery-section extra-game-showcase"><div class="showcase-heading"><span>04</span><h4>延伸玩法</h4><i></i></div><div class="showcase-brand" style="--project-cover:url('assets/portfolio/${icon.folder}/${encodeURIComponent(icon.name)}')"><div class="showcase-brand-copy"><span class="showcase-kicker">GAME ICON</span><h3>Forest Bingo</h3><p>延伸玩法 · GAME UI</p></div><img class="showcase-icon" src="assets/portfolio/${icon.folder}/${encodeURIComponent(icon.name)}" alt="Forest Bingo App Icon"><span class="spark spark-one">✦</span><span class="spark spark-two">✦</span></div><div class="standard-grid">${screens.map((item,i)=>renderScreen(item,p,'延伸玩法',i,'standard')).join('')}</div></section>`;
  }
  if(section.title==='录屏')return `<section class="gallery-section media-section"><div class="showcase-heading"><span>03</span><h4>录屏展示</h4><i></i></div>${section.items.map((item,i)=>renderScreen(item,p,'录屏展示',i)).join('')}</section>`;
  return `<section class="gallery-section"><div class="showcase-heading"><span>02</span><h4>${section.title}</h4><i></i></div><div class="standard-grid">${section.items.map((item,i)=>renderScreen(item,p,section.title,i,'standard')).join('')}</div></section>`;
}
function openProject(key){activeProject=key;const p=projects[key],title=document.querySelector('#modal-title');title.textContent=p.title;title.hidden=key==='bingo';document.querySelector('#modal-kicker').textContent=p.type;document.querySelector('#modal-description').textContent=p.description;gallery.innerHTML=deferredProjectMarkup(p.sections.map(section=>renderSection(section,p,key)).join('')+(key==='bingo'?bingoGiftFinale():''));modal.classList.add('open');modal.setAttribute('aria-hidden','false');prepareProjectImages();initCelebration();initGiftFinale();document.body.style.overflow='hidden';document.querySelector('.modal-panel').scrollTop=0;document.querySelector('.modal-close').focus()}
function closeModal(){stopProjectImages();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}document.querySelectorAll('.project-card').forEach(card=>card.addEventListener('click',()=>openProject(card.dataset.project)));document.querySelector('.modal-close').addEventListener('click',closeModal);document.querySelector('.modal-backdrop').addEventListener('click',closeModal);document.querySelector('.modal-next').addEventListener('click',()=>{const keys=['bingo','screw','bird','crystal','eliminate','puzzletaire','tribes'],i=keys.indexOf(activeProject);openProject(keys[(i+1)%keys.length])});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});

// Full-size artwork preview above the project dialog.
const imagePreview=document.createElement('dialog');
imagePreview.className='image-preview';
imagePreview.setAttribute('aria-label','图片大图预览');
imagePreview.innerHTML='<div class="image-preview-toolbar"><span class="image-preview-title"></span><button type="button" class="image-preview-zoom" aria-pressed="false">原图大小</button><button type="button" class="image-preview-close" aria-label="关闭大图">×</button></div><div class="image-preview-stage"><img alt=""></div>';
document.body.append(imagePreview);
const previewImage=imagePreview.querySelector('img'),previewStage=imagePreview.querySelector('.image-preview-stage'),previewZoom=imagePreview.querySelector('.image-preview-zoom');
let previewTrigger=null;
function closeImagePreview(){imagePreview.close();imagePreview.classList.remove('original-size');if(previewTrigger?.isConnected)previewTrigger.focus({preventScroll:true});}
gallery.addEventListener('click',event=>{
 const trigger=event.target.closest('.image-preview-trigger');if(!trigger)return;
 previewTrigger=trigger;const source=trigger.querySelector('img');
 previewImage.src=source.dataset.fullSrc||source.currentSrc||source.src;previewImage.alt=source.alt;
 imagePreview.querySelector('.image-preview-title').textContent=source.alt;
 imagePreview.classList.remove('original-size');previewZoom.textContent='原图大小';previewZoom.setAttribute('aria-pressed','false');
 imagePreview.showModal();previewStage.scrollTo(0,0);imagePreview.querySelector('.image-preview-close').focus();
});
imagePreview.querySelector('.image-preview-close').addEventListener('click',closeImagePreview);
imagePreview.addEventListener('click',event=>{if(event.target===imagePreview||event.target===previewStage)closeImagePreview();});
imagePreview.addEventListener('cancel',event=>{event.preventDefault();closeImagePreview();});
imagePreview.addEventListener('keydown',event=>{if(event.key==='Escape')event.stopPropagation();});
previewZoom.addEventListener('click',()=>{const original=imagePreview.classList.toggle('original-size');previewZoom.textContent=original?'适应窗口':'原图大小';previewZoom.setAttribute('aria-pressed',String(original));previewStage.scrollTo(0,0);});

// Stop the character video when leaving the project; respect reduced motion.
new MutationObserver(()=>{
  const video=gallery.querySelector('.crystal-genie-video');
  if(!video)return;
  if(!modal.classList.contains('open')||matchMedia('(prefers-reduced-motion: reduce)').matches)video.pause();
  else video.play().catch(()=>{});
}).observe(modal,{attributes:true,attributeFilter:['aria-hidden']});

gallery.addEventListener('click',event=>{
 const toggle=event.target.closest('.genie-motion-toggle');if(!toggle)return;
 const video=gallery.querySelector('.crystal-genie-video');
 if(video.paused)video.play().catch(()=>{});else video.pause();
});
for(const eventName of ['play','pause'])gallery.addEventListener(eventName,event=>{
 if(!event.target.matches('.crystal-genie-video'))return;
 const toggle=gallery.querySelector('.genie-motion-toggle');if(toggle)toggle.textContent=event.target.paused?'播放动画':'暂停动画';
},true);

// A small glass highlight follows the pointer over each project folder.
document.querySelectorAll('.project-card.icon-card').forEach(card=>{
 const glow=document.createElement('span');glow.className='folder-pointer-glow';glow.setAttribute('aria-hidden','true');card.append(glow);
 card.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch')return;
  const bounds=card.getBoundingClientRect();
  glow.style.left=`${event.clientX-bounds.left}px`;glow.style.top=`${event.clientY-bounds.top}px`;
  card.classList.add('pointer-lit');
 });
 const hide=()=>card.classList.remove('pointer-lit');
 card.addEventListener('pointerleave',hide);card.addEventListener('pointercancel',hide);card.addEventListener('click',hide);
});




const heroCover=document.querySelector('.hero-cover'),coverVideo=heroCover.querySelector('video'),heroFrame=document.querySelector('.hero-frame');
coverVideo.loop=true;
let coverHovered=false,coverPlayPending=false;
function updateCoverMotion(){
 heroCover.style.opacity='1';
 const active=coverHovered&&scrollProgress<.12&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!active){coverVideo.pause();heroCover.classList.remove('playing');return;}
 if(coverVideo.paused&&!coverPlayPending){loadInteractionVideo(coverVideo);coverPlayPending=true;coverVideo.play().catch(()=>heroCover.classList.remove('playing')).finally(()=>{coverPlayPending=false;});}
}
coverVideo.addEventListener('playing',()=>{if(coverHovered&&scrollProgress<.12&&!document.hidden)heroCover.classList.add('playing');else coverVideo.pause();});
function enterCover(event){if(event.pointerType==='touch')return;if(!coverHovered)coverVideo.currentTime=0;coverHovered=true;updateCoverMotion();}
heroFrame.addEventListener('pointerenter',enterCover);
heroFrame.addEventListener('pointermove',enterCover);
heroFrame.addEventListener('pointerleave',()=>{coverHovered=false;updateCoverMotion();});
heroFrame.addEventListener('pointercancel',()=>{coverHovered=false;updateCoverMotion();});
document.addEventListener('visibilitychange',updateCoverMotion);
coverVideo.addEventListener('error',()=>heroCover.classList.remove('playing'));

// Embedded arcade motion starts only on pointer interaction.
const arcadeScene = document.querySelector('.arcade-hover-section');
if (arcadeScene) {
  const motion = arcadeScene.querySelector('.arcade-motion');
  let hovered = false;
  let finishTimer = 0;
  const stopMotion = () => {
    hovered = false;
    clearTimeout(finishTimer);
    arcadeScene.classList.remove("motion-finishing");
    motion.pause();
    arcadeScene.classList.remove('motion-playing');
  };
  arcadeScene.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    hovered = true;
    loadInteractionVideo(motion);
    motion.currentTime = 0;
    motion.play().catch(stopMotion);
  });
  motion.addEventListener('playing', () => {
    if (hovered && !document.hidden) arcadeScene.classList.add('motion-playing');
    else stopMotion();
  });
  arcadeScene.addEventListener('pointerleave', stopMotion);
  arcadeScene.addEventListener('pointercancel', stopMotion);
  motion.addEventListener('ended', async () => {
    if (!hovered || document.hidden) return;
    const destination = document.querySelector('.work-orbit');
    if (!destination) return;
    const veil = document.createElement('div');
    veil.className = 'scene-blackout';
    veil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(veil);
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
    try {
      await veil.animate([{opacity:0},{opacity:1}], {duration,fill:'forwards',easing:'ease-out'}).finished;
      if (!document.hidden) {
        destination.scrollIntoView({behavior:'instant',block:'start'});
        stopMotion();
      }
      await veil.animate([{opacity:1},{opacity:0}], {duration:duration || 1,fill:'forwards',easing:'ease-in'}).finished;
    } finally { veil.remove(); }
  });
  motion.addEventListener('error', stopMotion);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) stopMotion();
  }).observe(arcadeScene);
}

// Editorial scroll reveals inspired by the supplied motion reference.
const editorialTargets = document.querySelectorAll('.section-head, .about-title, .about-details, .footer-bottom');
if ('IntersectionObserver' in window) {
  const editorialObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('editorial-visible');
        editorialObserver.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin: '0px 0px -4% 0px'});
  editorialTargets.forEach((element, index) => {
    element.classList.add('editorial-reveal');
    element.style.setProperty('--reveal-delay', `${index % 2 * 90}ms`);
    editorialObserver.observe(element);
  });
}

// Frame-rate-independent cylinder motion with damped pointer parallax.
(() => {
 const section=document.querySelector('.work-orbit'); if(!section)return;
 const ring=section.querySelector('.orbit-ring');
 const bingoCard=ring.querySelector('[data-key="bingo"]'),screwCard=ring.querySelector('[data-key="screw"]');
 if(bingoCard&&screwCard){
   ring.insertBefore(bingoCard,screwCard);
   [[bingoCard,'01'],[screwCard,'02']].forEach(([card,no])=>{
     card.querySelector('.orbit-folder-tab').textContent=`PROJECT / ${no}`;
     card.querySelector('.orbit-back small').textContent=`GAME ART / ${no}`;
     card.querySelector('.orbit-caption small').textContent=`${no} / SELECTED WORK`;
   });
 }
 const stage=section.querySelector('.orbit-stage'), cards=[...section.querySelectorAll('.orbit-card')];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let angle=0,target=0,tx=0,ty=0,x=0,y=0,last=0,frame=0,visible=false,hover=false,drag=null,moved=false,paused=reduce.matches,width=300,radius=460;
 const pause=section.querySelector('.orbit-pause');
 function resize(){width=Math.min(300,Math.max(170,stage.clientWidth*.27));radius=Math.max(width*1.25,Math.min(480,stage.clientWidth*.42));stage.style.setProperty('--orbit-w',width+'px');draw();}
 function draw(){cards.forEach((card,i)=>{const a=angle+i*Math.PI*2/cards.length,c=Math.cos(a);card.style.transform=`translate(-50%,-50%) translate3d(${Math.sin(a)*radius}px,${y*6}px,${(c-1)*radius}px) rotateY(${a*180/Math.PI+x*5}deg) rotateX(${-y*4}deg)`;card.style.setProperty("--card-light",.45+.55*Math.max(0,c));card.style.zIndex=String(Math.round((c+1)*100));});}
 function tick(t){frame=0;if(!visible||document.hidden)return;const dt=Math.min((t-(last||t))/1000,.05);last=t;if(!paused&&!hover&&!drag&&!reduce.matches&&!modal.classList.contains('open'))target-=dt*.16;const damp=reduce.matches?1:1-Math.exp(-dt*9);angle+=(target-angle)*damp;x+=(tx-x)*damp;y+=(ty-y)*damp;draw();frame=requestAnimationFrame(tick);}
 function start(){if(!frame&&visible&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'100px'}).observe(section);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();});
 stage.addEventListener('pointerenter',()=>{hover=true;target=angle;});
 stage.addEventListener('pointerleave',()=>{hover=false;tx=ty=0;});
 stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,angle:angle,id:e.pointerId};target=angle;moved=false;});
 stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;if(drag){const distance=e.clientX-drag.x;if(Math.abs(distance)>12){moved=true;if(!stage.hasPointerCapture(e.pointerId))stage.setPointerCapture(e.pointerId);}if(moved)target=drag.angle+distance*.006;}});
 const finish=e=>{if(stage.hasPointerCapture(e.pointerId))stage.releasePointerCapture(e.pointerId);drag=null;};stage.addEventListener('pointerup',finish);stage.addEventListener('pointercancel',finish);stage.addEventListener('lostpointercapture',()=>{drag=null;});window.addEventListener('pointerup',()=>{drag=null;});
 cards.forEach(card=>card.addEventListener('click',event=>{if(event.detail===0||!moved)openProject(card.dataset.key);moved=false;}));
 function step(direction){target+=direction*Math.PI*2/cards.length;}
 section.querySelector('.orbit-prev').addEventListener('click',()=>step(1));section.querySelector('.orbit-next').addEventListener('click',()=>step(-1));
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?1:-1);}});
 function label(){pause.textContent=paused?'播放':'暂停';pause.setAttribute('aria-label',paused?'开启自动旋转':'暂停自动旋转');}pause.addEventListener('click',()=>{paused=!paused;label();});
 reduce.addEventListener('change',()=>{paused=reduce.matches;label();});
 window.addEventListener('resize',resize);label();resize();
})();

// Soft pointer light throughout project details, including expanded images.
(() => {
 const surfaces=[document.querySelector('.modal'),document.querySelector('.image-preview')].filter(Boolean);
 surfaces.forEach(surface=>{
   const glow=document.createElement('div');glow.className='detail-pointer-glow';glow.setAttribute('aria-hidden','true');surface.appendChild(glow);
   const hide=()=>glow.classList.remove('visible');
   surface.addEventListener('pointermove',event=>{
     if(event.pointerType==='touch'){hide();return;}
     glow.style.left=event.clientX+'px';glow.style.top=event.clientY+'px';glow.classList.add('visible');
   },{passive:true});
   surface.addEventListener('pointerleave',hide);surface.addEventListener('pointercancel',hide);
   new MutationObserver(()=>{if(surface.matches('.modal:not(.open),dialog:not([open])'))hide();}).observe(surface,{attributes:true,attributeFilter:['class','open']});
 });
})();

let celebrationObserver;
function initCelebration(){
 if(celebrationObserver)celebrationObserver.disconnect();
 const stage=gallery.querySelector('.celebration-stage');if(!stage)return;
 const replay=()=>{stage.classList.remove('celebrating');requestAnimationFrame(()=>requestAnimationFrame(()=>{if(stage.isConnected)stage.classList.add('celebrating');}));};
 gallery.querySelector('.celebration-replay').addEventListener('click',replay);
 celebrationObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){replay();celebrationObserver.disconnect();}},{threshold:.25});
 celebrationObserver.observe(stage);
}

function bingoGiftFinale(){
 const items=[['icon_main_bbcoin.png','金币'],['ui_bingo_double.png','双倍道具'],['ui_bingo_dtriple.png','三倍道具'],['icon_main_bbcash.png','现金']];
 return `<section class="gift-finale"><div class="showcase-heading"><span>05</span><h4>惊喜奖励 · 动态展示</h4><i></i></div><div class="gift-scene"><h3>惊喜，开启！</h3><p>收获属于你的 Bingo 奖励</p><div class="gift-bloom"></div><img class="gift-chest" src="assets/bingo-showcase/icon_main_bbchest.png" alt="Bingo 奖励宝箱"><div class="gift-loot">${items.map(([file,name],i)=>`<div class="gift-item" style="--order:${i}"><img src="assets/bingo-showcase/${file}" alt="${name}"><span>${name}</span></div>`).join('')}</div><button class="gift-replay" type="button">开启奖励 ↻</button></div></section>`;
}
let giftObserver;
function initGiftFinale(){
 if(giftObserver)giftObserver.disconnect();
 const scene=gallery.querySelector('.gift-scene');if(!scene)return;
 const play=()=>{scene.classList.remove('gift-playing');requestAnimationFrame(()=>requestAnimationFrame(()=>{if(scene.isConnected)scene.classList.add('gift-playing');}));};
 scene.querySelector('.gift-replay').addEventListener('click',play);
 giftObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){play();giftObserver.disconnect();}},{threshold:.3});giftObserver.observe(scene);
}

function tribesShowcase(){
 const root='assets/tribes-showcase/';
 const image=(file,label)=>`<figure><button class="image-preview-trigger" type="button" aria-label="放大查看${label}"><img src="${root+file}" alt="${label}" loading="lazy"></button><figcaption>${label}</figcaption></figure>`;
 const group=(n,title,items,kind='tribes-assets')=>`<section class="gallery-section"><div class="showcase-heading"><span>${n}</span><h4>${title}</h4><i></i></div><div class="${kind}">${items.map(([file,label])=>image(file,label)).join('')}</div></section>`;
 return `<section class="gallery-section"><div class="tribes-hero"><img src="${root}appicon.png" alt="Tribes Match Battle 项目图标"><div><p class="feature-number">PROJECT / 07</p><h3>Tribes<br>Match Battle</h3><p>以部落角色和自然场景建立轻松、亲切的视觉印象，围绕道具识别与清晰的操作反馈展开设计。</p><div class="audience-tags"><span>部落主题</span><span>卡通角色</span><span>游戏 UI</span></div></div></div></section>`
 +group('01','品牌与场景',[['loading/ui_loading_logo.png','游戏标志'],['loading/ui_loading_bg.png','加载场景'],['主界面/ui_main_bg.png','主界面背景'],['关卡/ui_level_bg1.png','关卡背景 · 01'],['关卡/ui_level_bg2.png','关卡背景 · 02']],'tribes-scenes')
 +group('02','道具与奖励图标',[['通用/icon_general_againHD.png','道具 · 再次行动'],['通用/icon_general_cleanHD.png','道具 · 清除'],['通用/icon_general_tetrunHD.png','道具 · 返回'],['主界面/icon_main_atlas.png','图鉴入口'],['主界面/icon_main_store.png','商店入口'],['主界面/icon_main_task.png','任务入口'],['通用/icon_general_coin1.png','金币'],['通用/icon_general_cash1.png','现金'],['商店/icon_store_coin3.png','金币奖励']])
 +`<section class="gallery-section"><div class="showcase-heading"><span>03</span><h4>主题图标 · 单独展示</h4><i></i></div><div class="tribes-symbol-grid">${['爪印石牌','肉块','部落面具','石锤','石像','箭靶','鱼纹石牌','金蛋','奖杯','号角','羽饰','宝石手套','花朵图腾','神秘符石','木制图腾','金色徽章','任务清单','红色卡牌','绿色卡牌'].map((name,i)=>`<figure><span class="tribes-symbol" role="img" aria-label="${name}" style="background-position:-${8+(i%5)*100}px -${[4,120,234,348][Math.floor(i/5)]}px"></span><figcaption>${name}</figcaption></figure>`).join('')}</div></section>`
 +group('04','界面面板与组件',[['任务/ui_task_viewbg1.png','任务面板'],['商店/ui_store_viewbg.png','商店面板'],['图鉴/ui_codex_viewbg.png','图鉴面板'],['图鉴/ui_codex_card1.png','图鉴卡片'],['通用/ui_general_viewbg1.png','通用弹窗'],['通用/btn_general_blue.png','蓝色按钮'],['通用/btn_general_green.png','绿色按钮'],['通用/btn_general_yellow.png','黄色按钮']])
 +`<section class="gallery-section"><div class="showcase-heading"><span>05</span><h4>界面效果图</h4><i></i></div><div class="interface-grid">${media('tribes',["loading界面.png", "主界面.png", "主界面-拷贝.png", "新手引导.png", "关卡过场.png", "购买道具.png", "购买格子.png", "重玩.png", "胜利.png", "失败1.png", "失败2.png", "失败3.png", "失败4.png", "任务.png", "任务奖励.png", "消除累积奖励.png", "图鉴.png", "商店1.png", "商店2.png", "商店3.png", "设置.png", "好评.png", "提现1.png", "提现2.png", "翻倍提现.png", "提现卡页.png", "验证码.png"]).map((item,i)=>renderScreen(item,projects.tribes,item.name.replace('.png',''),i,'interface')).join('')}</div></section>`;
}
