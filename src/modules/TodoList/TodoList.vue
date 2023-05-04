<script setup>
    import Todo from '@components/Todo/Todo.vue';
    import { onBeforeUpdate, reactive } from "vue";

    let todos = reactive([
        {
            todoId: 0,
            title: 'Сделать что-то',
            isDone: false,
        },
        {
            todoId: 1,
            title: 'Сделать что-то 2',
            isDone: true,
        },
        {
            todoId: 2,
            title: 'Сделать что-то 3',
            isDone: false,
        }
    ]);

    function toggleTodo(key) {
        // console.log(todos[0]);
        let todo = todos.find(todo => todo.todoId === key);
        // console.log(todo);
        todo.isDone = !todo.isDone
    }

    function addTodo(key) {
        todos.push(
            {
                todoId: 3,
                title: 'Сделать что-то 4',
                isDone: false,
            }
        );
        console.log(key);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'k') {
            console.log(todos);
        }

        if (e.key === 'p') {
            toggleTodo(2)
        }
    });

    onBeforeUpdate(() => {
        console.log('updated');
    })

</script>

<template>
    <!-- :toggle="toggleTodo" -->
    <div class="todo-list">
        <Todo v-for="todo in todos"
            :todo-id="todo.todoId"
            :title="todo.title"
            :is-done="todo.isDone"
            @toggle="toggleTodo"
            @add-todo="addTodo"
        />
    </div>
</template>

<style scoped>

</style>