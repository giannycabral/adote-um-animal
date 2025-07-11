// Sistema de filtros e busca para a galeria de animais

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const galeriaGrid = document.getElementById('galeria-grid');
    const toggleFiltros = document.getElementById('toggle-filtros');
    const filtrosPainel = document.getElementById('filtros-painel');
    const limparBusca = document.getElementById('limpar-busca');
    const buscaInput = document.getElementById('galeria-busca-input');
    const limparTodosFiltros = document.getElementById('limpar-todos-filtros');
    const aplicarFiltros = document.getElementById('aplicar-filtros');
    const filtrosAplicados = document.getElementById('filtros-aplicados');
    const semResultados = document.getElementById('galeria-sem-resultados');
    const btnResetarBusca = document.querySelector('.btn-resetar-busca');
    
    // Verificar parâmetros da URL (para quando vier de busca global)
    const urlParams = new URLSearchParams(window.location.search);
    const buscaParam = urlParams.get('busca');
    const sugestaoTags = document.querySelectorAll('.sugestao-tag');
    const tamanhoRange = document.getElementById('filtro-tamanho-range');
    const tamanhoValor = document.getElementById('tamanho-valor');
    const checkboxes = document.querySelectorAll('.filtro-checkbox input[type="checkbox"]');
    const filterTags = document.querySelectorAll('.filtro-tag input[type="checkbox"]');
    
    // Estado dos filtros
    let filtrosAtivos = {
        tipo: [],
        idade: [],
        caracteristicas: [],
        tamanho: 'todos',
        busca: ''
    };
    
    // Função para toggle dos filtros
    if (toggleFiltros) {
        toggleFiltros.addEventListener('click', function() {
            filtrosPainel.classList.toggle('ativo');
            toggleFiltros.classList.toggle('ativo');
        });
    }
    
    // Função para limpar campo de busca
    if (limparBusca && buscaInput) {
        buscaInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                limparBusca.classList.add('active');
                filtrosAtivos.busca = this.value.toLowerCase();
                aplicarFiltrosAAnimais();
            } else {
                limparBusca.classList.remove('active');
                filtrosAtivos.busca = '';
                aplicarFiltrosAAnimais();
            }
        });
        
        limparBusca.addEventListener('click', function() {
            buscaInput.value = '';
            limparBusca.classList.remove('active');
            filtrosAtivos.busca = '';
            aplicarFiltrosAAnimais();
        });
    }
    
    // Adicionar função para botão "Ver animais disponíveis" fazer scroll suave
    const btnVerAnimais = document.querySelector('.hero-btn-principal');
    if (btnVerAnimais) {
        btnVerAnimais.addEventListener('click', function(e) {
            e.preventDefault();
            const galeriaGrid = document.getElementById('galeria-grid');
            if (galeriaGrid) {
                galeriaGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Sugestões de busca
    if (sugestaoTags.length) {
        sugestaoTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const termoBusca = this.getAttribute('data-busca');
                if (buscaInput) {
                    buscaInput.value = termoBusca;
                    filtrosAtivos.busca = termoBusca.toLowerCase();
                    limparBusca.classList.add('active');
                    aplicarFiltrosAAnimais();
                }
                
                // Se estiver na busca do hero, scrollar para a galeria
                const galeriaSection = document.querySelector('.galeria-section');
                if (galeriaSection) {
                    galeriaSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Filtro de tamanho
    if (tamanhoRange && tamanhoValor) {
        const tamanhos = ['Mini', 'Pequeno', 'Médio', 'Grande'];
        
        tamanhoRange.addEventListener('input', function() {
            const valor = this.value;
            tamanhoValor.textContent = tamanhos[valor - 1];
            filtrosAtivos.tamanho = tamanhos[valor - 1].toLowerCase();
        });
    }
    
    // Manipulação de checkboxes de filtro
    if (checkboxes.length) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const filtro = this.getAttribute('data-filter');
                const tipo = this.closest('.filtro-grupo').querySelector('.filtro-titulo').textContent.toLowerCase();
                
                if (filtro === 'todos') {
                    // Se "todos" for marcado, desmarca os outros
                    if (this.checked) {
                        const grupoCheckboxes = this.closest('.filtro-opcoes').querySelectorAll('input[type="checkbox"]:not([data-filter="todos"])');
                        grupoCheckboxes.forEach(cb => {
                            cb.checked = false;
                        });
                        
                        // Limpar este grupo de filtros
                        if (tipo.includes('tipo')) {
                            filtrosAtivos.tipo = [];
                        } else if (tipo.includes('idade')) {
                            filtrosAtivos.idade = [];
                        }
                    }
                } else {
                    // Se algum outro for marcado, desmarca "todos"
                    const todosCheckbox = this.closest('.filtro-opcoes').querySelector('input[data-filter="todos"]');
                    if (todosCheckbox) {
                        todosCheckbox.checked = false;
                    }
                    
                    // Atualizar filtros ativos
                    if (tipo.includes('tipo')) {
                        atualizarFiltroGrupo('tipo', filtro, this.checked);
                    } else if (tipo.includes('idade')) {
                        atualizarFiltroGrupo('idade', filtro, this.checked);
                    }
                }
            });
        });
    }
    
    // Manipulação de tags de características
    if (filterTags.length) {
        filterTags.forEach(tag => {
            tag.addEventListener('change', function() {
                const filtro = this.getAttribute('data-filter');
                atualizarFiltroGrupo('caracteristicas', filtro, this.checked);
                
                // Atualizar estilo da tag
                if (this.checked) {
                    this.closest('.filtro-tag').style.backgroundColor = 'var(--cor-primaria)';
                    this.closest('.filtro-tag').style.color = 'white';
                } else {
                    this.closest('.filtro-tag').style.backgroundColor = '#f8f8f8';
                    this.closest('.filtro-tag').style.color = '#444';
                }
            });
        });
    }
    
    // Função para atualizar grupos de filtros
    function atualizarFiltroGrupo(grupo, valor, adicionar) {
        if (adicionar) {
            if (!filtrosAtivos[grupo].includes(valor)) {
                filtrosAtivos[grupo].push(valor);
            }
        } else {
            filtrosAtivos[grupo] = filtrosAtivos[grupo].filter(item => item !== valor);
        }
    }
    
    // Botões de ação dos filtros
    if (limparTodosFiltros) {
        limparTodosFiltros.addEventListener('click', function() {
            // Limpar todos os checkboxes
            document.querySelectorAll('.filtro-checkbox input[type="checkbox"], .filtro-tag input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            
            // Resetar os "todos" checkboxes
            document.querySelectorAll('input[data-filter="todos"]').forEach(cb => {
                cb.checked = true;
            });
            
            // Resetar o range de tamanho
            if (tamanhoRange) {
                tamanhoRange.value = 1;
                tamanhoValor.textContent = 'Todos';
            }
            
            // Resetar filtros ativos
            filtrosAtivos = {
                tipo: [],
                idade: [],
                caracteristicas: [],
                tamanho: 'todos',
                busca: filtrosAtivos.busca // Manter o termo de busca atual
            };
            
            // Resetar estilos das tags
            document.querySelectorAll('.filtro-tag').forEach(tag => {
                tag.style.backgroundColor = '#f8f8f8';
                tag.style.color = '#444';
            });
            
            // Limpar tags de filtros aplicados
            atualizarTagsFiltrosAplicados();
        });
    }
    
    if (aplicarFiltros) {
        aplicarFiltros.addEventListener('click', function() {
            // Fechar painel de filtros
            filtrosPainel.classList.remove('ativo');
            toggleFiltros.classList.remove('ativo');
            
            // Aplicar filtros
            aplicarFiltrosAAnimais();
            
            // Atualizar tags de filtros aplicados
            atualizarTagsFiltrosAplicados();
        });
    }
    
    // Função para atualizar as tags de filtros aplicados
    function atualizarTagsFiltrosAplicados() {
        if (!filtrosAplicados) return;
        
        filtrosAplicados.innerHTML = '';
        
        // Adicionar tag para busca
        if (filtrosAtivos.busca) {
            criarTagFiltro('busca', `Busca: "${filtrosAtivos.busca}"`);
        }
        
        // Adicionar tags para tipo
        filtrosAtivos.tipo.forEach(tipo => {
            let label = tipo.charAt(0).toUpperCase() + tipo.slice(1);
            criarTagFiltro('tipo', label);
        });
        
        // Adicionar tags para idade
        filtrosAtivos.idade.forEach(idade => {
            let label = idade.charAt(0).toUpperCase() + idade.slice(1);
            criarTagFiltro('idade', label);
        });
        
        // Adicionar tags para características
        filtrosAtivos.caracteristicas.forEach(carac => {
            let label = carac.charAt(0).toUpperCase() + carac.slice(1).replace('-', ' ');
            criarTagFiltro('caracteristicas', label);
        });
        
        // Adicionar tag para tamanho
        if (filtrosAtivos.tamanho !== 'todos') {
            criarTagFiltro('tamanho', `Tamanho: ${filtrosAtivos.tamanho}`);
        }
    }
    
    // Função para criar uma tag de filtro aplicado
    function criarTagFiltro(tipo, texto) {
        const tag = document.createElement('div');
        tag.className = 'filtro-tag-aplicado';
        tag.innerHTML = `${texto} <i class="fas fa-times" data-tipo="${tipo}" data-valor="${texto.split(':')[0] === 'Busca' ? filtrosAtivos.busca : texto.split(':').length > 1 ? texto.split(':')[1].trim() : texto.toLowerCase()}"></i>`;
        
        // Adicionar evento para remover filtro
        tag.querySelector('i').addEventListener('click', function() {
            const tipoFiltro = this.getAttribute('data-tipo');
            const valorFiltro = this.getAttribute('data-valor');
            
            if (tipoFiltro === 'busca') {
                if (buscaInput) buscaInput.value = '';
                filtrosAtivos.busca = '';
                limparBusca.classList.remove('active');
            } else if (tipoFiltro === 'tamanho') {
                if (tamanhoRange) {
                    tamanhoRange.value = 1;
                    tamanhoValor.textContent = 'Todos';
                }
                filtrosAtivos.tamanho = 'todos';
            } else {
                // Remover do array correspondente
                filtrosAtivos[tipoFiltro] = filtrosAtivos[tipoFiltro].filter(item => 
                    item !== valorFiltro.toLowerCase()
                );
                
                // Desmarcar checkbox correspondente
                const checkbox = document.querySelector(`.filtro-checkbox input[data-filter="${valorFiltro.toLowerCase()}"], .filtro-tag input[data-filter="${valorFiltro.toLowerCase()}"]`);
                if (checkbox) {
                    checkbox.checked = false;
                    
                    // Se for uma tag, atualizar o estilo
                    if (checkbox.closest('.filtro-tag')) {
                        checkbox.closest('.filtro-tag').style.backgroundColor = '#f8f8f8';
                        checkbox.closest('.filtro-tag').style.color = '#444';
                    }
                }
            }
            
            // Remover tag e aplicar filtros
            tag.remove();
            aplicarFiltrosAAnimais();
        });
        
        filtrosAplicados.appendChild(tag);
    }
    
    // Função para aplicar filtros aos animais da galeria
    function aplicarFiltrosAAnimais() {
        if (!galeriaGrid || !semResultados) return;
        
        const animais = galeriaGrid.querySelectorAll('.galeria-item');
        let contadorVisivel = 0;
        
        animais.forEach(animal => {
            // Inicialmente consideramos o animal visível
            let visivel = true;
            
            // Verificar busca
            if (filtrosAtivos.busca) {
                const nome = animal.getAttribute('data-nome').toLowerCase();
                const idade = animal.getAttribute('data-idade').toLowerCase();
                const caracteristicas = animal.getAttribute('data-caracteristicas').toLowerCase();
                const categoria = animal.getAttribute('data-categoria').toLowerCase();
                const local = animal.getAttribute('data-local').toLowerCase();
                
                if (!nome.includes(filtrosAtivos.busca) && 
                    !idade.includes(filtrosAtivos.busca) && 
                    !caracteristicas.includes(filtrosAtivos.busca) && 
                    !categoria.includes(filtrosAtivos.busca) &&
                    !local.includes(filtrosAtivos.busca)) {
                    visivel = false;
                }
            }
            
            // Verificar tipo de animal
            if (visivel && filtrosAtivos.tipo.length > 0) {
                const categoria = animal.getAttribute('data-categoria').toLowerCase();
                const temTipo = filtrosAtivos.tipo.some(tipo => categoria.includes(tipo));
                if (!temTipo) visivel = false;
            }
            
            // Verificar idade
            if (visivel && filtrosAtivos.idade.length > 0) {
                const categoria = animal.getAttribute('data-categoria').toLowerCase();
                const temIdade = filtrosAtivos.idade.some(idade => categoria.includes(idade));
                if (!temIdade) visivel = false;
            }
            
            // Verificar características
            if (visivel && filtrosAtivos.caracteristicas.length > 0) {
                const caracteristicas = animal.getAttribute('data-caracteristicas').toLowerCase();
                const temCarac = filtrosAtivos.caracteristicas.every(carac => 
                    caracteristicas.includes(carac)
                );
                if (!temCarac) visivel = false;
            }
            
            // Verificar tamanho
            if (visivel && filtrosAtivos.tamanho !== 'todos') {
                const tamanho = animal.getAttribute('data-tamanho').toLowerCase();
                if (tamanho !== filtrosAtivos.tamanho.toLowerCase()) visivel = false;
            }
            
            // Aplicar visibilidade
            if (visivel) {
                animal.style.display = '';
                contadorVisivel++;
            } else {
                animal.style.display = 'none';
            }
        });
        
        // Mostrar mensagem de sem resultados se necessário
        if (contadorVisivel === 0) {
            semResultados.style.display = 'block';
        } else {
            semResultados.style.display = 'none';
        }
        
        // Atualizar contador de resultados
        const contadorElement = document.getElementById('galeria-contagem-resultados');
        if (contadorElement) {
            contadorElement.textContent = `Exibindo ${contadorVisivel} ${contadorVisivel === 1 ? 'animal' : 'animais'}`;
        }
        
        // Atualizar contagem por tipo
        atualizarContagemPorTipo(animais, contadorVisivel);
    }
    
    // Função para atualizar contagem de tipos visíveis
    function atualizarContagemPorTipo(animais, total) {
        let cachorros = 0;
        let gatos = 0;
        let outros = 0;
        
        animais.forEach(animal => {
            if (animal.style.display !== 'none') {
                const categoria = animal.getAttribute('data-categoria').toLowerCase();
                if (categoria.includes('cachorro')) cachorros++;
                else if (categoria.includes('gato')) gatos++;
                else outros++;
            }
        });
        
        // Atualizar contadores no DOM
        const totalCachorros = document.getElementById('total-cachorros');
        const totalGatos = document.getElementById('total-gatos');
        const totalOutros = document.getElementById('total-outros');
        
        if (totalCachorros) totalCachorros.textContent = cachorros;
        if (totalGatos) totalGatos.textContent = gatos;
        if (totalOutros) totalOutros.textContent = outros;
    }
    
    // Resetar busca
    if (btnResetarBusca) {
        btnResetarBusca.addEventListener('click', function() {
            // Limpar campo de busca
            if (buscaInput) buscaInput.value = '';                
            if (limparBusca) limparBusca.classList.remove('active');
            
            // Resetar todos os filtros
            if (limparTodosFiltros) limparTodosFiltros.click();
            
            // Aplicar filtros (mostrar todos)
            filtrosAtivos = {
                tipo: [],
                idade: [],
                caracteristicas: [],
                tamanho: 'todos',
                busca: ''
            };
            
            aplicarFiltrosAAnimais();
            atualizarTagsFiltrosAplicados();
        });
    }
    
    // Sistema de favoritos
    const botoesFavorito = document.querySelectorAll('.galeria-favorito');
    if (botoesFavorito.length) {
        botoesFavorito.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('ativo');
                const icone = this.querySelector('i');
                if (this.classList.contains('ativo')) {
                    icone.classList.remove('far');
                    icone.classList.add('fas');
                } else {
                    icone.classList.remove('fas');
                    icone.classList.add('far');
                }
            });
        });
    }
    
    // Sistema de compartilhamento
    const botoesCompartilhar = document.querySelectorAll('.galeria-compartilhar');
    if (botoesCompartilhar.length) {
        botoesCompartilhar.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const animalCard = this.closest('.galeria-item');
                const animalNome = animalCard.getAttribute('data-nome');
                
                // Criar overlay de compartilhamento
                const overlay = document.createElement('div');
                overlay.className = 'compartilhar-overlay';
                overlay.innerHTML = `
                    <div class="compartilhar-modal">
                        <h3>Compartilhar ${animalNome}</h3>
                        <div class="compartilhar-opcoes">
                            <a href="#" class="compartilhar-opcao" data-rede="facebook">
                                <i class="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </a>
                            <a href="#" class="compartilhar-opcao" data-rede="twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="#" class="compartilhar-opcao" data-rede="whatsapp">
                                <i class="fab fa-whatsapp"></i>
                                <span>WhatsApp</span>
                            </a>
                            <a href="#" class="compartilhar-opcao" data-rede="email">
                                <i class="fas fa-envelope"></i>
                                <span>Email</span>
                            </a>
                        </div>
                        <button class="compartilhar-fechar">Fechar</button>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                // Fechar overlay ao clicar no botão ou fora do modal
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay || e.target.classList.contains('compartilhar-fechar')) {
                        overlay.remove();
                    }
                });
                
                // Impedir propagação de clique dentro do modal
                const modal = overlay.querySelector('.compartilhar-modal');
                modal.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                
                // Lidar com cliques nas opções de compartilhamento
                const opcoesCompartilhar = overlay.querySelectorAll('.compartilhar-opcao');
                opcoesCompartilhar.forEach(opcao => {
                    opcao.addEventListener('click', function(e) {
                        e.preventDefault();
                        const rede = this.getAttribute('data-rede');
                        const url = encodeURIComponent(window.location.href);
                        const texto = encodeURIComponent(`Conheça ${animalNome} na Pet Love. Um pet adorável esperando um novo lar!`);
                        
                        let compartilharUrl = '';
                        
                        switch(rede) {
                            case 'facebook':
                                compartilharUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                                break;
                            case 'twitter':
                                compartilharUrl = `https://twitter.com/intent/tweet?text=${texto}&url=${url}`;
                                break;
                            case 'whatsapp':
                                compartilharUrl = `https://wa.me/?text=${texto} ${url}`;
                                break;
                            case 'email':
                                compartilharUrl = `mailto:?subject=Adote ${animalNome} na Pet Love&body=${texto} ${url}`;
                                break;
                        }
                        
                        window.open(compartilharUrl, '_blank');
                        overlay.remove();
                    });
                });
            });
        });
    }
    
    // Inicialização
    // Aplicar termo de busca da URL se existir
    if (buscaParam && buscaInput) {
        buscaInput.value = decodeURIComponent(buscaParam);
        if (limparBusca) limparBusca.classList.add('active');
        filtrosAtivos.busca = decodeURIComponent(buscaParam);
        // Atualizar as tags de filtros aplicados
        if (filtrosAplicados) atualizarTagsFiltrosAplicados();
    }
    
    aplicarFiltrosAAnimais();
});
