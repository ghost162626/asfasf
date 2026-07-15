(function () {
    if (document.querySelector("#shadow-login")) return;

    const div = document.createElement("div");
    div.id = "shadow-login";

    div.innerHTML = `
        <style>
            #shadow-login{
                position:fixed;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                background:#1e1e1e;
                color:#fff;
                padding:30px;
                border:2px solid #424642;
                border-radius:10px;
                z-index:999999;
                font-family:Arial,sans-serif;
                width:300px;
                text-align:center;
            }

            #shadow-login input{
                width:100%;
                padding:10px;
                margin:10px 0;
                background:#2c2c2c;
                color:#fff;
                border:2px solid #424642;
                border-radius:5px;
                box-sizing:border-box;
            }

            #shadow-login button{
                padding:10px 20px;
                cursor:pointer;
            }
        </style>

        <h1>Sh4dow-L0ck</h1>
        <p>Bem-vindo ao Sh4dow-L0ck</p>

        <input id="user" placeholder="o user">
        <input id="pass" type="password" placeholder="a senha">

        <button id="login">Entrar</button>
    `;

    document.body.appendChild(div);

    document.getElementById("login").onclick = function () {
        const u = document.getElementById("user").value;
        const p = document.getElementById("pass").value;

        if (u === "shadow" && p === "shadow") {
            alert("Login bem-sucedido!");
        } else {
            alert("Usuário ou senha incorretos.");
        }
    };
})();
