<template>
  <div>
    <nav>
    <ul class="pagination">
      <li @click="tapPage(1)">
        <span aria-hidden="true">&laquo;</span>
      </li>
      <li :class="{disabled: (current-1)<=0}" @click="tapPage(current-1)">
        <span aria-hidden="true">上一页</span>
      </li>
      <li v-for="item in pageList" @click="tapPage(item)" :class="{active: item==current}">
        <span>{{item}}</span>
      </li>
      <li :class="{disabled: current>(total-1)}" @click="tapPage(-(-current-1))">
        <span aria-hidden="true" >下一页</span>
      </li>
      <li @click="tapPage(total)">
        <span aria-hidden="true">&raquo;</span>
      </li>
    </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props: {
      current: {
         twoWay: true
      },
      'total': {},
      change: {
         twoWay: true
      },
    },
    ready() {
      let me = this;
      me.initPage(me.total)
    },
    data() {
        return {
          pageList: ''
        }
    },
    computed: {
    },
    watch: {
      'current': {
        handler: function (val, oldVal) {
            let me = this;
            me.initPage(me.total)
        },
        deep: true
      },
      'total': {
        handler: function (val, oldVal) {
            let me = this;
            me.initPage(me.total);
        },
        deep: true
      },
    },
    methods: {
      initPage(total) {
          let me = this;
          let len = total > 5 ? 5 : total;
          let arr = [];
          let j = 0;
          for (let i=0; i<len; i++) {
              arr.push(parseInt(me.current)+ i);
              if((parseInt(me.current) + i) > total) {
                  j++;
              }
          }
          me.pageList = arr.map(function (obj) {
              return obj-j;
          })
      },
      tapPage(i){
        var me = this;
        if( i > 0 && i <= me.total ) {
          me.current = i;
        }
      }
    }
}
</script>


<style scoped>
</style>