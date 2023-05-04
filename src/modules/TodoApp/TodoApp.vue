<script setup>
    import { ref } from 'vue';
    import {v4 as uuid}  from 'uuid';
    import TodoList from '@modules/TodoList/TodoList.vue';

    let todos = ref([
        {
            todoId: '0',
            title: 'Сделать что-то',
            isDone: false,
        },
        {
            todoId: '1',
            title: 'Сделать что-то 2',
            isDone: true,
        },
        {
            todoId: '2',
            title: 'Сделать что-то 3',
            isDone: false,
        }
    ]);

    const inputRef = ref();

    function toggleTodo(id) {
        let todo = todos.find(todo => todo.todoId === id);
        todo.isDone = !todo.isDone
    }

    function addTodo() {
        todos.value.push(
            {
                todoId: uuid(),
                title: inputRef.value.value,
                isDone: false,
            }
        );
        inputRef.value.value = '';
    }

    function clearDone() {
        todos.value = todos.value.filter((todo) => !todo.isDone)
    }
</script>

<template>
    <h1 class="h1">Todo App</h1>
    <input type="text" ref="inputRef">
    <input type="button" value="Add Todo" @click="addTodo">
    <input type="button" value="Clear Done" @click="clearDone">
    <TodoList :todos="todos"/>
</template>

<style lang="scss">
    body {
        background-color: rgb(52, 64, 78);
    }
    .h1 {
        color: white;
    }
</style>
