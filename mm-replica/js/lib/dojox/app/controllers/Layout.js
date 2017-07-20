//>>built
define("dojox/app/controllers/Layout",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/query","dojo/dom-geometry","dojo/dom-attr","dojo/dom-style","dijit/registry","./LayoutBase","../utils/layout","../utils/constraints","dojo/sniff"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
return _1("dojox.app.controllers.Layout",_a,{constructor:function(_e,_f){
},onResize:function(){
this._doResize(this.app);
this.resizeSelectedChildren(this.app);
},resizeSelectedChildren:function(w){
for(var _10 in w.selectedChildren){
if(w.selectedChildren[_10]&&w.selectedChildren[_10].domNode){
this.app.log("in Layout resizeSelectedChildren calling resizeSelectedChildren calling _doResize for w.selectedChildren[hash].id="+w.selectedChildren[_10].id);
this._doResize(w.selectedChildren[_10]);
_3.forEach(w.selectedChildren[_10].domNode.children,function(_11){
if(_9.byId(_11.id)&&_9.byId(_11.id).resize){
_9.byId(_11.id).resize();
}
});
this.resizeSelectedChildren(w.selectedChildren[_10]);
}
}
},initLayout:function(_12){
this.app.log("in app/controllers/Layout.initLayout event=",_12);
this.app.log("in app/controllers/Layout.initLayout event.view.parent.name=[",_12.view.parent.name,"]");
if(!_12.view.domNode.parentNode||(_d("ie")==8&&!_12.view.domNode.parentElement)){
_12.view.parent.domNode.appendChild(_12.view.domNode);
}
_7.set(_12.view.domNode,"data-app-constraint",_12.view.constraint);
this.inherited(arguments);
},_doResize:function(_13){
var _14=_13.domNode;
if(!_14){
this.app.log("Warning - View has not been loaded, in Layout _doResize view.domNode is not set for view.id="+_13.id+" view=",_13);
return;
}
var mb={};
if(!("h" in mb)||!("w" in mb)){
mb=_2.mixin(_6.getMarginBox(_14),mb);
}
if(_13!==this.app){
var cs=_8.getComputedStyle(_14);
var me=_6.getMarginExtents(_14,cs);
var be=_6.getBorderExtents(_14,cs);
var bb=(_13._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_6.getPadExtents(_14,cs);
_13._contentBox={l:_8.toPixelValue(_14,cs.paddingLeft),t:_8.toPixelValue(_14,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
}else{
_13._contentBox={l:0,t:0,h:_4.global.innerHeight||_4.doc.documentElement.clientHeight,w:_4.global.innerWidth||_4.doc.documentElement.clientWidth};
}
this.inherited(arguments);
},layoutView:function(_15){
if(_15.view){
this.inherited(arguments);
if(_15.doResize){
this._doResize(_15.parent||this.app);
this._doResize(_15.view);
}
}
},_doLayout:function(_16){
if(!_16){
console.warn("layout empty view.");
return;
}
this.app.log("in Layout _doLayout called for view.id="+_16.id+" view=",_16);
var _17;
var _18=_c.getSelectedChild(_16,_16.constraint);
if(_18&&_18.isFullScreen){
console.warn("fullscreen sceen layout");
}else{
_17=_5("> [data-app-constraint]",_16.domNode).map(function(_19){
var w=_9.getEnclosingWidget(_19);
if(w){
w._constraint=_7.get(_19,"data-app-constraint");
return w;
}
return {domNode:_19,_constraint:_7.get(_19,"data-app-constraint")};
});
if(_18){
_17=_3.filter(_17,function(c){
return c.domNode&&c._constraint;
},_16);
}
}
if(_16._contentBox){
_b.layoutChildren(_16.domNode,_16._contentBox,_17);
}
}});
});
