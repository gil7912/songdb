<template>
    <div class="appComponent">
        <Header />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>
<script>
import Header from "./Header.vue";
export default {
    components: {
        Header,
    },
};
</script>
<style>
button, input{
    border: 1px solid black;
    padding: 0 5px;
}
.container {
    padding:0;
}
</style>