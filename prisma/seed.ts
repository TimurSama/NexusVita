import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Создание тестового пользователя
  const user = await prisma.user.upsert({
    where: { email: 'test@nexusvita.com' },
    update: {},
    create: {
      email: 'test@nexusvita.com',
      username: 'testuser',
      passwordHash: 'hashed_password_here', // В реальном приложении использовать bcrypt
      firstName: 'Тестовый',
      lastName: 'Пользователь',
      role: 'USER',
      personalMetrics: {
        create: {
          height: 180,
          currentWeight: 75.5,
          bodyFatPercent: 15.2,
          muscleMass: 60,
          boneMass: 3.5,
          waterPercent: 55,
          chestCircumference: 100,
          waistCircumference: 85,
          hipCircumference: 95,
        },
      },
    },
  })

  console.log('Created user:', user)

  // Создание тестовой цели
  const goal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: 'Сбросить 5 кг',
      description: 'Достичь веса 70 кг к концу месяца',
      type: 'WEIGHT_LOSS',
      targetValue: 70,
      currentValue: 75.5,
      rewardNXT: 100,
    },
  })

  console.log('Created goal:', goal)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


