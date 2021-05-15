var allitems_list = [
    { 'ID': 001, 'Name': "H" },
    { 'ID': 003, 'Name': "Y" },
    { 'ID': 004, 'Name': "T" },
    { 'ID': 005, 'Name': "S" },
  ];

  var python_code_list = [
      { 'gate_value': "H", 'gate_code': "circuit.h(qreg_q[0])" },
      { 'gate_value': "Y", 'gate_code': "circuit.y(qreg_q[0])" },
      { 'gate_value': "T", 'gate_code': "circuit.t(qreg_q[0])" },
      { 'gate_value': "S", 'gate_code': "circuit.s(qreg_q[0])" },
    ];

  var allitems_datasource = new kendo.data.DataSource({
    data: allitems_list
  });
  var newitems_list = [];
  var newitems_datasource = new kendo.data.DataSource({
    data: newitems_list
  });

  $('#itemlist').kendoListView({
    dataSource: allitems_datasource,
    template: "<div class='tags k-block move' data-value='#:Name#'> #:Name# </div>"
  });

  $('#newlist').kendoListView({
    dataSource: newitems_datasource,
    template: "<div class='tags k-block move'> #:Name# </div>"
  });

  $('#itemlist').kendoSortable({
    filter: ".k-listview-content > div",
    connectWith: "#newlist",
    change: function(e) {
      var sender = e.draggableEvent.sender;
      var senderElement = sender.element;
      var senderId = senderElement.attr('id');

      if (senderId === 'newlist') {
        var itemlist = $('#itemlist').getKendoListView();
        itemlist.setDataSource(allitems_datasource)
      }
    }
  });

  var values = [];
  $('#newlist').kendoSortable({
    filter: ".k-listview-content > div",
    connectWith: "#itemlist",
    change: function(e) {
      if ($('.dragger_gates div.tags').length > 0) {
        values = []
        $('.dragger_gates div.tags').each(function() {
          values.push($.trim($(this).text()));
        });
      }
      var sender = e.draggableEvent.sender;
      var senderElement = sender.element;
      var senderId = senderElement.attr('id');

      if (senderId === 'itemlist') {
        var itemlist = $('#itemlist').getKendoListView();
        itemlist.setDataSource(allitems_datasource)
      }
      get_python_code();
    }
  });

var gate_code = [];
function get_python_code() {
  gate_code = [];
  $.each( values, function( i, v){
    var newItem = python_code_list.filter(function(i) {
      return i.gate_value == v;
    });

    gate_code.push(newItem[0].gate_code);
    write_python_code();
  });
}

var elements = '';
function write_python_code() {
  elements = '';
  $('.gate_code').empty();
  $.each( gate_code, function( i, v){
    // console.log(v);
    elements = elements + '<code class="python">'+v+'</code><br/>';
  });
  $('.gate_code').append(elements);
}
