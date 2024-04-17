import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Todo], // Make sure Todo entity is registered
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Todo]), // Provide access to Todo entity
      ],
      providers: [TodoService],
    }).compile();

    service = moduleRef.get<TodoService>(TodoService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should create a new todo', async () => {
    const createdTodo = await service.create({
      title: 'Test Todo',
      description: 'This is a test todo',
    });
    expect(createdTodo).toHaveProperty('id');
  });

  it('should fail to create a new todo', async () => {
    try {
      await service.create({
        title: null,
        description: null,
      });
      fail('Expected create method to throw error.');
    } catch (error) {
      expect(error).toBeInstanceOf(QueryFailedError);
    }
  });

  it('should return all todos', async () => {
    await service.create({ title: 'Test Todo 1', description: 'description' });
    await service.create({ title: 'Test Todo 2', description: 'description' });

    const todos = await service.findAll();
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('Test Todo 1');
    expect(todos[1].title).toBe('Test Todo 2');
  });

  it('should find a todo by id', async () => {
    const createdTodo = await service.create({
      title: 'Test Todo',
      description: 'This is a test todo',
    });
    const foundTodo = await service.findOne(createdTodo.id);
    expect(foundTodo).toEqual(createdTodo);
  });

  it('should update a todo', async () => {
    const createdTodo = await service.create({
      title: 'Test Todo',
      description: 'This is a test todo',
    });
    const updatedTodo = await service.update(createdTodo.id, {
      title: 'Updated Todo',
      description: 'This is a test todo',
      complete: true,
    });
    expect(updatedTodo.complete).toBe(true);
  });

  it('should delete a todo', async () => {
    const createdTodo = await service.create({
      title: 'Test Todo',
      description: 'This is a test todo',
    });
    await service.remove(createdTodo.id);
    const todos = await service.findAll();
    expect(todos.length).toBe(0);
  });
});
