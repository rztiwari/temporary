require([
  "dojo/_base/declare", "dijit/_WidgetBase",
  "dijit/_TemplatedMixin", "dojo/on", "dojo/topic"
], function(declare, _WidgetBase, _TemplatedMixin, on, topic){

  declare("Navbar", [_WidgetBase, _TemplatedMixin], {

    templateString:   '   <nav class="navbar navbar-fixed-top">  '  +
    '               <div id="header-container" class="container navbar-container">  '  +
    '                   <div class="navbar-header">  '  +
    '                       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">  '  +
    '                           <span class="sr-only">Toggle navigation</span>  '  +
    '                           <span class="icon-bar"></span>  '  +
    '                           <span class="icon-bar"></span>  '  +
    '                           <span class="icon-bar"></span>  '  +
    '                       </button>  '  +
    '                       <a id="brand" class="navbar-brand" href="#">HSBCnet</a>  '  +
    '                   </div>  '  +
    '               </div><!-- /.container -->  '  +
    '          </nav>  ',
    postCreate: function() {
      function adjust() {
        // if (document.body.scrollTop > 61 || document.documentElement.scrollTop > 61) {
        if (window.pageYOffset > 61) {
          document.getElementById("navbar").className = "navbar navbar-fixed-top scroll-mode";
        } else {
          document.getElementById("navbar").className = "navbar navbar-fixed-top";
        }
      }
      adjust();
      topic.subscribe("/window/scroll", function(data) {
        adjust();
      });
    }
  });
});
