import { Controller, Get, Render, Param, Delete, Req } from '@nestjs/common';
import { ArchivedInventoryService } from './archived_inventory.service';
import { Request } from 'express';
import { env } from 'process';

@Controller('archived-inventory')
export class ArchivedInventoryController {
  constructor(
    private readonly archivedInventoryService: ArchivedInventoryService,
  ) {}

  @Get(':id')
  async getArchivedInventoryById(@Param('id') id: string): Promise<object> {
    const archivedInventory =
      await this.archivedInventoryService.archivedInventory({ id: Number(id) });
    return { archivedInventory, page: 'archived-inventory' };
  }

  @Get()
  @Render('archived-inventory')
  async getAllArchivedInventory(@Req() request: Request): Promise<object> {
    const archivedInventory =
      await this.archivedInventoryService.archivedInventories({});
    return {
      archivedInventory,
      page: 'archived-inventory',
      url: request.headers.host,
      proto: env['proto'],
    };
  }

  @Delete(':id')
  async undeleteInventory(@Param('id') id: string): Promise<any> {
    await this.archivedInventoryService.deleteArchivedInventory({
      id: Number(id),
    });
  }
}
