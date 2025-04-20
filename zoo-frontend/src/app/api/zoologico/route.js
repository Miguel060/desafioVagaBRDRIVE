import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const animais = await prisma.animal.findMany()
    return Response.json(animais)
  } catch (err) {
    return new Response('Erro ao buscar animais', { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, especie, descricao, imagemUrl } = body;

    const novoAnimal = await prisma.animal.create({
      data: {
        nome,
        especie,
        descricao,
        imagemUrl,
      },
    });

    return new Response(JSON.stringify(novoAnimal), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Erro ao criar animal:', err);
    return new Response('Erro ao criar animal', { status: 500 });
  }
}
