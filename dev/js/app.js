var app = new Vue({
  el: '#urinal-checkmate',

  data: {
    page: { message: 'loading...' },
    colors: null
  },

  created: function() {
    this.update()
  },

  watch: {
    'page.message': function (nuval, olval) {
      console.log('new: %s, old: %s', nuval, olval)
    }
  },

  methods: {

    update: function() {
      var _this = this;
      var request = new XMLHttpRequest()
      request.open('GET', 'data/data.json')
      request.onload = function () {
        var result = JSON.parse(request.responseText)
        _this.page = result.page
        _this.restroom = result.restroom
      }
      request.send();
    }

  }

});

Vue.directive('include', function (value) {
  this.el.innerHTML = this.expression

  var url = this.expression
  var _this = this;
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onreadystatechange = function() {
    if (this.readyState !== 4) return
    if (this.status !== 200) return
    _this.el.innerHTML = this.responseText
  }
  request.send();

})

var include = new Vue({
  el: '#svg'
})
