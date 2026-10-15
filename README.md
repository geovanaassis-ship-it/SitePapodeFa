# Papo de Fã

Site editorial do projeto **Papo de Fã**: uma reportagem multimídia sobre cultura fandom, com
Perfis, Vídeos, Áudios, Webstorie, Linha do Tempo e Mapa Interativo — e um **painel
administrativo completo**, para que a equipe publique e edite todo o conteúdo sem programar.

Construído com Next.js (App Router), Prisma e NextAuth.

## O que já vem pronto

- Site público responsivo com identidade visual própria (cores, tipografia Playfair
  Display / Inter / JetBrains Mono).
- Painel administrativo em `/admin`, protegido por login, com CRUD completo para:
  - Configurações do site (logo, imagem de destaque, textos institucionais, redes sociais);
  - As seis páginas de conteúdo do menu (Perfil 1/2, Vídeo 1/2, Áudio 1/2) — inclusive o nome
    exibido no menu;
  - Linha do Tempo, Mapa Interativo (com coordenadas), Webstorie (slides) e Equipe/Sobre Nós;
  - Usuários com acesso ao painel.
- Upload de imagens, vídeos e áudios direto pelo navegador (sem precisar de outro serviço).
- A página inicial e a seção "Últimas publicações" são geradas automaticamente a partir do
  banco de dados — nenhuma edição de código é necessária para publicar conteúdo novo.

## Primeiros passos (desenvolvimento local)

O projeto usa Postgres (mesmo provedor usado em produção). Aponte `DATABASE_URL`, em `.env`,
para um Postgres acessível (local via Docker, ou a mesma connection string do banco de
produção — tudo bem para um projeto pequeno como este).

```bash
npm install
npm run db:migrate   # aplica o schema no banco apontado por DATABASE_URL
npm run db:seed       # popula com um usuário admin e conteúdo de exemplo
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para o site e
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) para o painel.

**Login de exemplo criado pelo seed:**

- E-mail: `equipe@papodefa.com.br`
- Senha: `papodefa2024`

> Troque essa senha (ou crie novos usuários e remova este) assim que possível, em
> **Painel → Usuários do painel**.

## Como a equipe publica conteúdo (sem programar)

1. Acesse `/admin/login` e entre com seu usuário.
2. No menu lateral:
   - **Configurações do site** — logo, imagem de destaque da home, textos de apresentação,
     redes sociais.
   - **Perfis, Vídeos e Áudios** — edite cada uma das 6 páginas fixas do menu (título, texto,
     imagem de capa, vídeo/áudio incorporado ou enviado, e o **nome exibido no menu**).
   - **Linha do Tempo**, **Mapa Interativo**, **Webstorie** e **Equipe / Sobre Nós** — adicione,
     edite ou remova itens livremente.
   - **Usuários do painel** — convide outras pessoas da equipe.
3. O texto das matérias usa uma formatação simples (não precisa saber HTML):
   - linha em branco separa parágrafos
   - `**negrito**`, `*itálico*`
   - `## Subtítulo`
   - `- item de lista`
   - `> citação`
4. Tudo o que for marcado como "Publicado" aparece no site imediatamente — inclusive na home,
   na seção "Últimas publicações".

## Identidade visual

| Cor | Uso |
|---|---|
| `#940501` vermelho escuro | destaques, botões primários |
| `#f5e5d6` bege claro | fundo principal |
| `#073147` azul petróleo | cabeçalho, rodapé, blocos de destaque |
| `#ee849e` rosa | categoria "Perfil" |
| `#b080ee` lilás | categoria "Webstorie" |
| `#ff6d3a` laranja | call-to-actions, categoria "Vídeo" |
| `#108c8c` verde-petróleo | categoria "Áudio", mapa |

Tipografia: **Playfair Display** (títulos), **Inter** (texto corrido), **JetBrains Mono**
(etiquetas, legendas e botões).

### Sobre a logo

O painel já está pronto para receber a logo oficial do projeto — envie o arquivo original em
**Painel → Configurações do site → Logo**. Até lá, o cabeçalho e o rodapé exibem um
wordmark de texto como substituto, para não quebrar o layout.

## Estrutura do projeto

```
prisma/schema.prisma        Modelo de dados (Postgres)
prisma/seed.ts               Conteúdo inicial de exemplo
src/app/(site)/...           Páginas públicas
src/app/admin/...            Painel administrativo (login + área protegida)
src/components/site/...      Componentes da identidade visual pública
src/components/admin/...     Componentes de formulário do painel
src/lib/content.ts            Consultas de conteúdo usadas pelas páginas públicas
src/lib/upload.ts             Upload de arquivos enviados pelo painel
```

## Produção / deploy

O projeto já está publicado na Vercel (projeto `papo-de-fa`), conectado a este repositório —
todo push nesta branch gera um novo deploy automaticamente.

- **Banco de dados:** Postgres. O deploy roda `prisma migrate deploy` automaticamente antes do
  build (configurado no "Build Command" do projeto na Vercel), então novas migrations criadas
  localmente (`npx prisma migrate dev`) são aplicadas sozinhas a cada push.
- **Arquivos enviados pelo painel** (logo, imagens, vídeos, áudios): em produção, `src/lib/upload.ts`
  detecta a variável `BLOB_READ_WRITE_TOKEN` (injetada automaticamente pela Vercel quando um
  Blob Store está conectado ao projeto) e envia os arquivos para o Vercel Blob. Em
  desenvolvimento local, sem essa variável, os arquivos vão para `public/uploads`.
- **Variáveis de ambiente:** veja `.env.example`. `AUTH_SECRET` já está configurado na Vercel
  com um valor aleatório forte — gere um novo com `openssl rand -base64 32` caso precise trocar.
