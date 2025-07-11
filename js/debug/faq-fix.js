// Script de correção para o FAQ da galeria e contato
document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ Fix carregado');
    
    // Função simples e direta para lidar com o FAQ
    function corrigirFAQ() {
        // Seleciona todos os itens de FAQ
        const faqItems = document.querySelectorAll('.faq-item');
        console.log(`Total de itens FAQ encontrados: ${faqItems.length}`);
        console.log(`Estamos na página da galeria: ${Boolean(document.querySelector('.galeria-html'))}`);
        
        if (!faqItems.length) return;
        
        // Remove todos os eventos de clique anteriores e adiciona novos
        faqItems.forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta');
            if (!pergunta) return;
            
            // Garantir que o item comece fechado
            item.classList.remove('ativo');
            
            // Atualizar o ícone para o estado fechado
            const icone = pergunta.querySelector('.faq-icon i') || pergunta.querySelector('i');
            if (icone) {
                // Verifica se estamos na página de galeria ou contato
                if (document.querySelector('.galeria-html') || window.location.pathname.includes('galeria')) {
                    icone.className = 'fas fa-plus';
                } else {
                    icone.className = 'fas fa-chevron-down';
                }
            }
            
            // Adicionar evento de clique direto
            pergunta.onclick = function(e) {
                e.preventDefault();
                console.log('Pergunta clicada:', this.querySelector('h3').textContent);
                
                // Verifica se o item está aberto
                const estaAberto = item.classList.contains('ativo');
                console.log('Estado do item antes do clique:', estaAberto ? 'aberto' : 'fechado');
                
                // Fecha todos os itens primeiro
                document.querySelectorAll('.faq-item').forEach(outroItem => {
                    outroItem.classList.remove('ativo');
                    
                    // Atualiza o ícone do item que está sendo fechado
                    const outroIcone = outroItem.querySelector('.faq-pergunta .faq-icon i') || 
                                       outroItem.querySelector('.faq-pergunta i');
                    if (outroIcone) {
                        if (document.querySelector('.galeria-html') || window.location.pathname.includes('galeria')) {
                            outroIcone.className = 'fas fa-plus';
                        } else {
                            outroIcone.className = 'fas fa-chevron-down';
                        }
                    }
                });
                
                // Se este item não estava aberto, abre-o
                if (!estaAberto) {
                    item.classList.add('ativo');
                    console.log('Item agora está aberto');
                    
                    // Atualiza o ícone para o estado aberto
                    if (icone) {
                        if (document.querySelector('.galeria-html') || window.location.pathname.includes('galeria')) {
                            icone.className = 'fas fa-minus';
                        } else {
                            icone.className = 'fas fa-chevron-up';
                        }
                    }
                }
            };
        });
    }
    
    // Executa a função após um pequeno delay para garantir que todos os elementos estejam carregados
    setTimeout(corrigirFAQ, 300);
    
    // Adiciona um listener para o evento de scroll para garantir que o FAQ continue funcionando
    // mesmo se houver algum carregamento dinâmico
    let ultimoScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollAtual = window.scrollY;
        
        // Verifica se o usuário está perto da seção de FAQ
        if (Math.abs(scrollAtual - ultimoScroll) > 200) {
            ultimoScroll = scrollAtual;
            const faqSection = document.querySelector('.faq-section');
            if (faqSection) {
                const rect = faqSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    corrigirFAQ();
                }
            }
        }
    });
});
