<script setup>
    import { onMounted, ref, watch } from 'vue';
    import {v4 as uuid}  from 'uuid';
    import TodoList from '@modules/TodoList/TodoList.vue';

    let todos = ref([]);

    const LOCAL_STORAGE_KEY = 'todoAppVue.todos';

    onMounted(() => {
        loadTodos();
        watch(todos, saveTodos, { deep: true });
    })
    
    
    const inputValue = ref('');

    function loadTodos() {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedTodos) {
            todos.value = storedTodos
        }
    }
    function saveTodos() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos.value));
    }

    function toggleTodo(post) {
        let todo = todos.value.find(todo => todo.todoId === post.todoId);
        todo.isDone = !todo.isDone;
    }
    function addTodo() {
        todos.value.push(
            {
                todoId: uuid(),
                title: inputValue.value,
                isDone: false,
            }
        );
        inputValue.value = '';
    }
    function clearDone() {
        todos.value = todos.value.filter((todo) => !todo.isDone)
    }
</script>

<template>
    <h1 class="h1">Todo App</h1>
    <input type="text" v-model="inputValue">
    <input type="button" value="Add Todo" @click="addTodo">
    <input type="button" value="Clear Done" @click="clearDone">
    <TodoList 
        :todos="todos"
        @todo-toggled="toggleTodo"
    />
</template>

<style lang="scss">
    body {
        background-color: rgb(52, 64, 78);
        color: white;
    }
</style>
