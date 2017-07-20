import React from 'react';
import CompList from '../components/component-list';

export default function renderSections(elementData) {
  return elementData.map( ele => {
    if (ele.childElements){
      let El = CompList[ele.elementId];
      return (
        <El key={ele.elementId} properties={ele.properties} resources={this.state.uischema.resources[ele.elementId]}>
          {renderSections(ele.childElements.data)}
        </El>
      );
    } else {
      let El = CompList[ele.elementId];
      return <El key={ele.elementId} properties={ele.properties} resources={this.state.uischema.resources[ele.elementId]} />;
    }
  });
}
