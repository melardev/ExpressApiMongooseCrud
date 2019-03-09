const Todo = require('./../models/todo.model');
const TodoResponseDto = require('./../dtos/responses/todos/todo.dto');
const GenericResponseDto = require("../dtos/responses/shared/generic.dto");


exports.getAll = (req, res, next) => {
    Todo.find({})
        .sort({createdAt: 'desc'})
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
        throw err;
    });
};


exports.getCompleted = (req, res, next) => {

    Todo.find({completed: true})
        .sort({createdAt: 'desc'})
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
        throw err;
    });
};

exports.getPending = (req, res, next) => {
    Todo.find({completed: false})
        .sort({createdAt: 'desc'})
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
        throw err;
    });
};

exports.getById = (req, res, next) => {
    Todo.findById(req.params.id).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));
        return res.json(TodoResponseDto.buildDetails(todo));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.create = function (req, res, next) {
    const {title, description, completed} = req.body;
    Todo.create({title, description, completed}).then(todo => {
        return res.status(201).json(TodoResponseDto.buildDetails(todo));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.update = function (req, res, next) {

    Todo.findById(req.params.id).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));
        const {title, description, completed} = req.body;

        // In mongoose we can use .title = or .set('title', ..) examples below:
        todo.title = title;

        if (description != null)
            todo.set('description', description);

        todo.set('completed', completed);

        todo.save().then(todo => {
            return res.json(TodoResponseDto.buildDetails(todo));
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.delete = function (req, res, next) {
    Todo.findById(req.params.id).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));

        todo.delete().then(result => {
            return res.status(204).send();
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
    });
};

exports.deleteAll = function (req, res, next) {
    Todo.remove({}).then(result => {
        return res.status(204).send();
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};
