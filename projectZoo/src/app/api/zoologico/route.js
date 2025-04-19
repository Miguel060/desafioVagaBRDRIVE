import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { query } = req.url.split('?')[1]
      ? Object.fromEntries(new URLSearchParams(req.url.split('?')[1]))
      : {};

    if (!query) {
      return Response.json({ message: 'Parâmetro de busca (query) não fornecido' }, { status: 400 });
    }

    const animal = await prisma.animal.findFirst({
      where: {
        OR: [
          { id: !isNaN(query) ? parseInt(query) : -1 }, // só parseia número se for válido
          { nome: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    if (animal) {
      return Response.json(animal, { status: 200 });
    } else {
      return Response.json({ message: 'Animal não encontrado' }, { status: 404 });
    }
  } catch (err) {
    console.error('Erro ao buscar animal:', err);
    return Response.json({ message: 'Erro ao buscar animal' }, { status: 500 });
  }
}



export async function POST(request) {
    try {
      const body = await request.json()
      const { nome, especie, descricao, imagemUrl } = body
  
      const novoAnimal = await prisma.animal.create({
        data: {
          nome,
          especie,
          descricao,
          imagemUrl
        }
      })
  
      return Response.json(novoAnimal)
    } catch (err) {
      console.error("Erro ao criar animal:", err)
      return new Response('Erro ao criar animal', { status: 500 })
    }
  }
  