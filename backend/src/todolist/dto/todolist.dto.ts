import {IsString, IsDate, IsBoolean, IsOptional} from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class TodolistDto {
    @IsString() title: string
    @IsOptional() @IsString() description: string
    @IsOptional() @IsBoolean() isCompleted: boolean

    @IsOptional()
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    @IsDate() 
    createdAt: Date

    @IsOptional()
    @Type(() => Date)
    @Transform(({ value }) => new Date(value))
    @IsDate()
    updatedAt: Date
}
