export default function(options) {
    var settings = Object.assign({
        method: "GET",
        background: true,
        initialValue: [],
        config: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("W-Token", window.localStorage.getItem("token"));
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
    };

    if (settings.url.search(/^http/i) !== 0) {
        settings.url = window.localStorage.getItem("endpoint") + settings.url;
    }

    var req = m.request(settings).then(complete, complete);

    return {
        data: data,
        request: req,
        ready: completed
    };
}
