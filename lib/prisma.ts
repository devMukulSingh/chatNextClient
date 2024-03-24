import { PrismaClient } from "@prisma/client";

//This line creates a variable named globalForPrisma and attempts to cast globalThis
//(the global object in a browser or the global object in Node.js)
//to an object with a property named prisma of type PrismaClient.

//This is done to store the Prisma client globally.
const globalThisForPrisma = globalThis as unknown as { prisma: PrismaClient };

//This line initializes the Prisma client (prisma)
//It checks if globalForPrisma.prisma is already defined
// If it is, it uses that instance; otherwise,
//it creates a new instance of PrismaClient.

export const prisma = globalThisForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThisForPrisma.prisma = prisma;
