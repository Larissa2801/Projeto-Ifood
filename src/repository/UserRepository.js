// src/repository/UserRepository.js

const prisma = require("../config/prisma.js");

class UserRepository {
  // [CREATE]
  async create(userData) {
    // ... (Seu código de create está correto, sem updatedAt)
    const { name, phone, password, userType } = userData;

    const newUser = await prisma.user.create({
      data: {
        name: name,
        phone: phone,
        password: password,
        userType: userType || "CLIENT",
      },
      select: {
        id: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return newUser;
  }

  // [READ ONE]
  async findById(id) {
    return prisma.user.findUnique({
      where: {
        id: BigInt(id),
      },
      select: {
        // Seleciona os mesmos campos do create
        id: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // [READ ALL]
  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // [UPDATE]
  async update(id, userData) {
    return prisma.user.update({
      where: {
        id: BigInt(id),
      },
      data: userData, // Recebe o objeto com os campos a serem alterados
      select: {
        id: true,
        name: true,
        phone: true,
        userType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // [DELETE]
  async delete(id) {
    // Retorna o objeto deletado
    return prisma.user.delete({
      where: {
        id: BigInt(id),
      },
      select: {
        id: true,
        name: true,
        userType: true,
      },
    });
  }
}

module.exports = new UserRepository();
