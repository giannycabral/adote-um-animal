// Manipulação do formulário de adoção

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do formulário
    const adocaoForm = document.querySelector('.adocao-form');
    
    if (adocaoForm) {
        adocaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio do formulário
            const submitBtn = this.querySelector('.adocao-form-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulação de tempo de espera
            setTimeout(function() {
                const formData = new FormData(adocaoForm);
                let formDataObject = {};
                
                formData.forEach((value, key) => {
                    formDataObject[key] = value;
                });
                
                console.log('Dados do formulário:', formDataObject);
                
                // Exibir mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Solicitação Enviada!</h3>
                    <p>Obrigado pelo seu interesse em adotar. Entraremos em contato em breve.</p>
                `;
                
                // Substituir o formulário pela mensagem
                adocaoForm.innerHTML = '';
                adocaoForm.appendChild(successMessage);
                
            }, 2000);
        });
    }
    
    // Manipulação do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta');
            
            pergunta.addEventListener('click', () => {
                // Fechar outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('ativo')) {
                        otherItem.classList.remove('ativo');
                    }
                });
                
                // Alternar o estado do item atual
                item.classList.toggle('ativo');
            });
        });
    }
    
    // Manipulação do modal de animais
    const animalModal = document.getElementById('animal-modal-overlay');
    const modalFechar = document.querySelector('.animal-modal-fechar');
    const animalCards = document.querySelectorAll('.galeria-item');
    
    if (animalModal && modalFechar && animalCards.length) {
        animalCards.forEach(card => {
            card.addEventListener('click', function() {
                // Simulação de carregamento dos dados do animal
                const animalId = this.getAttribute('data-id') || 1;
                const animalNome = this.querySelector('.galeria-animal-nome').textContent;
                const animalImagem = this.querySelector('img').src;
                
                // Preencher o modal com os dados
                const modalContent = animalModal.querySelector('.animal-modal-content');
                
                // Dados simulados de um animal
                const animalData = {
                    nome: animalNome,
                    idade: '8 meses',
                    genero: 'Macho',
                    porte: 'Médio',
                    tipo: this.getAttribute('data-tipo') || 'Cachorro',
                    localizacao: 'São Paulo, SP',
                    descricao: 'Um animal dócil e brincalhão que adora crianças. Está vacinado e vermifugado, pronto para encontrar um lar amoroso.',
                    caracteristicas: ['Dócil', 'Brincalhão', 'Sociável', 'Vacinado', 'Castrado'],
                    requisitos: [
                        'Termo de adoção responsável',
                        'Comprovante de residência',
                        'Documento de identidade',
                        'Entrevista prévia'
                    ]
                };
                
                // Construir o HTML do conteúdo do modal
                modalContent.innerHTML = `
                    <div class="animal-modal-header">
                        <h2 class="animal-modal-title">${animalData.nome}</h2>
                        <span class="animal-modal-tag">${animalData.tipo}</span>
                    </div>
                    
                    <div class="animal-modal-grid">
                        <div class="animal-modal-imagem">
                            <img src="${animalImagem}" alt="${animalData.nome}">
                        </div>
                        
                        <div class="animal-modal-detalhes">
                            <div class="animal-modal-info">
                                <div class="animal-info-item">
                                    <i class="fas fa-venus-mars"></i>
                                    <span>Gênero: ${animalData.genero}</span>
                                </div>
                                <div class="animal-info-item">
                                    <i class="fas fa-birthday-cake"></i>
                                    <span>Idade: ${animalData.idade}</span>
                                </div>
                                <div class="animal-info-item">
                                    <i class="fas fa-ruler"></i>
                                    <span>Porte: ${animalData.porte}</span>
                                </div>
                                <div class="animal-info-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>Localização: ${animalData.localizacao}</span>
                                </div>
                            </div>
                            
                            <div class="animal-modal-descricao">
                                <h3>Sobre ${animalData.nome}</h3>
                                <p>${animalData.descricao}</p>
                            </div>
                            
                            <div class="animal-modal-caracteristicas">
                                <h3>Características</h3>
                                <div class="animal-modal-chips">
                                    ${animalData.caracteristicas.map(carac => 
                                        `<span class="animal-chip">${carac}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            
                            <div class="animal-modal-requisitos">
                                <h3>Requisitos para Adoção</h3>
                                <ul class="animal-modal-lista">
                                    ${animalData.requisitos.map(req => 
                                        `<li><i class="fas fa-check-circle"></i> ${req}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                            
                            <div class="animal-modal-acoes">
                                <a href="#form-adocao" class="btn btn-primary animal-modal-btn">
                                    <i class="fas fa-heart"></i> Quero Adotar
                                </a>
                                <button class="btn btn-secondary animal-modal-btn">
                                    <i class="fas fa-star"></i> Favoritar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Exibir o modal
                animalModal.classList.add('ativo');
                document.body.style.overflow = 'hidden'; // Impedir rolagem
            });
        });
        
        // Fechar modal ao clicar no botão fechar
        modalFechar.addEventListener('click', function() {
            animalModal.classList.remove('ativo');
            document.body.style.overflow = 'auto'; // Restaurar rolagem
        });
        
        // Fechar modal ao clicar fora dele
        animalModal.addEventListener('click', function(e) {
            if (e.target === animalModal) {
                animalModal.classList.remove('ativo');
                document.body.style.overflow = 'auto'; // Restaurar rolagem
            }
        });
    }
});
