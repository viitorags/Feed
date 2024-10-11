export class formPost {
    constructor(idForm, idTextarea, idFileInput, idImagePreviewContainer, idImagePreview) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.fileInput = document.getElementById(idFileInput);
        this.imagePreviewContainer = document.getElementById(idImagePreviewContainer);
        this.imagePreview = document.getElementById(idImagePreview);
        this.ulPost = document.querySelector('section.feed');
        this.selectedImage = null; // Armazena a imagem selecionada
        this.addSubmit();
        this.addFileInputHandler();
    }

    /* Função para gerenciar o upload de imagem */
    addFileInputHandler() {
        this.fileInput.addEventListener("change", (event) => {
            const files = event.target.files; // Coletar múltiplos arquivos
            this.selectedImages = []; // Armazena múltiplas imagens
            const previewContainer = document.getElementById('selectedImagePreview');
            previewContainer.innerHTML = ""; // Limpar a pré-visualização

            Array.from(files).forEach(file => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.selectedImages.push(e.target.result); // Armazena cada imagem
                        // Exibir a imagem na pré-visualização
                        const imgElement = document.createElement('img');
                        imgElement.src = e.target.result;
                        imgElement.style.maxWidth = "100%";
                        imgElement.style.maxHeight = "300px";
                        imgElement.style.objectFit = "contain";
                        imgElement.style.borderRadius = "8px";
                        imgElement.style.marginTop = "10px";
                        previewContainer.appendChild(imgElement);
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Mostrar o contêiner de pré-visualização
            if (files.length > 0) {
                previewContainer.style.display = 'block';
            }
        });
    }


    /* Função para exibir a imagem selecionada */
    showPreviewImage() {
        if (this.selectedImage) {
            this.imagePreview.src = this.selectedImage;
            this.imagePreviewContainer.style.display = "block"; // Mostra o contêiner da imagem
        } else {
            this.imagePreviewContainer.style.display = "none"; // Oculta se não houver imagem
        }
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
                let postContent = `
                    <div class="post-header">
                        <img src="./src/img/dog-tyson.jpeg" class="img-user-post" alt="Foto de perfil">
                        <div class="user-info">
                            <h3>Gustavo Lima</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${this.textarea.value}</p>
                `;
    
                /* Adicionando múltiplas imagens */
                if (this.selectedImages && this.selectedImages.length > 0) {
                    this.selectedImages.forEach(imageSrc => {
                        postContent += `<img src="${imageSrc}" alt="Imagem da postagem" style="max-width:100%; max-height:300px; object-fit:contain; border-radius:8px; margin-top:10px;">`;
                    });
                }
    
                postContent += `</div>
                    <div class="post-actions">
                        <button type="button" class="files-post like"><img src="./src/img/paw.svg" alt="Curtir"><span>Curtir</span></button>
                        <button type="button" class="files-post direct"><img src="./src/img/direct.svg" alt="Comentar"><span>Comentar</span></button>
                        <button type="button" class="files-post share"><img src="./src/img/share.svg" alt="Compartilhar"><span>Compartilhar</span></button>
                    </div>
                `;
    
                newPost.innerHTML = postContent;
                
                this.ulPost.append(newPost);
                this.textarea.value = "";
                this.selectedImages = []; // Resetar as imagens selecionadas
                document.getElementById('selectedImagePreview').style.display = 'none'; // Esconder o preview
                document.getElementById('selectedImagePreview').innerHTML = ""; // Limpar o preview
    
            } else {
                alert('Verifique o campo digitado.');
            }
        };
    
        this.onSubmit(handleSubmit);
    }
}

// Desktop
const postFormDesktop = new formPost('formPost', 'textarea', 'uploadImageInput', 'selectedImagePreview', 'imagePreview');
document.getElementById("btnUploadImage").addEventListener("click", () => {
    document.getElementById("uploadImageInput").click();
});

// Mobile
const postFormMobile = new formPost('formPostMobile', 'textareaMobile', 'uploadImageInputMobile', 'selectedImagePreviewMobile', 'imagePreviewMobile');
document.getElementById("btnUploadImageMobile").addEventListener("click", () => {
    document.getElementById("uploadImageInputMobile").click();
});

// Modal Mobile
const openModalButton = document.querySelector(".form-modal");
const modalElement = document.querySelector(".formMobile");
const closeModalButton = document.querySelector(".close-modal");

openModalButton.addEventListener("click", () => {
    if (!modalElement.open) {
        modalElement.showModal();
    }
});

closeModalButton.addEventListener("click", () => {
    modalElement.close();
});
