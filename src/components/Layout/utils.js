/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import yaml from 'js-yaml';
import store from '../../store';
import env from '../../utils/env';

const version = { commit: '913161064b02bcef024d072873e77c8c79cc1a68', dictionary: { commit: '520a25999fd183f6c5b7ddef2980f3e839517da5', version: '0.2.1-9-g520a259' }, version: '4.0.0-44-g9131610' };
const DATA_MODEL = env.REACT_APP_DATA_MODEL;
const DATA_MODEL_PROPS = env.REACT_APP_DATA_MODEL_PROPS;

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
  // let url = 'https://wfy1997.s3.amazonaws.com/schema.json';
  // if (window.location.hash) url = window.location.hash.slice(1);

  const icdcMData = await getData(DATA_MODEL);
  const icdcMPData = await getData(DATA_MODEL_PROPS);

  // translate the json file here
  const dataList = {};

  // using the following code the convert MDF to Gen3 format
  for (const [key, value] of Object.entries(icdcMData.Nodes)) {
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
    const pPreffered = [];

    if (icdcMData.Nodes[key].Props != null) {
      for (let i = 0; i < icdcMData.Nodes[key].Props.length; i++) {
        const nodeP = icdcMData.Nodes[key].Props[i];
        const propertiesItem = {};
        for (var propertyName in icdcMPData.PropDefinitions) {
          if (propertyName === nodeP) {
            propertiesItem.description = icdcMPData.PropDefinitions[propertyName].Desc;
            propertiesItem.type = icdcMPData.PropDefinitions[propertyName].Type
              || icdcMPData.PropDefinitions[propertyName].Enum;
            propertiesItem.enum = icdcMPData.PropDefinitions[propertyName].Enum
              || icdcMPData.PropDefinitions[propertyName].Type.Enum;
            propertiesItem.src = icdcMPData.PropDefinitions[propertyName].Src;

            if (icdcMPData.PropDefinitions[propertyName].Req === 'Yes') {
              pRequired.push(nodeP);
            } else if (icdcMPData.PropDefinitions[propertyName].Req === 'Preferred') {
              pPreffered.push(nodeP);
            }
          }
        }
        properties[nodeP] = propertiesItem;
      }

      item.properties = properties;
      item.required = pRequired;
      item.preferred = pPreffered;
    } else {
      item.properties = {};
    }

    for (const property in icdcMData.Relationships) {
      const label = propertyName;
      // const multiplicity = icdcMData.Relationships[propertyName].Mul;
      const required = false;
      for (let i = 0; i < icdcMData.Relationships[property].Ends.length; i++) {
        const linkItem = {};
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
}

export default init;
