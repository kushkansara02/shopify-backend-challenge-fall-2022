import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { ArchivedInventoryModule } from './archived_inventory/archived_inventory.module';

@Module({
  imports: [InventoryModule, ArchivedInventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
