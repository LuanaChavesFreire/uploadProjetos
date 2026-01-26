const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");
const mainImagem = document.querySelector(".mainImagem");
const nomeImagem = document.querySelector(".containerImagemNome p");
const inputTag = document.getElementById("categoria");
const listaTags = document.getElementById("listaTags");
const mensagemTagVazia = document.getElementById("mensagemTagVazia");

uploadBtn.addEventListener("click", () => {
  imageUpload.click();
});

function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro ao ler o ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

imageUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const ConteudoArquivo = await lerConteudoArquivo(arquivo);
      mainImagem.src = ConteudoArquivo.url;
      nomeImagem.textContent = ConteudoArquivo.nome;
    } catch (erro) {
      console.error("Erro de leitura de arquivo:", erro);
    }
  }
});

inputTag.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTag.value.trim();
    if (inputTag !== "") {
      const novaTag = document.createElement("li");
      novaTag.innerHTML = `<p>${tagTexto}</p> <img src=${"img/close-black.svg"} class="removeTag">`;
      listaTags.appendChild(novaTag);
      inputTag.value = "";
    }
  }

  verificaListaTag();
});

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("removeTag")) {
    const tagRemovida = evento.target.parentElement;
    listaTags.removeChild(tagRemovida);
  }

  verificaListaTag();
});

function verificaListaTag() {
  const contaTags = listaTags.querySelectorAll("li");
  if (contaTags.length === 0) {
    mensagemTagVazia.style.display = "block";
  } else {
    mensagemTagVazia.style.display = "none";
  }
}

verificaListaTag();
