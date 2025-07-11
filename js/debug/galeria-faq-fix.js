// Script específico para resolver problemas no FAQ da página de galeria

document.addEventListener('DOMContentLoaded', function() {
  console.log('FAQ Galeria Fix carregado');
  
  setTimeout(function() {
    const faqItems = document.querySelectorAll('.galeria-html .faq-item');
    console.log('Encontrados', faqItems.length, 'itens FAQ na galeria');
    
    faqItems.forEach(function(item) {
      const pergunta = item.querySelector('.faq-pergunta');
      const resposta = item.querySelector('.faq-resposta');
      
      if (!pergunta || !resposta) return;
      
      // Remover qualquer evento existente
      const perguntaClone = pergunta.cloneNode(true);
      pergunta.parentNode.replaceChild(perguntaClone, pergunta);
      
      // Adicionar novo evento de clique
      perguntaClone.addEventListener('click', function() {
        console.log('FAQ item clicado na galeria');
        
        // Verificar estado atual
        const estaAtivo = item.classList.contains('ativo');
        
        // Fechar todos os itens primeiro
        faqItems.forEach(outroItem => {
          outroItem.classList.remove('ativo');
          
          // Resetar ícone
          const outroIcone = outroItem.querySelector('.faq-icon i');
          if (outroIcone) {
            outroIcone.className = 'fas fa-plus';
          }
        });
        
        // Alternar estado do item atual
        if (!estaAtivo) {
          item.classList.add('ativo');
          
          // Atualizar ícone
          const icone = item.querySelector('.faq-icon i');
          if (icone) {
            icone.className = 'fas fa-minus';
          }
        }
      });
    });
  }, 500); // Pequeno delay para garantir que outros scripts terminaram
});
