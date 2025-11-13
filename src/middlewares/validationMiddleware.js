// backend/src/middlewares/validationMiddleware.js

const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    // Usa o método .parseAsync() do Zod para validar o corpo da requisição
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    // Se a validação falhar, o Zod lança um ZodError
    if (error.issues) {
      const messages = error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      return res.status(400).json({
        error: "Erro de validação nos dados fornecidos.",
        details: messages,
      });
    }

    // Se for outro tipo de erro, retorna 500
    return res
      .status(500)
      .json({ error: "Falha interna ao processar validação." });
  }
};

module.exports = validationMiddleware;
