// data source
// const api = 'https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json';
const API = './spotlist.json';

const app = Vue.createApp({
  data() {
    return {
      loading: false,
      spotList: [],
      updateTime: null,
      filterOption: {
        input: '',
        region: 'all',
      },
      pageOption: {
        currPage: 1,
        pageSize: 20,
      },
      hasData: false,
    };
  },
  watch: {
    filtersArena() {
      this.pageOption.currPage = 1;
    },
    pageList() {
      const len = this.pageList.length;
      if (!this.loading && len === 0) this.hasData = true;
    },
  },
  computed: {
    filterSpotList() {
      return this.spotList.filter((spot) => spot.Name.includes(this.filterOption.input));
    },
    filtersArena() {
      const { region } = this.filterOption;
      if (region === 'all') return this.filterSpotList;
      return this.filterSpotList.filter((spot) => spot.Region === region || spot.Add.includes(region));
    },
    pageList() {
      const { currPage, pageSize } = this.pageOption;
      return this.filtersArena.slice(currPage * pageSize - pageSize, currPage * pageSize);
    },
    arenaList() {
      const set = new Set();
      const arenaTemp = this.filterSpotList.filter((spot) => {
        if (spot.Region) {
          return !set.has(spot.Region) ? set.add(spot.Region) : false;
        }
      });
      return arenaTemp.map((spot) => spot.Region);
    },
    formatTime() {
      if (!this.updateTime) return;
      const tempArr = this.updateTime.split('T');
      const result = `${tempArr[0]}  ${tempArr[1].split('+')[0]}`;
      return result;
    },
    maxPage() {
      return Math.ceil(this.filtersArena.length / this.pageOption.pageSize);
    },
  },
  created() {
    this.loading = true;
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        this.spotList = data['XML_Head']['Infos']['Info'];
        this.updateTime = data['XML_Head']['Updatetime'];
        this.loading = false;
      });
  },
});
app.component('table-component', {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      hasData: true,
    };
  },
  watch: {
    list() {
      this.hasData = this.list.length ? true : false;
    },
  },
  methods: {
    parseTown(address) {
      const temp1 = address.substring(3,6);
      const temp2 = address.substring(6,9);
      if(typeof(Number(temp1) === 'Number')) {
        return temp2
      } else {
        return temp1
      }
    }
  },
  template: `
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Region</th>
          <th>Town</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <div class="info" v-show="!hasData">查無資料...</div>
        <tr v-for="({ Id, Region, Town, Name, Add }, index) in list" :key="Id">
          <th>{{ index+1 }}</th>
          <th>{{ Region ? Region : Add.substring(0,3) }}</th>
          <th>{{ Town ? Town : parseTown(Add) }}</th>
          <th>{{ Name }}</th>
        </tr>
      </tbody>
    </table>
  `,
});

app.mount('#app');