<script setup>

    const props = defineProps({
        todoId: Number,
        title: String,
        isDone: Boolean,
    });

    const emit = defineEmits(['toggle', 'addTodo']);
</script>

<template>
    <!-- @click.prevent="emit('toggle', todoId)" -->
    <!-- :checked="isDone" -->
    <label class="todo" :key="todoId">
        <input type="checkbox" class="todo__input" :checked="isDone" @click="emit('toggle', todoId)">
        <span>{{ title }}</span>
    </label>
</template>

<style scoped lang="scss">
    .todo {
        display: block;
        width: fit-content;
        padding: 2px 4px;
        margin-top: 4px;
        border-radius: 4px;

        background-color: rgb(176, 190, 204);

        &__input {
            padding: 0;
            margin: 0;
            margin-right: 4px;
        }
    }
</style>