require([
  "dojo/_base/declare", "dijit/_WidgetBase",
  "dijit/_TemplatedMixin", "dojo/on", "dojo/topic"
], function(declare, _WidgetBase, _TemplatedMixin, on, topic){

  declare("Footer", [_WidgetBase, _TemplatedMixin], {

    templateString:   '   <div class="mm-sticky-footer">  '  +
    '      <button class="btn btn default">Close</button>  '  +
    '      <button class="btn btn default pull-right">Continue</button>  '  +
    '  </div>  ',
    postCreate: function() {
      console.log('asdsa');
      function adjust() {

        // if (document.body.scrollTop > 61 || document.documentElement.scrollTop > 61) {
        if (window.pageYOffset < 422) {
          document.getElementById("mm-sticky-footer").className = "mm-sticky-footer scroll-mode";
        } else {
          document.getElementById("mm-sticky-footer").className = "mm-sticky-footer";
        }
      }
      adjust();
      topic.subscribe("/window/scroll", function(data) {
        adjust();
      });
    }
  });
});
