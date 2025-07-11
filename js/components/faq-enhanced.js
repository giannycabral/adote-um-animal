/**
 * Enhanced FAQ functionality
 * This script handles the improved FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Adiciona efeito de animação suave aos itens do FAQ
    faqItems.forEach(item => {
        // Inicializa com todos os itens fechados
        item.classList.remove('active');
        
        const pergunta = item.querySelector('.faq-pergunta');
        const resposta = item.querySelector('.faq-resposta');
        
        pergunta.addEventListener('click', function() {
            // Toggle para o item atual
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens antes
            if (!isActive) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    }
                });
            }
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
            
            // Anima o ícone de seta
            const icon = item.querySelector('.faq-icon');
            if (item.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Adiciona efeito hover aos itens FAQ
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!item.classList.contains('active')) {
                item.querySelector('.faq-icon').style.backgroundColor = 'rgba(255, 127, 0, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!item.classList.contains('active')) {
                item.querySelector('.faq-icon').style.backgroundColor = 'rgba(255, 127, 0, 0.1)';
            }
        });
    });
    
    // Adiciona funcionalidade aos botões de "Ainda tem dúvidas?"
    const faqBotaoContato = document.querySelector('.faq-botao-contato');
    if (faqBotaoContato) {
        faqBotaoContato.addEventListener('click', function(e) {
            e.preventDefault();
            const formContato = document.getElementById('formContato');
            if (formContato) {
                formContato.scrollIntoView({ behavior: 'smooth' });
                // Foca no campo nome
                setTimeout(() => {
                    const nomeInput = document.getElementById('nome');
                    if (nomeInput) nomeInput.focus();
                }, 800);
            }
        });
    }
    
    // Inicializa com o primeiro FAQ item aberto para melhor UX
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        firstItem.querySelector('.faq-icon').style.transform = 'rotate(180deg)';
    }
});
