<template>
    <div class="songsComponent">
        楽曲詳細画面
        <ul>
            <li v-for="(song, index) in songs" :key="index">
                <span >{{song.song_title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            songs:[],
        };
    },
    methods: {
        songsRead() {
            axios.get("/api/songs/read").then((res) => {
                this.songs = res.data;
            });
        },
    },
    mounted() {
        this.songsRead();
    },
};
</script>
<style lang="scss" scoped>

</style>