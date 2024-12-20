#!/bin/bash

# Nome do repositório no GitHub Packages
GITHUB_REPO="ghcr.io/back3nd-team/back3nd"

# Função para exibir mensagens de erro e sair
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Verifica se o Docker está instalado
command -v docker > /dev/null 2>&1 || error_exit "Docker não está instalado. Por favor, instale o Docker e tente novamente."

# Verifica se o Git está instalado
command -v git > /dev/null 2>&1 || error_exit "Git não está instalado. Por favor, instale o Git e tente novamente."

# Obtém o nome da branch atual do Git
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
if [ -z "$BRANCH_NAME" ]; then
    error_exit "Não foi possível obter o nome da branch atual. Certifique-se de estar dentro de um repositório Git."
fi

# Exibe o nome da branch atual
echo "Branch atual: $BRANCH_NAME"

# Faz o build da imagem Docker com a tag "latest"
echo "Construindo a imagem Docker com a tag 'latest'..."
docker build -t back3nd:latest -f Docker/Dockerfile . || error_exit "Falha ao construir a imagem Docker."

# Adiciona a tag à imagem com o nome da branch
echo "Tagueando a imagem com a tag: $BRANCH_NAME"
docker tag back3nd:latest $GITHUB_REPO:$BRANCH_NAME || error_exit "Falha ao taguear a imagem."

# Faz login no GitHub Container Registry
echo "Fazendo login no GitHub Container Registry..."
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin || error_exit "Falha ao fazer login no GitHub Container Registry."

# Envia a imagem para o GitHub Packages com o nome e a tag corretos
echo "Enviando a imagem para o GitHub Packages..."
docker push $GITHUB_REPO:$BRANCH_NAME || error_exit "Falha ao enviar a imagem para o GitHub Packages."

# Exibe uma mensagem de sucesso
echo "Imagem enviada com sucesso para $GITHUB_REPO:$BRANCH_NAME"
