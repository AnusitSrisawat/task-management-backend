import { Controller, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from 'src/dto/project/createProjectDto.dto';
import { ProjectService } from './project.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from 'src/dto/project/updateProjectDto.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('project') // for grouping
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    // @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Create a Project' })
    @ApiResponse({ status: 200, description: 'Project created successfully' })
    @ApiResponse({ status: 404, description: 'Project not found' })
      create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Project' })
    @ApiResponse({ status: 200, description: 'Project found' })
    @ApiResponse({ status: 404, description: 'Project not found' })
      findAll() {
        return this.projectService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Project by ID' })
    @ApiResponse({ status: 200, description: 'Project found' })
    @ApiResponse({ status: 404, description: 'Project not found' })    findOne(@Param('id') id: string) {
        return this.projectService.findOne(id);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a Project by ID' })
    @ApiResponse({ status: 200, description: 'Project updated successfully' })
    @ApiResponse({ status: 404, description: 'Project not found' })
      update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(updateProjectDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a Project by ID' })
    @ApiResponse({ status: 200, description: 'Project deleted successfully' })
    @ApiResponse({ status: 404, description: 'Project not found' })
    remove(@Param('id') id: string) {
        return this.projectService.remove(id);
    }
}
