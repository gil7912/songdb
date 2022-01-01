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
                    <el-input class="input" v-model="artist.artist_name"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト名(かな)">
                    <el-input class="input" v-model="artist.artist_name_jp"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="アーティスト名(English)">
                    <el-input class="input" v-model="artist.artist_name_en"></el-input>
                </el-form-item>
                <el-form-item label-width="150px" label="別名義1">
                    <el-select v-model="artist.alter_1" clearable placeholder="Select">
                        <el-option
                        v-for="item in artistList"
                        :key="item.artist_id"
                        :label="item.artist_name"
                        :value="item.artist_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="150px" label="別名義2">
                    <el-select v-model="artist.alter_2" clearable placeholder="Select">
                        <el-option
                        v-for="item in artistList"
                        :key="item.artist_id"
                        :label="item.artist_name"
                        :value="item.artist_id">
                        </el-option>
                    </el-select>
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
            artistList:[],
            loading: false
        };
    },
    methods: {
        create() {
            this.loading=true;
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
            console.log(this.artist);
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
        artistRead() {
            axios.post("/api/artists/readDetail", {artistId: this.artist.artist_id}).then((res) => {
                this.artist = res.data;
            });
        },
        artistsReadForPullDown() {
            axios.get("/api/artists/pulldown").then((res) => {
                this.artistList = res.data;
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
    },
    mounted() {
        this.artist.artist_id = this.$route.query.artistId;
        if(this.artist.artist_id){
            this.artistRead();
        }
        this.artistsReadForPullDown();
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
    .el-card {
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