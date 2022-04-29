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
  Req,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory as InventoryModel } from '@prisma/client';
import { Request } from 'express';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':id')
  @Render('inventory-detail')
  async getInventoryById(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<object> {
    const inventory = await this.inventoryService.inventory({ id: Number(id) });
    return {
      inventory,
      page: 'inventory',
      url: req.headers.host,
      proto: req.protocol,
    };
  }

  @Get()
  @Render('inventory')
  async getAllInventory(@Req() req: Request): Promise<object> {
    const inventory = await this.inventoryService.inventories({});
    return {
      inventory,
      page: 'inventory',
      url: req.headers.host,
      proto: req.protocol,
    };
  }

  @Post()
  async createInventory(
    @Body() inventoryData: { name: string; count: number },
    @Res() res,
  ): Promise<any> {
    await this.inventoryService.createInventory({
      name: inventoryData.name,
      count: Number(inventoryData.count),
    });
    return res.redirect('/inventory');
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() inventory: { name: string; count: number },
  ): Promise<InventoryModel> {
    return this.inventoryService.updateInventory({
      where: { id: Number(id) },
      data: { name: inventory.name, count: Number(inventory.count) },
    });
  }

  @Delete(':id')
  async deleteInventory(
    @Param('id') id: string,
    @Body() body: { deletionComment: string },
  ): Promise<any> {
    const deletion = await this.inventoryService.deleteInventory(
      {
        id: Number(id),
      },
      String(body.deletionComment),
    );
    return deletion;
  }
}
