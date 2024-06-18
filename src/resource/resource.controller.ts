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
import { CreateRootDto } from './dto/create-root.dto';
import { UpdateRootDto } from './dto/update-root.dto';
import { CreateResourceDto } from './dto/create-resource.dto'

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/root/:root')
  async findOrganizations(@Param('root') root: string) {
    return this.resourceService.getOrganizations(root);
  }

  @Post('/create')
  async createResource(
    @Body() createOrganization: CreateResourceDto,
  ) {
    return this.resourceService.createResource(createOrganization)
  }

  @Get('/:resource/:id')
  async getResourceTree(
    @Param('resource') resource: string,
    @Param('id') id: string 
  ) {
    return this.resourceService.findResourceTree(resource, id)
  }

  @Get('/tree')
  tree() {
    return this.resourceService.tree();
  }

  @Post()
  create(@Body() createRootDto: CreateRootDto) {
    return this.resourceService.create(createRootDto);
  }

  @Get()
  findAll(@Body() { resource }: { resource: string }) {
    return this.resourceService.findAll(resource);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRootDto: UpdateRootDto) {
    return this.resourceService.update(id, updateRootDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceService.remove(id);
  }
}
