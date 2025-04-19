const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.animal.createMany({
    data: [
      {
        nome: "Leão",
        especie: "Mamífero",
        descricao: "Rei da selva",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
      },
      {
        nome: "Papagaio",
        especie: "Ave",
        descricao: "Ave colorida e falante",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Papagaio-verde.jpg"
      },
      {
        nome: "Tartaruga",
        especie: "Réptil",
        descricao: "Lenta e resistente",
        imagemUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Tartaruga-marinha.jpg"
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
