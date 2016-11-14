import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const generateUId = ()=> Date.now();

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {id: 1000, text: '내생에'},
                {id: 1001, text: '봄날은'},
                {id: 1002, text: '간다'},
                {id: 1003, text: '바람처럼'}
            ],
            editing: null
        };
    }
    handleDeleteCompleted() {
        const newTodos = this.state.todos.filter(v=> !v.done);
        this.setState({ todos: newTodos });
    }
	
    handleAddTodo(text) {
        this.setState({
            todos: [ ...this.state.todos, {
                id: generateUId(),
                text
            }]
        });
    }
	
    handleDeleteTodo(id) {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({ todos: newTodos });
    }
	
    handleEditTodo(id) {
        this.setState({
            editing: id
        });
    }
	
    handleSaveTodo(id, newText) {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex].text = newText;
        this.setState({
            todos: newTodos,
            editing: null
        });
    }
	
    handleCancelEditTodo() {
        this.setState({
            editing: null
        });
    }
	
    handleToggleAll() {
        const newToggleAll = !this.state.todos.every(v => v.done);
        const newTodos = this.state.todos.map(v => {
            v.done = newToggleAll;
            return v;
        });
        this.setState({
            todos: newTodos
        });
    }
	
    handleToggleTodo(id) {
        const newTodos = [...this.state.todos];
        const editIndex = newTodos.findIndex(v => v.id === id);
        newTodos[editIndex].done = !newTodos[editIndex].done;
        this.setState({
            todos: newTodos
        });
    }

    render() {
        const {
            todos,
            editing
        } = this.state;
        // routerParams.filter값을 filter에 할당
		const filter = this.props.routeParams.filter;

        const activeLength = todos.filter(v=> !v.done).length;
        const completedLength = todos.length - activeLength;
		//console.log(todos.filter(v=> v.done).length)
        return (
            <div className="todo-app">
                <Header handleAddTodo = {(text)=> this.handleAddTodo(text)} />
                <TodoList
                    todos={todos}
                    editing={editing}
                    filter={filter}
                    handleEditTodo = {id=> this.handleEditTodo(id)}
                    handleSaveTodo = {(id, newText)=> this.handleSaveTodo(id, newText)}
                    handleCancelEditTodo = {()=> this.handleCancelEditTodo()}
                    handleDeleteTodo = {id=> this.handleDeleteTodo(id)}
                    handleToggleAll={()=> this.handleToggleAll()}
                    handleToggleTodo={id=> this.handleToggleTodo(id)}
                />
                <Footer
                    filter = {filter}
                    activeLength = {activeLength}
                    completedLength = {completedLength}
                    handleSelectFilter = {filter=> this.handleSelectFilter(filter)}
                    handleDeleteCompleted = {()=> this.handleDeleteCompleted()}
					// todos배열에 필터 함수를 돌려 v.done 의 개수를 가져온다.
                    completeLength = {todos.filter(v=> v.done).length}
                />
            </div>
        );
    }
}

export default App;
