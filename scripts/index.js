document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("container_galeria");

    try {
        const response = await fetch("https://146.235.61.99:3000/api/files");

        if (!response.ok) {
            throw new Error(`Erro ao buscar arquivos: ${response.statusText}`);
        }

        const files = await response.json();

        files.forEach(file => {
            const fileElement = document.createElement("div");
            fileElement.classList.add("file-item");

            if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg") || file.endsWith(".gif")) {
                fileElement.innerHTML = `<img src="https://146.235.61.99:3000/uploads/${file}" alt="${file}" class="galeria-img">`;
            } else {
                fileElement.innerHTML = `<a href="https://146.235.61.99:3000/uploads/${file}" target="_blank">${file}</a>`;
            }

            container.appendChild(fileElement);
        });
    } catch (error) {
        console.error("Erro ao carregar os arquivos:", error);
        container.innerHTML = "<p>Erro ao carregar arquivos.</p>";
    }
});
