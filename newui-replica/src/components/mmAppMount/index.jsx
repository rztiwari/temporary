import React, {Component} from 'react';

import './mm-mount.css';

class MMAppMount extends Component {

  componentWillMount() {
    // setting remote MM base URL
    const remote = this.props.mmRemoteUrl;

    // adding dojo configuration
    window.dojoConfig = {
      baseUrl: "/js/",
      tlmSiblingOfDojo: false,
      parseOnLoad: false,
      packages: [
        { name: "dojo", location: remote + "js/lib/dojo" },
        { name: "dijit", location: remote + "js/lib/dijit" },
        { name: "dojox", location: remote + "js/lib/dojox" },
        { name: "widgets", location: remote + "js/widgets"}
      ]
    };

    //mouting claro css files
    if(document.getElementById("mmClaroCss") === null){
      let styleElement = document.createElement("link");
      styleElement.id = "mmClaroCss";
      styleElement.rel = "stylesheet";
      styleElement.href = remote + "js/lib/dijit/themes/claro/claro.css";
      document.head.appendChild(styleElement);
    }

    // adding claro to body
    document.body.className += " claro";

    //mouting styles css files
    if(document.getElementById("mmCss") === null){
      let styleElement = document.createElement("link");
      styleElement.id = "mmCss";
      styleElement.rel = "stylesheet";
      styleElement.href = remote + "static/css/style.css";
      document.head.appendChild(styleElement);

      //adding query strings in route for MM
      if(window.location.hash !== '#/mm?paymentType=IT&_guid=ea46fb00-a582-11e5-b084-000704020701&_productId=1003&actionType=CP') {
        window.location.href += '?paymentType=IT&_guid=ea46fb00-a582-11e5-b084-000704020701&_productId=1003&actionType=CP';
      }
    }

    // creating script and adding dojo lib to it
    if(document.getElementById("dojoLib") === null){
      let scriptElement = document.createElement("script");
      scriptElement.id = "dojoLib";
      scriptElement.type = "text/javascript";
      scriptElement.src = remote + "js/lib/dojo/dojo.js";
      scriptElement.setAttribute('data-dojo-config','async: true');
      document.head.appendChild(scriptElement);
    }
  }

  componentDidMount() {
    // setting remote MM base URL
    const remote = this.props.mmRemoteUrl;

    setTimeout(function(){
      // creating script and adding mm entrypoint to it
      var scriptElement = document.createElement("script");
      scriptElement.id = "mmRun";
      scriptElement.type = "text/javascript";
      scriptElement.src = remote + "run.js";
      document.head.appendChild(scriptElement);
    },500);
  }

  render() {
    const __html = `<div id="page">
    <div class="container-fixed main">
		<div>
			<div data-dojo-type="Navsteps"></div>
		</div>
		<div>
			<div id="repair-note" data-dojo-type="RepairNote"></div>
		</div>
		<div>
			<div data-dojo-type="AdditionalDetails"></div>
		</div>
		<div>
			<div id="mm-sticky-footer" data-dojo-type="Footer"></div>
		</div>
		<div>
				<button id="changeHash" class="btn btn-default">Change Route</button>
				<p id="output"></p>
		</div>
	</div>`;
    const outerlayer = {__html};

    return (
      <div id="reactControlledMount">
        <div className="mm" dangerouslySetInnerHTML={outerlayer}></div>
      </div>
    )
  }

  componentWillUnmount() {
    window.require([
      'dojo',
      'dojo/dom',
      'dijit/registry'
    ],function(dojo, dom, registry) {
      // clean run file, dojo lib, calro css, mm css
      console.log('ready to unmount dojo node');
      console.log('cleaning up dojo registry');
      //removing all widgets from registry
      var widgets = registry.findWidgets(dom.byId("page"));
      dojo.forEach(widgets, function(w) {
        console.log(w);
        w.destroyRecursive(true);
      });
      console.log('dojo ended');
      console.log('component removed and all nodes destroyed');
    });
  }
}


export default MMAppMount;
