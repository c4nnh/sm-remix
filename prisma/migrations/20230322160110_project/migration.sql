-- CreateTable
CREATE TABLE "project_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "teamSize" INTEGER NOT NULL,
    "fromDate" DATE NOT NULL,
    "toDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membershipId" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_in_project" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectRoleId" TEXT NOT NULL,

    CONSTRAINT "role_in_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_in_project" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectRoleId" TEXT NOT NULL,

    CONSTRAINT "skill_in_project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_role_name_key" ON "project_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_membershipId_name_key" ON "project"("membershipId", "name");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_in_project" ADD CONSTRAINT "role_in_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_in_project" ADD CONSTRAINT "role_in_project_projectRoleId_fkey" FOREIGN KEY ("projectRoleId") REFERENCES "project_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_in_project" ADD CONSTRAINT "skill_in_project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_in_project" ADD CONSTRAINT "skill_in_project_projectRoleId_fkey" FOREIGN KEY ("projectRoleId") REFERENCES "project_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
