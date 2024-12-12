document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const gallery = document.getElementById("gallery");

    const photos = [
        { id: 1, imageUrl: "img/GB9ckmVzRFE.jpg" },
        { id: 2, imageUrl: "img/SCyVVm13iSE.jpg" },
        { id: 3, imageUrl: "img/t9-SCQF5vFo.jpg" }
    ];

    // Функция загрузки комментариев
    const fetchComments = async (photoId) => {
        const randomFilter = Math.random() > 0.5 ? "?id_gte=100" : "?id_lte=100";
        const endpoint = `https://jsonplaceholder.typicode.com/comments${randomFilter}`;
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const comments = await response.json();
            return comments.filter(comment => comment.postId % 10 === photoId);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Функция отображения фотографий с комментариями
    const displayPhotos = async () => {
        try {
            preloader.style.display = "block";
            gallery.style.display = "none";

            for (const photo of photos) {
                const photoContainer = document.createElement("div");
                photoContainer.className = "photo-container";

                const img = document.createElement("img");
                img.src = photo.imageUrl;
                img.alt = `Фото ${photo.id}`;
                img.width = 500;
                img.height = 500;

                photoContainer.appendChild(img);

                const comments = await fetchComments(photo.id);
                if (comments.length > 0) {
                    comments.forEach(comment => {
                        const commentElement = document.createElement("div");
                        commentElement.className = "comment";
                        commentElement.innerHTML = `
                            <div><strong>${comment.name}</strong></div>
                            <div>${comment.email}</div>
                            <div>${comment.body}</div>
                        `;
                        photoContainer.appendChild(commentElement);
                    });
                } else {
                    const noCommentsElement = document.createElement("div");
                    noCommentsElement.className = "no-comments";
                    noCommentsElement.textContent = "Комментариев нет";
                    photoContainer.appendChild(noCommentsElement);
                }

                gallery.appendChild(photoContainer);
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
