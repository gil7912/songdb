"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[507],{576:(n,t,e)=>{e.d(t,{Z:()=>i});var s=e(4015),a=e.n(s),r=e(3645),o=e.n(r)()(a());o.push([n.id,".search_button[data-v-1be326d4],.search_form[data-v-1be326d4]{padding:3px}.searchComponent[data-v-1be326d4]{overflow:hidden;padding-left:0}.el-tabs[data-v-1be326d4]{padding-left:0!important}.el-tabs__header[data-v-1be326d4]{size:120%}.edit_button[data-v-1be326d4]{bottom:20px;height:60px;position:fixed;right:15px;width:60px;z-index:1}","",{version:3,sources:["webpack://./resources/js/components/search/Search.vue"],names:[],mappings:"AAkRA,8DACI,WA7QJ,CA+QA,kCAEI,eAAA,CADA,cA3QJ,CA8QA,0BACI,wBA3QJ,CA6QA,kCACI,SA1QJ,CA4QA,8BAEI,WAAA,CAGA,WAAA,CAJA,cAAA,CAEA,UAAA,CACA,UAAA,CAEA,SAzQJ",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.search_form {\n    padding:3px;\n}\n.search_button {\n    padding:3px;\n}\n.searchComponent {\n    padding-left:0px;\n    overflow: hidden;\n}\n.el-tabs {\n    padding-left:0px !important;\n}\n.el-tabs__header {\n    size: 120%;\n}\n.edit_button{\n    position: fixed;\n    bottom: 20px; \n    right: 15px;\n    width: 60px;\n    height: 60px;\n    z-index: 1;\n}\n\n"],sourceRoot:""}]);const i=o},3507:(n,t,e)=>{e.r(t),e.d(t,{default:()=>l});const s={data:function(){return{songs:[],artists:[],searchKey:"",selectedSong:"",selectedArtist:"",selectedArtistSong:"",currentRow:null,loading:!1,orderKey:"",orderValue:""}},methods:{songsRead:function(){var n=this;axios.get("/api/songs/read").then((function(t){n.songs=t.data,console.log(t.data)}))},searchSongs:function(){var n=this;this.loading=!0,this.selectedSong="",console.log(this.searchKey),console.log(this.orderKey),console.log(this.orderValue),axios.post("/api/songs/search",{searchKey:this.searchKey,orderKey:this.orderKey,orderValue:this.orderValue}).then((function(t){n.songs=t.data,n.loading=!1})).catch((function(t){n.loading=!1}))},sortChangeSong:function(n){n.order?("scale_name"===n.prop?this.orderKey="scale":this.orderKey=n.prop,"ascending"===n.order?this.orderValue="asc":"descending"===n.order&&(this.orderValue="desc")):(this.orderKey="",this.orderValue=""),this.searchSongs()},selectSong:function(n){this.currentRow===n?(this.currentRow="",this.$refs.songTable.setCurrentRow(),this.selectedSong=""):(this.currentRow=n,this.$refs.songTable.setCurrentRow(n),this.selectedSong=n.song_id)},selectArtist:function(n){this.currentRow===n?(this.currentRow="",this.$refs.artistTable.setCurrentRow(),this.selectedArtist=""):(this.currentRow=n,this.$refs.artistSongTable&&(this.$refs.artistSongTable.setCurrentRow(),this.selectedArtistSong=""),this.$refs.artistTable.setCurrentRow(n),this.selectedArtist=n.artist_id)},selectArtistSong:function(n){this.currentRow===n?(this.currentRow="",this.$refs.artistSongTable.setCurrentRow(),this.selectedArtistSong=""):(this.currentRow=n,this.$refs.artistTable.setCurrentRow(),this.selectedArtist="",this.$refs.artistSongTable.setCurrentRow(n),this.selectedArtistSong=n.song_id)},editSong:function(){this.$router.push({path:"/song",query:{songId:this.selectedSong}})},editX:function(){this.selectedArtist?(console.log(this.selectedArtist),this.$router.push({path:"/artist",query:{artistId:this.selectedArtist}})):this.selectedArtistSong?(console.log(this.selectedArtistSong),this.$router.push({path:"/song",query:{songId:this.selectedArtistSong}})):(console.log("new"),this.$router.push({path:"/artist",query:{artistId:this.selectedArtist}}))},artistsRead:function(){var n=this;this.loading=!0,axios.get("/api/artists/read").then((function(t){n.artists=t.data,n.artists.map((function(n){n.expand=!1,n.songs=[]})),n.loading=!1})).catch((function(t){n.loading=!1}))},sortChangeArtist:function(n){n.order?("scale_name"===n.prop?this.orderKey="scale":this.orderKey=n.prop,"ascending"===n.order?this.orderValue="asc":"descending"===n.order&&(this.orderValue="desc")):(this.orderKey="",this.orderValue=""),this.searchArtists()},searchArtists:function(){var n=this;this.loading=!0,this.selectedArtist="",this.selectedArtistSong="",console.log(this.searchKey),console.log(this.orderKey),console.log(this.orderValue),axios.post("/api/artists/search",{searchKey:this.searchKey,orderKey:this.orderKey,orderValue:this.orderValue}).then((function(t){n.artists=t.data,n.artists.map((function(n){n.expand=!1,n.songs=[]})),n.loading=!1})).catch((function(t){n.loading=!1}))},expandArtist:function(n,t){var e=this;if(!n.expand){this.loading=!0;var s=[];n.artist_id&&s.push(n.artist_id),n.alter_1&&s.push(n.alter_1),n.alter_2&&s.push(n.alter_2),n.expand=!0,console.log(s);try{axios.post("/api/songs/artist",{artistIds:s}).then((function(t){console.log(t.data),t.data.forEach((function(t){return n.songs.push(t)})),e.loading=!1}))}catch(n){this.loading=!1}}}},mounted:function(){this.songsRead(),this.artistsRead()}};var a=e(3379),r=e.n(a),o=e(576),i={insert:"head",singleton:!1};r()(o.Z,i);o.Z.locals;const l=(0,e(1900).Z)(s,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"searchComponent"},[e("el-tabs",{staticClass:"el-tabs",attrs:{type:"border-card"}},[e("el-tab-pane",{attrs:{label:"曲名検索"}},[e("el-row",[e("el-col",{staticClass:"search_form",attrs:{span:19}},[e("el-input",{attrs:{placeholder:"曲名を入力してください"},model:{value:n.searchKey,callback:function(t){n.searchKey=t},expression:"searchKey"}})],1),n._v(" "),e("el-col",{staticClass:"search_button",attrs:{span:5}},[e("el-button",{on:{click:n.searchSongs}},[n._v("検索")])],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],ref:"songTable",staticStyle:{width:"100%"},attrs:{data:n.songs,"highlight-current-row":"","max-height":"515"},on:{"row-click":n.selectSong,"sort-change":n.sortChangeSong}},[e("el-table-column",{attrs:{prop:"song_title",label:"タイトル","min-width":"95",sortable:""}}),n._v(" "),e("el-table-column",{attrs:{prop:"artist_name",label:"アーティスト","min-width":"125",sortable:""}}),n._v(" "),e("el-table-column",{attrs:{prop:"high_score",label:"最高点","min-width":"65",sortable:""}}),n._v(" "),e("el-table-column",{attrs:{prop:"scale_name",label:"最高音","min-width":"70",sortable:""}})],1),n._v(" "),e("el-pagination",{attrs:{layout:"total",total:n.songs.length}}),n._v(" "),e("el-button",{staticClass:"edit_button",attrs:{type:"primary",circle:"",icon:"el-icon-edit"},on:{click:n.editSong}})],1),n._v(" "),e("el-tab-pane",{attrs:{label:"アーティスト名検索"}},[e("el-row",[e("el-col",{staticClass:"search_form",attrs:{span:19}},[e("el-input",{attrs:{placeholder:"アーティスト名を入力してください"},model:{value:n.searchKey,callback:function(t){n.searchKey=t},expression:"searchKey"}})],1),n._v(" "),e("el-col",{staticClass:"search_button",attrs:{span:5}},[e("el-button",{on:{click:n.searchArtists}},[n._v("検索")])],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],ref:"artistTable",staticStyle:{width:"100%"},attrs:{data:n.artists,"highlight-current-row":"","max-height":"515"},on:{"expand-change":n.expandArtist,"row-click":n.selectArtist,"sort-change":n.sortChangeArtist}},[e("el-table-column",{attrs:{type:"expand","min-width":"35"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],ref:"artistSongTable",staticStyle:{width:"100%"},attrs:{data:t.row.songs,"highlight-current-row":""},on:{"row-click":n.selectArtistSong}},[e("el-table-column",{attrs:{prop:"song_title",label:"タイトル","min-width":"215"}}),n._v(" "),e("el-table-column",{attrs:{prop:"high_score",label:"最高点","min-width":"65"}}),n._v(" "),e("el-table-column",{attrs:{prop:"scale_name",label:"最高音","min-width":"70"}})],1),n._v(" "),e("el-pagination",{attrs:{layout:"total",total:t.row.songs.length}})]}}])}),n._v(" "),e("el-table-column",{attrs:{prop:"artist_name",label:"アーティスト","min-width":"155",sortable:""}}),n._v(" "),e("el-table-column",{attrs:{prop:"alter_name_1",label:"別名義1","min-width":"155",sortable:""}})],1),n._v(" "),e("el-pagination",{attrs:{layout:"total",total:n.artists.length}}),n._v(" "),e("el-button",{staticClass:"edit_button",attrs:{type:"primary",circle:"",icon:"el-icon-edit"},on:{click:n.editX}})],1)],1)],1)}),[],!1,null,"1be326d4",null).exports}}]);
//# sourceMappingURL=507.js.map