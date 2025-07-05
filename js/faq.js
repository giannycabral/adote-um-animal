// Script para o funcionamento do FAQ (Perguntas Frequentes)

document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ Script loaded');
    
    // Função para inicializar o FAQ
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ Items encontrados:', faqItems.length);
        
        if (faqItems.length) {
            faqItems.forEach((item, index) => {
                const pergunta = item.querySelector('.faq-pergunta');
                
                if (!pergunta) {
                    console.warn(`Elemento .faq-pergunta não encontrado no item ${index}`);
                    return;
                }
                
                // Remover evento click existente para evitar duplicação
                pergunta.removeEventListener('click', handlePerguntaClick);
                
                // Adicionar novo evento click
                pergunta.addEventListener('click', handlePerguntaClick);
                
                // Garantir que o item comece fechado
                item.classList.remove('ativo');
                
                // Definir o estado inicial dos ícones
                atualizarIcone(item, false);
            });
        } else {
            console.warn('Nenhum item FAQ encontrado na página');
        }
    }
    
    // Função handler para o clique na pergunta
    function handlePerguntaClick(event) {
        console.log('FAQ item clicado');
        const item = this.closest('.faq-item');
        
        if (!item) {
            console.warn('Não foi possível encontrar o .faq-item pai');
            return;
        }
        
        const estaAberto = item.classList.contains('ativo');
        console.log('Estado atual do item:', estaAberto ? 'aberto' : 'fechado');
        
        // Primeiro fechamos todos os itens
        const todosItens = document.querySelectorAll('.faq-item');
        todosItens.forEach(outroItem => {
            outroItem.classList.remove('ativo');
            atualizarIcone(outroItem, false);
        });
        
        // Se este item não estava aberto, nós o abrimos
        if (!estaAberto) {
            item.classList.add('ativo');
            atualizarIcone(item, true);
            console.log('Item aberto');
        } else {
            console.log('Item fechado');
        }
    }
    
    // Função para atualizar o ícone com base no estado (aberto/fechado)
    function atualizarIcone(item, aberto) {
        const pergunta = item.querySelector('.faq-pergunta');
        
        if (!pergunta) {
            console.warn('Pergunta não encontrada para atualizar ícone');
            return;
        }
        
        // Tenta encontrar o ícone (pode estar direto ou dentro de um span.faq-icon)
        const iconeDireto = pergunta.querySelector(':scope > i');
        const iconeEmSpan = pergunta.querySelector('.faq-icon i');
        
        console.log('Atualizando ícones:', 
                   'Ícone direto:', iconeDireto ? 'encontrado' : 'não encontrado', 
                   'Ícone em span:', iconeEmSpan ? 'encontrado' : 'não encontrado');
        
        // Atualiza o ícone direto, se existir
        if (iconeDireto) {
            iconeDireto.className = aberto ? 'fas fa-minus' : 'fas fa-plus';
        }
        
        // Atualiza o ícone dentro do span, se existir
        if (iconeEmSpan) {
            if (pergunta.parentElement.classList.contains('faq-item') && 
                pergunta.parentElement.closest('.galeria-html')) {
                // Na página galeria.html
                iconeEmSpan.className = aberto ? 'fas fa-minus' : 'fas fa-plus';
            } else {
                // Na página contato.html
                iconeEmSpan.className = aberto ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        }
    }
    
    // Inicializa o FAQ quando o DOM estiver carregado
    setTimeout(() => {
        console.log('Inicializando FAQ com pequeno delay para garantir carregamento completo');
        initFAQ();
    }, 100);
    
    // Também observa mudanças no DOM para reinicializar o FAQ se necessário
    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                // Verifica se algum nó FAQ foi adicionado
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (
                        node.classList?.contains('faq-item') || 
                        node.querySelector?.('.faq-item')
                    )) {
                        console.log('Novo conteúdo FAQ detectado, reinicializando...');
                        setTimeout(initFAQ, 50);
                        return;
                    }
                });
            }
        }
    });
    
    // Observa o contêiner do FAQ
    const faqContainers = document.querySelectorAll('.faq-container');
    faqContainers.forEach(container => {
        if (container) {
            observer.observe(container, observerConfig);
            console.log('Observando contêiner FAQ:', container);
        }
    });
});
