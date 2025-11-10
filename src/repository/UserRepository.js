// src/repository/UserRepository.js

// 1. Importa a instância do Prisma Client configurada
const prisma = require("../config/prisma.js");

class UserRepository {
  // O método de criação deve ser ASSÍNCRONO e usar await
  async create(userData) {
    // 2. Usar o método .create() do Prisma para salvar na tabela 'user'

    // --- CORREÇÃO APLICADA AQUI ---
    // 1. Garante que userData contém apenas campos aceitáveis pelo modelo.
    // 2. Define userType explicitamente se não estiver em userData (opcional, mas mais seguro se o default for CLIENT)
    const { name, phone, password, userType } = userData;

    const newUser = await prisma.user.create({
      data: {
        name: name,
        phone: phone,
        password: password,
        userType: userType || "CLIENT",
      },
      // --- FIM DA CORREÇÃO ---

      // Opcional: Seleciona quais campos retornar (removendo o "select" da senha no futuro)
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

  // O método de busca deve ser assíncrono
  async findById(id) {
    // Busca um único registro
    return prisma.user.findUnique({
      where: {
        // Assume que 'id' no seu modelo 'user' é um BigInt.
        // O Prisma geralmente faz a conversão de string para BigInt se o driver suportar.
        id: BigInt(id),
      },
    });
  }

  // O método de busca de todos deve ser assíncrono
  async findAll() {
    return prisma.user.findMany();
  }
}

// Exporta uma nova instância da classe
module.exports = new UserRepository();
