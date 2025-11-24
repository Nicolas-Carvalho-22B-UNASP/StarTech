import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

const database = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10,
});

app.get("/", (request, response) => {
  const searchCommand = "SELECT id, nome, email FROM usuarios_startech";
  
  database.query(searchCommand, (error, users) => {
    if (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao buscar usuários" });
      return;
    }
    response.json(users);
  });
});

app.post("/login", (request, response) => {
  const { email, senha } = request.body.usuario;

  const selectCommand = `
    SELECT *
    FROM usuarios_startech
    WHERE email = ?
  `;

  database.query(selectCommand, [email], (error, usuario) => {
    if (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao realizar login" });
      return;
    }

    if (usuario.length === 0 || usuario[0].senha !== senha) {
      response.json({ message: "Usuário ou senha incorretos!" });
      return;
    }

    response.json({ 
      id: usuario[0].id, 
      nome: usuario[0].nome
    });
  });
});

app.post("/cadastrar", (request, response) => {
  const { usuario } = request.body;

  const insertCommand = `INSERT INTO usuarios_startech (nome, email, senha) VALUES (?, ?, ?)`;

  database.query(
    insertCommand,
    [usuario.nome, usuario.email, usuario.senha],
    (error) => {
      if (error) {
        console.log(error);
        response.status(500).json({ message: "Erro ao cadastrar usuário" });
        return;
      }
      
      response.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

app.get("/ranking", (request, response) => {
  const searchCommand = "SELECT id, nome, pontuacao FROM usuarios_startech ORDER BY pontuacao DESC LIMIT 50";
  
  database.query(searchCommand, (error, ranking) => {
    if (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao buscar ranking" });
      return;
    }
    response.json(ranking);
  });
});

app.post("/salvar-pontuacao", (request, response) => {
  const { usuarioId, pontuacao } = request.body;

  const selectCommand = "SELECT pontuacao FROM usuarios_startech WHERE id = ?";
  
  database.query(selectCommand, [usuarioId], (error, resultado) => {
    if (error) {
      console.log(error);
      response.status(500).json({ message: "Erro ao buscar pontuação" });
      return;
    }

    if (resultado.length === 0) {
      response.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const pontuacaoAtual = resultado[0].pontuacao;
    
    if (pontuacao > pontuacaoAtual) {
      const updateCommand = "UPDATE usuarios_startech SET pontuacao = ? WHERE id = ?";
      
      database.query(updateCommand, [pontuacao, usuarioId], (error) => {
        if (error) {
          console.log(error);
          response.status(500).json({ message: "Erro ao atualizar pontuação" });
          return;
        }
        
        response.json({ message: "Nova pontuação recorde salva!", novoPontuacao: pontuacao });
      });
    } else {
      response.json({ message: "Pontuação não superou o recorde", pontuacaoAtual });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}!`);
});

