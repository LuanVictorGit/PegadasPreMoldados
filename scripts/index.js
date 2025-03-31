document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("container_galeria");

    if (!container) {
        console.error("Container element not found");
        return;
    }

    try {
        const response = await fetch("http://146.235.61.99:8080/api/files");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const filenames = await response.json();
        
        if (!Array.isArray(filenames)) {
            throw new Error("Invalid response format: Expected an array");
        }

        for (let filename of filenames) {
            console.log(filename);
            
            // Criar um elemento div para usar background-image
            const div = document.createElement("div");
            div.classList.add("position-relative", "rounded-md", "shadow-md", "shadow-black", "protected-image", "flex", "items-center", "justify-center");

            // Aplicar estilos para exibir imagem corretamente
            div.style.width = "20rem"; // Deixa a largura automática
            div.style.height = "20rem"; // Altura automática
            div.style.backgroundImage = `url('http://146.235.61.99:8080/api/files/${filename}')`;
            div.style.backgroundSize = "cover"; // Mantém a qualidade sem distorcer
            div.style.backgroundPosition = "center";
            div.style.backgroundRepeat = "no-repeat";
            div.style.imageRendering = "high-quality";

            // Tornar a imagem não arrastável e desativar o clique direito
            div.setAttribute("draggable", "false");
            div.addEventListener("contextmenu", (e) => e.preventDefault());

            // Criar overlay para evitar downloads
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(255, 255, 255, 0)"; // Pode ser usado para dar efeito de proteção
            overlay.style.zIndex = "1";

            div.innerHTML = `
            <img src="./images/icon.jpg" alt="icon" class="w-12 h-auto rounded-full opacity-50" />`;

            div.appendChild(overlay);
            container.appendChild(div);
        }
    } catch (error) {
        console.error("Erro ao carregar imagens:", error);
    }
});
