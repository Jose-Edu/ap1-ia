let possiveisRespostas = [
    "Xuxa",
    "Michael Jackson",
    "Neymar",
    "Wagner Moura"
]

let arrayPerguntas = [
    {
        "id": "index",
        "pergunta": "pergunta1",
        "sim": {"resposta": "Xuxa"},
        "nao": {"redireciona": "isSinger"}
    },
    {
        "id": "isSinger",
        "pergunta": "pergunta2",
        "sim": {"resposta": "Michael Jackson"},
        "nao": {"redireciona": "isSoccerPlayer"}
    },
    {
        "id": "isSoccerPlayer",
        "pergunta": "pergunta3",
        "sim": {"resposta": "Neymar"},
        "nao": {"resposta": "Wagner Moura"}
    }
]

async function lerEntrada(mensagem) {
    process.stdout.write(mensagem);
    let buffer = "";
    const stdin = process.stdin;
    stdin.resume();
    stdin.setEncoding('utf8');

    return new Promise((resolve) => {
        stdin.on('data', function(data) {
            buffer += data;
            stdin.pause();
            resolve(buffer.trim());
        
        })
    })

}

async function motorDeInferencia(arrayPerguntas) {
    
    let descobriuAResposta = false;
    let indicePergunta = 'index';
    while (!descobriuAResposta) {
        for(const pergunta of arrayPerguntas) {
            if (pergunta.id == indicePergunta) {
                console.log("Digite 1 = sim, 2 = não")
                let resposta = await lerEntrada(pergunta.pergunta);
                console.log(resposta);
    
                if (resposta == 1) {
                    if ("resposta" in pergunta.sim) {
                        console.log("A resposta é " + pergunta.sim.resposta)
                        descobriuAResposta=true
                    }
                    indicePergunta = pergunta.sim.redireciona;
    
                }
                else {
                    if ("resposta" in pergunta.nao) {
                        console.log("A resposta é " + pergunta.nao.resposta)
                        descobriuAResposta=true
                    }
                    indicePergunta = pergunta.nao.redireciona;
                }
    
            }
        }
    }

}

motorDeInferencia(arrayPerguntas);