# CSV Data Processing

Este projeto é responsável por processar dados de um arquivo CSV, validar informações como CPF/CNPJ e prestações, e formatar valores monetários para o padrão brasileiro (BRL). Ao final, será gerado um novo arquivo CSV com os dados formatados e validados.

# O QUE PROJETO FAZ?

- Lê um arquivo CSV com dados diversos.
- Formata valores monetários (como vlTotal, vlPresta, vlMora) para o padrão de moeda brasileira (BRL).
- Valida se o CPF ou CNPJ fornecido é válido.
- Verifica se as prestações (vlPresta) estão corretas com base no valor total (vlTotal) e a quantidade de prestações (qtPrestacoes).
- Gera um novo arquivo CSV com os dados formatados e validados na pasta data-csv com o nome formatted_data.csv.

## Instalação

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

### 2. Instale as dependências:

```bash
$ npm install ou yarn

```

## Rodando o index.ts

```bash
$ npm run start

```

ou

```bash
$ yarn start

```

## Arquivo de Saída

O arquivo formatado e validado será gerado em:

```bash
src/data-csv/convert_data.csv'

```
