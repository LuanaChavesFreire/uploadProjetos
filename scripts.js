const uploadBtn = document.getElementById('uploadBtn')
const imageUpload = document.getElementById('imageUpload')
const mainImagem = document.querySelector('.mainImagem')
const nomeImagem = document.querySelector('.containerImagemNome p')

uploadBtn.addEventListener('click', () => {
    imageUpload.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        }
        leitor.onerror = () => {
            reject(`Erro ao ler o ${arquivo.name}`)
        }
        leitor.readAsDataURL(arquivo)
    })
}


imageUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const ConteudoArquivo = await lerConteudoArquivo(arquivo);
            mainImagem.src = ConteudoArquivo.url
            nomeImagem.textContent = ConteudoArquivo.nome
        }
        catch(erro) {
            console.error('Erro de leitura de arquivo:', erro)
        }
    }
})
