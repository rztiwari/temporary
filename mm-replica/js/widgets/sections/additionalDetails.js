require([
  "dojo/_base/declare", "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
], function(declare, _WidgetBase, _TemplatedMixin){

  declare("AdditionalDetails", [_WidgetBase, _TemplatedMixin], {
    widgetsInTemplate: true,
    templateString:   '   <div class="section">  '  +
    '      <div class="row">  '  +
    '         <div class="col-md-6">  '  +
    '            <header>Additional details</header>  '  +
    '         </div>  '  +
    '         <div class="col-md-6"><span class="pull-right"><small><b>* Required Information</b></small></span></div>  '  +
    '      </div>  '  +
    '      <div class="row">  '  +
    '         <div class="col-md-12">  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Information for the beneficiary</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6">  '  +
    '                     <div class="form-group has-feedback">  '  +
    '                        <input tabindex="3" type="text" value="" id="addressText" class="form-control" /> '  +
    '                        <!-- react-empty: 4821 -->  '  +
    '                     </div>  '  +
    '                  </div>  '  +
    '               </div>  '  +
    '            </div>  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Instruction to bank</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6 form-group"><select tabindex="2" id="formControlsSelect" class="form-control"></select></div>  '  +
    '               </div>  '  +
    '            </div>  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Instruction code</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6 form-group"><select tabindex="1" id="formControlsSelect" class="form-control"></select></div>  '  +
    '               </div>  '  +
    '            </div>  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Intermediary bank details</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6 form-group">  '  +
    '                     <button tabindex class="btn btn-default mm-btn-default" data-dojo-attach-event="onclick: openModal">  '  +
    '                        <i class="glyphicon glyphicon-plus"></i> Add '  +
    '                     </button>  '  +
    '                  </div>  '  +
    '               </div>  '  +
    '            </div>  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Regulatory Requirements</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6 form-group">  '  +
    '                     <button tabindex class="btn btn-default mm-btn-default" data-dojo-attach-event="onclick: openModal">  '  +
    '                        <i class="glyphicon glyphicon-plus"></i> Add '  +
    '                     </button>  '  +
    '                  </div>  '  +
    '               </div>  '  +
    '            </div>  '  +
    '            <div class="row">  '  +
    '               <div class="col-md-4 col-sm-4"><label class="control-label">Advising</label></div>  '  +
    '               <div class="col-md-8 col-sm-8">  '  +
    '                  <div class="col-md-6 form-group">  '  +
    '                     <button tabindex class="btn btn-default mm-btn-default" data-dojo-attach-event="onclick: openWindow">  '  +
    '                        <i class="glyphicon glyphicon-export"></i> Add '  +
    '                     </button>  '  +
    '                  </div>  '  +
    '                  <div id="rdata" class="col-md-12 well"> ' +
    '                  </div> ' +
    '               </div>  '  +
    '            </div>  '  +
    '         </div>  '  +
    '      </div>  '  +
    '   <form id="recievedData">  '  +
    '      <input type="hidden" id="fname1"/>  '  +
    '      <input type="hidden" id="lname1"/>  '  +
    '  </form>  ' +
    '  </div>  ',
    openModal: function() {
      mmDialog.show();
    },
    postCreate: function() {

    },
    openWindow: function() {
      window.open("http://heritage.hsbc.com/legacy.html", "_blank", "width=600,height=600");
      window.addEventListener("focus", function(event){
        document.getElementById("rdata").innerHTML = document.getElementById("fname1").value + ' ' + document.getElementById("lname1").value;
      });
    }
  });
});
