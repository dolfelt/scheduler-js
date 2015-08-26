import ShiftItem from "component/scheduler/shiftitem";

var Row = {
  controller: function(obj) {
    return {
      mode: "week",
      type: "user"
    };
  },
  view: function(ctrl, obj) {
    return m(".scheduler-row", {class: "type-"+ctrl.type}, [
        m(".row-info", [
          obj.user.firstName()
        ]),
        m(".row-grid", this.grid(ctrl.mode, obj.start, obj.end, obj.shifts))
      ]
    );
  },
  grid: function(mode, start, end, shifts) {
    if (mode == "week") {
      var cells = [];
      while(start.isBefore(end)) {
        cells.push(m(".day-cell", m(".shift-holder", this.render(start, shifts)) ));
        start.add(1, 'd');
      }
      return m(".week-row", cells);
    }
  },
  render: function(start, shifts) {
    var now = start.format('YYYYMMdd');
    var filter = (shifts||[]).filter(function(shift) {
      return shift.startTimeDate().format('YYYYMMdd') == now;
    });

    return filter.map(function(shift) {
      return m.component(ShiftItem, {model: shift});
    });
  }
};

export default Row;
