const Prophet = function(userObject) {
  this.Id = userObject.Id;
  this.data = userObject.data;
  let mount = document.getElementById(this.Id);
  let vdom = {};

  function readNode(node) {
    let rv = {};

    //tag names
    rv.type = node.tagName ? node.tagName : node.nodeType;

    let content = node.textContent;
    if (rv.type == 3) {
      content = content.replace(/\s+/g, '');
      rv.type = 'text';
    };

    if (content.length == 0) {return; };

    rv.type = String(rv.type).toLowerCase();
    rv.content = node.textContent.trim();
    rv.dataType = node.textContent.trim();

    //generate id for this node
    rv.id = (rv.type + '_' + genId()).toLocaleLowerCase();

    //attributes
    rv.attrs = {};

    if (node.attributes) {
      for (let a = 0; a < node.attributes.length; a++) {

        let attr = node.attributes[a];
        rv.attrs[attr.nodeName] = attr.nodeValue;

      };
    };

    for (let c = 0, b = 0; c < node.childNodes.length; c++, b++) {
      //referencing current child
      let child = node.childNodes[c];
      //documenting child in JSON
      let newNode = readNode(child);
      if (!newNode) {
        b--;
        continue;
      };

      //adding reference to the parent
      newNode.parId = rv.id;
      newNode.parType = rv.type;
      //keeping position relative to parent
      newNode.parIdx = b;
      //saving the DOM node to vdom
      vdom[newNode.id] = newNode;
    };
    return rv;
  };

  function genId() {
    return Math.floor(Math.random() * 9999999);
  };

  readNode(mount);

  function setNode(node) {
    for (let i = 0, j = 0; i < Object.keys(vdom).length; i++, j++) {
      let element = Object.keys(vdom)[i];
      let currentNode = vdom[element];
    }
  };

  function injectVar(domObject, renderObj) {
    domObject = JSON.parse(JSON.stringify(domObject));
    let j = 0;
    for (let i = 0; i < Object.keys(domObject).length; i++) {

      let element = Object.keys(domObject)[i];
      if ((domObject[element].type) == 'prophet') {
        domObject[element].content = renderObj[domObject[element].content];
      };
    }
    return domObject;
  };

  //function to compare objects
  Object.compare = function(obj1, obj2) {
    //Loop through properties in object 1
    for (var p in obj1) {
      //Check property exists on both objects
      if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {return false;};

      switch (typeof (obj1[p])) {
      //Deep compare objects
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) {return false;};
      break;
      //Compare function code
      case 'function':
        if (typeof (obj2[p]) == 'undefined' ||
        (p != 'compare' &&
        obj1[p].toString() != obj2[p].toString())) {return false;};
      break;
      //Compare values
      default:
        if (obj1[p] != obj2[p]) {return false;};
    }
    }

    //Check object 2 for any extra properties
    for (var p in obj2) {
      if (typeof (obj1[p]) == 'undefined') {return false;};
    }
    return true;
  };

  let keys = [];
  obj = this.data;
  for (let key in obj) {
    keys.push(key);
  };

  let vcomp = injectVar(vdom, obj);

  if (!Object.compare(vdom, vcomp)) {
    let arrChange = [];
    let arrNewChange = [];

    for (let i = 0, j = 0; i < Object.keys(vdom).length; i++, j++) {
      let element = Object.keys(vdom)[i];
      if (!Object.compare(vdom[element], vcomp[element])) {
        arrNewChange.push(vcomp[element]);
      }
    }
    let proTags = document.getElementsByTagName('prophet');
    for (let l = 0; l < proTags.length; l++) {
      let k = 0;
      if (arrNewChange[l].dataType = proTags[l].innerHTML) {
        proTags[l].innerHTML = arrNewChange[l].content;
      };
    };
  };
};
