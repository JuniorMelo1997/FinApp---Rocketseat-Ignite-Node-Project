/*
  Warnings:

  - You are about to drop the column `cpf` on the `clients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "clients_cpf_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "cpf";
