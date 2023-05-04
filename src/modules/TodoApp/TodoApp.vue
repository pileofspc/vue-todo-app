<script setup>
    import TodoList from '@modules/TodoList/TodoList.vue';
</script>

<template>
    <h1>Todo App</h1>
    <input type="text" name="" id="">
    <input type="button" value="Add Todo">
    <input type="button" value="Clear Done">
    <TodoList />
</template>

<style lang="scss">
    body {
        background-color: darkgray;
    }
</style>
