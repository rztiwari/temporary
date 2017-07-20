require([
  "dojo/_base/declare", "dijit/_WidgetBase",
  "dijit/_TemplatedMixin", "dojo/topic"
], function(declare, _WidgetBase, _TemplatedMixin, topic){

  declare("Navsteps", [_WidgetBase, _TemplatedMixin], {

    templateString:  '<div class="mm-nav-wizard noPrint">' +
    '  <ul id="mm-nav-steps" class="mm-nav-steps nav nav-pills nav-justified">  '  +
    '      <li role="presentation" class="mm-nav-step active disabled"><a role="button" href="#" tabindex="-1" style="pointer-events: none;">1. Transfer details</a></li>  '  +
    '      <li role="presentation" class="mm-nav-step disabled"><a role="button" href="#" tabindex="-1" style="pointer-events: none;">2. Verify</a></li>  '  +
    '      <li role="presentation" class="mm-nav-step disabled"><a role="button" href="#" tabindex="-1" style="pointer-events: none;">3. Confirmation</a></li>  '  +
    '  </ul>  ' +
    '  <div id="min-mm-nav-steps" class="min-navsteps">  '  +
    '   <div class="min-nav-step active"></div>  '  +
    '   <div class="min-nav-step"></div>  '  +
    '   <div class="min-nav-step"></div>  '  +
    '  </div>  ' +
    ' </div> ',
    postCreate: function() {
      function adjust() {
        // if (document.body.scrollTop > 71 || document.documentElement.scrollTop > 71) {
        if (window.pageYOffset > 71) {
          document.getElementById("mm-nav-steps").className = "mm-nav-steps nav nav-pills nav-justified scroll-mode";
          document.getElementById("min-mm-nav-steps").className = "min-navsteps scroll-mode";
        } else {
          document.getElementById("mm-nav-steps").className = "mm-nav-steps nav nav-pills nav-justified";
          document.getElementById("min-mm-nav-steps").className = "min-navsteps";
        }
      }
      adjust();
      topic.subscribe("/window/scroll", function(data) {
        adjust();
      });
    }
  });
});
