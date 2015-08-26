import moment from "moment/moment";

var ShiftItem = {
  controller: function(obj) {
    this.shift = m.prop(obj.model);
  },
  parseDate: function(date) {
    return moment(date, "ddd, DD MMM YYYY HH:mm:ss ZZ");
  },
  details: function(shift) {
    // Do something here...
  },
  view: function(ctrl) {
    var shift = ctrl.shift(),
      start = this.parseDate(shift.startTime()),
      end = this.parseDate(shift.endTime());
    return m("div.shift-item", {
        key: shift.id,
        onclick: this.details.bind(this, shift),
        style: 'background-color: #'+shift.color()
      }, [
      m("p", [
        m("strong", [
          start.format("h:mma"), " - ", end.format("h:mma")
        ].join('').replace(/:00/g, '')),
        m("span.position-tag", shift.position().id)
      ])
    ]);
  }
};

export default ShiftItem;
