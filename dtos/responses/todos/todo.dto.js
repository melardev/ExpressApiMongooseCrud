function buildDtos(todos) {
    return todos.map(todo => buildDto(todo))
}

function buildDto(todo, includeDescription = false) {
    const dto = {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
    };

    if (includeDescription)
        dto.desription = todo.description;

    dto.created_at = todo.createdAt;
    dto.updated_at = todo.updatedAt;
    return dto;
}

function buildDetails(todo) {
    return buildDto(todo, true);
}

module.exports = {
     buildDtos, buildDetails, buildDto
};
