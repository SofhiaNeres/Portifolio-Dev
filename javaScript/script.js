const img = document.querySelector('.sofhia');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 25;
    const y = (e.clientY / window.innerHeight - 0.5) * 25;

    img.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
});







window.addEventListener('load', function() {
    const section = document.querySelector('.sobre-mim');
    const elements = document.querySelectorAll('.sobre-mim > h1, .sobre-mim > p, .sobre-mim > img, .sobre-mim > .btn-sobre');
    
    function checkVisibility() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.2) {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('ativo');
                }, index * 200);
            });
            
            window.removeEventListener('scroll', checkVisibility);
        }
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});

document.addEventListener('DOMContentLoaded', function() {
    const servicosSection = document.querySelector('.servicos');
    const servicosTitulo = document.querySelector('.servicos > h1');
    const servicosCards = document.querySelectorAll('.servicos > .card-servico');
    
    let animacaoAtivada = false;
    
    function verificarScrollServicos() {
        const rect = servicosSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (!animacaoAtivada && rect.top < windowHeight * 0.8) {
            animacaoAtivada = true;
            
            // Ativa o título
            servicosTitulo.classList.add('ativo');
            
            // Ativa os cards com delay progressivo
            servicosCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('ativo');
                }, index * 200); // 200ms de delay entre cada card
            });
        }
        
      
        // if (rect.bottom < 0 || rect.top > windowHeight) {
        //     animacaoAtivada = false;
        //     servicosTitulo.classList.remove('ativo');
        //     servicosCards.forEach(card => card.classList.remove('ativo'));
        // }
    }
    
    const observerOptions = {
        threshold: 0.3, 
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animacaoAtivada) {
                animacaoAtivada = true;
                
                servicosTitulo.classList.add('ativo');
                
                servicosCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('ativo');
                    }, 300 + (index * 200)); // Delay inicial + progressivo
                });
            }
        });
    }, observerOptions);
    
    observer.observe(servicosSection);
   
});







