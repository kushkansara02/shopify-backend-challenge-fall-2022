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
import { env } from 'process';

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
      proto: env['proto'],
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
      proto: env['proto'],
    };
  }

  @Post()
  async createInventory(
    @Body() inventoryData: { name: string; count: number; price: number },
    @Res() res,
  ): Promise<any> {
    inventoryData.count = Number(inventoryData.count);
    if (inventoryData.count < 0) {
      inventoryData.count = 0;
    }
    inventoryData.price = Number(inventoryData.price);
    if (inventoryData.price < 0) {
      inventoryData.price = 0;
    }
    await this.inventoryService.createInventory(inventoryData);

    return res.redirect('/inventory');
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() inventory: { name: string; count: number; price: number },
  ): Promise<InventoryModel> {
    inventory.count = Number(inventory.count);
    if (inventory.count < 0) {
      inventory.count = 0;
    }
    inventory.price = Number(inventory.price);
    if (inventory.price < 0) {
      inventory.price = 0;
    }
    return this.inventoryService.updateInventory({
      where: { id: Number(id) },
      data: inventory,
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
