document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const gallery = document.getElementById("gallery");

    // Получение шаблонов
    const photoTemplate = document.getElementById("photo-template").content;
    const commentTemplate = document.getElementById("comment-template").content;

    const photos = [
        { id: 1, imageUrl: "img/GB9ckmVzRFE.jpg" },
        { id: 2, imageUrl: "img/SCyVVm13iSE.jpg" },
        { id: 3, imageUrl: "img/t9-SCQF5vFo.jpg" }
    ];

    // Функция загрузки комментариев
    const fetchComments = async (photoId) => {
        const endpoint = `https://jsonplaceholder.typicode.com/comments?postId=${photoId}`;
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const comments = await response.json();
            return comments;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Функция отображения фотографий с комментариями
    const displayPhotos = async () => {
        try {
            gallery.innerHTML = ""; // Очистка галереи перед заполнением

            for (const photo of photos) {

                const photoElement = photoTemplate.cloneNode(true);
                const imgElement = photoElement.querySelector("img");
                const commentsContainer = photoElement.querySelector(".comments-container");

                imgElement.src = photo.imageUrl;
                imgElement.alt = `Фото ${photo.id}`;

                // Загружаем комментарии
                const comments = await fetchComments(photo.id);
                if (comments.length > 0) {
                    comments.forEach(comment => {
                        const commentElement = commentTemplate.cloneNode(true);
                        commentElement.querySelector("strong").textContent = comment.name; // Имя пользователя
                        commentElement.querySelector(".email").textContent = comment.email; // Email
                        commentElement.querySelector(".body").textContent = comment.body;  // Текст комментария

                        commentsContainer.appendChild(commentElement);
                    });
                } else {
                    commentsContainer.innerHTML = '<div class="no-comments">Комментариев нет</div>';
                }

                gallery.appendChild(photoElement);
            }
        } catch (error) {
            displayError("⚠ Что-то пошло не так при загрузке фотографий.");
        } finally {
            preloader.style.display = "none";
            gallery.style.display = "block";
        }
    };

    function displayError(message) {
        const errorElement = document.createElement("p");
        errorElement.textContent = message;
        errorElement.style.color = "red";
        gallery.appendChild(errorElement);
    }

    // Имитация асинхронной загрузки данных
    setTimeout(displayPhotos, 2000);
});
