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
                <el-table ref="songTable" :data="songs" @row-click="selectSong" highlight-current-row max-height="450" v-loading="loading">
                    <el-table-column prop="song_title" label="タイトル" width="80px">
                    </el-table-column>
                    <el-table-column prop="artist_name" label="アーティスト" width="113px">
                    </el-table-column>
                    <el-table-column prop="high_score" label="最高点" width="65px">
                    </el-table-column>
                    <el-table-column prop="scale_name" label="最高音" width="70px">
                    </el-table-column>
                </el-table>
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
                <el-table ref="artistTable" :data="artists" @expand-change="expandArtist" @row-click="selectArtist" highlight-current-row max-height="450" v-loading="loading">
                    <el-table-column type="expand" width="40px">
                        <template slot-scope="props">
                            <el-table ref="artistSongTable" :data="props.row.songs" v-loading="loading" @row-click="selectArtistSong" highlight-current-row >
                                <el-table-column prop="song_title" label="タイトル" width="200px">
                                </el-table-column>
                                <el-table-column prop="high_score" label="最高点" width="65px">
                                </el-table-column>
                                <el-table-column prop="scale_name" label="最高音" width="65px">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artist_name" label="アーティスト" width="153px">
                    </el-table-column>
                    <el-table-column prop="alter_name_1" label="別名義1" width="150px">
                    </el-table-column>
                </el-table>
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
            console.log(this.searchKey);
            axios.post('/api/songs/search', {searchKey: this.searchKey}).then((res) => {
                this.songs = res.data;

                console.log(res.data)
            });
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
        searchArtists(){
            this.loading = true;
            console.log(this.searchKey);
            axios.post('/api/artists/search', {searchKey: this.searchKey}).then((res) => {
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
    }

</style>