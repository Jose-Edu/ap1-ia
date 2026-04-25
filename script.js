let arrayPerguntas = [
    {
        "id": "index",
        "pergunta": "O foco é em programação?",
        "sim": {"redireciona": "servidores"},
        "nao": {"redireciona": "isGamer"}
    },

    {
        "id": "servidores",
        "pergunta": "O seu interesse em Linux é por servidores?",
        "sim": {"resposta": "Ubuntu"},
        "nao": {"resposta": "Fedora"}
    },

    {
        "id": "isGamer",
        "pergunta": "Você vai jogar nesse pc?",
        "sim": {"redireciona": "isHardGamer"},
        "nao": {"redireciona": "customizacao"}
    },
    {
        "id": "isHardGamer",
        "pergunta": "Certo, você vai jogar, mas vai SÓ JOGAR?",
        "sim": {"redireciona": "performace"},
        "nao": {"redireciona": "linuxDificil"}
    },
    {
        "id": "performace",
        "pergunta": "A relação -fácil +performance compensa pra você?",
        "sim": {"resposta": "CachyOs"},
        "nao": {"resposta": "Bazzite"}
    },
    {
        "id": "linuxDificil",
        "pergunta": "Usar Linux ainda te assusta?",
        "sim": {"resposta": "ZorinOs"},
        "nao": {"resposta": "Pop_!OS"}
    },

    {
        "id": "customizacao",
        "pergunta": "Customização é importante para você?",
        "sim": {"redireciona": "hardCustomizacao"},
        "nao": {"resposta": "Debian Stable"}
    },
    {
        "id": "hardCustomizacao",
        "pergunta": "A customização vale todo o seu tempo?",
        "sim": {"redireciona": "customizarSoftware"},
        "nao": {"resposta": "Mint"}
    },
    {
        "id": "customizarSoftware",
        "pergunta": "Gostaria de customizar até o código dos softwares do dia a dia?",
        "sim": {"resposta": "Gentoo"},
        "nao": {"resposta": "Arch"}
    }

]

async function lerEntrada(mensagem) {
    process.stdout.write(mensagem+" ");
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
            console.log();
            if (pergunta.id == indicePergunta) {
                console.log("Digite 1 = sim, 2 = não")
                let resposta = await lerEntrada(pergunta.pergunta);
    
                if (resposta == 1) {
                    if ("resposta" in pergunta.sim) {
                        console.log("A sua distro é " + pergunta.sim.resposta)
                        descobriuAResposta=true
                    }
                    indicePergunta = pergunta.sim.redireciona;
    
                }
                else {
                    if ("resposta" in pergunta.nao) {
                        console.log();
                        console.log("A sua distro é " + pergunta.nao.resposta)
                        descobriuAResposta=true
                    }
                    indicePergunta = pergunta.nao.redireciona;
                }
    
            }
        }
    }

}

console.log("Seletor de distro Linux:")
motorDeInferencia(arrayPerguntas);