import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArchivedInventory, Prisma } from '@prisma/client';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class ArchivedInventoryService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,
  ) {}

  async archivedInventory(
    archivedInventoryWhereUniqueInput: Prisma.ArchivedInventoryWhereUniqueInput,
  ): Promise<ArchivedInventory | null> {
    return this.prisma.archivedInventory.findUnique({
      where: archivedInventoryWhereUniqueInput,
    });
  }

  async archivedInventories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArchivedInventoryWhereUniqueInput;
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput;
  }): Promise<ArchivedInventory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.archivedInventory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createArchivedInventory(
    data: Prisma.ArchivedInventoryCreateInput,
  ): Promise<ArchivedInventory> {
    return this.prisma.archivedInventory.create({
      data,
    });
  }

  async updateArchivedInventory(params: {
    where: Prisma.InventoryWhereUniqueInput;
    data: Prisma.InventoryUpdateInput;
  }): Promise<ArchivedInventory> {
    const { where, data } = params;
    return this.prisma.archivedInventory.update({
      data,
      where,
    });
  }

  async deleteArchivedInventory(
    where: Prisma.InventoryWhereUniqueInput,
  ): Promise<ArchivedInventory> {
    const archive = await this.prisma.archivedInventory.delete({
      where,
    });
    await this.inventoryService.createInventory({
      name: archive.name,
      count: archive.count,
    });
    return archive;
  }
}
