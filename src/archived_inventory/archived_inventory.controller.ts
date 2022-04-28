import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { ArchivedInventoryService } from './archived_inventory.service';
import { InventoryService } from '../inventory/inventory.service';

@Controller('archived-inventory')
export class ArchivedInventoryController {
  constructor(
    private readonly archivedInventoryService: ArchivedInventoryService,
    private readonly inventoryService: InventoryService,
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
    return { archivedInventory, page: 'archived-inventory' };
  }

  @Delete(':id')
  async undeleteInventory(@Param('id') id: string): Promise<any> {
    await this.archivedInventoryService.deleteArchivedInventory({
      id: Number(id),
    });
  }
}
