import { MinLength, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  title: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Description must have at least 2 characters.' })
  description: string;

  complete?: boolean = false;
}
