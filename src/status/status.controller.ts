import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusService } from './status.service';
import { CreateStatusDto } from 'src/dto/status/createStatusDto.dto';
import { UpdateStatusDto } from 'src/dto/status/updateStatusDto.dto';

@ApiTags('status') // for grouping
@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) { }

    @Post()
    @ApiOperation({ summary: 'Create a Status' })
    @ApiResponse({ status: 200, description: 'Status created successfully' })
    @ApiResponse({ status: 404, description: 'Status not found' })
    create(@Body() createStatusDto: CreateStatusDto) {
        return this.statusService.create(createStatusDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Status' })
    @ApiResponse({ status: 200, description: 'Status found' })
    @ApiResponse({ status: 404, description: 'Status not found' })
    findAll() {
        return this.statusService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Status by ID' })
    @ApiResponse({ status: 200, description: 'Status found' })
    @ApiResponse({ status: 404, description: 'Status not found' })
    findOne(@Param('id') id: string) {
        return this.statusService.findOne(id);
    }

    @Post('update')
    @ApiOperation({ summary: 'Update a Status by ID' })
    @ApiResponse({ status: 200, description: 'Status updated successfully' })
    @ApiResponse({ status: 404, description: 'Status not found' })
    update(@Body() updateStatusDto: UpdateStatusDto) {
        return this.statusService.update(updateStatusDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a Status by ID' })
    @ApiResponse({ status: 200, description: 'Status deleted successfully' })
    @ApiResponse({ status: 404, description: 'Status not found' })
    remove(@Param('id') id: string) {
        return this.statusService.remove(id);
    }
}
