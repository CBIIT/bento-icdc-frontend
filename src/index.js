import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux';
import store from './store';
import client from './utils/graphqlClient';
import axios from 'axios';
import yaml from 'js-yaml';

// ReactDOM.render(
//   <ApolloProvider client={client}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//   </ApolloProvider>,
//   document.getElementById("root")
// );

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };

const getData = async (url) => {
  const response = await axios.get(url);
  const data = yaml.safeLoad(response.data);
  return data;
};

// const findObjectWithRef = (obj, updateFn, root_key = '', level = 0) => {
//   // iterate over the properties
//   for (var propertyName in obj) {

//     if (level === 0) root_key = propertyName;

//     if (propertyName === '$ref') {
//       obj['$ref'] = updateFn(obj['$ref'], root_key);
//     }

//     // any object that is not a simple value
//     if (obj[propertyName] !== null && typeof obj[propertyName] === 'object') {
//       // recurse into the object and write back the result to the object graph
//       obj[propertyName] = findObjectWithRef(obj[propertyName], updateFn, root_key, (level + 1));
//     }
//   }

//   return obj;
// };

// unresolveable:
// {$ref: "_terms.yaml#/file_format"}
// {$ref: "#/UUID"}

async function init() {
  // console.log(store);

  // let url = 'https://wfy1997.s3.amazonaws.com/schema.json';
  // if (window.location.hash) url = window.location.hash.slice(1);

  const icdcMData = await getData('https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model.yml');
  const icdcMPData = await getData('https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model-props.yml');
  console.log('icdcMData', icdcMData);
  console.log('icdcMPData', icdcMPData);

  // translate the json file here
  const dataList = {};

  // using the following code the convert MDF to Gen3 format
  for (const [key, value] of Object.entries(icdcMData.Nodes)) {
    console.log('key', key);
    console.log('value', value);
    const item = {};
    item.$schema = 'http://json-schema.org/draft-06/schema#';
    item.id = key;
    item.title = key;
    if ('Category' in value.Tags) {
      item.category = value.Tags.Category;
    } else {
      item.category = 'Undefined';
    }
    item.program = '*';
    item.project = '*';
    item.additionalProperties = false;
    item.submittable = true;
    item.constraints = null;
    item.type = 'object';

    const link = [];
    const properties = {};
    const pRequired = [];

    if (icdcMData.Nodes[key].Props != null) {
      for (let i = 0; i < icdcMData.Nodes[key].Props.length; i++) {
        const nodeP = icdcMData.Nodes[key].Props[i];
        const propertiesItem = {};
        for (var propertyName in icdcMPData.PropDefinitions) {
          if (propertyName === nodeP) {
            propertiesItem.description = icdcMPData.PropDefinitions[propertyName].Desc;
            propertiesItem.type = icdcMPData.PropDefinitions[propertyName].Type;
            propertiesItem.src = icdcMPData.PropDefinitions[propertyName].Src;

            if (icdcMPData.PropDefinitions[propertyName].Req == true) {
              pRequired.push(nodeP);
            }
          }
        }
        properties[nodeP] = propertiesItem;
      }

      item.properties = properties;
      item.required = pRequired;
    } else {
      item.properties = {};
    }

    for (const property in icdcMData.Relationships) {
      const linkItem = {};

      const label = propertyName;
      // const multiplicity = icdcMData.Relationships[propertyName].Mul;
      const required = false;
      for (let i = 0; i < icdcMData.Relationships[property].Ends.length; i++) {
        if (icdcMData.Relationships[property].Ends[i].Src === key) {
          const backref = icdcMData.Relationships[property].Ends[i].Src;
          const name = icdcMData.Relationships[property].Ends[i].Dst;
          const target = icdcMData.Relationships[property].Ends[i].Dst;

          linkItem.name = name;
          linkItem.backref = backref;
          linkItem.label = label;
          linkItem.target_type = target;
          linkItem.required = required;

          link.push(linkItem);
        }
      }
    }

    item.links = link;
    dataList[key] = item;
  }

  const newDataList = dataList;

  await Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        // data: newDict
        data: newDataList,
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: version,
      }),
    ],
  );

  ReactDOM.render(

    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
  </ApolloProvider>,
    document.getElementById('root'),
  );
}

init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
