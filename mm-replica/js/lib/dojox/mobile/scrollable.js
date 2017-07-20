//>>built
define("dojox/mobile/scrollable",["dojo/_base/kernel","dojo/_base/connect","dojo/_base/event","dojo/_base/lang","dojo/_base/window","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dojo/touch","dijit/registry","dijit/form/_TextBoxMixin","./sniff","./_css3","./_maskUtils"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){
var dm=_4.getObject("dojox.mobile",true);
_d.add("translate3d",function(){
if(_d("css3-animations")){
var _10=_5.doc.createElement("div");
_10.style[_e.name("transform")]="translate3d(0px,1px,0px)";
_5.doc.documentElement.appendChild(_10);
var v=_5.doc.defaultView.getComputedStyle(_10,"")[_e.name("transform",true)];
var _11=v&&v.indexOf("matrix")===0;
_5.doc.documentElement.removeChild(_10);
return _11;
}
});
var _12=function(){
};
_4.extend(_12,{fixedHeaderHeight:0,fixedFooterHeight:0,isLocalFooter:false,scrollBar:true,scrollDir:"v",weight:0.6,fadeScrollBar:true,disableFlashScrollBar:false,threshold:4,constraint:true,touchNode:null,propagatable:true,dirLock:false,height:"",scrollType:0,_parentPadBorderExtentsBottom:0,_moved:false,init:function(_13){
if(_13){
for(var p in _13){
if(_13.hasOwnProperty(p)){
this[p]=((p=="domNode"||p=="containerNode")&&typeof _13[p]=="string")?_5.doc.getElementById(_13[p]):_13[p];
}
}
}
if(typeof this.domNode.style.msTouchAction!="undefined"){
this.domNode.style.msTouchAction="none";
}
this.touchNode=this.touchNode||this.containerNode;
this._v=(this.scrollDir.indexOf("v")!=-1);
this._h=(this.scrollDir.indexOf("h")!=-1);
this._f=(this.scrollDir=="f");
this._ch=[];
this._ch.push(_2.connect(this.touchNode,_a.press,this,"onTouchStart"));
if(_d("css3-animations")){
this._useTopLeft=this.scrollType?this.scrollType===2:false;
if(!this._useTopLeft){
this._useTransformTransition=this.scrollType?this.scrollType===3:_d("ios")>=6||_d("android")||_d("bb");
}
if(!this._useTopLeft){
if(this._useTransformTransition){
this._ch.push(_2.connect(this.containerNode,_e.name("transitionEnd"),this,"onFlickAnimationEnd"));
}else{
this._ch.push(_2.connect(this.containerNode,_e.name("animationEnd"),this,"onFlickAnimationEnd"));
this._ch.push(_2.connect(this.containerNode,_e.name("animationStart"),this,"onFlickAnimationStart"));
for(var i=0;i<3;i++){
this.setKeyframes(null,null,i);
}
}
if(_d("translate3d")){
_8.set(this.containerNode,_e.name("transform"),"translate3d(0,0,0)");
}
}else{
this._ch.push(_2.connect(this.containerNode,_e.name("transitionEnd"),this,"onFlickAnimationEnd"));
}
}
this._speed={x:0,y:0};
this._appFooterHeight=0;
if(this.isTopLevel()&&!this.noResize){
this.resize();
}
var _14=this;
setTimeout(function(){
_14.flashScrollBar();
},600);
if(_5.global.addEventListener){
this._onScroll=function(e){
if(!_14.domNode||_14.domNode.style.display==="none"){
return;
}
var _15=_14.domNode.scrollTop;
var _16=_14.domNode.scrollLeft;
var pos;
if(_15>0||_16>0){
pos=_14.getPos();
_14.domNode.scrollLeft=0;
_14.domNode.scrollTop=0;
_14.scrollTo({x:pos.x-_16,y:pos.y-_15});
}
};
_5.global.addEventListener("scroll",this._onScroll,true);
}
if(!this.disableTouchScroll&&this.domNode.addEventListener){
this._onFocusScroll=function(e){
if(!_14.domNode||_14.domNode.style.display==="none"){
return;
}
var _17=_5.doc.activeElement;
var _18,_19;
if(_17){
_18=_17.getBoundingClientRect();
_19=_14.domNode.getBoundingClientRect();
if(_18.height<_14.getDim().d.h){
if(_18.top<(_19.top+_14.fixedHeaderHeight)){
_14.scrollIntoView(_17,true);
}else{
if((_18.top+_18.height)>(_19.top+_19.height-_14.fixedFooterHeight)){
_14.scrollIntoView(_17,false);
}
}
}
}
};
this.domNode.addEventListener("focus",this._onFocusScroll,true);
}
},isTopLevel:function(){
return true;
},cleanup:function(){
if(this._ch){
for(var i=0;i<this._ch.length;i++){
_2.disconnect(this._ch[i]);
}
this._ch=null;
}
if(this._onScroll&&_5.global.removeEventListener){
_5.global.removeEventListener("scroll",this._onScroll,true);
this._onScroll=null;
}
if(this._onFocusScroll&&this.domNode.removeEventListener){
this.domNode.removeEventListener("focus",this._onFocusScroll,true);
this._onFocusScroll=null;
}
},findDisp:function(_1a){
if(!_1a.parentNode){
return null;
}
if(_1a.nodeType===1&&_6.contains(_1a,"mblSwapView")&&_1a.style.display!=="none"){
return _1a;
}
var _1b=_1a.parentNode.childNodes;
for(var i=0;i<_1b.length;i++){
var n=_1b[i];
if(n.nodeType===1&&_6.contains(n,"mblView")&&n.style.display!=="none"){
return n;
}
}
return _1a;
},getScreenSize:function(){
return {h:_5.global.innerHeight||_5.doc.documentElement.clientHeight||_5.doc.documentElement.offsetHeight,w:_5.global.innerWidth||_5.doc.documentElement.clientWidth||_5.doc.documentElement.offsetWidth};
},resize:function(e){
this._appFooterHeight=(this._fixedAppFooter)?this._fixedAppFooter.offsetHeight:0;
if(this.isLocalHeader){
this.containerNode.style.marginTop=this.fixedHeaderHeight+"px";
}
var top=0;
for(var n=this.domNode;n&&n.tagName!="BODY";n=n.offsetParent){
n=this.findDisp(n);
if(!n){
break;
}
top+=n.offsetTop+_9.getBorderExtents(n).h;
}
var h,_1c=this.getScreenSize().h,dh=_1c-top-this._appFooterHeight;
if(this.height==="inherit"){
if(this.domNode.offsetParent){
h=_9.getContentBox(this.domNode.offsetParent).h-_9.getBorderExtents(this.domNode).h+"px";
}
}else{
if(this.height==="auto"){
var _1d=this.domNode.offsetParent;
if(_1d){
this.domNode.style.height="0px";
var _1e=_1d.getBoundingClientRect(),_1f=this.domNode.getBoundingClientRect(),_20=_1e.bottom-this._appFooterHeight-this._parentPadBorderExtentsBottom;
if(_1f.bottom>=_20){
dh=_1c-(_1f.top-_1e.top)-this._appFooterHeight-this._parentPadBorderExtentsBottom;
}else{
dh=_20-_1f.bottom;
}
}
var _21=Math.max(this.domNode.scrollHeight,this.containerNode.scrollHeight);
h=(_21?Math.min(_21,dh):dh)+"px";
}else{
if(this.height){
h=this.height;
}
}
}
if(!h){
h=dh+"px";
}
if(h.charAt(0)!=="-"&&h!=="default"){
this.domNode.style.height=h;
}
if(!this._conn){
this.onTouchEnd();
}
},onFlickAnimationStart:function(e){
if(e){
_3.stop(e);
}
},onFlickAnimationEnd:function(e){
if(_d("ios")){
this._keepInputCaretInActiveElement();
}
if(e){
var an=e.animationName;
if(an&&an.indexOf("scrollableViewScroll2")===-1){
if(an.indexOf("scrollableViewScroll0")!==-1){
if(this._scrollBarNodeV){
_6.remove(this._scrollBarNodeV,"mblScrollableScrollTo0");
}
}else{
if(an.indexOf("scrollableViewScroll1")!==-1){
if(this._scrollBarNodeH){
_6.remove(this._scrollBarNodeH,"mblScrollableScrollTo1");
}
}else{
if(this._scrollBarNodeV){
this._scrollBarNodeV.className="";
}
if(this._scrollBarNodeH){
this._scrollBarNodeH.className="";
}
}
}
return;
}
if(this._useTransformTransition||this._useTopLeft){
var n=e.target;
if(n===this._scrollBarV||n===this._scrollBarH){
var cls="mblScrollableScrollTo"+(n===this._scrollBarV?"0":"1");
if(_6.contains(n,cls)){
_6.remove(n,cls);
}else{
n.className="";
}
return;
}
}
if(e.srcElement){
_3.stop(e);
}
}
this.stopAnimation();
if(this._bounce){
var _22=this;
var _23=_22._bounce;
setTimeout(function(){
_22.slideTo(_23,0.3,"ease-out");
},0);
_22._bounce=undefined;
}else{
this.hideScrollBar();
this.removeCover();
}
},isFormElement:function(_24){
if(_24&&_24.nodeType!==1){
_24=_24.parentNode;
}
if(!_24||_24.nodeType!==1){
return false;
}
var t=_24.tagName;
return (t==="SELECT"||t==="INPUT"||t==="TEXTAREA"||t==="BUTTON");
},onTouchStart:function(e){
if(this.disableTouchScroll){
return;
}
if(this._conn&&(new Date()).getTime()-this.startTime<500){
return;
}
if(!this._conn){
this._conn=[];
this._conn.push(_2.connect(_5.doc,_a.move,this,"onTouchMove"));
this._conn.push(_2.connect(_5.doc,_a.release,this,"onTouchEnd"));
}
this._aborted=false;
if(_6.contains(this.containerNode,"mblScrollableScrollTo2")){
this.abort();
}else{
if(this._scrollBarNodeV){
this._scrollBarNodeV.className="";
}
if(this._scrollBarNodeH){
this._scrollBarNodeH.className="";
}
}
this.touchStartX=e.touches?e.touches[0].pageX:e.clientX;
this.touchStartY=e.touches?e.touches[0].pageY:e.clientY;
this.startTime=(new Date()).getTime();
this.startPos=this.getPos();
this._dim=this.getDim();
this._time=[0];
this._posX=[this.touchStartX];
this._posY=[this.touchStartY];
this._locked=false;
this._moved=false;
this._preventDefaultInNextTouchMove=true;
if(!this.isFormElement(e.target)){
this.propagatable?e.preventDefault():_3.stop(e);
this._preventDefaultInNextTouchMove=false;
}
},onTouchMove:function(e){
if(this._locked){
return;
}
if(this._preventDefaultInNextTouchMove){
this._preventDefaultInNextTouchMove=false;
var _25=_b.getEnclosingWidget(((e.targetTouches&&e.targetTouches.length===1)?e.targetTouches[0]:e).target);
if(_25&&_25.isInstanceOf(_c)){
this.propagatable?e.preventDefault():_3.stop(e);
}
}
var x=e.touches?e.touches[0].pageX:e.clientX;
var y=e.touches?e.touches[0].pageY:e.clientY;
var dx=x-this.touchStartX;
var dy=y-this.touchStartY;
var to={x:this.startPos.x+dx,y:this.startPos.y+dy};
var dim=this._dim;
dx=Math.abs(dx);
dy=Math.abs(dy);
if(this._time.length==1){
if(this.dirLock){
if(this._v&&!this._h&&dx>=this.threshold&&dx>=dy||(this._h||this._f)&&!this._v&&dy>=this.threshold&&dy>=dx){
this._locked=true;
return;
}
}
if(this._v&&this._h){
if(dy<this.threshold&&dx<this.threshold){
return;
}
}else{
if(this._v&&dy<this.threshold||(this._h||this._f)&&dx<this.threshold){
return;
}
}
this._moved=true;
this.addCover();
this.showScrollBar();
}
var _26=this.weight;
if(this._v&&this.constraint){
if(to.y>0){
to.y=Math.round(to.y*_26);
}else{
if(to.y<-dim.o.h){
if(dim.c.h<dim.d.h){
to.y=Math.round(to.y*_26);
}else{
to.y=-dim.o.h-Math.round((-dim.o.h-to.y)*_26);
}
}
}
}
if((this._h||this._f)&&this.constraint){
if(to.x>0){
to.x=Math.round(to.x*_26);
}else{
if(to.x<-dim.o.w){
if(dim.c.w<dim.d.w){
to.x=Math.round(to.x*_26);
}else{
to.x=-dim.o.w-Math.round((-dim.o.w-to.x)*_26);
}
}
}
}
this.scrollTo(to);
var max=10;
var n=this._time.length;
if(n>=2){
this._moved=true;
var d0,d1;
if(this._v&&!this._h){
d0=this._posY[n-1]-this._posY[n-2];
d1=y-this._posY[n-1];
}else{
if(!this._v&&this._h){
d0=this._posX[n-1]-this._posX[n-2];
d1=x-this._posX[n-1];
}
}
if(d0*d1<0){
this._time=[this._time[n-1]];
this._posX=[this._posX[n-1]];
this._posY=[this._posY[n-1]];
n=1;
}
}
if(n==max){
this._time.shift();
this._posX.shift();
this._posY.shift();
}
this._time.push((new Date()).getTime()-this.startTime);
this._posX.push(x);
this._posY.push(y);
},_keepInputCaretInActiveElement:function(){
var _27=_5.doc.activeElement;
var _28;
if(_27&&(_27.tagName=="INPUT"||_27.tagName=="TEXTAREA")){
_28=_27.value;
if(_27.type=="number"||_27.type=="week"){
if(_28){
_27.value=_27.value+1;
}else{
_27.value=(_27.type=="week")?"2013-W10":1;
}
_27.value=_28;
}else{
_27.value=_27.value+" ";
_27.value=_28;
}
}
},onTouchEnd:function(e){
if(this._locked){
return;
}
var _29=this._speed={x:0,y:0};
var dim=this._dim;
var pos=this.getPos();
var to={};
if(e){
if(!this._conn){
return;
}
for(var i=0;i<this._conn.length;i++){
_2.disconnect(this._conn[i]);
}
this._conn=null;
var _2a=false;
if(!this._aborted&&!this._moved){
_2a=true;
}
if(_2a){
this.hideScrollBar();
this.removeCover();
if(_d("touch")&&_d("clicks-prevented")&&!this.isFormElement(e.target)){
var _2b=e.target;
if(_2b.nodeType!=1){
_2b=_2b.parentNode;
}
setTimeout(function(){
dm._sendClick(_2b,e);
});
}
return;
}
_29=this._speed=this.getSpeed();
}else{
if(pos.x==0&&pos.y==0){
return;
}
dim=this.getDim();
}
if(this._v){
to.y=pos.y+_29.y;
}
if(this._h||this._f){
to.x=pos.x+_29.x;
}
if(this.adjustDestination(to,pos,dim)===false){
return;
}
if(this.constraint){
if(this.scrollDir=="v"&&dim.c.h<dim.d.h){
this.slideTo({y:0},0.3,"ease-out");
return;
}else{
if(this.scrollDir=="h"&&dim.c.w<dim.d.w){
this.slideTo({x:0},0.3,"ease-out");
return;
}else{
if(this._v&&this._h&&dim.c.h<dim.d.h&&dim.c.w<dim.d.w){
this.slideTo({x:0,y:0},0.3,"ease-out");
return;
}
}
}
}
var _2c,_2d="ease-out";
var _2e={};
if(this._v&&this.constraint){
if(to.y>0){
if(pos.y>0){
_2c=0.3;
to.y=0;
}else{
to.y=Math.min(to.y,20);
_2d="linear";
_2e.y=0;
}
}else{
if(-_29.y>dim.o.h-(-pos.y)){
if(pos.y<-dim.o.h){
_2c=0.3;
to.y=dim.c.h<=dim.d.h?0:-dim.o.h;
}else{
to.y=Math.max(to.y,-dim.o.h-20);
_2d="linear";
_2e.y=-dim.o.h;
}
}
}
}
if((this._h||this._f)&&this.constraint){
if(to.x>0){
if(pos.x>0){
_2c=0.3;
to.x=0;
}else{
to.x=Math.min(to.x,20);
_2d="linear";
_2e.x=0;
}
}else{
if(-_29.x>dim.o.w-(-pos.x)){
if(pos.x<-dim.o.w){
_2c=0.3;
to.x=dim.c.w<=dim.d.w?0:-dim.o.w;
}else{
to.x=Math.max(to.x,-dim.o.w-20);
_2d="linear";
_2e.x=-dim.o.w;
}
}
}
}
this._bounce=(_2e.x!==undefined||_2e.y!==undefined)?_2e:undefined;
if(_2c===undefined){
var _2f,_30;
if(this._v&&this._h){
_30=Math.sqrt(_29.x*_29.x+_29.y*_29.y);
_2f=Math.sqrt(Math.pow(to.y-pos.y,2)+Math.pow(to.x-pos.x,2));
}else{
if(this._v){
_30=_29.y;
_2f=to.y-pos.y;
}else{
if(this._h){
_30=_29.x;
_2f=to.x-pos.x;
}
}
}
if(_2f===0&&!e){
return;
}
_2c=_30!==0?Math.abs(_2f/_30):0.01;
}
this.slideTo(to,_2c,_2d);
},adjustDestination:function(to,pos,dim){
return true;
},abort:function(){
this._aborted=true;
this.scrollTo(this.getPos());
this.stopAnimation();
},stopAnimation:function(){
_6.remove(this.containerNode,"mblScrollableScrollTo2");
this.containerNode.className=this.containerNode.className.replace(/mblScrollableScrollTo2-[^ ]+/,"");
if(this._scrollBarV){
this._scrollBarV.className="";
}
if(this._scrollBarH){
this._scrollBarH.className="";
}
if(this._useTransformTransition||this._useTopLeft){
this.containerNode.style[_e.name("transition")]="";
if(this._scrollBarV){
this._scrollBarV.style[_e.name("transition")]="";
}
if(this._scrollBarH){
this._scrollBarH.style[_e.name("transition")]="";
}
}
},scrollIntoView:function(_31,_32,_33){
if(!this._v){
return;
}
var c=this.containerNode,h=this.getDim().d.h,top=0;
for(var n=_31;n!==c;n=n.offsetParent){
if(!n||n.tagName==="BODY"){
return;
}
top+=n.offsetTop;
}
var y=_32?Math.max(h-c.offsetHeight,-top):Math.min(0,h-top-_31.offsetHeight);
(_33&&typeof _33==="number")?this.slideTo({y:y},_33,"ease-out"):this.scrollTo({y:y});
},getSpeed:function(){
var x=0,y=0,n=this._time.length;
if(n>=2&&(new Date()).getTime()-this.startTime-this._time[n-1]<500){
var dy=this._posY[n-(n>3?2:1)]-this._posY[(n-6)>=0?n-6:0];
var dx=this._posX[n-(n>3?2:1)]-this._posX[(n-6)>=0?n-6:0];
var dt=this._time[n-(n>3?2:1)]-this._time[(n-6)>=0?n-6:0];
y=this.calcSpeed(dy,dt);
x=this.calcSpeed(dx,dt);
}
return {x:x,y:y};
},calcSpeed:function(_34,_35){
return Math.round(_34/_35*100)*4;
},scrollTo:function(to,_36,_37){
var _38,_39,_3a;
var _3b=true;
if(!this._aborted&&this._conn){
if(!this._dim){
this._dim=this.getDim();
}
_39=(to.y>0)?to.y:0;
_3a=(this._dim.o.h+to.y<0)?-1*(this._dim.o.h+to.y):0;
_38={bubbles:false,cancelable:false,x:to.x,y:to.y,beforeTop:_39>0,beforeTopHeight:_39,afterBottom:_3a>0,afterBottomHeight:_3a};
_3b=this.onBeforeScroll(_38);
}
if(_3b){
var s=(_37||this.containerNode).style;
if(_d("css3-animations")){
if(!this._useTopLeft){
if(this._useTransformTransition){
s[_e.name("transition")]="";
}
s[_e.name("transform")]=this.makeTranslateStr(to);
}else{
s[_e.name("transition")]="";
if(this._v){
s.top=to.y+"px";
}
if(this._h||this._f){
s.left=to.x+"px";
}
}
}else{
if(this._v){
s.top=to.y+"px";
}
if(this._h||this._f){
s.left=to.x+"px";
}
}
if(_d("ios")){
this._keepInputCaretInActiveElement();
}
if(!_36){
this.scrollScrollBarTo(this.calcScrollBarPos(to));
}
if(_38){
this.onAfterScroll(_38);
}
}
},onBeforeScroll:function(e){
return true;
},onAfterScroll:function(e){
},slideTo:function(to,_3c,_3d){
this._runSlideAnimation(this.getPos(),to,_3c,_3d,this.containerNode,2);
this.slideScrollBarTo(to,_3c,_3d);
},makeTranslateStr:function(to){
var y=this._v&&typeof to.y=="number"?to.y+"px":"0px";
var x=(this._h||this._f)&&typeof to.x=="number"?to.x+"px":"0px";
return _d("translate3d")?"translate3d("+x+","+y+",0px)":"translate("+x+","+y+")";
},getPos:function(){
if(_d("css3-animations")){
var s=_5.doc.defaultView.getComputedStyle(this.containerNode,"");
if(!this._useTopLeft){
var m=s[_e.name("transform")];
if(m&&m.indexOf("matrix")===0){
var arr=m.split(/[,\s\)]+/);
var i=m.indexOf("matrix3d")===0?12:4;
return {y:arr[i+1]-0,x:arr[i]-0};
}
return {x:0,y:0};
}else{
return {x:parseInt(s.left)||0,y:parseInt(s.top)||0};
}
}else{
var y=parseInt(this.containerNode.style.top)||0;
return {y:y,x:this.containerNode.offsetLeft};
}
},getDim:function(){
var d={};
d.c={h:this.containerNode.offsetHeight,w:this.containerNode.offsetWidth};
d.v={h:this.domNode.offsetHeight+this._appFooterHeight,w:this.domNode.offsetWidth};
d.d={h:d.v.h-this.fixedHeaderHeight-this.fixedFooterHeight-this._appFooterHeight,w:d.v.w};
d.o={h:d.c.h-d.v.h+this.fixedHeaderHeight+this.fixedFooterHeight+this._appFooterHeight,w:d.c.w-d.v.w};
return d;
},showScrollBar:function(){
if(!this.scrollBar){
return;
}
var dim=this._dim;
if(this.scrollDir=="v"&&dim.c.h<=dim.d.h){
return;
}
if(this.scrollDir=="h"&&dim.c.w<=dim.d.w){
return;
}
if(this._v&&this._h&&dim.c.h<=dim.d.h&&dim.c.w<=dim.d.w){
return;
}
var _3e=function(_3f,dir){
var bar=_3f["_scrollBarNode"+dir];
if(!bar){
var _40=_7.create("div",null,_3f.domNode);
var _41={position:"absolute",overflow:"hidden"};
if(dir=="V"){
_41.right="2px";
_41.width="5px";
}else{
_41.bottom=(_3f.isLocalFooter?_3f.fixedFooterHeight:0)+2+"px";
_41.height="5px";
}
_8.set(_40,_41);
_40.className="mblScrollBarWrapper";
_3f["_scrollBarWrapper"+dir]=_40;
bar=_7.create("div",null,_40);
_8.set(bar,_e.add({opacity:0.6,position:"absolute",backgroundColor:"#606060",fontSize:"1px",MozBorderRadius:"2px",zIndex:2147483647},{borderRadius:"2px",transformOrigin:"0 0"}));
_8.set(bar,dir=="V"?{width:"5px"}:{height:"5px"});
_3f["_scrollBarNode"+dir]=bar;
}
return bar;
};
if(this._v&&!this._scrollBarV){
this._scrollBarV=_3e(this,"V");
}
if(this._h&&!this._scrollBarH){
this._scrollBarH=_3e(this,"H");
}
this.resetScrollBar();
},hideScrollBar:function(){
if(this.fadeScrollBar&&_d("css3-animations")){
if(!dm._fadeRule){
var _42=_7.create("style",null,_5.doc.getElementsByTagName("head")[0]);
_42.textContent=".mblScrollableFadeScrollBar{"+"  "+_e.name("animation-duration",true)+": 1s;"+"  "+_e.name("animation-name",true)+": scrollableViewFadeScrollBar;}"+"@"+_e.name("keyframes",true)+" scrollableViewFadeScrollBar{"+"  from { opacity: 0.6; }"+"  to { opacity: 0; }}";
dm._fadeRule=_42.sheet.cssRules[1];
}
}
if(!this.scrollBar){
return;
}
var f=function(bar,_43){
_8.set(bar,_e.add({opacity:0},{animationDuration:""}));
if(!(_43._useTopLeft&&_d("android"))){
bar.className="mblScrollableFadeScrollBar";
}
};
if(this._scrollBarV){
f(this._scrollBarV,this);
this._scrollBarV=null;
}
if(this._scrollBarH){
f(this._scrollBarH,this);
this._scrollBarH=null;
}
},calcScrollBarPos:function(to){
var pos={};
var dim=this._dim;
var f=function(_44,_45,t,d,c){
var y=Math.round((d-_45-8)/(d-c)*t);
if(y<-_45+5){
y=-_45+5;
}
if(y>_44-5){
y=_44-5;
}
return y;
};
if(typeof to.y=="number"&&this._scrollBarV){
pos.y=f(this._scrollBarWrapperV.offsetHeight,this._scrollBarV.offsetHeight,to.y,dim.d.h,dim.c.h);
}
if(typeof to.x=="number"&&this._scrollBarH){
pos.x=f(this._scrollBarWrapperH.offsetWidth,this._scrollBarH.offsetWidth,to.x,dim.d.w,dim.c.w);
}
return pos;
},scrollScrollBarTo:function(to){
if(!this.scrollBar){
return;
}
if(this._v&&this._scrollBarV&&typeof to.y=="number"){
if(_d("css3-animations")){
if(!this._useTopLeft){
if(this._useTransformTransition){
this._scrollBarV.style[_e.name("transition")]="";
}
this._scrollBarV.style[_e.name("transform")]=this.makeTranslateStr({y:to.y});
}else{
_8.set(this._scrollBarV,_e.add({top:to.y+"px"},{transition:""}));
}
}else{
this._scrollBarV.style.top=to.y+"px";
}
}
if(this._h&&this._scrollBarH&&typeof to.x=="number"){
if(_d("css3-animations")){
if(!this._useTopLeft){
if(this._useTransformTransition){
this._scrollBarH.style[_e.name("transition")]="";
}
this._scrollBarH.style[_e.name("transform")]=this.makeTranslateStr({x:to.x});
}else{
_8.set(this._scrollBarH,_e.add({left:to.x+"px"},{transition:""}));
}
}else{
this._scrollBarH.style.left=to.x+"px";
}
}
},slideScrollBarTo:function(to,_46,_47){
if(!this.scrollBar){
return;
}
var _48=this.calcScrollBarPos(this.getPos());
var _49=this.calcScrollBarPos(to);
if(this._v&&this._scrollBarV){
this._runSlideAnimation({y:_48.y},{y:_49.y},_46,_47,this._scrollBarV,0);
}
if(this._h&&this._scrollBarH){
this._runSlideAnimation({x:_48.x},{x:_49.x},_46,_47,this._scrollBarH,1);
}
},_runSlideAnimation:function(_4a,to,_4b,_4c,_4d,idx){
if(_d("css3-animations")){
if(!this._useTopLeft){
if(this._useTransformTransition){
if(to.x===undefined){
to.x=_4a.x;
}
if(to.y===undefined){
to.y=_4a.y;
}
if(to.x!==_4a.x||to.y!==_4a.y){
this.onFlickAnimationStart();
_8.set(_4d,_e.add({},{transitionProperty:_e.name("transform"),transitionDuration:_4b+"s",transitionTimingFunction:_4c}));
var t=this.makeTranslateStr(to);
setTimeout(function(){
_8.set(_4d,_e.add({},{transform:t}));
},0);
_6.add(_4d,"mblScrollableScrollTo"+idx);
}else{
this.hideScrollBar();
this.removeCover();
}
}else{
var _4e=this.findDisp(this.domNode)===this.domNode;
var _4f=this.setKeyframes(_4a,to,idx,_4e);
_8.set(_4d,_e.add({},{animationDuration:_4b+"s",animationTimingFunction:_4c}));
_6.add(_4d,_4f);
_6.add(_4d,"mblScrollableScrollTo"+idx);
if(idx==2){
this.scrollTo(to,true,_4d);
}else{
this.scrollScrollBarTo(to);
}
}
}else{
if(to.x!==undefined||to.y!==undefined){
this.onFlickAnimationStart();
_8.set(_4d,_e.add({},{transitionProperty:(to.x!==undefined&&to.y!==undefined)?"top, left":to.y!==undefined?"top":"left",transitionDuration:_4b+"s",transitionTimingFunction:_4c}));
setTimeout(function(){
var _50={};
if(to.x!==undefined){
_50.left=to.x+"px";
}
if(to.y!==undefined){
_50.top=to.y+"px";
}
_8.set(_4d,_50);
},0);
_6.add(_4d,"mblScrollableScrollTo"+idx);
}
}
}else{
if(_1.fx&&_1.fx.easing&&_4b){
var _51=this;
var s=_1.fx.slideTo({node:_4d,duration:_4b*1000,left:to.x,top:to.y,easing:(_4c=="ease-out")?_1.fx.easing.quadOut:_1.fx.easing.linear,onBegin:function(){
if(idx==2){
_51.onFlickAnimationStart();
}
},onEnd:function(){
if(idx==2){
_51.onFlickAnimationEnd();
}
}}).play();
}else{
if(idx==2){
this.onFlickAnimationStart();
this.scrollTo(to,false,_4d);
this.onFlickAnimationEnd();
}else{
this.scrollScrollBarTo(to);
}
}
}
},resetScrollBar:function(){
var f=function(_52,bar,d,c,hd,v){
if(!bar){
return;
}
var _53={};
_53[v?"top":"left"]=hd+4+"px";
var t=(d-8)<=0?1:d-8;
_53[v?"height":"width"]=t+"px";
_8.set(_52,_53);
var l=Math.round(d*d/c);
l=Math.min(Math.max(l-8,5),t);
bar.style[v?"height":"width"]=l+"px";
_8.set(bar,{"opacity":0.6});
};
var dim=this.getDim();
f(this._scrollBarWrapperV,this._scrollBarV,dim.d.h,dim.c.h,this.fixedHeaderHeight,true);
f(this._scrollBarWrapperH,this._scrollBarH,dim.d.w,dim.c.w,0);
this.createMask();
},createMask:function(){
if(!(_d("webkit")||_d("svg"))){
return;
}
if(this._scrollBarWrapperV){
var h=this._scrollBarWrapperV.offsetHeight;
_f.createRoundMask(this._scrollBarWrapperV,0,0,0,0,5,h,2,2,0.5);
}
if(this._scrollBarWrapperH){
var w=this._scrollBarWrapperH.offsetWidth;
_f.createRoundMask(this._scrollBarWrapperH,0,0,0,0,w,5,2,2,0.5);
}
},flashScrollBar:function(){
if(this.disableFlashScrollBar||!this.domNode){
return;
}
this._dim=this.getDim();
if(this._dim.d.h<=0){
return;
}
this.showScrollBar();
var _54=this;
setTimeout(function(){
_54.hideScrollBar();
},300);
},addCover:function(){
if(!_d("touch")&&!this.noCover){
if(!dm._cover){
dm._cover=_7.create("div",null,_5.doc.body);
dm._cover.className="mblScrollableCover";
_8.set(dm._cover,{backgroundColor:"#ffff00",opacity:0,position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",zIndex:2147483647});
this._ch.push(_2.connect(dm._cover,_a.press,this,"onTouchEnd"));
}else{
dm._cover.style.display="";
}
this.setSelectable(dm._cover,false);
this.setSelectable(this.domNode,false);
}
},removeCover:function(){
if(!_d("touch")&&dm._cover){
dm._cover.style.display="none";
this.setSelectable(dm._cover,true);
this.setSelectable(this.domNode,true);
}
},setKeyframes:function(_55,to,idx,_56){
if(!dm._rule){
dm._rule=[];
}
var _57=idx+(_56?"-in":"-out");
if(!(dm._rule[_57])){
var _58=_7.create("style",null,_5.doc.getElementsByTagName("head")[0]);
_58.textContent=".mblScrollableScrollTo"+_57+"{"+_e.name("animation-name",true)+": scrollableViewScroll"+_57+";}"+"@"+_e.name("keyframes",true)+" scrollableViewScroll"+_57+"{}";
dm._rule[_57]=_58.sheet.cssRules[1];
}
var _59=dm._rule[_57];
if(_59){
if(_55){
_59.deleteRule(_d("webkit")?"from":0);
(_59.insertRule||_59.appendRule).call(_59,"from { "+_e.name("transform",true)+": "+this.makeTranslateStr(_55)+"; }");
}
if(to){
if(to.x===undefined){
to.x=_55.x;
}
if(to.y===undefined){
to.y=_55.y;
}
_59.deleteRule(_d("webkit")?"to":1);
(_59.insertRule||_59.appendRule).call(_59,"to { "+_e.name("transform",true)+": "+this.makeTranslateStr(to)+"; }");
}
}
return "mblScrollableScrollTo"+_57;
},setSelectable:function(_5a,_5b){
_5a.style.KhtmlUserSelect=_5b?"auto":"none";
_5a.style.MozUserSelect=_5b?"":"none";
_5a.onselectstart=_5b?null:function(){
return false;
};
if(_d("ie")){
_5a.unselectable=_5b?"":"on";
var _5c=_5a.getElementsByTagName("*");
for(var i=0;i<_5c.length;i++){
_5c[i].unselectable=_5b?"":"on";
}
}
}});
_4.setObject("dojox.mobile.scrollable",_12);
return _12;
});