import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  title: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Description must have at least 2 characters.' })
  description: string;

  complete?: boolean = false;
}
