-- CreateTable
CREATE TABLE "another" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data_field" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "another_pkey" PRIMARY KEY ("id")
);
