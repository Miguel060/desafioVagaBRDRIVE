import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const animalDeletado = await prisma.animal.delete({
      where: { id: parseInt(id) }
    });

    return Response.json(animalDeletado, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar animal:", error);
    return new Response("Erro ao deletar animal", { status: 500 });
  }
}
