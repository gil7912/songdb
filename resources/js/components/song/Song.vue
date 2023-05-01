<template>
    <div class="songComponent">
        <el-container>
        <el-header class="header">
            <el-col :span="19">
                <el-button class="back" type="text" icon="el-icon-back" @click="back">
                    キャンセル
                </el-button>
            </el-col>
            <el-col :span="5">
            <div v-if="song.song_id">
                <el-button class="button" round @click="update">更新</el-button>
            </div>
            <div v-else>
                <el-button class="button" round @click="create">登録</el-button>
            </div>
            </el-col>
        </el-header>
        <el-main class="main">
        <el-form :model="song" label-position="top" v-loading="loading">
            <el-card class="main-card">
                <div slot="header" class="clearfix">
                    <span>必須</span>
                </div>
                <el-form-item label-width="50px" label="自動補完">
                    <el-switch id="is_handle" v-model="song.is_handle"></el-switch>
                </el-form-item>
                <el-form-item label-width="150px" label="楽曲名">
                    <el-input class="input" id="song_title" v-model="song.song_title" @input="handleName"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト">
                    <el-autocomplete
                        v-model="displays.artist_name_1"
                        :fetch-suggestions="suggestArtist"
                        placeholder="Please Input"
                        @select="selectArtist1"
                    ></el-autocomplete>
                </el-form-item>
            </el-card>
            <el-card class="option-card">
                <div slot="header" class="clearfix">
                    <span>任意</span>
                </div>
                <el-form-item label-width="150px" label="最高音">
                    <el-select class="notes" v-model="octave_1" clearable placeholder="Select">
                        <el-option
                        v-for="item in scales_1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select class="notes" v-model="octave_2" clearable placeholder="Select">
                        <el-option
                        v-for="item in scales_2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="150px" label="楽曲名(かな)">
                    <el-input class="input" id="song_title_jp"  v-model="song.song_title_jp"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="楽曲名(English)">
                    <el-input class="input" v-model="song.song_title_en"></el-input>
                </el-form-item>

                <el-form-item label-width="150px" label="アーティスト2">
                    <el-autocomplete
                        v-model="displays.artist_name_2"
                        :fetch-suggestions="suggestArtist"
                        placeholder="Please Input"
                        @select="selectArtist2"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト3">
                    <el-autocomplete
                        v-model="displays.artist_name_3"
                        :fetch-suggestions="suggestArtist"
                        placeholder="Please Input"
                        @select="selectArtist3"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label-width="150px" label="最高得点">
                    <el-input class="input" v-model="song.high_score"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="メモ">
                    <el-input type="textarea" class="input" v-model="song.memo"></el-input>
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
            song:{
                song_id:null,
                song_title:null,
                song_title_jp:null,
                song_title_en:null,
                artist_id:null,
                sub_artist_1:null,
                sub_artist_2:null,
                play_time:null,
                highest_note:null,
                lowest_note:null,
                high_score:null,
                low_score:null,
                memo:null,
                is_handle: true
            },
            artists:[],
            octaves:[],
            octave_1:null,
            octave_2:null,
            scales_1:[
                {label:'low',value: 0},
                {label:'mid1',value: 1},
                {label:'mid2',value: 2},
                {label:'hi',value: 3},
                {label:'hihi',value: 4},
                {label:'hihihi',value: 5}
            ],
            scales_2:[
                {label:'A',value: 0},
                {label:'A♯',value: 1},
                {label:'B',value: 2},
                {label:'C',value: 3},
                {label:'C♯',value: 4},
                {label:'D',value: 5},
                {label:'D♯',value: 6},
                {label:'E',value: 7},
                {label:'F',value: 8},
                {label:'F♯',value: 9},
                {label:'G',value: 10},
                {label:'G♯',value: 11}
            ],
            displays: {
                artist_name_1: '',
                artist_name_2: '',
                artist_name_3: '',
            },
            loading:false
        };
    },
    methods: {
        create() {
            this.loading=true;
            this.checkArtist();
            this.song.highest_note = this.octave_1 * 12 + this.octave_2 + 1;
            axios.post("/api/songs/create", this.song).then((res) => {
                this.$message({
                    showClose: true,
                    message: '登録しました',
                    type: 'success'
                });
                this.loading=false;
                this.$router.push({
                path: '/search',
                    query:{
                        songId: this.song.song_id
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
            this.song.highest_note = this.octave_1 * 12 + this.octave_2 + 1;
            axios.put("/api/songs/update", this.song).then((res) => {
                this.$message({
                    showClose: true,
                    message: '更新しました',
                    type: 'success'
                });
                this.loading=false;
                this.$router.push({
                    path: '/search',
                    query:{
                        songId: this.song.song_id
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
        songRead() {
            axios.post("/api/songs/readDetail", {songId: this.song.song_id}).then((res) => {
                this.song = res.data;
                this.octave_1 = Math.floor((this.song.highest_note - 1) / 12);
                this.octave_2 = (this.song.highest_note - 1) % 12;
                console.log(this.song);
            });
        },
        artistRead() {
            axios.get("/api/artists/pulldown").then((res) => {
                this.artists = res.data;
                if(this.song.song_id){
                    res.data.forEach(r => {
                        if(this.song.artist_id && this.song.artist_id === r.artist_id){
                            this.displays.artist_name_1 = r.artist_name;
                        }
                        if(this.song.sub_artist_1 && this.song.sub_artist_1 === r.artist_id){
                            this.displays.artist_name_2 = r.artist_name;
                        }
                        if(this.song.sub_artist_2 && this.song.sub_artist_2 === r.artist_id){
                            this.displays.artist_name_3 = r.artist_name;
                        }
                    });
                }
            });
        },
        octaveRead() {
            axios.get("/api/octave/read").then((res) => {
                this.octaves = res.data;
            });
        },
        suggestArtist(query, cb) {
            console.log(query)
            axios.post('/api/artists/search', {searchKey: query}).then((res) => {
                console.log(res.data)
                const results = res.data.map((r) => {return {value: r.artist_name, artist_id: String(r.artist_id)}})
                console.log(results)
                cb(results)
            }).catch((e)=> {
            });
        },
        selectArtist1(artist){
            this.song.artist_id = artist.artist_id;
            this.displays.artist_name_1 = artist.value;
        },
        selectArtist2(artist){
            this.song.sub_artist_1 = artist.artist_id;
            this.displays.artist_name_2 = artist.value;
        },  
        selectArtist3(artist){
            this.song.sub_artist_2 = artist.artist_id;
            this.displays.artist_name_3 = artist.value;
        },
        checkArtist(){
            if(!this.displays.artist_name_1){
                this.song.artist_id = null;
            }
            if(!this.displays.artist_name_2){
                this.song.sub_artist_1 = null;
            }
            if(!this.displays.artist_name_3){
                this.song.sub_artist_2 = null;
            }
        },
        back(){
            this.$router.push({
                path: '/search',
                query:{
                    songId: this.song.song_id
                }
            })
        },
        handleName() {
            if(this.song.is_handle){
                this.song.song_title_jp = autokana.getFurigana();
                this.song.song_title_en = r.romanize(this.song.song_title_jp);
            }
        }
    },
    mounted() {
        this.song.song_id = this.$route.query.songId;
        if(this.song.song_id){
            this.songRead();
        }
        this.artistRead();
        this.octaveRead();
        autokana = AutoKana.bind('#song_title');
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
    .el-autocomplete {
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
    .songComponent {
        max-width: 100%;

        padding-left:0px;
        overflow: hidden;
    }
    .input {
        width: 100%;
    }
</style>