<script setup>
    import Todo from '@modules/Todo/Todo.vue';

    const props = defineProps({
        todos: Array
    });
    const emit = defineEmits([
        'todo-toggled'
    ])
</script>

<template>
    <div class="todo-list">
        <Todo v-for="todo in todos"
            v-bind="todo"
            @todoToggled="emit('todo-toggled', todo)"
        />
    </div>
    <div class="nothing" v-if="todos.length === 0">
        Nothing to do yet...
    </div>
</template>

<style scoped>
    .nothing{
        margin-top: 20px;
    }
</style>