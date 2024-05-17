import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import TaskTable from './TaskTable';
import NavBar from './NavBar';
import swal from 'sweetalert';




function TodoList() {
    const defaultTasks = [
        { id: 1, text: 'Default Task 1', completed: false },
        { id: 2, text: 'Default Task 2', completed: true },
    ];

    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ?  JSON.parse(savedTasks) : defaultTasks;
    });

    


    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');

            swal({
                title: "Done",
                text: "Task Added",
                icon: "success",
                dangerMode: false,
            })

        }
    };

    const editTask = (id, newText) => {
        const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, text: newText } : task));
        setTasks(updatedTasks);
        setEditTaskId(null);
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));

        swal({
            title: "Done",
            text: "Task deleted",
            icon: "success",
            dangerMode: false,
        })

    };

    const handleReorderTasks = (reorderedTasks) => {
        setTasks(reorderedTasks);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'active') {
            return !task.completed;
        }
        return true;
    });
    const spamStyle = {
        fontFamily: 'sans-serif',
        marginBottom: '10px',
        fontWeight: '600'
    }

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h3 style={{ textAlign: 'center', color: '#9827f5', marginBottom: '20px', fontFamily: 'sans-serif' }}>You can add tasks here</h3>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="New Task"
                            variant="outlined"
                            fullWidth
                            value={newTask}
                            onChange={handleInputChange}
                           
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={addTask}
                            disabled={!newTask.trim()}
                            style={{ marginTop: '8px', textTransform: 'none' }}
                        >
                            Add Task
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                            <Button variant="contained" color="default" onClick={() => setFilter('all')}
                                style={{ marginRight: '10px', textTransform: 'none' }}>All</Button>
                            <Button variant="contained" onClick={() => setFilter('completed')}
                                style={{ backgroundColor: 'green', color: 'white', textTransform: 'none' }}>Completed</Button>
                            <Button variant="contained" onClick={() => setFilter('active')}
                                style={{ backgroundColor: 'red', color: 'white', textTransform: 'none', marginLeft: '10px' }}>Active</Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        {filter !== 'active' && filter !== 'completed' ? <span style={spamStyle}>All</span> : ''}
                        {filter === 'completed' ? <span style={spamStyle}>Completed tasks</span> : ''}
                        {filter === 'active' ? <span style={spamStyle}>Active tasks</span> : ''}

                        {filteredTasks.length === 0 ? (
                            <p style={{ textAlign: 'center' }}>No tasks found...  You can add new task</p>
                        ) : (
                            <TaskTable
                                tasks={filteredTasks}
                                editTaskId={editTaskId}
                                onToggleCompletion={toggleCompletion}
                                onEditTask={editTask}
                                onDeleteTask={deleteTask}
                                onSetEditTaskId={setEditTaskId}
                                onReorderTasks={handleReorderTasks}
                            />
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default TodoList;
