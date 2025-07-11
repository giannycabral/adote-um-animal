// Arquivo para incluir e carregar todos os scripts necessários no site

document.addEventListener('DOMContentLoaded', function() {
    // Otimização de carregamento de imagem
    const heroSection = document.querySelector('.hero');
    if(heroSection) {
        // Verifica se a página já está carregada
        if (document.readyState === 'complete') {
            const loader = document.querySelector('.hero-loader');
            if (loader) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 800);
            }
        }
    }

    // Navegação responsiva
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Filtro da equipe
    const equipeTabs = document.querySelectorAll('.equipe-tab');
    const equipeMembros = document.querySelectorAll('.equipe-membro');
    
    if(equipeTabs.length && equipeMembros.length) {
        equipeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover classe active de todas as abas
                equipeTabs.forEach(t => t.classList.remove('active'));
                
                // Adicionar classe active à aba clicada
                this.classList.add('active');
                
                // Filtrar membros da equipe
                const filtro = this.textContent.trim().toLowerCase();
                
                if(filtro === 'todos') {
                    // Mostrar todos os membros
                    equipeMembros.forEach(membro => {
                        membro.style.display = 'block';
                        // Animação de entrada
                        setTimeout(() => {
                            membro.style.opacity = '1';
                            membro.style.transform = 'translateY(0)';
                        }, 50);
                    });
                } else {
                    // Filtrar membros por categoria
                    equipeMembros.forEach(membro => {
                        const cargo = membro.querySelector('.equipe-cargo').textContent.toLowerCase();
                        
                        if(cargo.includes(filtro) || 
                           (filtro === 'fundadores' && cargo.includes('fundador')) ||
                           (filtro === 'veterinários' && cargo.includes('veterinár')) ||
                           (filtro === 'voluntários' && cargo.includes('volunt'))) {
                            membro.style.display = 'block';
                            // Animação de entrada
                            setTimeout(() => {
                                membro.style.opacity = '1';
                                membro.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            // Esconder membros que não correspondem ao filtro
                            membro.style.display = 'none';
                            membro.style.opacity = '0';
                            membro.style.transform = 'translateY(20px)';
                        }
                    });
                }
            });
        });
        
        // Definir o estilo inicial para animação
        equipeMembros.forEach(membro => {
            membro.style.transition = 'all 0.5s ease';
        });
    }
    
    // Efeito de scroll na navbar
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Animação de estatísticas
    const contadores = document.querySelectorAll('.contador');
    if(contadores.length) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const contador = entry.target;
                    const valorFinal = parseInt(contador.getAttribute('data-contador'));
                    let valorAtual = 0;
                    
                    const incremento = Math.ceil(valorFinal / 50); // Velocidade da contagem
                    const timer = setInterval(() => {
                        valorAtual += incremento;
                        if(valorAtual > valorFinal) {
                            valorAtual = valorFinal;
                            clearInterval(timer);
                        }
                        contador.textContent = valorAtual;
                    }, 30);
                    
                    observer.unobserve(contador);
                }
            });
        }, observerOptions);
        
        contadores.forEach(contador => {
            observer.observe(contador);
        });
    }
    
    // Formulário de contato
    const formContato = document.querySelector('.contato-form');
    if(formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Adicione aqui sua lógica de envio de formulário
            // Normalmente seria com fetch ou XMLHttpRequest para um backend
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            formContato.reset();
        });
    }
    
    // Galeria modal
    const galeriaItems = document.querySelectorAll('.galeria-item');
    if(galeriaItems.length) {
        galeriaItems.forEach(item => {
            item.addEventListener('click', function() {
                // Implementar lógica para exibir modal com informações do animal
                // e opção para adotar
                console.log('Modal de adoção para:', item.querySelector('.galeria-animal-nome').textContent);
            });
        });
    }
});
