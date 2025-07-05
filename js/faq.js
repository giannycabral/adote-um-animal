// Script para o funcionamento do FAQ (Perguntas Frequentes)

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta');
            const resposta = item.querySelector('.faq-resposta');
            const icone = pergunta.querySelector('i');
            
            pergunta.addEventListener('click', function() {
                // Verificar se este item já está aberto
                const estaAberto = item.classList.contains('ativo');
                
                // Fechar todos os itens
                faqItems.forEach(outroItem => {
                    outroItem.classList.remove('ativo');
                    const outroIcone = outroItem.querySelector('.faq-pergunta i');
                    if (outroIcone) {
                        outroIcone.classList.remove('fa-minus');
                        outroIcone.classList.add('fa-plus');
                    }
                });
                
                // Se este item não estava aberto, abri-lo
                if (!estaAberto) {
                    item.classList.add('ativo');
                    if (icone) {
                        icone.classList.remove('fa-plus');
                        icone.classList.add('fa-minus');
                    }
                }
            });
        });
    }
});
