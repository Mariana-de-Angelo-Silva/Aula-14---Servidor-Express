const express = require('express');
const app = express();


const turmas = [
    {id:1, nome: '1A - desenvolvimento de sistemas '},
    {id: 2, nome: '2B - Mecatrônica'},
    {id: 3, nome: '3C - Eletrônica' },
];

let contador = 0;

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API - online',
        rotas: [
            'Get /',
            'Get /turmas',
        ]
    })
}); //rota raiz

app.get('/turmas', (req,res) => {
    res.json(turmas);
})

app.get('/turmas/:id', (req,res) => {
    const id = Number(req.params.id);
    const turma = turmas.find((t) => t.id === id)

    if(!turma){
        return res.status(404).json({
            erro:`Turma ${req.params.id} nao encontrada`
        });
    }
    res.json(turma);
}) //:id -> tudo o que colocarmos na rota após o // será entendido como id serão puxados os ids salvos

app.get('/saudacao', (req,res) => {
    const nome = req.query.nome || 'visitante';
    res.json({
        mensagem: `Olá ${nome}, tenham um ótimo dia!`,
    })
    //http://localhost:3000/saudacao?nome=
});

app.use((req,res) => {
    res.status(404).json({erro: `Rota ${req.method} ${req.path} não existe.`})
})

app.listen(3000, () =>{
    console.log("Status: servidor online em http://localhost:3000")
});