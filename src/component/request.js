export default function (options) {
  options = Object.assign({
    method: "GET",
    url: "",
    config: function(xhr) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("W-Token", "f238d95cecd6217e2f15a6b125295ae002a5f2ef");
    }
  }, options);


  if (options.url.search(/^http/i) !== 0) {
    options.url = 'http://api.wheniwork.dev/2' + options.url;
  }
  console.log(options);

  return m.request(options);
}
