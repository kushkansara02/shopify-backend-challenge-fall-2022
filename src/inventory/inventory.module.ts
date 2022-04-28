import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ArchivedInventoryModule } from '../archived_inventory/archived_inventory.module';

@Module({
  imports: [PrismaModule, ArchivedInventoryModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
