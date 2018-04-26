

function T(selector) {
  const me = {};
  me.selector = selector;
  me.element = document.querySelector(me.selector);
  me.elements = document.querySelectorAll(me.selector);

  //returns selected element or elements
  me.Element = function() {
    return me.elements;
  };

  //returns attributes or changes attributes
  me.myValues = function(name, value) {
    if (!value) {
      return me.element.getAttribute(name);
    }
    me.element.setAttribute(name, value);
    return me;
  };

  //performs callback on event. Events found in vanilla js on + "some vanillaJs Event type"
  me.divineIntervention = function(type, callBack) {
    me.element['on' + type] = callBack;
    return me;
  };

  //inserts element of type into selected element;
  me.createInnerBeing = function(type) {
    type = document.createElement(type);
    me.element.appendChild(type);
    return me;
  };

  //toggles a class on selected element
  me.lukeWarm = function(meClass) {
    me.element.classList.toggle(meClass);
    return me;
  };

  //inserts element of type around selected element
  me.embraceBeing = function(type) {
    let parent = me.element.parentNode;
    let outerBeing = document.createElement(type);

    parent.replaceChild(outerBeing, me.element);
    outerBeing.appendChild(me.element);
    return me;
  };

  me.scripture = function(scr) {
    me.element.textContent = scr;
    return me;
  };

  //JSON GET request
  me.JSONchrist = function(url) {
    return fetch(url, {method: 'GET'
    }).then(function(response) {
      return response.json();
    }).catch(function(err) {
      return err;
    });
  };

  return me;
};
