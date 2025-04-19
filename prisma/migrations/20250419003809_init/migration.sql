-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "imagemUrl" TEXT,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);
