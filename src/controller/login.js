import Layout from "component/layout";

var LoginController = {
    controller: function() {
        var storage = window.localStorage;
        return {
            storage: storage,
            data: {
                token: m.prop(LoginController.getToken(storage)),
                endpoint: m.prop(LoginController.getEndpoint(storage)),
                email: m.prop(""),
                password: m.prop("")
            }
        };
    },
    getEndpoint: function(storage) {
        return storage.getItem("endpoint") || "http://api.wheniwork.com/2";
    },
    getToken: function(storage) {
        return storage.getItem("token") || "";
    },
    login: function(data, e) {
        e.preventDefault();

        // Save endpoint for future use.
        window.localStorage.setItem("endpoint", data.endpoint());

        this.tryLogin(data.email(), data.password());
    },
    tryLogin: function(email, password) {
        m.request({
            method: "POST",
            url: this.getEndpoint(window.localStorage) + "/login",
            data: {
                "key": "", // TODO: Store developer key somewhere.
                "email": email,
                "password": password
            }
        }).then(function(data) {
            window.localStorage.setItem("token", data.login.token);
            m.route('/scheduler');
        }, function(data) {
            window.alert(data.error || "Error logging in.");
        });
    },
    track: function(data, e) {
        if (!(e.target.name in data)) {
            return;
        }
        data[e.target.name](e.target.value);
    },
    view: function(ctrl) {
        return Layout(m(".section.login-section", [
            m(".section--head", [
                "Let's Login"
            ]),
            m(".section--body",
                m("form", {onsubmit: this.login.bind(this, ctrl.data), onchange: this.track.bind(this, ctrl.data)}, [
                    m(".form-group", [
                        m("label", "Endpoint"),
                        m("input.form-control[name=endpoint]", {value: ctrl.data.endpoint()})
                    ]),
                    m(".form-group", [
                        m("label", "Email"),
                        m("input.form-control[name=email]")
                    ]),
                    m(".form-group", [
                        m("label", "Password"),
                        m("input.form-control[name=password]", {type: "password"})
                    ]),
                    m("button", "Login")
                ])
            )
        ]));
    }
};

export default LoginController;
