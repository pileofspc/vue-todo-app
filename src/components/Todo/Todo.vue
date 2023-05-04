<script setup>
    const props = defineProps({
        todoId: String,
        title: String,
        isDone: Boolean,
    });

    // const emit = defineEmits(['toggle']);
</script>

<template>
    <label class="todo" :key="todoId">
        <input type="checkbox" class="todo__input" :checked="isDone">
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
            margin: 0;
            margin-right: 4px;
            padding: 0;
        }
    }
</style>