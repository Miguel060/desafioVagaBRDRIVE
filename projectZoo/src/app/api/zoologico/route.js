import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Aqui estamos pegando a URL da requisição e analisando os parâmetros (query string)
    const url = new URL(req.url); // Pega a URL da requisição
    const query = url.searchParams.get('query'); // Pega o valor do parâmetro 'query'

    // Se não houver o parâmetro 'query', significa que queremos listar todos os animais
    if (query) {
      // Se 'query' existir, buscamos um animal com base no nome ou ID
      const animal = await prisma.animal.findFirst({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            // Só busca por ID se for um número válido
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
      // Se não houver o parâmetro 'query', significa que queremos listar todos os animais
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

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const animalDeletado = await prisma.animal.delete({
      where: {
        id: parseInt(id)
      }
    });

    return Response.json(animalDeletado, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar animal:", error);
    return new Response("Erro ao deletar animal", { status: 500 });
  }
}
