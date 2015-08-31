import ModelAccount from "model/account";
import ModelUser from "model/user";
import AppRequest from "component/request";

import LoginView from "view/login";

import LocalForage from "localforage";
import Storage from "model/storage";

export default {
    controller: function() {

        this.accounts = m.prop([]);
        this.users = m.prop([]);
        this.endpoint = m.prop("https://api.wheniwork.com/2");
        this.token = m.prop();

        this.loading = m.prop(true);

        this.begin = function() {
            m.startComputation();

            Storage.load().then(function(auth) {
                this.endpoint(Storage.auth.endpoint());
                this.token(Storage.auth.token());

                if (this.token()) {
                    this.loadAccounts();
                } else {
                    this.loading(false);
                }
                m.endComputation();

            }.bind(this));
        };
        this.begin();

        this.form = {
            email: m.prop("daniel@thisclicks.com"),
            password: m.prop("when1work"),
            endpoint: this.endpoint
        };

        this.login = function(e) {
            e.preventDefault();

            // Save endpoint for future use.
            LocalForage.setItem("endpoint", this.form.endpoint()).then(function() {
                this.tryLogin(this.form.email(), this.form.password());
            }.bind(this));
        };

        this.tryLogin = function(email, password) {
            m.startComputation();
            m.request({
                method: "POST",
                url: this.endpoint() + "/login",
                data: {
                    "key": "e17e1da4b44e486ba20360c8fd06bf99804c0e10", // TODO: Store developer key somewhere.
                    "email": email,
                    "password": password
                }
            }).then(function(data) {

                Storage.auth.token(data.login.token);
                Storage.save().then(function(token) {
                    this.parseData(data);
                    m.endComputation();
                }.bind(this));

            }.bind(this), function(data) {
                m.endComputation();
                window.alert(data.error || "Error logging in.");
            });
        };

        this.loadAccounts = function() {
            m.startComputation();

            AppRequest({
                url: "/login/users",
                data: {}
            }).request.then(function(data) {
                this.loading(false);
                this.parseData(data);
                m.endComputation();
            }.bind(this), function(data) {
                this.token("");
                m.endComputation();
            });
        };

        this.parseData = function(data) {
            if (data.accounts.length > 1) {
                this.accounts(data.accounts.map(ModelAccount.map));
                this.users(data.users.map(ModelUser.map));
                m.redraw();
            } else {
                m.route('/scheduler');
            }
        };

        this.selectAccount = function(user_id, e) {
            e.preventDefault();
            Storage.auth.userId(user_id);
            Storage.save().then(function() {
                m.route('/scheduler');
            });
        };

        this.trackForm = function(e) {
            if (!(e.target.name in this.form)) {
                return;
            }
            this.form[e.target.name](e.target.value);
        };
    },
    view: LoginView
};
