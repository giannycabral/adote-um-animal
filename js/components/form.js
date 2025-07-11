// Manipulação dos formulários

document.addEventListener('DOMContentLoaded', function() {
    // Formulário de Contato
    const formContato = document.getElementById('formContato');
    const formFeedback = document.getElementById('form-feedback');
    const formSucesso = document.getElementById('form-sucesso');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulando envio do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            const termos = document.getElementById('termos').checked;
            
            // Referência aos botões
            const btnSubmit = formContato.querySelector('.btn-submit');
            const btnReset = formContato.querySelector('.btn-reset');
            const originalBtnText = btnSubmit.innerHTML;
            
            // Validação básica
            if (!nome || !email || !mensagem || !termos) {
                // Mostrar mensagem elegante de erro
                const camposFaltantes = [];
                if (!nome) camposFaltantes.push('Nome');
                if (!email) camposFaltantes.push('Email');
                if (!mensagem) camposFaltantes.push('Mensagem');
                if (!termos) camposFaltantes.push('Concordar com os termos');
                
                showNotification(`Por favor, preencha os seguintes campos: ${camposFaltantes.join(', ')}.`, 'error');
                return;
            }
            
            // Desabilitar botões durante o envio
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            if (btnReset) btnReset.disabled = true;
            
            // Simulando envio para um servidor
            simulateFormSubmission({nome, email, assunto, mensagem})
                .then(response => {
                    // Mostrar mensagem de sucesso
                    formSucesso.classList.remove('hide');
                    formContato.reset();
                    
                    // Role até a mensagem de sucesso
                    formSucesso.scrollIntoView({behavior: 'smooth'});
                    
                    // Esconder mensagem de sucesso após 5 segundos
                    setTimeout(() => {
                        formSucesso.classList.add('hide');
                    }, 5000);
                    
                    showNotification('Mensagem enviada com sucesso!', 'success');
                })
                .catch(error => {
                    showNotification('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', 'error');
                })
                .finally(() => {
                    // Restaurar estado dos botões
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = originalBtnText;
                    if (btnReset) btnReset.disabled = false;
                });
        });
        
        // Função para mostrar notificações
        function showNotification(message, type) {
            // Verificar se já existe uma notificação
            let notification = document.querySelector('.form-notification');
            if (notification) {
                notification.remove();
            }
            
            // Criar nova notificação
            notification = document.createElement('div');
            notification.className = `form-notification ${type === 'error' ? 'notification-error' : 'notification-success'}`;
            
            const icon = document.createElement('i');
            icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
            
            const messageEl = document.createElement('span');
            messageEl.textContent = message;
            
            notification.appendChild(icon);
            notification.appendChild(messageEl);
            
            // Adicionar ao body
            document.body.appendChild(notification);
            
            // Animar entrada
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Remover após 4 segundos
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 4000);
        }
        
        // Tratamento para o botão de limpar campos
        const btnReset = document.querySelector('.btn-reset');
        if (btnReset) {
            btnReset.addEventListener('click', function() {
                // Esconde mensagem de sucesso se estiver visível
                if (formSucesso && !formSucesso.classList.contains('hide')) {
                    formSucesso.classList.add('hide');
                }
            });
        }
    }
    
    // Efeito de animação nos ícones de contato
    const contatoItems = document.querySelectorAll('.contato-item');
    if (contatoItems.length > 0) {
        contatoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contato-icon i');
                icon.classList.add('fa-beat');
                
                setTimeout(() => {
                    icon.classList.remove('fa-beat');
                }, 1000);
            });
        });
    }
    
    // Simulação de API para envio do formulário
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // Simula uma chamada de API com um delay
            setTimeout(() => {
                console.log('Dados enviados:', data);
                resolve({ success: true, message: 'Mensagem enviada com sucesso!' });
            }, 1000);
        });
    }
    
    // Referências aos elementos do formulário de adoção
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
