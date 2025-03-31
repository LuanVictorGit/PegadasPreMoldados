document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("container_galeria");

    try {
        // 1. Alterei para HTTP (Spring Boot roda HTTP por padrão) e adicionei tratamento de erros
        const response = await fetch("http://146.235.61.99:8080/api/files", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const files = await response.json();

        // 2. Limpa o container antes de adicionar novos itens
        container.innerHTML = '';

        // 3. Verifica se há arquivos
        if (!files || files.length === 0) {
            container.innerHTML = "<p class='text-gray-500'>Nenhum arquivo encontrado.</p>";
            return;
        }

        // 4. Processa cada arquivo
        files.forEach(file => {
            const fileElement = document.createElement("div");
            fileElement.classList.add("file-item", "p-2", "mb-2", "border", "rounded");

            // 5. Verifica se é uma imagem (com expressão regular mais completa)
            const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
            
            if (imageExtensions.test(file)) {
                // 6. Usa URL relativa (ajuste conforme sua estrutura de pastas)
                fileElement.innerHTML = `
                    <div class="image-container">
                        <img src="/files/${file}" alt="${file}" class="galeria-img max-w-full h-auto rounded">
                        <p class="text-sm text-center mt-1">${file}</p>
                    </div>
                `;
            } else {
                // 7. Para outros tipos de arquivo
                fileElement.innerHTML = `
                    <div class="file-container flex items-center">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <a href="/files/${file}" target="_blank" class="text-blue-600 hover:underline">${file}</a>
                    </div>
                `;
            }

            container.appendChild(fileElement);
        });

    } catch (error) {
        console.error("Erro ao carregar os arquivos:", error);
        container.innerHTML = `
            <p class='text-red-500 p-4 bg-red-50 rounded'>
                Erro ao carregar arquivos: ${error.message}
            </p>
        `;
    }
});