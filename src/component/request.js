import Storage from "model/storage";

var Request = function(options) {
    var settings = Object.assign({
        method: "GET",
        background: true,
        initialValue: [],
        config: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            if (options.token || Storage.auth.token()) {
                xhr.setRequestHeader("W-Token", options.token || Storage.auth.token());
                xhr.setRequestHeader("W-UserId", options.user_id || Storage.auth.userId());
            }

            xhr.timeout = 4000;
            xhr.ontimeout = function() {
                complete();
            };
        }
    }, options);

    var data = m.prop(settings.initialValue);
    var completed = m.prop(false);
    var complete = function(response) {
        data(response);
        completed(true);

        return response;
    };

    if (settings.url.search(/^http/i) !== 0) {
        settings.url = process.env.API_ENDPOINT + settings.url;
    }

    var req = m.request(settings).then(complete, complete);

    return {
        data: data,
        request: req,
        ready: completed
    };
};

export default Request;
