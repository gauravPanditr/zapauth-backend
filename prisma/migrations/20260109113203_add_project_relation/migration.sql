-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "__v" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "appEmail" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectKey_key" ON "Project"("projectKey");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
