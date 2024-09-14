import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { AuthContext } from '../context/AuthContext'; 
import { Container, Box, TextField, Typography, Button, Card, CardContent, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'; 

const TodoList = () => {
    const { todos, deleteTodo, toggleTodoCompletion, addTodo, editTodo } = useContext(TodoContext);
    const { logout, authState } = useContext(AuthContext); 
    const [searchQuery, setSearchQuery] = useState('');
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [addError, setAddError] = useState('');
    const [editError, setEditError] = useState('');

    const navigate = useNavigate();

    // Handle logout and navigate to root
    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    // Handle adding a new todo
    const handleAdd = () => {
        if (!newTitle.trim() || !newDescription.trim()) {
            setAddError('Title and Description are required.');
            return;
        }

        addTodo(newTitle, newDescription);
        setNewTitle('');
        setNewDescription('');
        setAddError('');
        setOpenAddModal(false);
    };

    // Handle editing an existing todo
    const handleEdit = () => {
        if (!editTitle.trim() || !editDescription.trim()) {
            setEditError('Title and Description are required.');
            return;
        }

        if (editingTodo) {
            editTodo(editingTodo.id, editTitle, editDescription);
            setEditingTodo(null);
            setEditTitle('');
            setEditDescription('');
            setEditError('');
            setOpenEditModal(false);
        }
    };

    // Filter todos based on the search query
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Box sx={{ marginY: 4 }}>
                <center>
                    <Typography variant="h4" gutterBottom>
                        Todo List
                    </Typography>
                </center>

                {/* Search Bar, Add Todo Button, and Logout Button */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        marginBottom: 2,
                        gap: 2,
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        sx={{ flex: 1, maxWidth: { xs: '100%', sm: 1000 } }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddModal(true)}
                        sx={{ minWidth: 'auto' }}
                    >
                        Add New Todo
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                        sx={{ minWidth: 'auto' }}
                    >
                        Logout
                    </Button>
                </Box>

                {/* Add Todo Modal */}
                <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
                    <DialogTitle>Add New Todo</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            label="Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            fullWidth
                            required
                            error={!!addError}
                            helperText={addError}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            label="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                            required
                            error={!!addError}
                            helperText={addError}
                            sx={{ marginBottom: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
                        <Button onClick={handleAdd} variant="contained">Add</Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Todo Modal */}
                {editingTodo && (
                    <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                        <DialogTitle>Edit Todo</DialogTitle>
                        <DialogContent>
                            <TextField
                                variant="outlined"
                                label="Title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                fullWidth
                                required
                                error={!!editError}
                                helperText={editError}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                variant="outlined"
                                label="Description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                fullWidth
                                required
                                error={!!editError}
                                helperText={editError}
                                sx={{ marginBottom: 2 }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                            <Button onClick={handleEdit} variant="contained">Save Changes</Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* Todo List */}
                <Grid container spacing={2}>
                    {filteredTodos.map(todo => (
                        <Grid item xs={12} sm={6} md={4} key={todo.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {todo.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        {todo.description}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <IconButton onClick={() => {
                                        setEditingTodo(todo);
                                        setEditTitle(todo.title);
                                        setEditDescription(todo.description);
                                        setOpenEditModal(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteTodo(todo.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Button onClick={() => toggleTodoCompletion(todo.id)}>
                                        {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default TodoList;
