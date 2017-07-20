require([
  "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin"
], function(declare, _WidgetBase, _TemplatedMixin){

  var treeNode = declare("TreeNode", [_WidgetBase, _TemplatedMixin], {

    templateString:  '   <div class="mm">  '  +
    '       <div class="container main">  '  +
    '           <div class="row">  '  +
    '               <div id="Navsteps"></div>  '  +
    '           </div>  '  +
    '           <div class="row">  '  +
    '               <div id="repair-note"></div>  '  +
    '           </div>  '  +
    '           <div class="row">  '  +
    '               <div id="AdditionalDetails"></div>  '  +
    '           </div>  '  +
    '           <div class="row">  '  +
    '               <div id="mm-sticky-footer"></div>  '  +
    '           </div>  '  +
    '           <div>  '  +
    '               <button id="changeHash">Change Route</button>  '  +
    '               <p id="output"></p>  '  +
    '           </div>  '  +
    '       </div>  '  +
    '  </div>  ',
    postCreate: function() {

    }
  });

  return treeNode;
});
