//>>built
require({cache:{"url:dojox/calendar/templates/ColumnViewSecondarySheet.html":"<div data-dojo-attach-events=\"keydown:_onKeyDown\">\n\t<div  data-dojo-attach-point=\"rowHeader\" class=\"dojoxCalendarRowHeader\">\n\t\t<table data-dojo-attach-point=\"rowHeaderTable\" class=\"dojoxCalendarRowHeaderTable\" cellpadding=\"0\" cellspacing=\"0\"></table>\n\t</div>\t\n\t<div data-dojo-attach-point=\"grid\" class=\"dojoxCalendarGrid\">\n\t\t<table data-dojo-attach-point=\"gridTable\" class=\"dojoxCalendarGridTable\" cellpadding=\"0\" cellspacing=\"0\"></table>\n\t</div>\n\t<div data-dojo-attach-point=\"itemContainer\" class=\"dojoxCalendarContainer\" data-dojo-attach-event=\"mousedown:_onGridMouseDown,mouseup:_onGridMouseUp,ondblclick:_onGridDoubleClick,touchstart:_onGridTouchStart,touchmove:_onGridTouchMove,touchend:_onGridTouchEnd\">\n\t\t<table data-dojo-attach-point=\"itemContainerTable\" class=\"dojoxCalendarContainerTable\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\"></table>\n\t</div>\n</div>\n"}});
define("dojox/calendar/ColumnViewSecondarySheet",["dojo/_base/array","dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dojo/dom-geometry","dojo/dom-style","dojox/calendar/MatrixView","dojo/text!./templates/ColumnViewSecondarySheet.html"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _2("dojox.calendar.ColumnViewSecondarySheet",_7,{templateString:_8,rowCount:1,cellPaddingTop:4,roundToDay:false,_defaultHeight:-1,layoutDuringResize:true,_defaultItemToRendererKindFunc:function(_9){
return _9.allDay?"horizontal":null;
},_formatGridCellLabel:function(){
return null;
},_formatRowHeaderLabel:function(){
return null;
},__fixEvt:function(e){
e.sheet="secondary";
e.source=this;
return e;
},_dispatchCalendarEvt:function(e,_a){
e=this.inherited(arguments);
if(this.owner.owner){
this.owner.owner[_a](e);
}
},_layoutExpandRenderers:function(_b,_c,_d){
if(!this.expandRenderer){
return;
}
var h=_5.getMarginBox(this.domNode).h;
if(this._defaultHeight==-1||this._defaultHeight===0){
this._defaultHeight=h;
}
if(this._defaultHeight!=h&&h>=this._getExpandedHeight()||this._expandedRowCol!==undefined&&this._expandedRowCol!==-1){
var _e=this._expandedRowCol;
if(_e>=this.renderData.columnCount){
_e=0;
}
this._layoutExpandRendererImpl(0,_e,null,true);
}else{
this.inherited(arguments);
}
},expandRendererClickHandler:function(e,_f){
_3.stop(e);
var h=_5.getMarginBox(this.domNode).h;
var _10=this._getExpandedHeight();
if(this._defaultHeight==h||h<_10){
this._expandedRowCol=_f.columnIndex;
this.owner.resizeSecondarySheet(_10);
}else{
delete this._expandedRowCol;
this.owner.resizeSecondarySheet(this._defaultHeight);
}
},_getExpandedHeight:function(){
return (this.naturalRowsHeight&&this.naturalRowsHeight.length>0?this.naturalRowsHeight[0]:0)+this.expandRendererHeight+this.verticalGap+this.verticalGap;
},_layoutRenderers:function(_11){
if(!this._domReady){
return;
}
this.inherited(arguments);
if(!_11.items||_11.items.length===0){
this._layoutExpandRenderers(0,false,null);
}
}});
});
