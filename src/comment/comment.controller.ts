import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dto/comment/createCommentDto.dto';
import { UpdateCommentDto } from 'src/dto/comment/updateCommentDto.dto';

@ApiTags('comment') // for grouping
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @ApiOperation({ summary: 'Create a Comment' })
    @ApiResponse({ status: 200, description: 'Comment created successfully' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Comment' })
    @ApiResponse({ status: 200, description: 'Comment found' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Comment by ID' })
    @ApiResponse({ status: 200, description: 'Comment found' })
    @ApiResponse({ status: 404, description: 'Comment not found' }) findOne(@Param('id') id: string) {
        return this.commentService.findOne(id);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a Comment by ID' })
    @ApiResponse({ status: 200, description: 'Comment updated successfully' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    update(@Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(updateCommentDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a Comment by ID' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    remove(@Param('id') id: string) {
        return this.commentService.remove(id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Comment from Task' })
    @ApiResponse({ status: 200, description: 'Comment found' })
    @ApiResponse({ status: 404, description: 'Comment not found' })
    async getCommentsByTaskId(@Param('taskId') taskId: string) {
        return this.commentService.findAllByTask(taskId);
    }
}
