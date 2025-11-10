// src/controllers/UserController.js

const userRepository = require("../repository/UserRepository");

class UserController {
  // [CREATE] - POST /users
  async create(req, res) {
    const userData = req.body;
    try {
      const newUser = await userRepository.create(userData); // 🚨 CORRIGIDO: await adicionado
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Falha interna ao criar usuário." });
    }
  }

  // [READ ALL] - GET /users
  async findAll(req, res) {
    try {
      const users = await userRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res
        .status(500)
        .json({ error: "Falha interna ao buscar usuários." });
    }
  }

  // [READ ONE] - GET /users/:id
  async findById(req, res) {
    const { id } = req.params;
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res
        .status(500)
        .json({ error: "Falha interna ao buscar usuário." });
    }
  }

  // [UPDATE] - PUT /users/:id
  async update(req, res) {
    const { id } = req.params;
    const userData = req.body; // Dados para atualização
    try {
      const updatedUser = await userRepository.update(id, userData);
      return res.status(200).json(updatedUser);
    } catch (error) {
      // Este catch pega, por exemplo, o erro se o ID não existir no DB
      console.error("Erro ao atualizar usuário:", error);
      return res
        .status(500)
        .json({ error: "Falha interna ao atualizar usuário. O ID existe?" });
    }
  }

  // [DELETE] - DELETE /users/:id
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await userRepository.delete(id);
      // Retorna o usuário deletado (pode ser um objeto de sucesso simples também)
      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res
        .status(500)
        .json({ error: "Falha interna ao deletar usuário. O ID existe?" });
    }
  }
}

module.exports = new UserController();
