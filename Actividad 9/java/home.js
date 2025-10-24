let listElement = document.querySelectorAll(".lista_button--click");

listElement.forEach(listElement => {
    listElement.addEventListener("click", () =>{
        listElement.classList.toggle("arrow");
        let height = 0;
        let menu = listElement.nextElementSibling;
        if(menu.clientHeight == "0"){
            height = menu.scrollHeight;
        }
        menu.style.height = height + "px";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contenido = document.getElementById('contenido');
    const inicioBtn = document.getElementById('inicio-btn');
    const imagenesBtn = document.getElementById('imagenes-btn');
    const calculadoraBtn = document.getElementById('calculadora-btn');
    const videoLinks = document.querySelectorAll('[data-video]');
    
    function mostrarInicio() {
        contenido.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
                <h1 style="font-size: 4rem; font-weight: bold; color: #333; text-align: center;">Tienda JP</h1>
            </div>
        `;
    }
    
    function mostrarImagenes() {
        let html = '<div style="display: flex; flex-wrap: wrap; gap: 15px;">';
        
        for(let i = 0; i <= 5; i++){
            html += `
                <div style="border: 3px solid #808080; padding: 5px; background-color: #f0f0f0; border-radius: 8px;">
                    <img src="assets/batman.jpg" style="width: 100px; height: 100px; display: block;">
                </div>
            `;
        }
        
        html += '</div>';
        contenido.innerHTML = html;
    }
    
    function mostrarCalculadora() {
        contenido.innerHTML = `
            <div style="max-width: 300px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; margin-bottom: 20px; color: #333;">Calculadora</h2>
                
                <!-- Pantalla de la calculadora -->
                <input type="text" id="pantalla" readonly 
                       style="width: 100%; height: 60px; font-size: 24px; text-align: right; 
                              padding: 10px; margin-bottom: 15px; border: 2px solid #ddd; 
                              border-radius: 5px; background-color: white;">
                
                <!-- Teclado de la calculadora -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                    <!-- Fila 1 -->
                    <button class="btn-calc btn-clear" style="grid-column: span 2;">C</button>
                    <button class="btn-calc btn-operator">delate</button>
                    <button class="btn-calc btn-operator">/</button>
                    
                    <!-- Fila 2 -->
                    <button class="btn-calc btn-number">7</button>
                    <button class="btn-calc btn-number">8</button>
                    <button class="btn-calc btn-number">9</button>
                    <button class="btn-calc btn-operator">*</button>
                    
                    <!-- Fila 3 -->
                    <button class="btn-calc btn-number">4</button>
                    <button class="btn-calc btn-number">5</button>
                    <button class="btn-calc btn-number">6</button>
                    <button class="btn-calc btn-operator">-</button>
                    
                    <!-- Fila 4 -->
                    <button class="btn-calc btn-number">1</button>
                    <button class="btn-calc btn-number">2</button>
                    <button class="btn-calc btn-number">3</button>
                    <button class="btn-calc btn-operator">+</button>
                    
                    <!-- Fila 5 -->
                    <button class="btn-calc btn-number" style="grid-column: span 2;">0</button>
                    <button class="btn-calc btn-number">.</button>
                    <button class="btn-calc btn-equal">=</button>
                </div>
            </div>
        `;
        
        inicializarCalculadora();
    }
    
    function inicializarCalculadora() {
        const pantalla = document.getElementById('pantalla');
        const botones = document.querySelectorAll('.btn-calc');
        
        let operacionActual = '';
        let operador = '';
        let primerOperando = '';
        let segundoOperando = '';
        
        botones.forEach(boton => {
            boton.addEventListener('click', function() {
                const valor = this.textContent;
                
                if (this.classList.contains('btn-number') || valor === '.') {
                    if (operador === '') {
                        primerOperando += valor;
                        pantalla.value = primerOperando;
                    } else {
                        segundoOperando += valor;
                        pantalla.value = segundoOperando;
                    }
                }
                else if (this.classList.contains('btn-operator') && valor !== 'delate') {
                    // Manejar operadores (excepto borrar)
                    if (primerOperando !== '' && segundoOperando === '') {
                        operador = valor;
                        pantalla.value = valor;
                    }
                }
                else if (this.classList.contains('btn-equal')) {
                    if (primerOperando !== '' && segundoOperando !== '' && operador !== '') {
                        const resultado = calcular(
                            parseFloat(primerOperando),
                            parseFloat(segundoOperando),
                            operador
                        );
                        pantalla.value = resultado;
                        primerOperando = resultado.toString();
                        segundoOperando = '';
                        operador = '';
                    }
                }
                else if (this.classList.contains('btn-clear')) {
                    operacionActual = '';
                    operador = '';
                    primerOperando = '';
                    segundoOperando = '';
                    pantalla.value = '';
                }
                else if (valor === '⌫') {
                    if (segundoOperando !== '') {
                        segundoOperando = segundoOperando.slice(0, -1);
                        pantalla.value = segundoOperando;
                    } else if (operador !== '') {
                        operador = '';
                        pantalla.value = primerOperando;
                    } else if (primerOperando !== '') {
                        primerOperando = primerOperando.slice(0, -1);
                        pantalla.value = primerOperando;
                    }
                }
            });
        });
        
        function calcular(a, b, operador) {
            switch(operador) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    return b !== 0 ? a / b : 'Error';
                default:
                    return 0;
            }
        }
    }
    
    function mostrarVideo(videoId, titulo) {
        let videoSrc = "";
        
        switch(videoId) {
            case "video1":
                videoSrc = "videos/mil.mp4";
                break;
            case "video2":
                videoSrc = "videos/nsqk.mp4";
                break;
            case "video3":
                videoSrc = "videos/cel.mp4";
                break;
        }
        
        contenido.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2 style="text-align: center; margin-bottom: 20px; color: #333;">${titulo}</h2>
                <video controls style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                    <source src="${videoSrc}" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
                <div style="margin-top: 20px; text-align: center;">
                    <p>Reproduciendo: ${titulo}</p>
                </div>
            </div>
        `;
    }
    
    inicioBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarInicio();
    });
    
    imagenesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarImagenes();
    });
    
    calculadoraBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarCalculadora();
    });
    
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video');
            const titulo = this.textContent;
            mostrarVideo(videoId, titulo);
        });
    });
});