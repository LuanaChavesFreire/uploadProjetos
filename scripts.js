const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");
const mainImagem = document.querySelector(".mainImagem");
const nomeImagem = document.querySelector(".containerImagemNome p");
const inputTag = document.getElementById("categoria");
const listaTags = document.getElementById("listaTags");
const btnPublicar = document.querySelector(".botaoPublicar");

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data-science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
];

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

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("removeTag")) {
    const tagRemovida = evento.target.parentElement;
    listaTags.removeChild(tagRemovida);
  }


});

async function verificaTags(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

inputTag.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTag.value.trim();
    if (inputTag !== "") {
      try {
        const tagExiste = await verificaTags(tagTexto);
        if (tagExiste) {
          const novaTag = document.createElement("li");
          novaTag.innerHTML = `<p>${tagTexto}</p> <img src=${"img/close-black.svg"} class="removeTag">`;
          listaTags.appendChild(novaTag);
          inputTag.value = "";
        } else {
          alert("Tag não foi encontrada");
        }
      } catch (error) {
        console.error("Erro ao verificara existenci da tag.");
        alert("Erro ao verificar a existencia da tag, verifique o console.");
      }
    }
  }
});
