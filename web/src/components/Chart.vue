<template lang="pug">
  svg(width='420' height='286' viewbox='0 0 420 286' fill='none' xmlns='http://www.w3.org/2000/svg')
    rect(width='420' height='286' fill='#EEEEEE')
    line(x1='23' y1='239.5' x2='399' y2='239.5' stroke='black')
    rect(x='48' :y='pending_bar_y' width='83' :height='pending_bar' fill='#2c3e50')
    rect(x='169' :y='accepted_bar_y' width='83' :height='accepted_bar' fill='#28a745')
    rect(x='290' :y='refused_bar_y' width='83' :height='refused_bar' fill='#dc3545')
    text(fill='black' xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='56.1895' y='265.652') Pending
    text(fill='black' xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='172.136' y='265.652') Accepted
    text(fill='black' xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='298.049' y='265.652') Refused
    text(:fill="pending_bar > 40 ? '#EEEEEE' : '#000000'" xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='90' :y='pending_bar > 40 ? pending_bar_y+25 : pending_bar_y-10' text-anchor='middle') £{{pending.toFixed(2)}}
    text(:fill="accepted_bar > 40 ? '#EEEEEE' : '#000000'" xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='209.332' :y='accepted_bar > 40 ? accepted_bar_y+25 : accepted_bar_y-10' text-anchor='middle' ) £{{accepted.toFixed(2)}}
    text(:fill="refused_bar > 40 ? '#EEEEEE' : '#000000'" xml:space='preserve' style='white-space: pre' font-family='Roboto' font-size='18' font-weight='bold' letter-spacing='0em')
        tspan(x='330.332' :y='refused_bar > 40 ? refused_bar_y+25 : refused_bar_y-10' text-anchor='middle' ) £{{refused.toFixed(2)}}
</template>

<script>
export default {
  props: ['pending', 'accepted', 'refused'],
  data () {
    return {
      max_bar_height: 220
    }
  },
  computed: {
    pending_bar: function () {
      if (this.pending === this.largest_bar) {
        return this.max_bar_height
      }
      return this.interpolate(this.pending)
    },
    accepted_bar: function () {
      if (this.accepted === this.largest_bar) {
        return this.max_bar_height
      }
      return this.interpolate(this.accepted)
    },
    refused_bar: function () {
      if (this.refused === this.largest_bar) {
        return this.max_bar_height
      }
      return this.interpolate(this.refused)
    },
    largest_bar: function () {
      return Math.max(this.pending, this.accepted, this.refused)
    },
    calc_height: function () {
      return null
    },
    pending_bar_y: function () {
      return 239.5 - this.pending_bar
    },
    accepted_bar_y: function () {
      return 239.5 - this.accepted_bar
    },
    refused_bar_y: function () {
      return 239.5 - this.refused_bar
    },
    bar_text_pending: function () {
      return 1
    }
  },
  methods: {
    interpolate: function (value) {
      // provide value that u want a height for
      const x = 0
      const x1 = value
      const x2 = this.largest_bar
      const y = 0
      const y2 = this.max_bar_height

      return (y - ((x1 - x) / (x1 - x2)) * y2) / ((x2 - x) / (x2 - x1))
    }
  }
}
</script>

<style scoped>
  rect, tspan, text {
    transition: all 0.4s ease;
  }

  svg {
    margin-top: 20px;
    width: 100%;
  }
</style>
