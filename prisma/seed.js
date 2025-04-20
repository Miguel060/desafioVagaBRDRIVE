const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.animal.createMany({
    data: [
      {
        nome: "Leão",
        especie: "Mamífero",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imagemUrl: "https://images.pexels.com/photos/4032590/pexels-photo-4032590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        nome: "Papagaio",
        especie: "Ave",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imagemUrl: "https://images.pexels.com/photos/1004517/pexels-photo-1004517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        nome: "Tartaruga",
        especie: "Réptil",
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imagemUrl: "https://images.pexels.com/photos/3487177/pexels-photo-3487177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  });
}

main()
  .then(() => {
    console.log("✅ Seed rodado com sucesso.");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Erro ao rodar seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
