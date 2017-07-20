require([
  "dojo/_base/declare", "dojo/dom-construct",
  "dijit/_WidgetBase", "dojo/on", "dojo/ready", "dojo/_base/window", "dojo/topic"
], function(declare, domConstruct, _WidgetBase, on, ready, win, topic){

  declare("ScrollListener", [_WidgetBase], {
    buildRendering: function(){
      this.domNode = domConstruct.create("div", {innerHTML: ''});
    },

    postCreate: function(){
      on(window, "scroll", function(e){topic.publish("/window/scroll", '')});
    }
  });

  ready(function(){
    (new ScrollListener()).placeAt(win.body());
  });
});
