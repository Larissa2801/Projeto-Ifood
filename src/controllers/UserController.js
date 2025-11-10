// src/controllers/UserController.js

const userRepository = require("../repository/UserRepository");

class UserController {
  async create(req, res) {
    // Pega os dados do corpo da requisição (JSON enviado pelo Postman)
    const userData = req.body;

    // ⚠️ Nota: Aqui deveria ter validação de dados

    try {
      // Chama o Repositório para salvar (ou simular o salvamento)
      const newUser = userRepository.create(userData);

      // Retorna o novo usuário com status 201 (Created)
      return res.status(201).json(newUser);
    } catch (error) {
      // Em um sistema real, você registraria o erro
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Falha interna ao criar usuário." });
    }
  }

  // Você pode adicionar outros métodos aqui, como findAll, findById, etc.
}

module.exports = new UserController();
