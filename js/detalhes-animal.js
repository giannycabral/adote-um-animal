// Script para o modal de detalhes dos animais

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const modalOverlay = document.getElementById('animal-modal-overlay');
    const animalModal = document.querySelector('.animal-modal');
    const modalContent = document.querySelector('.animal-modal-content');
    const closeModal = document.querySelector('.animal-modal-fechar');
    const botoesInfo = document.querySelectorAll('.galeria-btn-info');
    
    // Dados dos animais (em um caso real, isso viria de um banco de dados)
    const animaisDetalhes = {
        'luna-sol': {
            nome: 'Luna e Sol',
            imagem: 'assets/img/foto1.jpg',
            idade: '2 meses',
            genero: 'Fêmeas',
            tipo: 'Gatos',
            tamanho: 'Pequeno',
            local: 'São Paulo, SP',
            descricao: 'Luna e Sol são duas gatinhas muito especiais e inseparáveis. Foram resgatadas de uma caixa abandonada próxima a um mercado. São extremamente dóceis, brincalhonas e adoram se aconchegar. Foram tratadas, vermifugadas e já estão com a primeira dose da vacina V4. Buscamos um lar que adote as duas juntas, pois são muito apegadas uma à outra.',
            caracteristicas: ['Dóceis', 'Brincalhonas', 'Sociáveis', 'Vacinadas'],
            requisitos: ['Tela nas janelas', 'Adoção em dupla', 'Compromisso com castração futura'],
            vacinas: ['V4 (1ª dose)', 'Antirrábica (pendente por idade)'],
            saude: 'Excelente! Foram resgatadas cedo e estão em perfeitas condições de saúde.',
            historia: 'Encontradas em uma caixa de papelão com apenas 3 semanas, foram cuidadas por uma voluntária até atingirem idade para adoção. Desde pequenas mostraram personalidades complementares - Luna é mais aventureira e Sol mais observadora.'
        },
        'thor': {
            nome: 'Thor',
            imagem: 'assets/img/foto2.jpg',
            idade: '1 ano',
            genero: 'Macho',
            tipo: 'Cachorro',
            tamanho: 'Médio',
            local: 'São Paulo, SP',
            descricao: 'Thor é um cachorro extremamente brincalhão e cheio de energia! Foi resgatado de uma situação de maus-tratos e hoje está totalmente recuperado, vacinado e castrado. Ele é muito carinhoso com pessoas e adora crianças. Precisará de um tutor ativo que possa gastar sua energia com brincadeiras e passeios.',
            caracteristicas: ['Energético', 'Brincalhão', 'Ama crianças', 'Castrado', 'Vacinado'],
            requisitos: ['Espaço para brincar', 'Passeios diários', 'Família ativa'],
            vacinas: ['V8/V10 completa', 'Antirrábica atualizada', 'Giárdia'],
            saude: 'Excelente! Thor é castrado e está com todas as vacinas em dia.',
            historia: 'Thor foi resgatado em uma operação da polícia contra maus-tratos. Estava preso em um quintal pequeno, sem comida adequada e sem carinho. Apesar do sofrimento, manteve seu espírito alegre e confiante em humanos. Após 3 meses de recuperação, está pronto para uma nova família.'
        },
        'simba': {
            nome: 'Simba',
            imagem: 'assets/img/foto3.jpg',
            idade: '6 meses',
            genero: 'Macho',
            tipo: 'Gato',
            tamanho: 'Pequeno',
            local: 'Rio de Janeiro, RJ',
            descricao: 'Simba é um gatinho calmo e ao mesmo tempo brincalhão, com pelagem alaranjada que lembra um pequeno leãozinho. Ele já está castrado, vacinado e vermifugado. É muito afetuoso e gosta de se aninhar no colo. Se adapta bem a apartamentos e casas.',
            caracteristicas: ['Calmo', 'Brincalhão', 'Castrado', 'Sociável'],
            requisitos: ['Tela nas janelas', 'Ambiente seguro'],
            vacinas: ['V4 completa', 'Antirrábica'],
            saude: 'Ótima! Simba é castrado e está com todas as vacinas em dia.',
            historia: 'Simba foi encontrado ainda filhote em um parque, sozinho e assustado. Foi resgatado por uma voluntária que cuidou dele até estar pronto para adoção. Desde pequeno mostrou uma personalidade doce e brincalhona.'
        },
        'irmaos': {
            nome: 'Irmãos Travessos',
            imagem: 'assets/img/foto4.jpg',
            idade: '4 meses',
            genero: 'Machos',
            tipo: 'Cachorros',
            tamanho: 'Pequeno (em crescimento)',
            local: 'Belo Horizonte, MG',
            descricao: 'Os Irmãos Travessos são três filhotes de cachorro que foram resgatados juntos. São extremamente brincalhões, sociáveis e cheios de energia! Estão com a primeira dose da vacina V10 e já foram vermifugados. Podem ser adotados juntos ou separadamente.',
            caracteristicas: ['Brincalhões', 'Sociáveis', 'Energéticos', 'Vacinados'],
            requisitos: ['Espaço para brincadeiras', 'Compromisso com castração futura'],
            vacinas: ['V10 (1ª dose)', 'Antirrábica (pendente por idade)'],
            saude: 'Excelente! São filhotes saudáveis e cheios de vida.',
            historia: 'Os três irmãozinhos foram encontrados em uma caixa abandonada próximo a uma estrada. Foram resgatados a tempo e criados juntos desde então. São extremamente unidos, mas podem ser adotados separadamente se necessário.'
        },
        'coelhos': {
            nome: 'Cenoura e Alfafa',
            imagem: 'assets/img/foto5.jpg',
            idade: '1 ano',
            genero: 'Casal',
            tipo: 'Coelhos',
            tamanho: 'Mini',
            local: 'Curitiba, PR',
            descricao: 'Cenoura e Alfafa são dois coelhinhos dóceis e sociáveis. Estão juntos desde filhotes e são muito apegados. São animais limpos, silenciosos e perfeitos para apartamentos. Estão castrados e vacinados contra mixomatose e doença hemorrágica viral.',
            caracteristicas: ['Calmos', 'Dóceis', 'Sociáveis', 'Castrados', 'Vacinados'],
            requisitos: ['Adoção em dupla', 'Ambiente seguro', 'Alimentação adequada'],
            vacinas: ['Mixomatose', 'Doença Hemorrágica Viral'],
            saude: 'Excelente! São castrados e estão com todas as vacinas em dia.',
            historia: 'Cenoura e Alfafa foram entregues voluntariamente por uma família que não podia mais cuidar deles. São coelhos domésticos criados com muito carinho e habituados ao contato humano.'
        },
        'quarteto': {
            nome: 'Quarteto Fantástico',
            imagem: 'assets/img/foto6.jpg',
            idade: '2 meses',
            genero: 'Mistos',
            tipo: 'Gatos',
            tamanho: 'Mini',
            local: 'São Paulo, SP',
            descricao: 'O Quarteto Fantástico é composto por 4 filhotes de gato resgatados de uma situação de risco. São extremamente brincalhões, sociáveis e cheios de energia! Estão com a primeira dose da vacina V4 e já foram vermifugados. Podem ser adotados juntos ou separadamente, mas damos preferência para adoções em duplas.',
            caracteristicas: ['Brincalhões', 'Sociáveis', 'Dóceis', 'Vacinados'],
            requisitos: ['Tela nas janelas', 'Adoção preferencial em duplas', 'Compromisso com castração futura'],
            vacinas: ['V4 (1ª dose)', 'Antirrábica (pendente por idade)'],
            saude: 'Excelente! São filhotes saudáveis e estão com vermifugação em dia.',
            historia: 'Os quatro filhotes foram resgatados de um terreno baldio onde foram abandonados ainda muito pequenos, com aproximadamente 3 semanas de vida. Foram alimentados com mamadeira e receberam todos os cuidados necessários até estarem prontos para adoção.'
        },
        'max': {
            nome: 'Max',
            imagem: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            idade: '3 anos',
            genero: 'Macho',
            tipo: 'Cachorro',
            tamanho: 'Médio',
            local: 'Salvador, BA',
            descricao: 'Max é um cachorro especial com deficiência visual parcial. Apesar disso, ele é extremamente carinhoso, adaptável e independente! Compensa a visão reduzida com um olfato e audição apurados. É tranquilo, ideal para famílias que possam dar a ele atenção e carinho. Está castrado e com todas as vacinas em dia.',
            caracteristicas: ['Necessidades especiais', 'Carinhoso', 'Dócil', 'Castrado', 'Vacinado'],
            requisitos: ['Ambiente seguro e estável', 'Paciência para adaptação', 'Tutores presentes'],
            vacinas: ['V10 completa', 'Antirrábica atualizada'],
            saude: 'Boa! Além da deficiência visual parcial, Max é saudável, castrado e vacinado.',
            historia: 'Max foi resgatado em uma situação de abandono. Sua deficiência visual provavelmente foi o motivo do abandono pelos antigos tutores. Foi tratado, castrado e hoje está totalmente adaptado à sua condição, sendo um cachorro feliz e independente.'
        },
        'nina': {
            nome: 'Nina',
            imagem: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            idade: '5 anos',
            genero: 'Fêmea',
            tipo: 'Gato',
            tamanho: 'Médio',
            local: 'Brasília, DF',
            descricao: 'Nina é uma gata adulta, calma e extremamente carinhosa. Já passou da fase de filhote travesso e agora busca apenas um lar tranquilo onde possa receber e dar amor. É castrada e está com todas as vacinas em dia. Adapta-se bem a apartamentos e adora tomar sol na janela.',
            caracteristicas: ['Calma', 'Carinhosa', 'Castrada', 'Vacinada'],
            requisitos: ['Tela nas janelas', 'Ambiente tranquilo'],
            vacinas: ['V4 completa', 'Antirrábica atualizada'],
            saude: 'Excelente! Nina é castrada e está com todas as vacinas em dia.',
            historia: 'Nina foi resgatada de uma colônia de gatos de rua há 4 anos. Desde então, viveu em um lar temporário, mas agora busca uma família definitiva que possa dar a ela todo o carinho que merece em seus anos de vida adulta.'
        },
    };
    
    // Abrir modal com detalhes do animal
    if (botoesInfo.length) {
        botoesInfo.forEach(btn => {
            btn.addEventListener('click', function() {
                const animalId = this.getAttribute('data-animal');
                const animal = animaisDetalhes[animalId];
                
                if (!animal) return;
                
                // Construir conteúdo do modal
                const conteudoModal = `
                    <div class="animal-modal-grid">
                        <div class="animal-modal-imagem">
                            <img src="${animal.imagem}" alt="${animal.nome}">
                        </div>
                        <div class="animal-modal-info">
                            <h2>${animal.nome}</h2>
                            <div class="animal-modal-badges">
                                <span class="animal-badge">${animal.tipo}</span>
                                <span class="animal-badge">${animal.idade}</span>
                                <span class="animal-badge">${animal.genero}</span>
                                <span class="animal-badge">${animal.tamanho}</span>
                                <span class="animal-badge-local"><i class="fas fa-map-marker-alt"></i> ${animal.local}</span>
                            </div>
                            
                            <div class="animal-modal-descricao">
                                <p>${animal.descricao}</p>
                            </div>
                            
                            <div class="animal-modal-secao">
                                <h3>Características</h3>
                                <div class="animal-caracteristicas-tags">
                                    ${animal.caracteristicas.map(carac => `<span class="animal-tag">${carac}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="animal-modal-secao">
                                <h3>Requisitos para Adoção</h3>
                                <ul class="animal-lista-requisitos">
                                    ${animal.requisitos.map(req => `<li><i class="fas fa-check-circle"></i> ${req}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="animal-modal-secao-grid">
                                <div class="animal-modal-coluna">
                                    <h3>Saúde</h3>
                                    <p>${animal.saude}</p>
                                    
                                    <h4>Vacinas</h4>
                                    <ul class="animal-lista-vacinas">
                                        ${animal.vacinas.map(vac => `<li><i class="fas fa-syringe"></i> ${vac}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="animal-modal-coluna">
                                    <h3>História</h3>
                                    <p>${animal.historia}</p>
                                </div>
                            </div>
                            
                            <div class="animal-modal-acoes">
                                <a href="#form-adocao" class="animal-modal-btn-adotar" onclick="document.getElementById('animal-modal-overlay').classList.remove('ativo'); document.getElementById('animal-interesse').value = '${animal.nome}';">
                                    Quero Adotar!
                                </a>
                                <button class="animal-modal-btn-compartilhar">
                                    <i class="fas fa-share-alt"></i> Compartilhar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Atualizar e mostrar modal
                modalContent.innerHTML = conteudoModal;
                modalOverlay.classList.add('ativo');
                
                // Configurar botão de compartilhamento no modal
                const btnCompartilhar = modalContent.querySelector('.animal-modal-btn-compartilhar');
                if (btnCompartilhar) {
                    btnCompartilhar.addEventListener('click', function() {
                        // Criar overlay de compartilhamento
                        const overlay = document.createElement('div');
                        overlay.className = 'compartilhar-overlay';
                        overlay.innerHTML = `
                            <div class="compartilhar-modal">
                                <h3>Compartilhar ${animal.nome}</h3>
                                <div class="compartilhar-opcoes">
                                    <a href="#" class="compartilhar-opcao" data-rede="facebook">
                                        <i class="fab fa-facebook-f"></i>
                                        <span>Facebook</span>
                                    </a>
                                    <a href="#" class="compartilhar-opcao" data-rede="twitter">
                                        <i class="fab fa-twitter"></i>
                                        <span>Twitter</span>
                                    </a>
                                    <a href="#" class="compartilhar-opcao" data-rede="whatsapp">
                                        <i class="fab fa-whatsapp"></i>
                                        <span>WhatsApp</span>
                                    </a>
                                    <a href="#" class="compartilhar-opcao" data-rede="email">
                                        <i class="fas fa-envelope"></i>
                                        <span>Email</span>
                                    </a>
                                </div>
                                <button class="compartilhar-fechar">Fechar</button>
                            </div>
                        `;
                        
                        document.body.appendChild(overlay);
                        
                        // Fechar overlay ao clicar no botão ou fora do modal
                        overlay.addEventListener('click', function(e) {
                            if (e.target === overlay || e.target.classList.contains('compartilhar-fechar')) {
                                overlay.remove();
                            }
                        });
                        
                        // Impedir propagação de clique dentro do modal
                        const modal = overlay.querySelector('.compartilhar-modal');
                        modal.addEventListener('click', function(e) {
                            e.stopPropagation();
                        });
                        
                        // Lidar com cliques nas opções de compartilhamento
                        const opcoesCompartilhar = overlay.querySelectorAll('.compartilhar-opcao');
                        opcoesCompartilhar.forEach(opcao => {
                            opcao.addEventListener('click', function(e) {
                                e.preventDefault();
                                const rede = this.getAttribute('data-rede');
                                const url = encodeURIComponent(window.location.href);
                                const texto = encodeURIComponent(`Conheça ${animal.nome} na Pet Love. Um pet adorável esperando um novo lar!`);
                                
                                let compartilharUrl = '';
                                
                                switch(rede) {
                                    case 'facebook':
                                        compartilharUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                                        break;
                                    case 'twitter':
                                        compartilharUrl = `https://twitter.com/intent/tweet?text=${texto}&url=${url}`;
                                        break;
                                    case 'whatsapp':
                                        compartilharUrl = `https://wa.me/?text=${texto} ${url}`;
                                        break;
                                    case 'email':
                                        compartilharUrl = `mailto:?subject=Adote ${animal.nome} na Pet Love&body=${texto} ${url}`;
                                        break;
                                }
                                
                                window.open(compartilharUrl, '_blank');
                                overlay.remove();
                            });
                        });
                    });
                }
            });
        });
    }
    
    // Fechar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modalOverlay.classList.remove('ativo');
        });
    }
    
    // Fechar modal ao clicar fora do conteúdo
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('ativo');
            }
        });
    }
    
    // Impedir propagação de clique no conteúdo do modal
    if (animalModal) {
        animalModal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Permitir preenchimento automático do campo "Animal de Interesse" no formulário
    const params = new URLSearchParams(window.location.search);
    const animalInteresse = params.get('animal');
    
    if (animalInteresse) {
        const animalInteresseInput = document.getElementById('animal-interesse');
        if (animalInteresseInput) {
            animalInteresseInput.value = animalInteresse;
        }
    }
});
