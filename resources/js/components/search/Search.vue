<template>
    <div class="searchComponent">
        <el-tabs type="border-card" class="el-tabs">
            <el-tab-pane label="曲名検索">
                <el-row>
                    <el-col :span=19 class="search_form">
                        <el-input placeholder="曲名を入力してください" v-model="searchKey"></el-input>
                    </el-col>
                    <el-col :span=5 class="search_button">
                        <el-button @click="searchSongs">検索</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-switch
                        class="el-switch"
                        v-model="matchType"
                        inactive-text="前方一致"
                        active-text="部分一致">
                    </el-switch>
                </el-row>
                <el-table ref="songTable" :data="songs" @row-click="selectSong" highlight-current-row max-height="515" v-loading="loading" @sort-change="sortChangeSong" style="width: 100%">
                    <el-table-column prop="song_title" label="タイトル" min-width="95" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="artist_name" label="アーティスト" min-width="125" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="high_score" label="最高点" min-width="65" sortable="custom">
                        <template slot-scope="scope">
                            <el-popover width="50%" trigger="click" placement="top" @show="popover(scope.row.song_id, scope.row.high_score)">
                                <el-input class="pop_input"  type="number" v-model="popoverScore"></el-input>
                                <el-button class="pop_button" round size="small" @click="registerScore">登録</el-button>
                                <div slot="reference" class="name-wrapper">
                                    　{{scope.row.high_score}}　
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="scale_name" label="最高音" min-width="70" sortable="custom">
                    </el-table-column>
                </el-table>
                <el-pagination layout="total" :total="songs.length"></el-pagination>
                <el-button class="edit_button" type="primary" circle icon="el-icon-edit" @click="editSong">
                </el-button>
            </el-tab-pane>

            <el-tab-pane label="アーティスト名検索">
                <el-row>
                    <el-col :span=19 class="search_form">
                        <el-input placeholder="アーティスト名を入力してください" v-model="searchKey"></el-input>
                    </el-col>
                    <el-col :span=5 class="search_button">
                        <el-button @click="searchArtists">検索</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-switch
                        v-model="matchType"
                        inactive-text="前方一致"
                        active-text="部分一致">
                    </el-switch>
                </el-row>
                <el-table ref="artistTable" :data="artists" @expand-change="expandArtist" @row-click="selectArtist" highlight-current-row max-height="515" v-loading="loading" @sort-change="sortChangeArtist" style="width: 100%">
                    <el-table-column type="expand" min-width="35">
                        <template slot-scope="props">
                            <el-table ref="artistSongTable" :data="props.row.songs" v-loading="loading" @row-click="selectArtistSong" highlight-current-row style="width: 100%">
                                <el-table-column prop="song_title" label="タイトル" min-width="215">
                                </el-table-column>
                                <el-table-column prop="high_score" label="最高点" min-width="65">
                                    <template slot-scope="scope">
                                        <el-popover width="50%" trigger="click" placement="top" @show="popover(scope.row.song_id, scope.row.high_score)">
                                            <el-input class="pop_input"  type="number" v-model="popoverScore"></el-input>
                                            <el-button class="pop_button" round size="small" @click="registerScoreForArtist(props.row)">登録</el-button>
                                            <div slot="reference" class="name-wrapper">
                                            　{{scope.row.high_score}}　
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="scale_name" label="最高音" min-width="70">
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total" :total="props.row.songs.length"></el-pagination>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artist_name" label="アーティスト" min-width="155" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="alter_name_1" label="別名義1" min-width="155" sortable="custom">
                    </el-table-column>
                </el-table>
                <el-pagination layout="total" :total="artists.length"></el-pagination>
                <el-button class="edit_button" type="primary" circle icon="el-icon-edit" @click="editX">
                </el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            songs:[],
            artists:[],
            searchKey:'',
            selectedSong:'',
            selectedArtist:'',
            selectedArtistSong:'',
            currentRow: null,
            loading: false,
            orderKey: '',
            orderValue: '',
            matchType: false,
            popoverSong: null,
            popoverScore: null
        };
    },
    methods: {
        // 楽曲
        songsRead() {
            axios.get("/api/songs/read").then((res) => {
                this.songs = res.data;
                console.log(res.data)
            });
        },
        searchSongs(){
            this.loading=true;
            this.selectedSong = '';
            console.log(this.searchKey);
            console.log(this.orderKey);
            console.log(this.orderValue);
            axios.post('/api/songs/search', {searchKey: this.searchKey, orderKey: this.orderKey, orderValue: this.orderValue, matchType: this.matchType}).then((res) => {
                this.songs = res.data;
                this.loading = false;
            }).catch((e)=> {
                this.loading = false;
            });
        },
        sortChangeSong(column) {
            if(!column.order){
                this.orderKey = '';
                this.orderValue = '';
            } else {
                if(column.prop === 'scale_name'){
                    this.orderKey = 'scale';
                } else {
                    this.orderKey = column.prop;
                }
                if(column.order === 'ascending'){
                    this.orderValue = 'asc';
                } else if(column.order === 'descending') {
                    this.orderValue = 'desc';
                }
            }
            this.searchSongs();
        },
        selectSong(row){
            if(this.currentRow === row){
                this.currentRow = '';
                this.$refs.songTable.setCurrentRow();
                this.selectedSong = '';
            } else {
                this.currentRow = row;
                this.$refs.songTable.setCurrentRow(row);
                this.selectedSong = row.song_id;
            }
        },
        selectArtist(row){
            if(this.currentRow === row){
                this.currentRow = '';
                this.$refs.artistTable.setCurrentRow();
                this.selectedArtist = '';
            } else {
                this.currentRow = row;
                if(this.$refs.artistSongTable){
                    this.$refs.artistSongTable.setCurrentRow();
                    this.selectedArtistSong = '';
                };
                this.$refs.artistTable.setCurrentRow(row);
                this.selectedArtist = row.artist_id;
            }
        },
        selectArtistSong(row){
            if(this.currentRow === row){
                this.currentRow = '';
                this.$refs.artistSongTable.setCurrentRow();
                this.selectedArtistSong = '';
            } else {
                this.currentRow = row;
                this.$refs.artistTable.setCurrentRow();
                this.selectedArtist = '';
                this.$refs.artistSongTable.setCurrentRow(row);
                this.selectedArtistSong = row.song_id;
            }
        },
        editSong(){
            this.$router.push({
                path: '/song',
                query:{
                    songId: this.selectedSong
                }
            })
        },
        editX(){
            if(this.selectedArtist){
                console.log(this.selectedArtist);
                this.$router.push({
                    path: '/artist',
                    query:{
                        artistId: this.selectedArtist
                    }
                })
            } else if(this.selectedArtistSong){
                console.log(this.selectedArtistSong);
                this.$router.push({
                    path: '/song',
                    query:{
                        songId: this.selectedArtistSong
                    }
                })
            } else {
                console.log('new');
                this.$router.push({
                    path: '/artist',
                    query:{
                        artistId: this.selectedArtist
                    }
                })
            }
        },

        // アーティスト
        artistsRead() {
            this.loading = true;
            axios.get("/api/artists/read").then((res) => {
                this.artists = res.data;
                this.artists.map(artist => {
                    artist.expand = false;
                    artist.songs = [];
                });
                this.loading = false;
            }).catch((e)=> {
                this.loading = false;
            });
        },
        sortChangeArtist(column) {
            if(!column.order){
                this.orderKey = '';
                this.orderValue = '';
            } else {
                if(column.prop === 'scale_name'){
                    this.orderKey = 'scale';
                } else {
                    this.orderKey = column.prop;
                }
                if(column.order === 'ascending'){
                    this.orderValue = 'asc';
                } else if(column.order === 'descending') {
                    this.orderValue = 'desc';
                }
            }
            this.searchArtists();
        },
        searchArtists(){
            this.loading = true;
            this.selectedArtist = '';
            this.selectedArtistSong = '';
            console.log(this.searchKey);
            console.log(this.orderKey);
            console.log(this.orderValue);
            axios.post('/api/artists/search', {searchKey: this.searchKey, orderKey: this.orderKey, orderValue: this.orderValue, matchType: this.matchType}).then((res) => {
                this.artists = res.data;
                this.artists.map(artist => {
                    artist.expand = false;
                    artist.songs = [];
                });
                this.loading = false;
            }).catch((e)=> {
                this.loading = false;
            });
        },
        expandArtist(row, expanded){
            if(!row.expand){
                this.loading = true;
                const idList = [];
                if(row.artist_id)idList.push(row.artist_id);
                if(row.alter_1)idList.push(row.alter_1);
                if(row.alter_2)idList.push(row.alter_2);
                row.expand = true;
                console.log(idList);
                try{
                    axios.post('/api/songs/artist', {artistIds: idList}).then((res) => {
                        console.log(res.data);
                        res.data.forEach(song => row.songs.push(song));
                        this.loading = false;
                    });
                } catch(e){
                    this.loading = false;
                }
            }
        },
        popover(song_id, high_score){
            console.log(song_id);
            console.log(high_score);
            this.popoverSong = song_id;
            this.popoverScore = high_score;
        },
        registerScore(){
            console.log(this.popoverSong);
            console.log(this.popoverScore);
            axios.put("/api/songs/score", {song_id: this.popoverSong, high_score: this.popoverScore}).then((res) => {
                this.$message({
                    showClose: true,
                    message: '登録しました',
                    type: 'success'
                });
                this.searchSongs();
                this.loading=false;
            }).catch((e)=> {
                this.$message({
                    showClose: true,
                    message: '登録失敗しました...',
                    type: 'error'
                });
                this.loading=false;
                console.log(e)
            });
        },
        registerScoreForArtist(row){
            console.log(this.popoverSong);
            console.log(this.popoverScore);
            console.log(row)
            axios.put("/api/songs/score", {song_id: this.popoverSong, high_score: this.popoverScore}).then((res) => {
                this.$message({
                    showClose: true,
                    message: '登録しました',
                    type: 'success'
                });
                const idList = [];
                if(row.artist_id)idList.push(row.artist_id);
                if(row.alter_1)idList.push(row.alter_1);
                if(row.alter_2)idList.push(row.alter_2);
                try{
                    axios.post('/api/songs/artist', {artistIds: idList}).then((res) => {
                        row.songs = res.data;
                        this.loading = false;
                    });
                } catch(e){
                    this.loading = false;
                }
                this.loading=false;
            }).catch((e)=> {
                this.$message({
                    showClose: true,
                    message: '登録失敗しました...',
                    type: 'error'
                });
                this.loading=false;
                console.log(e)
            });
        }
    },
    mounted() {
        this.songsRead();
        this.artistsRead();
    },
};
</script>
<style lang="scss" scoped>
    .search_form {
        padding:3px;
    }
    .search_button {
        padding:3px;
    }
    .searchComponent {
        padding-left:0px;
        overflow: hidden;
    }
    .el-tabs {
        padding-left:0px !important;
    }
    .el-tabs__header {
        size: 120%;
    }
    .edit_button{
        position: fixed;
        bottom: 20px; 
        right: 15px;
        width: 60px;
        height: 60px;
        z-index: 1;
    }

    .el-switch{
        margin: 10px 0 0 10px;
    }

    .pop_input{
        width: 50%;
    }

    .pop_button{
        margin-left: 10px;
    }

</style>