require([
  "dojo/_base/declare", "dojo/parser", "dojo/ready",
  "dijit/_WidgetBase", "dijit/_TemplatedMixin"
], function(declare, parser, ready, _WidgetBase, _TemplatedMixin){

  declare("Navbar1", [_WidgetBase, _TemplatedMixin], {

    templateString:  '   <nav class="navbar navbar-default">  '  +
    '     <div class="container-fluid">  '  +
    '       <div class="navbar-header">  '  +
    '         <a class="navbar-brand" href="#">WebSiteName</a>  '  +
    '       </div>  '  +
    '       <ul class="nav navbar-nav">  '  +
    '         <li class="active"><a href="#">Home</a></li>  '  +
    '         <li><a href="#">Page 1</a></li>  '  +
    '         <li><a href="#">Page 2</a></li>  '  +
    '         <li><a href="#">Page 3</a></li>  '  +
    '       </ul>  '  +
    '     </div>  '  +
    '  </nav>  ',
    postCreate: function() {

    }
  });
});
