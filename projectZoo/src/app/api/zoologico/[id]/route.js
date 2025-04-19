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

export async function PUT(request, { params }) {
    const { id } = params;
    const body = await request.json();
    const { nome, descricao, imagemUrl } = body;
  
    try {
      const animalAtualizado = await prisma.animal.update({
        where: { id: parseInt(id) },
        data: { nome, descricao, imagemUrl },
      });
  
      return Response.json(animalAtualizado, { status: 200 });
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      return new Response("Erro ao atualizar animal", { status: 500 });
    }
  }