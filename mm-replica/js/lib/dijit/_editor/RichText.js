//>>built
define("dijit/_editor/RichText",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/query","dojo/domReady","dojo/sniff","dojo/topic","dojo/_base/unload","dojo/_base/url","dojo/window","../_Widget","../_CssStateMixin","../selection","./range","./html","../focus","../main"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,on,_e,_f,has,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a){
var _1b=_3("dijit._editor.RichText",[_14,_15],{constructor:function(_1c){
this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this.events=[].concat(this.events);
this._keyHandlers={};
if(_1c&&_d.isString(_1c.value)){
this.value=_1c.value;
}
this.onLoadDeferred=new _4();
},baseClass:"dijitEditor",inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",_NAME_CONTENT_SEP:"@@**%%:%%**@@",onLoadDeferred:null,isTabIndent:false,disableSpellCheck:false,postCreate:function(){
if("textarea"===this.domNode.tagName.toLowerCase()){
console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
}
this.contentPreFilters=[_d.trim,_d.hitch(this,"_preFixUrlAttributes")].concat(this.contentPreFilters);
if(has("mozilla")){
this.contentPreFilters=[this._normalizeFontStyle].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeMozBogus].concat(this.contentPostFilters);
}
if(has("webkit")){
this.contentPreFilters=[this._removeWebkitBogus].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeWebkitBogus].concat(this.contentPostFilters);
}
if(has("ie")||has("trident")){
this.contentPostFilters=[this._normalizeFontStyle].concat(this.contentPostFilters);
this.contentDomPostFilters=[_d.hitch(this,"_stripBreakerNodes")].concat(this.contentDomPostFilters);
}
this.contentDomPostFilters=[_d.hitch(this,"_stripTrailingEmptyNodes")].concat(this.contentDomPostFilters);
this.inherited(arguments);
_10.publish(_1a._scopeName+"._editor.RichText::init",this);
},startup:function(){
this.inherited(arguments);
this.open();
this.setupDefaultShortcuts();
},setupDefaultShortcuts:function(){
var _1d=_d.hitch(this,function(cmd,arg){
return function(){
return !this.execCommand(cmd,arg);
};
});
var _1e={b:_1d("bold"),i:_1d("italic"),u:_1d("underline"),a:_1d("selectall"),s:function(){
this.save(true);
},m:function(){
this.isTabIndent=!this.isTabIndent;
},"1":_1d("formatblock","h1"),"2":_1d("formatblock","h2"),"3":_1d("formatblock","h3"),"4":_1d("formatblock","h4"),"\\":_1d("insertunorderedlist")};
if(!has("ie")){
_1e.Z=_1d("redo");
}
var key;
for(key in _1e){
this.addKeyHandler(key,true,false,_1e[key]);
}
},events:["onKeyDown","onKeyUp"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){
if(_1b._editorCommandsLocalized){
this._local2NativeFormatNames=_1b._local2NativeFormatNames;
this._native2LocalFormatNames=_1b._native2LocalFormatNames;
return;
}
_1b._editorCommandsLocalized=true;
_1b._local2NativeFormatNames={};
_1b._native2LocalFormatNames={};
this._local2NativeFormatNames=_1b._local2NativeFormatNames;
this._native2LocalFormatNames=_1b._native2LocalFormatNames;
var _1f=["div","p","pre","h1","h2","h3","h4","h5","h6","ol","ul","address"];
var _20="",_21,i=0;
while((_21=_1f[i++])){
if(_21.charAt(1)!=="l"){
_20+="<"+_21+"><span>content</span></"+_21+"><br/>";
}else{
_20+="<"+_21+"><li>content</li></"+_21+"><br/>";
}
}
var _22={position:"absolute",top:"0px",zIndex:10,opacity:0.01};
var div=_8.create("div",{style:_22,innerHTML:_20});
this.ownerDocumentBody.appendChild(div);
var _23=_d.hitch(this,function(){
var _24=div.firstChild;
while(_24){
try{
this.selection.selectElement(_24.firstChild);
var _25=_24.tagName.toLowerCase();
this._local2NativeFormatNames[_25]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_25]]=_25;
_24=_24.nextSibling.nextSibling;
}
catch(e){
}
}
_8.destroy(div);
});
this.defer(_23);
},open:function(_26){
if(!this.onLoadDeferred||this.onLoadDeferred.fired>=0){
this.onLoadDeferred=new _4();
}
if(!this.isClosed){
this.close();
}
_10.publish(_1a._scopeName+"._editor.RichText::open",this);
if(arguments.length===1&&_26.nodeName){
this.domNode=_26;
}
var dn=this.domNode;
var _27;
if(_d.isString(this.value)){
_27=this.value;
dn.innerHTML="";
}else{
if(dn.nodeName&&dn.nodeName.toLowerCase()=="textarea"){
var ta=(this.textarea=dn);
this.name=ta.name;
_27=ta.value;
dn=this.domNode=this.ownerDocument.createElement("div");
dn.setAttribute("widgetId",this.id);
ta.removeAttribute("widgetId");
dn.cssText=ta.cssText;
dn.className+=" "+ta.className;
_8.place(dn,ta,"before");
var _28=_d.hitch(this,function(){
_a.set(ta,{display:"block",position:"absolute",top:"-1000px"});
if(has("ie")){
var s=ta.style;
this.__overflow=s.overflow;
s.overflow="hidden";
}
});
if(has("ie")){
this.defer(_28,10);
}else{
_28();
}
if(ta.form){
var _29=ta.value;
this.reset=function(){
var _2a=this.getValue();
if(_2a!==_29){
this.replaceValue(_29);
}
};
on(ta.form,"submit",_d.hitch(this,function(){
_6.set(ta,"disabled",this.disabled);
ta.value=this.getValue();
}));
}
}else{
_27=_18.getChildrenHtml(dn);
dn.innerHTML="";
}
}
this.value=_27;
if(dn.nodeName&&dn.nodeName==="LI"){
dn.innerHTML=" <br>";
}
this.header=dn.ownerDocument.createElement("div");
dn.appendChild(this.header);
this.editingArea=dn.ownerDocument.createElement("div");
dn.appendChild(this.editingArea);
this.footer=dn.ownerDocument.createElement("div");
dn.appendChild(this.footer);
if(!this.name){
this.name=this.id+"_AUTOGEN";
}
if(this.name!==""&&(!_2["useXDomain"]||_2["allowXdRichTextSave"])){
var _2b=_5.byId(_1a._scopeName+"._editor.RichText.value");
if(_2b&&_2b.value!==""){
var _2c=_2b.value.split(this._SEPARATOR),i=0,dat;
while((dat=_2c[i++])){
var _2d=dat.split(this._NAME_CONTENT_SEP);
if(_2d[0]===this.name){
_27=_2d[1];
_2c=_2c.splice(i,1);
_2b.value=_2c.join(this._SEPARATOR);
break;
}
}
}
if(!_1b._globalSaveHandler){
_1b._globalSaveHandler={};
_11.addOnUnload(function(){
var id;
for(id in _1b._globalSaveHandler){
var f=_1b._globalSaveHandler[id];
if(_d.isFunction(f)){
f();
}
}
});
}
_1b._globalSaveHandler[this.id]=_d.hitch(this,"_saveContent");
}
this.isClosed=false;
var ifr=(this.editorObject=this.iframe=this.ownerDocument.createElement("iframe"));
ifr.id=this.id+"_iframe";
ifr.style.border="none";
ifr.style.width="100%";
if(this._layoutMode){
ifr.style.height="100%";
}else{
if(has("ie")>=7){
if(this.height){
ifr.style.height=this.height;
}
if(this.minHeight){
ifr.style.minHeight=this.minHeight;
}
}else{
ifr.style.height=this.height?this.height:this.minHeight;
}
}
ifr.frameBorder=0;
ifr._loadFunc=_d.hitch(this,function(w){
this.window=w;
this.document=w.document;
this.selection=new _16.SelectionManager(w);
if(has("ie")){
this._localizeEditorCommands();
}
this.onLoad(_27);
});
var src=this._getIframeDocTxt().replace(/\\/g,"\\\\").replace(/'/g,"\\'"),s;
if(has("ie")<11){
s="javascript:document.open();try{parent.window;}catch(e){document.domain=\""+document.domain+"\";}"+"document.write('"+src+"');document.close()";
}else{
s="javascript: '"+src+"'";
}
if(has("ie")==9){
this.editingArea.appendChild(ifr);
ifr.src=s;
}else{
ifr.setAttribute("src",s);
this.editingArea.appendChild(ifr);
}
if(dn.nodeName==="LI"){
dn.lastChild.style.marginTop="-1.2em";
}
_7.add(this.domNode,this.baseClass);
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_getIframeDocTxt:function(){
var _2e=_a.getComputedStyle(this.domNode);
var _2f="<div id='dijitEditorBody' role='main'></div>";
var _30=[_2e.fontWeight,_2e.fontSize,_2e.fontFamily].join(" ");
var _31=_2e.lineHeight;
if(_31.indexOf("px")>=0){
_31=parseFloat(_31)/parseFloat(_2e.fontSize);
}else{
if(_31.indexOf("em")>=0){
_31=parseFloat(_31);
}else{
_31="normal";
}
}
var _32="";
var _33=this;
this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig,function(_34){
_34=_34.replace(/^;/ig,"")+";";
var s=_34.split(":")[0];
if(s){
s=_d.trim(s);
s=s.toLowerCase();
var i;
var sC="";
for(i=0;i<s.length;i++){
var c=s.charAt(i);
switch(c){
case "-":
i++;
c=s.charAt(i).toUpperCase();
default:
sC+=c;
}
}
_a.set(_33.domNode,sC,"");
}
_32+=_34+";";
});
var _35=_e("label[for=\""+this.id+"\"]");
var _36="";
if(_35.length){
_36=_35[0].innerHTML;
}else{
if(this["aria-label"]){
_36=this["aria-label"];
}else{
if(this["aria-labelledby"]){
_36=_5.byId(this["aria-labelledby"]).innerHTML;
}
}
}
this.iframe.setAttribute("title",_36);
return ["<!DOCTYPE html>",this.isLeftToRight()?"<html lang='"+this.lang+"'>\n<head>\n":"<html dir='rtl' lang='"+this.lang+"'>\n<head>\n",_36?"<title>"+_36+"</title>":"","<meta http-equiv='Content-Type' content='text/html'>\n","<style>\n","\tbody,html {\n","\t\tbackground:transparent;\n","\t\tpadding: 1px 0 0 0;\n","\t\tmargin: -1px 0 0 0;\n","\t}\n","\tbody,html,#dijitEditorBody { outline: none; }","html { height: 100%; width: 100%; overflow: hidden; }\n",this.height?"\tbody,#dijitEditorBody { height: 100%; width: 100%; overflow: auto; }\n":"\tbody,#dijitEditorBody { min-height: "+this.minHeight+"; width: 100%; overflow-x: auto; overflow-y: hidden; }\n","\tbody{\n","\t\ttop:0px;\n","\t\tleft:0px;\n","\t\tright:0px;\n","\t\tfont:",_30,";\n",((this.height||has("opera"))?"":"\t\tposition: fixed;\n"),"\t\tline-height:",_31,";\n","\t}\n","\tp{ margin: 1em 0; }\n","\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n",(has("ie")||has("trident")||has("edge")?"":"\tli{ min-height:1.2em; }\n"),"</style>\n",this._applyEditingAreaStyleSheets(),"\n","</head>\n<body ","onload='try{frameElement && frameElement._loadFunc(window,document)}catch(e){document.domain=\""+document.domain+"\";frameElement._loadFunc(window,document)}' ","style='"+_32+"'>",_2f,"</body>\n</html>"].join("");
},_applyEditingAreaStyleSheets:function(){
var _37=[];
if(this.styleSheets){
_37=this.styleSheets.split(";");
this.styleSheets="";
}
_37=_37.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var _38="",i=0,url,_39=_13.get(this.ownerDocument);
while((url=_37[i++])){
var _3a=(new _12(_39.location,url)).toString();
this.editingAreaStyleSheets.push(_3a);
_38+="<link rel=\"stylesheet\" type=\"text/css\" href=\""+_3a+"\"/>";
}
return _38;
},addStyleSheet:function(uri){
var url=uri.toString(),_3b=_13.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _12(_3b.location,url)).toString();
}
if(_1.indexOf(this.editingAreaStyleSheets,url)>-1){
return;
}
this.editingAreaStyleSheets.push(url);
this.onLoadDeferred.then(_d.hitch(this,function(){
if(this.document.createStyleSheet){
this.document.createStyleSheet(url);
}else{
var _3c=this.document.getElementsByTagName("head")[0];
var _3d=this.document.createElement("link");
_3d.rel="stylesheet";
_3d.type="text/css";
_3d.href=url;
_3c.appendChild(_3d);
}
}));
},removeStyleSheet:function(uri){
var url=uri.toString(),_3e=_13.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _12(_3e.location,url)).toString();
}
var _3f=_1.indexOf(this.editingAreaStyleSheets,url);
if(_3f===-1){
return;
}
delete this.editingAreaStyleSheets[_3f];
_e("link[href=\""+url+"\"]",this.window.document).orphan();
},disabled:false,_mozSettingProps:{"styleWithCSS":false},_setDisabledAttr:function(_40){
_40=!!_40;
this._set("disabled",_40);
if(!this.isLoaded){
return;
}
var _41=has("ie")&&(this.isLoaded||!this.focusOnLoad);
if(_41){
this.editNode.unselectable="on";
}
this.editNode.contentEditable=!_40;
this.editNode.tabIndex=_40?"-1":this.tabIndex;
if(_41){
this.defer(function(){
if(this.editNode){
this.editNode.unselectable="off";
}
});
}
if(has("mozilla")&&!_40&&this._mozSettingProps){
var ps=this._mozSettingProps;
var n;
for(n in ps){
if(ps.hasOwnProperty(n)){
try{
this.document.execCommand(n,false,ps[n]);
}
catch(e2){
}
}
}
}
this._disabledOK=true;
},onLoad:function(_42){
if(!this.window.__registeredWindow){
this.window.__registeredWindow=true;
this._iframeRegHandle=_19.registerIframe(this.iframe);
}
this.editNode=this.document.body.firstChild;
var _43=this;
this.beforeIframeNode=_8.place("<div tabIndex=-1></div>",this.iframe,"before");
this.afterIframeNode=_8.place("<div tabIndex=-1></div>",this.iframe,"after");
this.iframe.onfocus=this.document.onfocus=function(){
_43.editNode.focus();
};
this.focusNode=this.editNode;
var _44=this.events.concat(this.captureEvents);
var ap=this.iframe?this.document:this.editNode;
this.own(_1.map(_44,function(_45){
var _46=_45.toLowerCase().replace(/^on/,"");
on(ap,_46,_d.hitch(this,_45));
},this));
this.own(on(ap,"mouseup",_d.hitch(this,"onClick")));
if(has("ie")){
this.own(on(this.document,"mousedown",_d.hitch(this,"_onIEMouseDown")));
this.editNode.style.zoom=1;
}else{
this.own(on(this.document,"mousedown",_d.hitch(this,function(){
delete this._cursorToStart;
})));
}
if(has("webkit")){
this._webkitListener=this.own(on(this.document,"mouseup",_d.hitch(this,"onDisplayChanged")))[0];
this.own(on(this.document,"mousedown",_d.hitch(this,function(e){
var t=e.target;
if(t&&(t===this.document.body||t===this.document)){
this.defer("placeCursorAtEnd");
}
})));
}
if(has("ie")){
try{
this.document.execCommand("RespectVisibilityInDesign",true,null);
}
catch(e){
}
}
this.isLoaded=true;
this.set("disabled",this.disabled);
var _47=_d.hitch(this,function(){
this.setValue(_42);
if(this.onLoadDeferred){
this.onLoadDeferred.resolve(true);
}
this.onDisplayChanged();
if(this.focusOnLoad){
_f(_d.hitch(this,"defer","focus",this.updateInterval));
}
this.value=this.getValue(true);
});
if(this.setValueDeferred){
this.setValueDeferred.then(_47);
}else{
_47();
}
},onKeyDown:function(e){
if(e.keyCode===_c.SHIFT||e.keyCode===_c.ALT||e.keyCode===_c.META||e.keyCode===_c.CTRL){
return true;
}
if(e.keyCode===_c.TAB&&this.isTabIndent){
e.stopPropagation();
e.preventDefault();
if(this.queryCommandEnabled((e.shiftKey?"outdent":"indent"))){
this.execCommand((e.shiftKey?"outdent":"indent"));
}
}
if(e.keyCode==_c.TAB&&!this.isTabIndent&&!e.ctrlKey&&!e.altKey){
if(e.shiftKey){
this.beforeIframeNode.focus();
}else{
this.afterIframeNode.focus();
}
return true;
}
if(has("ie")<9&&e.keyCode===_c.BACKSPACE&&this.document.selection.type==="Control"){
e.stopPropagation();
e.preventDefault();
this.execCommand("delete");
}
if(has("ff")){
if(e.keyCode===_c.PAGE_UP||e.keyCode===_c.PAGE_DOWN){
if(this.editNode.clientHeight>=this.editNode.scrollHeight){
e.preventDefault();
}
}
}
var _48=this._keyHandlers[e.keyCode],_49=arguments;
if(_48&&!e.altKey){
_1.some(_48,function(h){
if(!(h.shift^e.shiftKey)&&!(h.ctrl^(e.ctrlKey||e.metaKey))){
if(!h.handler.apply(this,_49)){
e.preventDefault();
}
return true;
}
},this);
}
this.defer("onKeyPressed",1);
return true;
},onKeyUp:function(){
},setDisabled:function(_4a){
_b.deprecated("dijit.Editor::setDisabled is deprecated","use dijit.Editor::attr(\"disabled\",boolean) instead",2);
this.set("disabled",_4a);
},_setValueAttr:function(_4b){
this.setValue(_4b);
},_setDisableSpellCheckAttr:function(_4c){
if(this.document){
_6.set(this.document.body,"spellcheck",!_4c);
}else{
this.onLoadDeferred.then(_d.hitch(this,function(){
_6.set(this.document.body,"spellcheck",!_4c);
}));
}
this._set("disableSpellCheck",_4c);
},addKeyHandler:function(key,_4d,_4e,_4f){
if(typeof key=="string"){
key=key.toUpperCase().charCodeAt(0);
}
if(!_d.isArray(this._keyHandlers[key])){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({shift:_4e||false,ctrl:_4d||false,handler:_4f});
},onKeyPressed:function(){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},_onIEMouseDown:function(){
if(!this.focused&&!this.disabled){
this.focus();
}
},_onBlur:function(e){
if(has("ie")||has("trident")){
this.defer(function(){
if(!_19.curNode){
this.ownerDocumentBody.focus();
}
});
}
this.inherited(arguments);
var _50=this.getValue(true);
if(_50!==this.value){
this.onChange(_50);
}
this._set("value",_50);
},_onFocus:function(e){
if(!this.disabled){
if(!this._disabledOK){
this.set("disabled",false);
}
this.inherited(arguments);
}
},blur:function(){
if(!has("ie")&&this.window.document.documentElement&&this.window.document.documentElement.focus){
this.window.document.documentElement.focus();
}else{
if(this.ownerDocumentBody.focus){
this.ownerDocumentBody.focus();
}
}
},focus:function(){
if(!this.isLoaded){
this.focusOnLoad=true;
return;
}
if(this._cursorToStart){
delete this._cursorToStart;
if(this.editNode.childNodes){
this.placeCursorAtStart();
return;
}
}
if(has("ie")<9){
this.iframe.fireEvent("onfocus",document.createEventObject());
}else{
this.editNode.focus();
}
},updateInterval:200,_updateTimer:null,onDisplayChanged:function(){
if(this._updateTimer){
this._updateTimer.remove();
}
this._updateTimer=this.defer("onNormalizedDisplayChanged",this.updateInterval);
},onNormalizedDisplayChanged:function(){
delete this._updateTimer;
},onChange:function(){
},_normalizeCommand:function(cmd,_51){
var _52=cmd.toLowerCase();
if(_52==="formatblock"){
if(has("safari")&&_51===undefined){
_52="heading";
}
}else{
if(_52==="hilitecolor"&&!has("mozilla")){
_52="backcolor";
}
}
return _52;
},_qcaCache:{},queryCommandAvailable:function(_53){
var ca=this._qcaCache[_53];
if(ca!==undefined){
return ca;
}
return (this._qcaCache[_53]=this._queryCommandAvailable(_53));
},_queryCommandAvailable:function(_54){
switch(_54.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "selectall":
case "toggledir":
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
case "undo":
case "redo":
case "strikethrough":
case "tabindent":
case "cut":
case "copy":
case "paste":
return true;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
return has("ie")||has("trident")||has("edge");
case "inserttable":
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
return !has("webkit");
default:
return false;
}
},execCommand:function(_55,_56){
var _57;
if(this.focused){
this.focus();
}
_55=this._normalizeCommand(_55,_56);
if(_56!==undefined){
if(_55==="heading"){
throw new Error("unimplemented");
}else{
if(_55==="formatblock"&&(has("ie")||has("trident"))){
_56="<"+_56+">";
}
}
}
var _58="_"+_55+"Impl";
if(this[_58]){
_57=this[_58](_56);
}else{
_56=arguments.length>1?_56:null;
if(_56||_55!=="createlink"){
_57=this.document.execCommand(_55,false,_56);
}
}
this.onDisplayChanged();
return _57;
},queryCommandEnabled:function(_59){
if(this.disabled||!this._disabledOK){
return false;
}
_59=this._normalizeCommand(_59);
var _5a="_"+_59+"EnabledImpl";
if(this[_5a]){
return this[_5a](_59);
}else{
return this._browserQueryCommandEnabled(_59);
}
},queryCommandState:function(_5b){
if(this.disabled||!this._disabledOK){
return false;
}
_5b=this._normalizeCommand(_5b);
try{
return this.document.queryCommandState(_5b);
}
catch(e){
return false;
}
},queryCommandValue:function(_5c){
if(this.disabled||!this._disabledOK){
return false;
}
var r;
_5c=this._normalizeCommand(_5c);
if(has("ie")&&_5c==="formatblock"){
r=this._native2LocalFormatNames[this.document.queryCommandValue(_5c)];
}else{
if(has("mozilla")&&_5c==="hilitecolor"){
var _5d;
try{
_5d=this.document.queryCommandValue("styleWithCSS");
}
catch(e){
_5d=false;
}
this.document.execCommand("styleWithCSS",false,true);
r=this.document.queryCommandValue(_5c);
this.document.execCommand("styleWithCSS",false,_5d);
}else{
r=this.document.queryCommandValue(_5c);
}
}
return r;
},_sCall:function(_5e,_5f){
return this.selection[_5e].apply(this.selection,_5f);
},placeCursorAtStart:function(){
this.focus();
var _60=false;
if(has("mozilla")){
var _61=this.editNode.firstChild;
while(_61){
if(_61.nodeType===3){
if(_61.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_60=true;
this.selection.selectElement(_61);
break;
}
}else{
if(_61.nodeType===1){
_60=true;
var tg=_61.tagName?_61.tagName.toLowerCase():"";
if(/br|input|img|base|meta|area|basefont|hr|link/.test(tg)){
this.selection.selectElement(_61);
}else{
this.selection.selectElementChildren(_61);
}
break;
}
}
_61=_61.nextSibling;
}
}else{
_60=true;
this.selection.selectElementChildren(this.editNode);
}
if(_60){
this.selection.collapse(true);
}
},placeCursorAtEnd:function(){
this.focus();
var _62=false;
if(has("mozilla")){
var _63=this.editNode.lastChild;
while(_63){
if(_63.nodeType===3){
if(_63.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_62=true;
this.selection.selectElement(_63);
break;
}
}else{
if(_63.nodeType===1){
_62=true;
this.selection.selectElement(_63.lastChild||_63);
break;
}
}
_63=_63.previousSibling;
}
}else{
_62=true;
this.selection.selectElementChildren(this.editNode);
}
if(_62){
this.selection.collapse(false);
}
},getValue:function(_64){
if(this.textarea){
if(this.isClosed||!this.isLoaded){
return this.textarea.value;
}
}
return this.isLoaded?this._postFilterContent(null,_64):this.value;
},_getValueAttr:function(){
return this.getValue(true);
},setValue:function(_65){
if(!this.isLoaded){
this.onLoadDeferred.then(_d.hitch(this,function(){
this.setValue(_65);
}));
return;
}
this._cursorToStart=true;
if(this.textarea&&(this.isClosed||!this.isLoaded)){
this.textarea.value=_65;
}else{
_65=this._preFilterContent(_65);
var _66=this.isClosed?this.domNode:this.editNode;
_66.innerHTML=_65;
this._preDomFilterContent(_66);
}
this.onDisplayChanged();
this._set("value",this.getValue(true));
},replaceValue:function(_67){
if(this.isClosed){
this.setValue(_67);
}else{
if(this.window&&this.window.getSelection&&!has("mozilla")){
this.setValue(_67);
}else{
if(this.window&&this.window.getSelection){
_67=this._preFilterContent(_67);
this.execCommand("selectall");
this.execCommand("inserthtml",_67);
this._preDomFilterContent(this.editNode);
}else{
if(this.document&&this.document.selection){
this.setValue(_67);
}
}
}
}
this._set("value",this.getValue(true));
},_preFilterContent:function(_68){
var ec=_68;
_1.forEach(this.contentPreFilters,function(ef){
if(ef){
ec=ef(ec);
}
});
return ec;
},_preDomFilterContent:function(dom){
dom=dom||this.editNode;
_1.forEach(this.contentDomPreFilters,function(ef){
if(ef&&_d.isFunction(ef)){
ef(dom);
}
},this);
},_postFilterContent:function(dom,_69){
var ec;
if(!_d.isString(dom)){
dom=dom||this.editNode;
if(this.contentDomPostFilters.length){
if(_69){
dom=_d.clone(dom);
}
_1.forEach(this.contentDomPostFilters,function(ef){
dom=ef(dom);
});
}
ec=_18.getChildrenHtml(dom);
}else{
ec=dom;
}
if(!_d.trim(ec.replace(/^\xA0\xA0*/,"").replace(/\xA0\xA0*$/,"")).length){
ec="";
}
_1.forEach(this.contentPostFilters,function(ef){
ec=ef(ec);
});
return ec;
},_saveContent:function(){
var _6a=_5.byId(_1a._scopeName+"._editor.RichText.value");
if(_6a){
if(_6a.value){
_6a.value+=this._SEPARATOR;
}
_6a.value+=this.name+this._NAME_CONTENT_SEP+this.getValue(true);
}
},escapeXml:function(str,_6b){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_6b){
str=str.replace(/'/gm,"&#39;");
}
return str;
},getNodeHtml:function(_6c){
_b.deprecated("dijit.Editor::getNodeHtml is deprecated","use dijit/_editor/html::getNodeHtml instead",2);
return _18.getNodeHtml(_6c);
},getNodeChildrenHtml:function(dom){
_b.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated","use dijit/_editor/html::getChildrenHtml instead",2);
return _18.getChildrenHtml(dom);
},close:function(_6d){
if(this.isClosed){
return;
}
if(!arguments.length){
_6d=true;
}
if(_6d){
this._set("value",this.getValue(true));
}
if(this.interval){
clearInterval(this.interval);
}
if(this._webkitListener){
this._webkitListener.remove();
delete this._webkitListener;
}
if(has("ie")){
this.iframe.onfocus=null;
}
this.iframe._loadFunc=null;
if(this._iframeRegHandle){
this._iframeRegHandle.remove();
delete this._iframeRegHandle;
}
if(this.textarea){
var s=this.textarea.style;
s.position="";
s.left=s.top="";
if(has("ie")){
s.overflow=this.__overflow;
this.__overflow=null;
}
this.textarea.value=this.value;
_8.destroy(this.domNode);
this.domNode=this.textarea;
}else{
this.domNode.innerHTML=this.value;
}
delete this.iframe;
_7.remove(this.domNode,this.baseClass);
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
delete this.focusNode;
if(this.window&&this.window._frameElement){
this.window._frameElement=null;
}
this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
},destroy:function(){
if(!this.isClosed){
this.close(false);
}
if(this._updateTimer){
this._updateTimer.remove();
}
this.inherited(arguments);
if(_1b._globalSaveHandler){
delete _1b._globalSaveHandler[this.id];
}
},_removeMozBogus:function(_6e){
return _6e.replace(/\stype="_moz"/gi,"").replace(/\s_moz_dirty=""/gi,"").replace(/_moz_resizing="(true|false)"/gi,"");
},_removeWebkitBogus:function(_6f){
_6f=_6f.replace(/\sclass="webkit-block-placeholder"/gi,"");
_6f=_6f.replace(/\sclass="apple-style-span"/gi,"");
_6f=_6f.replace(/<meta charset=\"utf-8\" \/>/gi,"");
return _6f;
},_normalizeFontStyle:function(_70){
return _70.replace(/<(\/)?strong([ \>])/gi,"<$1b$2").replace(/<(\/)?em([ \>])/gi,"<$1i$2");
},_preFixUrlAttributes:function(_71){
return _71.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
},_browserQueryCommandEnabled:function(_72){
if(!_72){
return false;
}
var _73=has("ie")<9?this.document.selection.createRange():this.document;
try{
return _73.queryCommandEnabled(_72);
}
catch(e){
return false;
}
},_createlinkEnabledImpl:function(){
var _74=true;
if(has("opera")){
var sel=this.window.getSelection();
if(sel.isCollapsed){
_74=true;
}else{
_74=this.document.queryCommandEnabled("createlink");
}
}else{
_74=this._browserQueryCommandEnabled("createlink");
}
return _74;
},_unlinkEnabledImpl:function(){
var _75=true;
if(has("mozilla")||has("webkit")){
_75=this.selection.hasAncestorElement("a");
}else{
_75=this._browserQueryCommandEnabled("unlink");
}
return _75;
},_inserttableEnabledImpl:function(){
var _76=true;
if(has("mozilla")||has("webkit")){
_76=true;
}else{
_76=this._browserQueryCommandEnabled("inserttable");
}
return _76;
},_cutEnabledImpl:function(){
var _77=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_77=!!sel;
}else{
_77=this._browserQueryCommandEnabled("cut");
}
return _77;
},_copyEnabledImpl:function(){
var _78=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_78=!!sel;
}else{
_78=this._browserQueryCommandEnabled("copy");
}
return _78;
},_pasteEnabledImpl:function(){
var _79=true;
if(has("webkit")){
return true;
}else{
_79=this._browserQueryCommandEnabled("paste");
}
return _79;
},_inserthorizontalruleImpl:function(_7a){
if(has("ie")){
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule",false,_7a);
},_unlinkImpl:function(_7b){
if((this.queryCommandEnabled("unlink"))&&(has("mozilla")||has("webkit"))){
var a=this.selection.getAncestorElement("a");
this.selection.selectElement(a);
return this.document.execCommand("unlink",false,null);
}
return this.document.execCommand("unlink",false,_7b);
},_hilitecolorImpl:function(_7c){
var _7d;
var _7e=this._handleTextColorOrProperties("hilitecolor",_7c);
if(!_7e){
if(has("mozilla")){
this.document.execCommand("styleWithCSS",false,true);
_7d=this.document.execCommand("hilitecolor",false,_7c);
this.document.execCommand("styleWithCSS",false,false);
}else{
_7d=this.document.execCommand("hilitecolor",false,_7c);
}
}
return _7d;
},_backcolorImpl:function(_7f){
if(has("ie")){
_7f=_7f?_7f:null;
}
var _80=this._handleTextColorOrProperties("backcolor",_7f);
if(!_80){
_80=this.document.execCommand("backcolor",false,_7f);
}
return _80;
},_forecolorImpl:function(_81){
if(has("ie")){
_81=_81?_81:null;
}
var _82=false;
_82=this._handleTextColorOrProperties("forecolor",_81);
if(!_82){
_82=this.document.execCommand("forecolor",false,_81);
}
return _82;
},_inserthtmlImpl:function(_83){
_83=this._preFilterContent(_83);
var rv=true;
if(has("ie")<9){
var _84=this.document.selection.createRange();
if(this.document.selection.type.toUpperCase()==="CONTROL"){
var n=_84.item(0);
while(_84.length){
_84.remove(_84.item(0));
}
n.outerHTML=_83;
}else{
_84.pasteHTML(_83);
}
_84.select();
}else{
if(has("trident")<8){
var _84;
var _85=_17.getSelection(this.window);
if(_85&&_85.rangeCount&&_85.getRangeAt){
_84=_85.getRangeAt(0);
_84.deleteContents();
var div=_8.create("div");
div.innerHTML=_83;
var _86,_87;
var n=this.document.createDocumentFragment();
while((_86=div.firstChild)){
_87=n.appendChild(_86);
}
_84.insertNode(n);
if(_87){
_84=_84.cloneRange();
_84.setStartAfter(_87);
_84.collapse(false);
_85.removeAllRanges();
_85.addRange(_84);
}
}
}else{
if(has("mozilla")&&!_83.length){
this.selection.remove();
}else{
rv=this.document.execCommand("inserthtml",false,_83);
}
}
}
return rv;
},_boldImpl:function(_88){
var _89=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_89=this._adaptIEFormatAreaAndExec("bold");
}
if(!_89){
_89=this.document.execCommand("bold",false,_88);
}
return _89;
},_italicImpl:function(_8a){
var _8b=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_8b=this._adaptIEFormatAreaAndExec("italic");
}
if(!_8b){
_8b=this.document.execCommand("italic",false,_8a);
}
return _8b;
},_underlineImpl:function(_8c){
var _8d=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_8d=this._adaptIEFormatAreaAndExec("underline");
}
if(!_8d){
_8d=this.document.execCommand("underline",false,_8c);
}
return _8d;
},_strikethroughImpl:function(_8e){
var _8f=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_8f=this._adaptIEFormatAreaAndExec("strikethrough");
}
if(!_8f){
_8f=this.document.execCommand("strikethrough",false,_8e);
}
return _8f;
},_superscriptImpl:function(_90){
var _91=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_91=this._adaptIEFormatAreaAndExec("superscript");
}
if(!_91){
_91=this.document.execCommand("superscript",false,_90);
}
return _91;
},_subscriptImpl:function(_92){
var _93=false;
if(has("ie")||has("trident")){
this._adaptIESelection();
_93=this._adaptIEFormatAreaAndExec("subscript");
}
if(!_93){
_93=this.document.execCommand("subscript",false,_92);
}
return _93;
},_fontnameImpl:function(_94){
var _95;
if(has("ie")||has("trident")){
_95=this._handleTextColorOrProperties("fontname",_94);
}
if(!_95){
_95=this.document.execCommand("fontname",false,_94);
}
return _95;
},_fontsizeImpl:function(_96){
var _97;
if(has("ie")||has("trident")){
_97=this._handleTextColorOrProperties("fontsize",_96);
}
if(!_97){
_97=this.document.execCommand("fontsize",false,_96);
}
return _97;
},_insertorderedlistImpl:function(_98){
var _99=false;
if(has("ie")||has("trident")||has("edge")){
_99=this._adaptIEList("insertorderedlist",_98);
}
if(!_99){
_99=this.document.execCommand("insertorderedlist",false,_98);
}
return _99;
},_insertunorderedlistImpl:function(_9a){
var _9b=false;
if(has("ie")||has("trident")||has("edge")){
_9b=this._adaptIEList("insertunorderedlist",_9a);
}
if(!_9b){
_9b=this.document.execCommand("insertunorderedlist",false,_9a);
}
return _9b;
},getHeaderHeight:function(){
return this._getNodeChildrenHeight(this.header);
},getFooterHeight:function(){
return this._getNodeChildrenHeight(this.footer);
},_getNodeChildrenHeight:function(_9c){
var h=0;
if(_9c&&_9c.childNodes){
var i;
for(i=0;i<_9c.childNodes.length;i++){
var _9d=_9.position(_9c.childNodes[i]);
h+=_9d.h;
}
}
return h;
},_isNodeEmpty:function(_9e,_9f){
if(_9e.nodeType===1){
if(_9e.childNodes.length>0){
return this._isNodeEmpty(_9e.childNodes[0],_9f);
}
return true;
}else{
if(_9e.nodeType===3){
return (_9e.nodeValue.substring(_9f)==="");
}
}
return false;
},_removeStartingRangeFromRange:function(_a0,_a1){
if(_a0.nextSibling){
_a1.setStart(_a0.nextSibling,0);
}else{
var _a2=_a0.parentNode;
while(_a2&&_a2.nextSibling==null){
_a2=_a2.parentNode;
}
if(_a2){
_a1.setStart(_a2.nextSibling,0);
}
}
return _a1;
},_adaptIESelection:function(){
var _a3=_17.getSelection(this.window);
if(_a3&&_a3.rangeCount&&!_a3.isCollapsed){
var _a4=_a3.getRangeAt(0);
var _a5=_a4.startContainer;
var _a6=_a4.startOffset;
while(_a5.nodeType===3&&_a6>=_a5.length&&_a5.nextSibling){
_a6=_a6-_a5.length;
_a5=_a5.nextSibling;
}
var _a7=null;
while(this._isNodeEmpty(_a5,_a6)&&_a5!==_a7){
_a7=_a5;
_a4=this._removeStartingRangeFromRange(_a5,_a4);
_a5=_a4.startContainer;
_a6=0;
}
_a3.removeAllRanges();
_a3.addRange(_a4);
}
},_adaptIEFormatAreaAndExec:function(_a8){
var _a9=_17.getSelection(this.window);
var doc=this.document;
var rs,ret,_aa,txt,_ab,_ac,_ad,_ae;
if(_a8&&_a9&&_a9.isCollapsed){
var _af=this.queryCommandValue(_a8);
if(_af){
var _b0=this._tagNamesForCommand(_a8);
_aa=_a9.getRangeAt(0);
var fs=_aa.startContainer;
if(fs.nodeType===3){
var _b1=_aa.endOffset;
if(fs.length<_b1){
ret=this._adjustNodeAndOffset(rs,_b1);
fs=ret.node;
_b1=ret.offset;
}
}
var _b2;
while(fs&&fs!==this.editNode){
var _b3=fs.tagName?fs.tagName.toLowerCase():"";
if(_1.indexOf(_b0,_b3)>-1){
_b2=fs;
break;
}
fs=fs.parentNode;
}
if(_b2){
rs=_aa.startContainer;
var _b4=doc.createElement(_b2.tagName);
_8.place(_b4,_b2,"after");
if(rs&&rs.nodeType===3){
var _b5,_b6;
var _b7=_aa.endOffset;
if(rs.length<_b7){
ret=this._adjustNodeAndOffset(rs,_b7);
rs=ret.node;
_b7=ret.offset;
}
txt=rs.nodeValue;
_ab=doc.createTextNode(txt.substring(0,_b7));
var _b8=txt.substring(_b7,txt.length);
if(_b8){
_ac=doc.createTextNode(_b8);
}
_8.place(_ab,rs,"before");
if(_ac){
_ad=doc.createElement("span");
_ad.className="ieFormatBreakerSpan";
_8.place(_ad,rs,"after");
_8.place(_ac,_ad,"after");
_ac=_ad;
}
_8.destroy(rs);
var _b9=_ab.parentNode;
var _ba=[];
var _bb;
while(_b9!==_b2){
var tg=_b9.tagName;
_bb={tagName:tg};
_ba.push(_bb);
var _bc=doc.createElement(tg);
if(_b9.style){
if(_bc.style){
if(_b9.style.cssText){
_bc.style.cssText=_b9.style.cssText;
_bb.cssText=_b9.style.cssText;
}
}
}
if(_b9.tagName==="FONT"){
if(_b9.color){
_bc.color=_b9.color;
_bb.color=_b9.color;
}
if(_b9.face){
_bc.face=_b9.face;
_bb.face=_b9.face;
}
if(_b9.size){
_bc.size=_b9.size;
_bb.size=_b9.size;
}
}
if(_b9.className){
_bc.className=_b9.className;
_bb.className=_b9.className;
}
if(_ac){
_b5=_ac;
while(_b5){
_b6=_b5.nextSibling;
_bc.appendChild(_b5);
_b5=_b6;
}
}
if(_bc.tagName==_b9.tagName){
_ad=doc.createElement("span");
_ad.className="ieFormatBreakerSpan";
_8.place(_ad,_b9,"after");
_8.place(_bc,_ad,"after");
}else{
_8.place(_bc,_b9,"after");
}
_ab=_b9;
_ac=_bc;
_b9=_b9.parentNode;
}
if(_ac){
_b5=_ac;
if(_b5.nodeType===1||(_b5.nodeType===3&&_b5.nodeValue)){
_b4.innerHTML="";
}
while(_b5){
_b6=_b5.nextSibling;
_b4.appendChild(_b5);
_b5=_b6;
}
}
var _bd;
if(_ba.length){
_bb=_ba.pop();
var _be=doc.createElement(_bb.tagName);
if(_bb.cssText&&_be.style){
_be.style.cssText=_bb.cssText;
}
if(_bb.className){
_be.className=_bb.className;
}
if(_bb.tagName==="FONT"){
if(_bb.color){
_be.color=_bb.color;
}
if(_bb.face){
_be.face=_bb.face;
}
if(_bb.size){
_be.size=_bb.size;
}
}
_8.place(_be,_b4,"before");
while(_ba.length){
_bb=_ba.pop();
var _bf=doc.createElement(_bb.tagName);
if(_bb.cssText&&_bf.style){
_bf.style.cssText=_bb.cssText;
}
if(_bb.className){
_bf.className=_bb.className;
}
if(_bb.tagName==="FONT"){
if(_bb.color){
_bf.color=_bb.color;
}
if(_bb.face){
_bf.face=_bb.face;
}
if(_bb.size){
_bf.size=_bb.size;
}
}
_be.appendChild(_bf);
_be=_bf;
}
_ae=doc.createTextNode(".");
_ad.appendChild(_ae);
_be.appendChild(_ae);
_bd=_17.create(this.window);
_bd.setStart(_ae,0);
_bd.setEnd(_ae,_ae.length);
_a9.removeAllRanges();
_a9.addRange(_bd);
this.selection.collapse(false);
_ae.parentNode.innerHTML="";
}else{
_ad=doc.createElement("span");
_ad.className="ieFormatBreakerSpan";
_ae=doc.createTextNode(".");
_ad.appendChild(_ae);
_8.place(_ad,_b4,"before");
_bd=_17.create(this.window);
_bd.setStart(_ae,0);
_bd.setEnd(_ae,_ae.length);
_a9.removeAllRanges();
_a9.addRange(_bd);
this.selection.collapse(false);
_ae.parentNode.innerHTML="";
}
if(!_b4.firstChild){
_8.destroy(_b4);
}
return true;
}
}
return false;
}else{
_aa=_a9.getRangeAt(0);
rs=_aa.startContainer;
if(rs&&rs.nodeType===3){
var _b1=_aa.startOffset;
if(rs.length<_b1){
ret=this._adjustNodeAndOffset(rs,_b1);
rs=ret.node;
_b1=ret.offset;
}
txt=rs.nodeValue;
_ab=doc.createTextNode(txt.substring(0,_b1));
var _b8=txt.substring(_b1);
if(_b8!==""){
_ac=doc.createTextNode(txt.substring(_b1));
}
_ad=doc.createElement("span");
_ae=doc.createTextNode(".");
_ad.appendChild(_ae);
if(_ab.length){
_8.place(_ab,rs,"after");
}else{
_ab=rs;
}
_8.place(_ad,_ab,"after");
if(_ac){
_8.place(_ac,_ad,"after");
}
_8.destroy(rs);
var _bd=_17.create(this.window);
_bd.setStart(_ae,0);
_bd.setEnd(_ae,_ae.length);
_a9.removeAllRanges();
_a9.addRange(_bd);
doc.execCommand(_a8);
_8.place(_ad.firstChild,_ad,"before");
_8.destroy(_ad);
_bd.setStart(_ae,0);
_bd.setEnd(_ae,_ae.length);
_a9.removeAllRanges();
_a9.addRange(_bd);
this.selection.collapse(false);
_ae.parentNode.innerHTML="";
return true;
}
}
}else{
return false;
}
},_adaptIEList:function(_c0){
var _c1=_17.getSelection(this.window);
if(_c1.isCollapsed){
if(_c1.rangeCount&&!this.queryCommandValue(_c0)){
var _c2=_c1.getRangeAt(0);
var sc=_c2.startContainer;
if(sc&&sc.nodeType==3){
if(!_c2.startOffset){
var _c3="ul";
if(_c0==="insertorderedlist"){
_c3="ol";
}
var _c4=this.document.createElement(_c3);
var li=_8.create("li",null,_c4);
_8.place(_c4,sc,"before");
li.appendChild(sc);
_8.create("br",null,_c4,"after");
var _c5=_17.create(this.window);
_c5.setStart(sc,0);
_c5.setEnd(sc,sc.length);
_c1.removeAllRanges();
_c1.addRange(_c5);
this.selection.collapse(true);
return true;
}
}
}
}
return false;
},_handleTextColorOrProperties:function(_c6,_c7){
var _c8=_17.getSelection(this.window);
var doc=this.document;
var rs,ret,_c9,txt,_ca,_cb,_cc,_cd;
_c7=_c7||null;
if(_c6&&_c8&&_c8.isCollapsed){
if(_c8.rangeCount){
_c9=_c8.getRangeAt(0);
rs=_c9.startContainer;
if(rs&&rs.nodeType===3){
var _ce=_c9.startOffset;
if(rs.length<_ce){
ret=this._adjustNodeAndOffset(rs,_ce);
rs=ret.node;
_ce=ret.offset;
}
txt=rs.nodeValue;
_ca=doc.createTextNode(txt.substring(0,_ce));
var _cf=txt.substring(_ce);
if(_cf!==""){
_cb=doc.createTextNode(txt.substring(_ce));
}
_cc=doc.createElement("span");
_cd=doc.createTextNode(".");
_cc.appendChild(_cd);
var _d0=doc.createElement("span");
_cc.appendChild(_d0);
if(_ca.length){
_8.place(_ca,rs,"after");
}else{
_ca=rs;
}
_8.place(_cc,_ca,"after");
if(_cb){
_8.place(_cb,_cc,"after");
}
_8.destroy(rs);
var _d1=_17.create(this.window);
_d1.setStart(_cd,0);
_d1.setEnd(_cd,_cd.length);
_c8.removeAllRanges();
_c8.addRange(_d1);
if(has("webkit")){
var _d2="color";
if(_c6==="hilitecolor"||_c6==="backcolor"){
_d2="backgroundColor";
}
_a.set(_cc,_d2,_c7);
this.selection.remove();
_8.destroy(_d0);
_cc.innerHTML="&#160;";
this.selection.selectElement(_cc);
this.focus();
}else{
this.execCommand(_c6,_c7);
_8.place(_cc.firstChild,_cc,"before");
_8.destroy(_cc);
_d1.setStart(_cd,0);
_d1.setEnd(_cd,_cd.length);
_c8.removeAllRanges();
_c8.addRange(_d1);
this.selection.collapse(false);
_cd.parentNode.removeChild(_cd);
}
return true;
}
}
}
return false;
},_adjustNodeAndOffset:function(_d3,_d4){
while(_d3.length<_d4&&_d3.nextSibling&&_d3.nextSibling.nodeType===3){
_d4=_d4-_d3.length;
_d3=_d3.nextSibling;
}
return {"node":_d3,"offset":_d4};
},_tagNamesForCommand:function(_d5){
if(_d5==="bold"){
return ["b","strong"];
}else{
if(_d5==="italic"){
return ["i","em"];
}else{
if(_d5==="strikethrough"){
return ["s","strike"];
}else{
if(_d5==="superscript"){
return ["sup"];
}else{
if(_d5==="subscript"){
return ["sub"];
}else{
if(_d5==="underline"){
return ["u"];
}
}
}
}
}
}
return [];
},_stripBreakerNodes:function(_d6){
if(!this.isLoaded){
return;
}
_e(".ieFormatBreakerSpan",_d6).forEach(function(b){
while(b.firstChild){
_8.place(b.firstChild,b,"before");
}
_8.destroy(b);
});
return _d6;
},_stripTrailingEmptyNodes:function(_d7){
function _d8(_d9){
return (/^(p|div|br)$/i.test(_d9.nodeName)&&_d9.children.length==0&&/^[\s\xA0]*$/.test(_d9.textContent||_d9.innerText||""))||(_d9.nodeType===3&&/^[\s\xA0]*$/.test(_d9.nodeValue));
};
while(_d7.lastChild&&_d8(_d7.lastChild)){
_8.destroy(_d7.lastChild);
}
return _d7;
}});
return _1b;
});
