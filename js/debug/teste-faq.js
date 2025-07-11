console.log('Testando JavaScript do FAQ...');
const faqItems = document.querySelectorAll('.faq-item');
console.log('Número de itens FAQ encontrados:', faqItems.length);
faqItems.forEach((item, index) => {
  console.log(, item);
  const pergunta = item.querySelector('.faq-pergunta');
  console.log(, pergunta);
  const icone = pergunta.querySelector('i') || pergunta.querySelector('.faq-icon i');
  console.log(, icone);
});
