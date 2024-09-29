export class formPost {
    constructor(idForm, idTextarea) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.ulPost = document.querySelector('section.feed'); // Seleciona a seção do feed
        this.addSubmit();
    }
    
    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    /* Validação de campo de texto vazio ou menor que 3 */
    formValidate(value) {
        return value && value.length >= 3;
    }

    /* Função para obter a data atual */ 
    getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return `${hour}h ${minutes}min`;
    }

    /* Função para o botão publicar (botão submit) */
    addSubmit() {
        const handleSubmit = (event) => {
            event.preventDefault();
            if (this.formValidate(this.textarea.value)) {
                const time = this.getTime();
                const newPost = document.createElement('article');
                newPost.classList.add('post');

                /* Conteúdo da postagem dinâmica */
                newPost.innerHTML = `
                    <div class="post-header">
                        <img src="./images/gato-grilado.jpg" class="img-user-post" alt="Foto de perfil">
                        <div class="user-info">
                            <h3>Gustavo Lima</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${this.textarea.value}</p>
                        <img src="./images/dog-tyson.jpeg" alt="Imagem da postagem">
                    </div>
                    <div class="post-actions">
                        <button type="button" class="files-post like"><img src="icons/paw.svg" alt="Curtir">Curtir</button>
                        <button type="button" class="files-post direct"><img src="icons/direct.svg" alt="Comentar">Comentar</button>
                        <button type="button" class="files-post share"><img src="icons/share.svg" alt="Compartilhar">Compartilhar</button>
                    </div>
                `;
                
                this.ulPost.append(newPost);
                this.textarea.value = "";

            } else {
                /* Alerta para campo vazio ou < 3 caracteres */
                alert('Verifique o campo digitado.');
            }
        }

        this.onSubmit(handleSubmit);
    }
}

const postForm = new formPost('formPost', 'textarea');

// MOBILE

const postFormDesktop = new formPost('formPost', 'textarea');

const postFormMobile = new formPost('formPostMobile', 'textareaMobile');

// Abrir formulário em dispositivos Mobile
const openModalButton = document.querySelector(".form-modal");  // Botão de abrir a modal
const modalElement = document.querySelector(".formMobile");     // Modal
const closeModalButton = document.querySelector(".close-modal"); // Botão de fechar

// Função para abrir a modal no clique
openModalButton.addEventListener("click", () => {
    if (!modalElement.open) {
        modalElement.showModal();
    }
});

// Função para fechar a modal no clique do botão de fechar
closeModalButton.addEventListener("click", () => {
    modalElement.close();
});
