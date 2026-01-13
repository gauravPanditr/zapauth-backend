-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "username" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "token" VARCHAR(255),
    "tokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
