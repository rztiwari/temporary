require([
  'dojo/dom',
  'dojo/parser',
  'dojo/ready',
  'dojo/_base/window',
  'dijit/Dialog',
  'widgets/treenode',
  'widgets/scrollListener',
  'widgets/navbar',
  'widgets/navsteps',
  'widgets/repairNote',
  'widgets/sections/additionalDetails',
  'widgets/stickyTable',
  'widgets/footer'
], function (dom, parser, ready, win, Dialog, TreeNode) {
  console.log('dojo started');

  ready(function(){

    //bootstraping application
    // var treeNode = new TreeNode({});
    // treeNode.placeAt(dom.byId('page'));

    mmDialog = new Dialog({
      title: "MoveMoney Dialog",
      content:  '   <form class="form-horizontal">  '  +
      '      <fieldset>  '  +
      '         <!-- Form Name -->  '  +
      '         <legend>Form Name</legend>  '  +
      '         <!-- Text input-->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="textinput">Text Input</label>    '  +
      '            <div class="col-md-4">  '  +
      '               <input id="textinput" name="textinput" type="text" placeholder="placeholder" class="form-control input-md">  '  +
      '               <span class="help-block">help</span>    '  +
      '            </div>  '  +
      '         </div>  '  +
      '         <!-- Search input-->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="searchinput">Search Input</label>  '  +
      '            <div class="col-md-4">  '  +
      '               <input id="searchinput" name="searchinput" type="search" placeholder="placeholder" class="form-control input-md">  '  +
      '               <p class="help-block">help</p>  '  +
      '            </div>  '  +
      '         </div>  '  +
      '         <!-- Prepended text-->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="prependedtext">Prepended Text</label>  '  +
      '            <div class="col-md-4">  '  +
      '               <div class="input-group">  '  +
      '                  <span class="input-group-addon">prepend</span>  '  +
      '                  <input id="prependedtext" name="prependedtext" class="form-control" placeholder="placeholder" type="text">  '  +
      '               </div>  '  +
      '               <p class="help-block">help</p>  '  +
      '            </div>  '  +
      '         </div>  '  +
      '         <!-- Appended checkbox -->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="appendedcheckbox">Appended Checkbox</label>  '  +
      '            <div class="col-md-4">  '  +
      '               <div class="input-group">  '  +
      '                  <input id="appendedcheckbox" name="appendedcheckbox" class="form-control" type="text" placeholder="placeholder">  '  +
      '                  <span class="input-group-addon">       '  +
      '                  <input type="checkbox">       '  +
      '                  </span>  '  +
      '               </div>  '  +
      '               <p class="help-block">help</p>  '  +
      '            </div>  '  +
      '         </div>  '  +
      '         <!-- Appended checkbox -->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="appendedcheckbox">Appended Checkbox</label>  '  +
      '            <div class="col-md-4">  '  +
      '               <div class="input-group">  '  +
      '                  <input id="appendedcheckbox" name="appendedcheckbox" class="form-control" type="text" placeholder="placeholder">  '  +
      '                  <span class="input-group-addon">       '  +
      '                  <input type="checkbox">       '  +
      '                  </span>  '  +
      '               </div>  '  +
      '               <p class="help-block">help</p>  '  +
      '            </div>  '  +
      '         </div>  '  +
      '         <!-- Password input-->  '  +
      '         <div class="form-group">  '  +
      '            <label class="col-md-4 control-label" for="passwordinput">Password Input</label>  '  +
      '            <div class="col-md-4">  '  +
      '               <input id="passwordinput" name="passwordinput" type="password" placeholder="placeholder" class="form-control input-md">  '  +
      '               <span class="help-block">help</span>  '  +
      '            </div>  '  +
      '         </div>  '  +
      '      </fieldset>  '  +
      '  </form>  ',
      style: "width: 1200px"
    });

    parser.parse();

    console.log('parser called');
  });
});





require(["dojo/router", "dojo/dom", "dojo/on", "dojo/request", "dojo/json", "dojo/domReady!"],
function(router, dom, on, request, JSON){
  router.register("/foo/bar", function(evt){
    evt.preventDefault();
    console.log(evt.oldPath);
    console.log(evt.newPath);
    request.get("request/helloworld.json", {
      handleAs: "json"
    }).then(function(response){
      dom.byId("output").innerHTML = JSON.stringify(response);
    });
  });

  router.startup();

  on(dom.byId("changeHash"), "click", function(){
    router.go("/foo/bar");
  });
});
