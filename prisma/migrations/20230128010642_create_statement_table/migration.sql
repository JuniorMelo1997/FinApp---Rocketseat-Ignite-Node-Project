-- CreateTable
CREATE TABLE "statement" (
    "id" TEXT NOT NULL,
    "transaction" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "statement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "statement_id_ownerId_key" ON "statement"("id", "ownerId");

-- AddForeignKey
ALTER TABLE "statement" ADD CONSTRAINT "statement_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
