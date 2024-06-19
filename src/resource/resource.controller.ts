import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { CreateResourceDto } from './dto/create-resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('/create')
  async createResource(@Body() createResource: CreateResourceDto) {
    return this.resourceService.create(createResource);
  }

  @Get('/:id')
  async findResource(@Param('id') id: string) {
    return this.resourceService.findResource(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resourceService.remove(id);
  }
}
