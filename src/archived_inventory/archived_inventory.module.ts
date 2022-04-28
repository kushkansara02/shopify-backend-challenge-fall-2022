import { Module, forwardRef } from '@nestjs/common';
import { ArchivedInventoryService } from './archived_inventory.service';
import { ArchivedInventoryController } from './archived_inventory.controller';
import { InventoryModule } from '../inventory/inventory.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => InventoryModule), PrismaModule],
  controllers: [ArchivedInventoryController],
  providers: [ArchivedInventoryService],
  exports: [ArchivedInventoryService],
})
export class ArchivedInventoryModule {}
