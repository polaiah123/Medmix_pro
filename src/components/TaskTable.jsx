import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, 
         Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, TextField } from '@material-ui/core'; 
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import swal from 'sweetalert'; 

const CustomCheckbox = withStyles({
  root: {
    color: '#3f51b5',
    '&$checked': {
      color: '#3f51b5',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5', 
    color: theme.palette.common.white,
    border: '2px solid #ddd',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  body: {
    border: '1px solid #ddd',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}))(TableCell);

const tableContainerStyle = {
  overflowX: 'auto', 
};

function TaskTable({ tasks, editTaskId, onToggleCompletion, onEditTask, onDeleteTask, onSetEditTaskId, onReorderTasks }) {
  const [editedText, setEditedText] = useState('');
  const [error, setError] = useState('');
  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    textTransform: 'none',
   
  };
  

  const handleEdit = (task) => {
    setEditedText(task.text); 
    onSetEditTaskId(task.id);
  };

  const handleSaveEdit = (taskId) => {
    if (!editedText.trim()) {
      setError('* Task cannot be empty');
      return;
    }
    setError('');
    onEditTask(taskId, editedText);
    setEditedText('');
    onSetEditTaskId(null); 
    swal({
      title: "Done",
      text: "Task Saved",
      icon: "success",
      dangerMode: false,
    });
  };

  // Reorder tasks function
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );
    onReorderTasks(reorderedTasks); 
  };

  return (
    <TableContainer style={{ ...tableContainerStyle, marginBottom: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Task</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId={tasks}>
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id ? task.id.toString() : index.toString()} 
                  draggableId={task.id ? task.id.toString() : index.toString()} index={index}>
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <StyledTableCell>
                          <FormControlLabel
                            control={<CustomCheckbox checked={task.completed} onChange={() => onToggleCompletion(task.id)} />}
                            label={editTaskId === task.id ? (
                              <>
                                <TextField
                                  value={editedText}
                                  onChange={(event) => {
                                    setEditedText(event.target.value);
                                    setError('');
                                  }}
                                  variant="outlined"
                                  size="small"
                                />
                                {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}
                              </>
                            ) : (
                              <span>{task.text}</span>
                            )}
                          />
                        </StyledTableCell>
                        <StyledTableCell >
                          {!task.completed ? (
                            <>
                              {editTaskId === task.id ? (
                                <Button variant="contained" color="primary" style={{ ...buttonStyle, marginLeft: '5px', marginTop:'5px' }} onClick={() => handleSaveEdit(task.id)}>Save</Button>
                              ) : (
                                <Button variant="contained" color="primary" style={{ textTransform: 'none',  marginLeft:'5px',marginTop:'5px' }} onClick={() => handleEdit(task)}>Edit</Button>
                              )}
                            </>
                          ) : null}
                          <Button variant="contained" color="secondary" onClick={() => onDeleteTask(task.id)} style={{ textTransform: 'none', marginLeft:'5px', marginTop:'5px' }}>Delete</Button>
                        </StyledTableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </TableContainer>
  );
}

export default TaskTable;