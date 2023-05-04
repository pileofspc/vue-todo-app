<script setup>
    import Todo from '@components/Todo/Todo.vue';

    defineProps({
        todos: Object
    });
</script>

<template>
    <div class="todo-list">
        <Todo v-for="todo in todos"
            v-bind="todo"
        />
    </div>
</template>

<style scoped>

</style>