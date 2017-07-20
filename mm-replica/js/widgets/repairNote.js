require([
  "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/on", "dojo/topic"
], function(declare, _WidgetBase, _TemplatedMixin, on, topic){

  declare("RepairNote", [_WidgetBase, _TemplatedMixin], {

    templateString: '   <div class="repair-note">  '  +
    '      <div class="row">  '  +
    '         <div class="col-md-1 col-sm-1"><i class="glyphicon glyphicon-exclamation-sign"></i></div>  '  +
    '         <div class="col-md-11 col-sm-11">  '  +
    '            <h4><b>Warning</b></h4>  '  +
    '            <ol>  '  +
    '               <li><b>HSBC encourages customers to submit payments as early in the day as possible. This will allow for fraud monitoring checks  to be completed and any payment queries to be answered in order to achieve your requested value date.</b></li>  '  +
    '               <li><b>You may have additional debit accounts that are not listed here. If you cannot find the account you would like to pay from, please return to the payment and transfers tool to create your payment or template. (PBS001)</b></li>  '  +
    '            </ol>  '  +
    '         </div>  '  +
    '      </div>  '  +
    '  </div>  ',

    postCreate: function() {
      function adjust() {
        // if (document.body.scrollTop > 71 || document.documentElement.scrollTop > 71) {
        if (window.pageYOffset > 71) {
          document.getElementById("repair-note").className = "repair-note scroll-mode";
        } else {
          document.getElementById("repair-note").className = "repair-note";
        }
      }
      adjust();
      topic.subscribe("/window/scroll", function(data) {
        adjust();
      });
    }
  });
});
