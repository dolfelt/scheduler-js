import Layout from "component/layout";

var getUser = function(acct_id, users) {
    var acctUser = users.filter(function(u) { return u.accountId() == acct_id; });
    return acctUser[0] || {};
};

var viewLogin = function(ctrl) {
    return m("form", {onsubmit: ctrl.login.bind(ctrl), onchange: ctrl.trackForm.bind(ctrl)}, [
        m(".form-group", [
            m("label", "Email"),
            m("input.form-control[name=email]", {value: ctrl.form.email()})
        ]),
        m(".form-group", [
            m("label", "Password"),
            m("input.form-control[name=password]", {type: "password", value: ctrl.form.password()})
        ]),
        m("button", "Login")
    ]);
};

var viewLoading = function(ctrl) {
    return m(".loading", "Loading...");
};

var viewAccounts = function(ctrl, args) {
    return m("ul.account-list",
        ctrl.accounts().map(function(acct) {
            var user = getUser(acct.id, ctrl.users());
            return m("li.account-list__item", {key: acct.id},
                m("a.account-list__link", {href: "#", onclick: ctrl.selectAccount.bind(ctrl, user.id)}, [
                    m("img", {src: acct.logo()}),
                    acct.company() || acct.subdomain(),
                    m("span", user.roleName())
                ])
            );
        })
    );
};

var loginLayout = function(body) {
    return Layout(m(".container", [
        m(".col-md-6 .col-md-offset-3", body)
    ]));
};

export default function(ctrl) {
    return loginLayout(m(".section.login-section", [
        m(".section--head", [
            "Let's Login"
        ]),
        m(".section--body", [
            ctrl.loading() ? viewLoading(ctrl) :
                (ctrl.accounts().length > 1 ? viewAccounts(ctrl) : viewLogin(ctrl))
        ])
    ]));
}
