import { v4 as uuidGenerator } from "uuid";

export const growdevers = [];

class GrowdeverController {
    // GET localhost:3030/growdevers/?turma=starter
    index(request, response) {
        const { turma } = request.query;

        const results = turma ? growdevers.filter(growdever => growdever.turma.toLowerCase().includes(turma.toLowerCase())) : growdevers;

        return response.json(results);
    }

    // GET localhost:3030/growdevers/:id
    show(request, response) {
        const { id } = request.params;

        const growdever = growdevers.find(growdever => growdever.id === id);

        return response.json(growdever);
    }

    // GET localhost:3030/login/:token
    showLogin(request, response) {
        const { token } = request.params;

        const growdever = growdevers.find(growdever => growdever.token === token);

        return response.json({ message: "AWESOME, TOKEN CORRECT! IT WORKS :)", growdever });
    }

    // POST localhost:3030/growdevers
    store(request, response) {
        const { nome, idade, turma, tecnologias, cidade, email, senha } = request.body;

        const growdever = {
          id: uuidGenerator(),
          nome,
          idade,
          turma,
          tecnologias,
          cidade,
          email,
          senha,
        };

        growdevers.push(growdever);

        return response.json(growdever);
    }

    // POST localhost:3030/login
    login(request, response) {
        const { email, senha } = request.body;

        if (!email || !senha) {
          return response.status(404).json({ error: "Unfilled data" });
        }

        const findUser = growdevers.findIndex(growdever => growdever.email === email && growdever.senha === senha);

        if (findUser < 0) {
          return response.status(404).json({ error: "Invalid login. Please check again" });
        } else {
          growdevers[findUser].token = Math.random().toString(36).substring(2).toUpperCase();

          return response.json({ TOKEN: growdevers[findUser].token });
        }
    }

    // PUT localhost:3030/growdevers/:id
    update(request, response) {
        const { id } = request.params;
        const { nome, idade, turma, tecnologias, cidade, email, senha } = request.body;

        const growdeverIndex = growdevers.findIndex(growdever => growdever.id === id);

        if (growdeverIndex < 0) {
            return response.status(404).json({ error: "Growdever not found "});
        }

        const growdever = {
            id,
            nome,
            idade,
            turma,
            tecnologias,
            cidade,
            email,
            senha,
        };

        growdevers[growdeverIndex] = growdever;

        return response.json(growdever);
    }

    // DELETE localhost:3030/growdevers:/id
    delete(request, response) {
        const { id } = request.params;

        const growdeverIndex = growdevers.findIndex(growdever => growdever.id === id);

        if (growdeverIndex < 0) {
            return response.status(404).json({ error: "Growdever not found "});
        }

        growdevers.splice(growdeverIndex, 1);

        return response.status(204).send();
    }
};

export default new GrowdeverController();
