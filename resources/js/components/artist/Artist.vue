<template>
    <div class="artistComponent">
        <el-container>
        <el-header class="header">
            <el-col :span="19">
                <el-button class="back" type="text" icon="el-icon-back" @click="back">
                    キャンセル
                </el-button>
            </el-col>
            <el-col :span="5">
            <div v-if="artist.artist_id">
                <el-button class="button" round @click="update">更新</el-button>
            </div>
            <div v-else>
                <el-button class="button" round @click="create">登録</el-button>
            </div>
            </el-col>
        </el-header>
        <el-main class="main">
        <el-form :model="artist" label-position="top" v-loading="loading">
            <el-card class="main-card">
                <el-form-item label-width="150px" label="アーティスト名">
                    <el-input class="input" id="artist_name" v-model="artist.artist_name" @input="handleName"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト名(かな)">
                    <el-input class="input" id="artist_name_jp" v-model="artist.artist_name_jp"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト名(English)">
                    <el-input class="input" v-model="artist.artist_name_en"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="別名義1">
                    <el-autocomplete
                        v-model="displays.alter_1"
                        :fetch-suggestions="suggestArtist"
                        placeholder="Please Input"
                        @select="selectAlter1"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label-width="150px" label="別名義2">
                    <el-autocomplete
                        v-model="displays.alter_2"
                        :fetch-suggestions="suggestArtist"
                        placeholder="Please Input"
                        @select="selectAlter2"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label-width="150px" label="メモ">
                    <el-input type="textarea" class="input" v-model="artist.memo"></el-input>
                </el-form-item>
            </el-card>
        </el-form>
        </el-main>
        </el-container>
    </div><!-- /.wrapper -->
</template>

<script>
import * as AutoKana from 'vanilla-autokana';
let autokana;
const Romanizer = require('js-hira-kata-romanize');
const r = new Romanizer({
    chouon: Romanizer.CHOUON_SKIP,
    upper: Romanizer.UPPER_NONE
});
export default {
    data() {
        return {
            artist:{
                artist_id:null,
                artist_name:null,
                artist_name_jp:null,
                artist_name_en:null,
                alter_1:null,
                alter_2:null,
                memo:null,
            },
            displays: {
                alter_1: '',
                alter_2: '',
            },
            artistList:[],
            loading: false
        };
    },
    methods: {
        create() {
            this.loading=true;
            this.checkArtist();
            axios.post("/api/artists/create", this.artist).then((res) => {
                this.$message({
                    showClose: true,
                    message: '登録しました',
                    type: 'success'
                });
                this.loading=false;
                this.$router.push({
                path: '/search',
                    query:{
                        artistId: this.artist.artist_id
                    }
                })
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
        update() {
            this.loading=true;
            this.checkArtist();
            axios.put("/api/artists/update", this.artist).then((res) => {
                this.$message({
                    showClose: true,
                    message: '更新しました',
                    type: 'success'
                });
                this.loading=false;
                this.$router.push({
                path: '/search',
                    query:{
                        artistId: this.artist.artist_id
                    }
                })
            }).catch((e)=> {
                this.$message({
                    showClose: true,
                    message: '更新失敗しました...',
                    type: 'error'
                });
                this.loading=false;
                console.log(e)
            });
        },
        suggestArtist(query, cb) {
            axios.post('/api/artists/search', {searchKey: query}).then((res) => {
                const results = res.data.map((r) => {return {value: r.artist_name, artist_id: String(r.artist_id)}})
                cb(results)
            }).catch((e)=> {
            });
        },
        selectAlter1(artist){
            this.artist.alter_1 = artist.artist_id;
            this.displays.alter_1 = artist.value;
        },
        selectAlter2(artist){
            this.artist.alter_2 = artist.artist_id;
            this.displays.alter_2 = artist.value;
        },
        checkArtist(){
            if(!this.displays.alter_1){
                this.artist.alter_1 = null;
            }
            if(!this.displays.alter_2){
                this.artist.alter_2 = null;
            }
        },
        artistRead() {
            axios.post("/api/artists/readDetail", {artistId: this.artist.artist_id}).then((res) => {
                this.artist = res.data;
            });
        },
        artistsReadForPullDown() {
            axios.get("/api/artists/pulldown").then((res) => {
                this.artistList = res.data;
                if(this.artist.artist_id){
                    res.data.forEach(r => {
                        if(this.artist.alter_1 && this.artist.alter_1 === r.artist_id){
                            this.displays.alter_1 = r.artist_name;
                        }
                        if(this.artist.alter_2 && this.artist.alter_2 === r.artist_id){
                            this.displays.alter_2 = r.artist_name;
                        }
                    });
                }
            });
        },
        back(){
            this.$router.push({
                path: '/search',
                query:{
                    artistId: this.artist.artist_id
                }
            })
        },
        handleName() {
            this.artist.artist_name_jp = autokana.getFurigana();
            this.artist.artist_name_en = r.romanize(this.artist.artist_name_jp)
        }
    },
    mounted() {
        this.artist.artist_id = this.$route.query.artistId;
        if(this.artist.artist_id){
            this.artistRead();
        }
        this.artistsReadForPullDown();
        autokana = AutoKana.bind('#artist_name', '#artist_name_jp');
    },
};
</script>
<style lang="scss" scoped>
    * {
        margin:0;
        padding:0;
    }
    .header {
        width:100%;
        background: #FFF;
        padding:0 2px;
        position:fixed;
        z-index: 1;
    }
    .clearfix {
        height: 10px;
    }
    .option-card {
        margin-top:10px;
    }
    .el-select-dropdown__item {
        padding-left: 20px;
    }
    .el-select {
        width: 100%;
    }
    .notes {
        width: 45%;
    }
    .el-form-item {
        margin:0px, 5px, 0px;
    }
    .button {
        margin: 5px;
        background: #1E9AFE;
        color: #FFF;
    }
    .back {
        margin-top:20px;
    }
    .main {
        padding-top:50px;
    }
    .artistComponent {
        max-width: 100%;

        padding-left:0px;
        overflow: hidden;
    }
    .input {
        width: 100%;
    }
</style>