const handleTodoButtonClick = (e) => {
    if(e.target === todoButton || e.key === 'Enter') {
        createTodoList();
    }
}

export default handleTodoButtonClick;