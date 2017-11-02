const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
let contas = [
    {agencia:'0000-0', conta: '150150', senha:123},
    {agencia:'0000-0', conta: '150151', senha:123}
];
const router = express.Router();
router.get  ('/',(req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return req.headers.token == conta.agencia+conta.conta+conta.senha;
    });
    if(encontrou.length==0){
        return res.send({message: 'Ação protegida! Por favor efetue o login!', logado:false});
    }
    return res.send(contas);
});
router.get  ('/:conta',(req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return req.headers.token == conta.agencia+conta.conta+conta.senha;
    });
    if(encontrou.length==0){
        return res.send({message: 'Ação protegida! Por favor efetue o login!', logado:false});
    }
    let detail = contas.filter((conta)=>{
        return req.params.conta == conta.conta;
    });
    res.send(detail);
});
router.post ('/',(req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return req.headers.token == conta.agencia+conta.conta+conta.senha;
    });
    if(encontrou.length==0){
        return res.send({message: 'Ação protegida! Por favor efetue o login!', logado:false});
    }
    contas.push(req.body);
    res.send(contas);
});
router.post('/login', (req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return ( conta.agencia == req.body.agencia
              && conta.conta   == req.body.conta
              && conta.senha   == req.body.senha)
    });
    if(encontrou.length>0){
        return res.send({
            mensagem: "usuario logado",
            logado: true,
            token: encontrou[0].agencia+encontrou[0].conta+encontrou[0].senha
        })
    }
    res.send({
        mesagem: 'usuario nao encontrado',
        logado: false
    })
});
router.delete('/:conta',(req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return req.headers.token == conta.agencia+conta.conta+conta.senha;
    });
    if(encontrou.length==0){
        return res.send({message: 'Ação protegida! Por favor efetue o login!', logado:false});
    }
    contas = contas.filter((conta)=>{
        return req.params.conta != conta.conta;
    });
    res.send(users);
});
router.put('/:conta',(req,res)=>{
    let encontrou = contas.filter((conta)=>{
        return req.headers.token == conta.agencia+conta.conta+conta.senha;
    });
    if(encontrou.length==0){
        return res.send({message: 'Ação protegida! Por favor efetue o login!', logado:false});
    }
    contas.map((conta)=>{
        if(req.params.conta == conta.conta){
            conta.agencia  = req.body.agencia;
            conta.password = req.body.password;
        }
    });
    res.send(contas);
});
app.use('/api', router);

app.listen(3000, ()=>{console.log('rodou essa porra!')});
