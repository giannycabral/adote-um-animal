// Script para a barra de busca global

document.addEventListener('DOMContentLoaded', function() {
    // Elementos da busca global
    const buscaInput = document.getElementById('busca-global');
    const limparBusca = document.getElementById('limpar-busca-global');
    const btnBusca = document.getElementById('btn-busca-global');
    const sugestoes = document.getElementById('busca-global-sugestoes');
    const tagsSugestao = document.querySelectorAll('.busca-tag-sugestao');
    
    // Função para mostrar/esconder botão limpar
    if (buscaInput && limparBusca) {
        buscaInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                limparBusca.classList.add('active');
            } else {
                limparBusca.classList.remove('active');
            }
        });
        
        // Limpar campo de busca
        limparBusca.addEventListener('click', function() {
            buscaInput.value = '';
            limparBusca.classList.remove('active');
            
            // Esconder sugestões quando limpar
            if (sugestoes) {
                sugestoes.classList.remove('ativo');
            }
        });
        
        // Mostrar sugestões ao focar
        buscaInput.addEventListener('focus', function() {
            if (sugestoes) {
                sugestoes.classList.add('ativo');
            }
        });
        
        // Esconder sugestões ao clicar fora
        document.addEventListener('click', function(e) {
            if (!buscaInput.contains(e.target) && !sugestoes.contains(e.target)) {
                sugestoes.classList.remove('ativo');
            }
        });
    }
    
    // Botão de busca
    if (btnBusca) {
        btnBusca.addEventListener('click', function() {
            realizarBusca();
        });
    }
    
    // Tecla Enter para buscar
    if (buscaInput) {
        buscaInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                realizarBusca();
            }
        });
    }
    
    // Tags de sugestão
    if (tagsSugestao.length) {
        tagsSugestao.forEach(tag => {
            tag.addEventListener('click', function() {
                const termoBusca = this.getAttribute('data-busca');
                if (buscaInput) {
                    buscaInput.value = termoBusca;
                    limparBusca.classList.add('active');
                    
                    // Fechar sugestões
                    sugestoes.classList.remove('ativo');
                    
                    // Realizar busca
                    setTimeout(realizarBusca, 100);
                }
            });
        });
    }
    
    // Função para realizar a busca
    function realizarBusca() {
        if (!buscaInput || !buscaInput.value.trim()) return;
        
        const termoBusca = encodeURIComponent(buscaInput.value.trim());
        
        // Redirecionar para a página de resultados com o termo de busca
        // Como não temos uma página de resultados, vamos redirecionar para a galeria com o termo de busca
        window.location.href = `galeria.html?busca=${termoBusca}`;
    }
});
