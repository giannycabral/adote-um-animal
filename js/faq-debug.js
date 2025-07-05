// Script para depuração do FAQ
console.log('FAQ Debug carregado');

document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar o estado atual dos FAQs
    function verificarEstadoFAQ() {
        console.log('==== VERIFICANDO ESTADO DO FAQ ====');
        
        const containers = document.querySelectorAll('.faq-container');
        console.log(`Número de containers FAQ: ${containers.length}`);
        
        containers.forEach((container, i) => {
            console.log(`Container ${i + 1}:`);
            const items = container.querySelectorAll('.faq-item');
            console.log(`  Itens: ${items.length}`);
            
            items.forEach((item, j) => {
                const pergunta = item.querySelector('.faq-pergunta');
                const resposta = item.querySelector('.faq-resposta');
                const icone = pergunta.querySelector('.faq-icon i') || pergunta.querySelector('i');
                
                console.log(`  Item ${j + 1}:`);
                console.log(`    Ativo: ${item.classList.contains('ativo')}`);
                console.log(`    Texto: ${pergunta.querySelector('h3').textContent.substring(0, 25)}...`);
                console.log(`    Ícone: ${icone ? icone.className : 'Não encontrado'}`);
                console.log(`    Altura resposta: ${resposta ? window.getComputedStyle(resposta).maxHeight : 'N/A'}`);
            });
        });
    }
    
    // Função para testar o clique nos FAQs
    function testarCliquesFAQ() {
        console.log('==== TESTANDO CLIQUES NO FAQ ====');
        
        const items = document.querySelectorAll('.faq-item');
        if (items.length === 0) {
            console.warn('Nenhum item FAQ encontrado para testar');
            return;
        }
        
        // Clicar no primeiro item
        console.log('Simulando clique no primeiro item...');
        const primeiraPergunta = items[0].querySelector('.faq-pergunta');
        if (primeiraPergunta) {
            primeiraPergunta.click();
            setTimeout(() => {
                console.log('Estado após clique:');
                console.log('Primeiro item ativo:', items[0].classList.contains('ativo'));
                
                // Verifica o ícone
                const icone = primeiraPergunta.querySelector('.faq-icon i') || primeiraPergunta.querySelector('i');
                console.log('Ícone após clique:', icone ? icone.className : 'Não encontrado');
                
                // Verifica a altura da resposta
                const resposta = items[0].querySelector('.faq-resposta');
                console.log('Altura da resposta:', resposta ? window.getComputedStyle(resposta).maxHeight : 'N/A');
            }, 300);
        } else {
            console.warn('Não foi possível encontrar a pergunta para clicar');
        }
    }
    
    // Executar testes após um pequeno delay para garantir que tudo foi carregado
    setTimeout(() => {
        verificarEstadoFAQ();
        testarCliquesFAQ();
    }, 1000);
    
    // Adicionar evento para teste manual
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'F2') {
            console.clear();
            console.log('Executando verificação manual do FAQ');
            verificarEstadoFAQ();
        }
    });
});
