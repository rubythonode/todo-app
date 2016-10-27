import React, { Component } from 'react';
import Todo from './Todo';

const TodoList = ({
    todos,
    filter,
    editing,
    handleEditTodo,
    handleSaveTodo,
    handleCancelEditTodo,
    handleDeleteTodo,
    handleToggleAll,
    handleToggleTodo
}) => {
    const todoList = todos.map(({id, text, done}, i) => {
        if(
            (done && filter === 'Active')
            || (!done && filter === 'Completed')
        ) return;

        return (
            <Todo
                key  = {id}
                text = {text}
                done = {done}
                editing = {editing === id}
                onEditTodo = {()=> handleEditTodo(id)}
                onSaveTodo = {text=> handleSaveTodo(id, text)}
                onCancelEditTodo = {()=> handleCancelEditTodo()}
                onDeleteTodo = {()=> handleDeleteTodo(id)}
                onToggleTodo = {()=> handleToggleTodo(id)}
            />
        );
    });
    return (
        <div className="todo-app__main">
            <div className={`toggle-all${todos.every(v=> v.done) ? ' checked' : ''}`}
                onClick={handleToggleAll}
            />
            <ul className="todo-list">
                {todoList}
            </ul>
        </div>
    );
}

export default TodoList;