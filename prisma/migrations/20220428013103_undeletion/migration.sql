-- CreateTable
CREATE TABLE "ArchivedInventory" (
    "id" SERIAL NOT NULL,
    "deletionComment" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ArchivedInventory_pkey" PRIMARY KEY ("id")
);
