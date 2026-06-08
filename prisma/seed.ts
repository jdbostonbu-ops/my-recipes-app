import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data (useful during development)
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  const userOne = await prisma.user.create({
    data: {
      name: "User One",
      email: "user-one@example.com",
      recipes: {
        create: [
          {
            title: "Pasta Carbonara",
            description: "Classic Italian pasta with egg, cheese, and pancetta.",
            category: "Italian",
            prepTime: 30,
          },
          {
            title: "Chicken Stir Fry",
            description: "Quick weeknight stir fry with vegetables and soy sauce.",
            category: "Asian",
            prepTime: 20,
          },
        ],
      },
    },
  });

  const userTwo = await prisma.user.create({
    data: {
      name: "User Two",
      email: "user-two@example.com",
      recipes: {
        create: [
          {
            title: "Tacos al Pastor",
            description: "Marinated pork tacos with pineapple and cilantro.",
            category: "Mexican",
            prepTime: 45,
          },
          {
            title: "Greek Salad",
            description: "Fresh salad with feta, olives, and cucumber.",
            category: "Mediterranean",
            prepTime: 10,
          },
          {
            title: "Banana Bread",
            description: "Moist banana bread with walnuts.",
            category: "Baking",
            prepTime: 60,
          },
        ],
      },
    },
  });

  console.log("Database seeded!");
  console.log(`Created user: ${userOne.name} with 2 recipes`);
  console.log(`Created user: ${userTwo.name} with 3 recipes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });