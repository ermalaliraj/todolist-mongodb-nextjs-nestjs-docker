import {IsBoolean, IsDate, IsOptional, IsString} from 'class-validator'
import {Type} from "class-transformer";

export class SearchTodoListDto {
  @IsOptional() _id: string
  @IsOptional() @IsString() title: string
  @IsOptional() @IsString() description: string
  @IsOptional() @IsBoolean() isCompleted: boolean
  @IsOptional() @Type(() => Date) @IsDate() createdAt: Date
  @IsOptional() @Type(() => Date) @IsDate() updatedAt: Date

  @IsOptional() page: number
  @IsOptional() pageSize: number
  @IsOptional() @IsString() orderBy: string
}