import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const video1Body = `Pintar o rosto, vestir a camisa do time, gritar nas arquibancadas e acompanhar cada lance são formas de demonstrar paixão pelo futebol. Mas para muitas mulheres ser torcedora ainda significa enfrentar questionamentos sobre seus conhecimentos e sua legitimidade nesse universo historicamente masculino.

O estudo "Mulheres torcedoras de futebol no Brasil: refazendo gênero no interior da cultura fanática", publicado em 2022 por Mariana Zuaneti Martins, Gabriela Borel Delarmelina e Kerzia Railane Silva, na revista FuLiA/UFMG, analisa a experiência de 37 torcedoras brasileiras. A pesquisa aborda como essas mulheres constroem sua identidade como fãs e enfrentam barreiras de gênero, destacando também a importância da solidariedade feminina.

Essa realidade aparece no relato de Rafaela Carolina, profissional de comunicação e comentarista esportiva. Com mais de seis anos de experiência na área, ela afirma que mulheres jornalistas costumam ser mais questionadas do que homens, enquanto erros masculinos podem ser relativizados, uma falha cometida por uma mulher pode comprometer sua credibilidade.

Rafaela também relata ter sido alvo de um espectador que, após discordar de sua análise durante uma transmissão, mandou que ela fosse "lavar a louça". Para ela, críticas profissionais fazem parte do trabalho, mas ataques machistas ultrapassam os limites do debate. O episódio evidencia como o preconceito ainda interfere na atuação das mulheres no jornalismo esportivo.

Nas arquibancadas, a desigualdade também se manifesta. Mulheres que demonstram entusiasmo são frequentemente chamadas de exageradas ou histéricas, enquanto comportamentos semelhantes entre homens são vistos como expressão de paixão. Além disso, dificuldades como a falta de uniformes adequados ao corpo feminino e a sensação de não pertencimento reforçam os obstáculos enfrentados pelas torcedoras.

O problema também ultrapassa o ambiente esportivo, segundo o Fórum Brasileiro de Segurança Pública (FBSP), os registros de lesão corporal dolosa em contexto de violência doméstica contra mulheres aumentaram 28,8% em dias de jogos de futebol, enquanto os registros de ameaça cresceram 27,4%. Os dados referentes a cinco capitais brasileiras entre 2023 e 2025, apontam uma associação entre dias de partidas e o aumento desses registros, sem significar que o futebol seja, isoladamente, a causa da violência.

Para Rafaela, a presença feminina no esporte é também uma forma de resistência. Ela incentiva as mulheres a continuarem acompanhando seus times e buscando espaço no jornalismo independentemente das roupas, da maquiagem ou da maneira como expressam sua paixão.

Mais do que conquistar espaço, as mulheres reivindicam o direito de torcer, trabalhar e ocupar o futebol sem precisar provar constantemente que pertencem a ele.`;

async function main() {
  await prisma.sectionPage.update({
    where: { slug: "video-1" },
    data: {
      label: "Torcedoras",
      title: "Diferença de tratamento entre homens e mulheres sendo fãs de futebol",
      subtitle: "Ser torcedora ainda significa enfrentar questionamentos sobre legitimidade",
      excerpt:
        "Pintar o rosto, vestir a camisa do time, gritar nas arquibancadas e acompanhar cada lance são formas de demonstrar paixão pelo futebol. Mas para muitas mulheres, ser torcedora ainda significa enfrentar questionamentos sobre seus conhecimentos e sua legitimidade nesse universo historicamente masculino.",
      body: video1Body,
    },
  });

  console.log("Conteúdo atualizado: video-1.");
}

main().finally(() => prisma.$disconnect());
