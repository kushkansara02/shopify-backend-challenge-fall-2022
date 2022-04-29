import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArchivedInventoryService } from '../archived_inventory/archived_inventory.service';
import { Inventory, Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArchivedInventoryService))
    private readonly archivedInventoryService: ArchivedInventoryService,
  ) {}

  async inventory(
    inventoryWhereUniqueInput: Prisma.InventoryWhereUniqueInput,
  ): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({
      where: inventoryWhereUniqueInput,
    });
  }

  async inventories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InventoryWhereUniqueInput;
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput;
  }): Promise<Inventory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.inventory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createInventory(data: Prisma.InventoryCreateInput): Promise<Inventory> {
    return this.prisma.inventory.create({
      data,
    });
  }

  async updateInventory(params: {
    where: Prisma.InventoryWhereUniqueInput;
    data: Prisma.InventoryUpdateInput;
  }): Promise<Inventory> {
    const { where, data } = params;
    return this.prisma.inventory.update({
      data,
      where,
    });
  }

  async deleteInventory(
    where: Prisma.InventoryWhereUniqueInput,
    deletionComment: string,
  ): Promise<Inventory> {
    const deletion = await this.prisma.inventory.delete({
      where,
    });
    await this.archivedInventoryService.createArchivedInventory({
      deletionComment: deletionComment,
      name: deletion.name,
      count: deletion.count,
      price: deletion.price,
    });
    return deletion;
  }
}
