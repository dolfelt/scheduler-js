import Layout from "component/layout";

var LoginController = {
  controller: function() {
    var storage = window.localStorage;
    return {
      storage: storage,
      data: {
        token: m.prop(LoginController.getToken(storage)),
        endpoint: m.prop(LoginController.getEndpoint(storage))
      }
    };
  },
  getEndpoint: function(storage) {
    return storage.getItem("endpoint")||"http://api.wheniwork.com/2";
  },
  getToken: function(storage) {
    return storage.getItem("token")||"";
  },
  login: function(data, e) {
    e.preventDefault();

    window.localStorage.setItem("endpoint", data.endpoint());
    window.localStorage.setItem("token", data.token());

    m.route('/scheduler');
  },
  track: function(data, e) {
    if (!(e.target.name in data)) {
      return;
    }
    data[e.target.name](e.target.value);
  },
  view: function(ctrl) {
    return Layout(m("div", [
      m("form", {onsubmit: this.login.bind(this, ctrl.data), onchange: this.track.bind(this, ctrl.data)}, [
        m(".form-item", [
          m("label", "When I Work Token"),
          m("input[name=token]", {value: ctrl.data.token()})
        ]),
          m(".form-item", [
            m("label", "API URL (including version)"),
            m("input[name=endpoint]", {value: ctrl.data.endpoint()})
          ]),
        m("button", "Login")
      ])
    ]));
  }
};

export default LoginController;
