function messiah(selector) {
  const me = {};
  me.selector = selector;
  me.element = document.querySelector(me.selector);
  me.elements = document.querySelectorAll(me.selector);

  me.whoAmI = function() {
    return me.element;
  };
  me.pickUs = function() {
    return me.elements;
  };
  me.myValues = function(name, value) {
    if (!value) {
      return me.element.getAttribute(name);
    }
    me.element.setAttribute(name, value);
    return me;
  };
  me.divineIntervention = function(type, callBack) {
    me.element['on' + type] = callBack;
    return me;
  };
  me.createInnerBeing = function(type) {
    type = document.createElement(type);
    me.element.appendChild(type);
    return me;
  };
  me.lukeWarm = function(meClass) {
    me.element.classList.toggle(meClass);
    return me;
  };
  me.embraceBeing = function(type) {
    var parent = me.element.parentNode;
    var outerBeing = document.createElement(type);

    parent.replaceChild(outerBeing, me.element);
    outerBeing.appendChild(me.element);
    return me;
  };
  return me;
}
