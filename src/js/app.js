document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){

    navegacionFija();
    crearGaleria();
    scrollNav();
}


function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function (){
        console.log(sobreFestival.getBoundingClientRect());

        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({behavior: "smooth", inline: "nearest"});
        });
    });
}


function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                    <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen vocalista festival">
        
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
                    <source srcset="build/img/grande/${id}.avif" type="image/avif">
                    <source srcset="build/img/grande/${id}.webp" type="image/webp">
                    <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        
        `;

        //CREA EL OVERLAY CON LA IMAGEN
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function (){
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        //Boton para cerrar la ventana(modal)
        const cerrarVentana = document.createElement('p');
        cerrarVentana.textContent = 'X';
        cerrarVentana.classList.add('btn-cerrar');

        cerrarVentana.onclick = function(){
            const body = document.querySelector('body');
             body.classList.remove('fijar-body');
            overlay.remove();
        }

        overlay.appendChild(cerrarVentana);

        //AÑADIRLO AL HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}