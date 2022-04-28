import { Controller, Get, Render, Param, Delete } from '@nestjs/common';
import { ArchivedInventoryService } from './archived_inventory.service';
import { InventoryService } from '../inventory/inventory.service';
import { app } from '../main';

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
  async getAllArchivedInventory(): Promise<object> {
    const archivedInventory =
      await this.archivedInventoryService.archivedInventories({});
    return {
      archivedInventory,
      page: 'archived-inventory',
      url: await app.getUrl(),
    };
  }

  @Delete(':id')
  async undeleteInventory(@Param('id') id: string): Promise<any> {
    await this.archivedInventoryService.deleteArchivedInventory({
      id: Number(id),
    });
  }
}
