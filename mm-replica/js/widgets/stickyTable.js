require([
  "dojo/_base/declare", "dijit/_WidgetBase",
  "dijit/_TemplatedMixin", "dojo/on", "dojo/topic", "dojo"
], function(declare, _WidgetBase, _TemplatedMixin, on, topic, dojo){

  declare("StickyTable", [_WidgetBase, _TemplatedMixin], {

    templateString:    '   <table class="table stickyHeader">  '  +
    '      <thead>  '  +
    '         <tr>  '  +
    '            <th>Firstname</th>  '  +
    '            <th>Lastname</th>  '  +
    '            <th>Email</th>  '  +
    '         </tr>  '  +
    '      </thead>  '  +
    '      <tbody>  '  +
    '         <tr>  '  +
    '            <td>John</td>  '  +
    '            <td>Doe</td>  '  +
    '            <td>john@example.com</td>  '  +
    '         </tr>  '  +
    '         <tr>  '  +
    '            <td>Mary</td>  '  +
    '            <td>Moe</td>  '  +
    '            <td>mary@example.com</td>  '  +
    '         </tr>  '  +
    '         <tr>  '  +
    '            <td>July</td>  '  +
    '            <td>Dooley</td>  '  +
    '            <td>july@example.com</td>  '  +
    '         </tr>  '  +
    '      </tbody>  '  +
    '  </table>  ',
    postCreate: function() {
      
    }
  });
});
