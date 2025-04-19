import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');
    if (query) {
      const animal = await prisma.animal.findFirst({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            ...(isNaN(query) ? [] : [{ id: parseInt(query) }])
          ]
        }
      });


      if (animal) {
        return new Response(JSON.stringify(animal), { status: 200 });
      } else {
        return new Response('Animal não encontrado', { status: 404 });
      }
    } else {
      const animais = await prisma.animal.findMany();

      if (animais.length > 0) {
        return new Response(JSON.stringify(animais), { status: 200 });
      } else {
        return new Response('Nenhum animal encontrado', { status: 404 });
      }
    }
  } catch (err) {
    console.error('Erro ao buscar animais:', err);
    return new Response('Erro ao buscar animais', { status: 500 });
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
