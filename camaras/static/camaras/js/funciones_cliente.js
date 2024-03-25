var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

});
var swipermore = new Swiper(".mySwipermore", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

function getCSRFToken() {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}


document.getElementById('comen_btn').addEventListener('click', function(e) {
    e.preventDefault();

    var lugar = 1
    var text = document.getElementById('comen_text').value;
    var inputcoment = document.getElementById('comen_text');
    var puntuacion = document.getElementById('comen_calificacion').value;
    const token = getCSRFToken();
    var formData = new FormData();
    formData.append('id_lugar', lugar);
    formData.append('text', text);
    formData.append('puntuacion', puntuacion);

    fetch('addComentario', {
        method: 'POST',
        headers: {
            'X-CSRFToken': token,
        },
        body: formData,
    }) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Crear un nuevo elemento de comentario
        inputcoment.value = "";
        var newComment = document.createElement('div');
        newComment.innerHTML = `
            <div class="d-md-flex my-4 w-100 mb-3">
                <div class="mt-3 ms-2 avatar avatar-lg me-3 flex-shrink-0">
                    <img class="avatar-img rounded-circle" loading="lazy" src="${data.comentario.user.avatar_url}" alt="avatar">
                </div>
                <div class="w-100 mt-3 ms-2">
                    <div class="d-flex justify-content-between mt-1 mt-md-0">
                        <div class="">
                            <h6 class="me-3 mb-0">${data.comentario.user.first_name}</h6>
                            <ul class="nav nav-divider small mb-2">
                                <li class="nav-item">${data.comentario.fecha}</li>
                            </ul>
                        </div>
                        <div class="icon-md rounded text-bg-warning fs-6">${data.comentario.puntuacion}</div>
                    </div>
                    <p class="mb-2 text-light">${data.comentario.text}</p>
                </div>
            </div>
            <hr class="mb-3">
            <div class="mb-3"></div>
        `;
        // Agregar el nuevo comentario al contenedor de comentarios
        document.getElementById('container-comentarios').appendChild(newComment);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
});
