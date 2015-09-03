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
        this.token = m.prop();

        this.loading = m.prop(true);

        this.begin = function() {
            m.startComputation();

            Storage.load().then(function(auth) {
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
            email: m.prop(process.env.DEFAULT_USER),
            password: m.prop(process.env.DEFAULT_PASS),
        };

        this.login = function(e) {
            e.preventDefault();

            this.tryLogin(this.form.email(), this.form.password());
        };

        this.tryLogin = function(email, password) {
            m.startComputation();
            m.request({
                method: "POST",
                url: process.env.API_ENDPOINT + "/login",
                data: {
                    "key": process.env.DEV_KEY,
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
