// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InMemoryStorageService } from './memorystorage/in-memory-storage.service';

@Controller('items')
export class AppController {
  constructor(private readonly storageService: InMemoryStorageService) {}

  @Get()
  findAll() {
    return this.storageService.findAll('items');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne('items', id);
  }

  @Post()
  create(@Body() createItemDto: any) {
    this.storageService.create('items', createItemDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: any) {
    this.storageService.update('items', id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.storageService.delete('items', id);
  }
}
