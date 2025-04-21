import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/task/createTaskDto.dto';
import { UpdateTaskDto } from 'src/dto/task/updateTaskDto.dto';
import { AssignTaskToUserDto } from 'src/dto/task/assignTaskToUserDto.dto';

@ApiTags('task') // for grouping
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @ApiOperation({ summary: 'Create a Task' })
    @ApiResponse({ status: 200, description: 'Task created successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Task' })
    @ApiResponse({ status: 200, description: 'Task found' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Task by ID' })
    @ApiResponse({ status: 200, description: 'Task found' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a Task by ID' })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    update(@Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(updateTaskDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a Task by ID' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }

    @Post('assign')
    @ApiOperation({ summary: 'Assign a Task to a User' })
    @ApiResponse({ status: 200, description: 'Task assigned successfully' })
    @ApiResponse({ status: 404, description: 'Task or User not found' })
    async assignTaskToUser(@Body() assignTaskToUserDto: AssignTaskToUserDto) {
        return this.taskService.assignTaskToUser(assignTaskToUserDto.taskId, assignTaskToUserDto.assigneeIds);
    }

    @Post(':id/status/:statusId')
    @ApiOperation({ summary: 'Update Task Status' })
    @ApiResponse({ status: 200, description: 'Task status updated successfully' })
    @ApiResponse({ status: 404, description: 'Task or Status not found' })
    async updateStatus(@Param('id') id: string, @Param('statusId') statusId: string) {
        return this.taskService.updateStatus(id, statusId);
    }

    @Get('project/:projectId')
    @ApiOperation({ summary: 'Get Tasks by Project ID' })
    @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Project not found' })
    async findByProject(@Param('projectId') projectId: string) {
        return this.taskService.findByProject(projectId);
    }
}
