import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding LLD problems...')
  
  const parkingLot = await prisma.problem.create({
    data: {
      title: 'Parking Lot',
      description: 'Design a parking lot system that can manage different types of vehicles and parking spots.',
      requirements: '- The parking lot has multiple levels.\n- It supports motorcycles, cars, and buses.\n- It has motorcycle spots, compact spots, and large spots.\n- A motorcycle can park in any spot.\n- A car can park in either a single compact spot or a single large spot.\n- A bus can park in five large spots that are consecutive and within the same row. It cannot park in small spots.',
    }
  })

  const vendingMachine = await prisma.problem.create({
    data: {
      title: 'Vending Machine',
      description: 'Design a Vending Machine that accepts currency and returns products.',
      requirements: '- Accepts coins (1, 5, 10, 25 cents) and bills (1, 5 dollars).\n- User can select a product (e.g. Candy, Snack, Nuts).\n- If enough money is inserted, dispensing the item and returning change.\n- If the item is out of stock or insufficient funds, display an appropriate error.\n- Support a reset operation for the operator.',
    }
  })

  const elevator = await prisma.problem.create({
    data: {
      title: 'Elevator System',
      description: 'Design a control system for multiple elevators in a multi-story building.',
      requirements: '- Building has multiple floors and multiple elevators.\n- Elevators have a capacity limit.\n- Users can press a button on any floor to go up or down.\n- Users inside the elevator can press a button to select a destination floor.\n- The system needs an efficient algorithm to dispatch the nearest/most appropriate elevator to minimize wait times.',
    }
  })

  const library = await prisma.problem.create({
    data: {
      title: 'Library Management System',
      description: 'Design a system to manage books, patrons, and borrowing operations in a library.',
      requirements: '- A library has many books. A book can have multiple copies.\n- Patrons can search for books by title, author, or category.\n- Patrons can checkout a maximum of 5 books.\n- Books have a due date (e.g., 14 days from checkout).\n- The system should calculate fines for overdue books when returned.',
    }
  })

  console.log('Seeding finished:', parkingLot.title, ',', vendingMachine.title, ',', elevator.title, ',', library.title)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
