import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const perfil1Body = `Aos 11 anos, Luiza de França Oliveira Maia, já imaginava o próprio futuro no jornalismo. A paixão pela escrita e pela cultura pop aparecia nos blogs que criava por diversão, nas revistas que lia e na curiosidade em acompanhar a vida de artistas. Anos depois, ao olhar para essa trajetória, ela perceberia que parte importante de seu aprendizado aconteceu em um espaço que nem sempre é levado a sério quando se fala em formação: o fandom.

O encontro com One Direction aconteceu no início dos anos 2010, quando o clipe de One Thing apareceu em um canal de televisão dedicado a videoclipes. Naquele período, a banda britânica formada por cinco integrantes mobilizava fãs que queriam saber cada vez mais sobre seus ídolos.

Para Luiza, não era apenas uma questão de ouvir músicas, havia todo um universo de referências a conhecer, novidades a acompanhar e conteúdos a compartilhar. A vontade de entender tudo sobre aqueles cinco meninos logo encontrou espaço na internet, onde a admiração individual podia se transformar em uma experiência coletiva.

Ser fã, naquele momento, também significava participar, dessa maneira, Luiza criou a página Loucas e Apaixonadas por 1D, passou a administrar um fã-clube e escreveu uma fanfic para a página Humor One Direction, que estava entre as maiores páginas do Facebook na época. Entre publicações, imagens e vídeos, a rotina envolvia acompanhar o que outros portais divulgavam e selecionar materiais para compartilhar com os seguidores. Mesmo sem produzir tantas coisas inéditas, ela estava constantemente procurando informações e pensando no que poderia interessar à comunidade.

Talvez Luiza ainda não percebesse, mas aquele ambiente reunia atividades que ultrapassavam a admiração por uma banda pois pesquisar, selecionar, escrever, organizar uma página e criar artes, mesmo que simples, eram maneiras de experimentar diferentes formas de comunicação. O design, por exemplo, entrou em sua vida por meio das imagens que produzia para o fã-clube e hoje, ela olha para aqueles primeiros trabalhos com a distância de quem reconhece que ainda estava aprendendo. Na época, porém, eram tentativas de fazer parte daquele universo e contribuir para ele.

Mas a história não se resume às habilidades que poderiam ser aproveitadas profissionalmente, há também aquilo que não cabe em um currículo. Uma das experiências mais marcantes para Luiza foi convidar meninas que conhecia apenas pela internet, de diferentes estados brasileiros, para participar da administração de um fã-clube. Pessoas que talvez nunca se encontrassem por outros caminhos passaram a compartilhar uma paixão e a construir memórias em comum.

Em 2014, o show de One Direction no Rio de Janeiro acrescentou outra lembrança a essa trajetória: a possibilidade de ver de perto os artistas que, até então, faziam parte de seu cotidiano principalmente por meio de telas, vídeos e fotografias.

Aos poucos, o fandom se tornou também um espaço de criação e convivência, no qual Luiza podia experimentar interesses, desenvolver habilidades e estabelecer vínculos. A intensidade dessa experiência, que ela própria descreve como próxima da obsessão, fazia parte de uma fase da vida em que descobrir afinidades e encontrar pessoas com gostos semelhantes tinha um significado particular.

A escolha pelo Jornalismo, no entanto, não nasceu da banda. Antes de conhecer One Direction, Luiza já criava blogs e acompanhava o universo pop. Em 2014, chegou a desenvolver com a melhor amiga o Heartbreaker Girls, dedicado a assuntos como música, séries, filmes e livros. O fandom não determinou seu futuro, mas ampliou um caminho que já estava em construção. Como ela reconhece, foi depois que conseguiu perceber melhor o quanto aquela experiência havia reforçado sua curiosidade e sua relação com a escrita. Para Luiza, administrar uma página de fãs não era o mesmo que trabalhar em uma redação, mas envolvia uma prática constante de procurar informações, acompanhar acontecimentos e decidir o que merecia ser compartilhado.

Com o passar do tempo, essa vivência também deixou marcas na maneira como ela observa a própria comunicação. Hoje, trabalhando com planejamento de conteúdo para redes sociais, sobretudo no setor de gastronomia, sua rotina envolve pesquisa de referências, criação de roteiros, design e edição de vídeos. A conexão entre passado e presente não está em uma técnica específica que ela tenha aprendido no fã-clube e reproduz no trabalho, mas no contato precoce com um ambiente em que produzir e consumir conteúdo faziam parte da mesma experiência.

A adolescente que acompanhava cada novidade de One Direction já não vive o fandom com a mesma intensidade. Ainda assim, a história não terminou por completo: Luiza continua fã de Harry Styles, ex-integrante da banda, embora acompanhe o artista de outra maneira. Algumas paixões mudam de lugar na vida, mas não precisam desaparecer para que uma pessoa cresça. Certas lembranças permanecem como registros de quem fomos e das experiências que ajudaram a nos formar.

Talvez o que permaneça de um fandom não seja apenas a música que marcou uma adolescência ou a lembrança de um show. Pode ser também a primeira página criada, o texto escrito para outras pessoas lerem, a amizade que começou na internet ou a descoberta de que existe prazer em pesquisar e compartilhar informações.

Entre a adolescente que criava conteúdos sobre cinco garotos e a jornalista que se tornou, existe uma linha que não foi apagada pelo tempo: a curiosidade pela comunicação e a certeza de que a arte continua fazendo parte de quem ela é.`;

const audio1Body = `Muitas vezes uma música pode traduzir um sentimento que não conseguimos explicar, um personagem pode nos fazer enxergar possibilidades que antes pareciam distantes e um artista pode representar algo de quem somos ou de quem gostaríamos de ser. Para pessoas que raramente se veem representadas na mídia, encontrar essas referências em obras e artistas pode significar mais do que entretenimento: pode ser uma forma de reconhecimento e pertencimento.

Essa necessidade de representação aparece em uma pesquisa da Deloitte de 2024 onde o levantamento realizado com 3.517 consumidores dos Estados Unidos, revelou que 75% dos entrevistados não se sentiam representados na indústria de mídia e entretenimento. Entre os participantes LGBTQIA+, 62% esperavam ver nas telas a diversidade existente na sociedade, enquanto 53% procuravam produções que contassem histórias de grupos sub-representados.

A dissertação de mestrado de Leandra Alencar Soares Lima de Passo, defendida em 2025 na Universidade Federal do Ceará (UFC) investigou o fandom brasileiro de "Vermelho, Branco e Sangue Azul", romance com protagonistas masculinos, um deles bissexual. Nessa pesquisa foi analisada que 57,7% dos 52 participantes disseram que a representatividade LGBTQIA+ foi um fator decisivo para entrar no fandom e que 46,2% dos participantes se identificaram como bissexuais. Os relatos dos participantes também apontaram que o contato com a história contribuiu para processos de autodescoberta e auto aceitação da sexualidade.

Outra representatividade a ser destacada é da comunidade negra, onde na pesquisa de Eduardo de Souza Lima pela UFPB de 2024 analisou a presença e a representação de personagens negros na animação "Irmão do Jorel". Foi concluído na pesquisa que essas representações ainda eram superficiais e frequentemente associadas a papéis secundários, o que pode dificultar a identificação e a construção de uma imagem positiva da negritude na infância.

Segundo Raíssa Abraçado Pereira, pesquisadora e mestre em Comunicação e Cultura pela UFPA, destaca que essa identificação depende da maneira como cada pessoa interpreta as obras e os artistas que a acompanham. Ela também chama atenção para as contradições da representatividade: uma personagem pode ampliar a diversidade nas telas e, ainda assim, reproduzir estereótipos; uma obra pode transmitir valores de igualdade para seus fãs e entrar em conflito com as posições públicas de quem a criou. Por isso, não basta estar presente em uma narrativa, a forma como cada grupo é retratado também importa.

Mas a identificação não precisa terminar na tela. Ao encontrar outras pessoas que compartilham dos mesmos sentimentos, interesses ou experiências, o fã também pode descobrir uma comunidade na qual se sente acolhido. Outra pesquisa da Deloitte, publicada em 2024 com dados de consumidores norte-americanos, apontou que 54% dos integrantes da Geração Z e dos millennials entrevistados afirmavam que seu fandom os ajudava a fazer novas amizades. O dado ajuda a compreender como uma paixão cultural pode se transformar em laços sociais e experiências compartilhadas.

Entre encontrar a própria identidade em uma música, reconhecer-se em um personagem e construir amizades com pessoas que compartilham das mesmas referências, os fandoms mostram como a cultura pop pode participar da construção de quem somos e dos grupos aos quais sentimos pertencer.`;

const audio2Body = `Uma música pode acompanhar momentos importantes da vida, um artista pode servir de inspiração e acompanhar as publicações de uma celebridade pode criar a sensação de proximidade, mesmo sem nunca ter existido um encontro pessoal. Mas até que ponto esse vínculo faz parte da experiência de ser fã e quando ele pode se tornar prejudicial?

Esse tipo de conexão pode ser compreendido a partir do conceito de relações parassociais desenvolvido pelos pesquisadores Donald Horton e R. Richard Wohl em 1956. Os autores investigaram como os meios de comunicação podem criar uma sensação de intimidade entre o público e personalidades que ele acompanha, com o avanço das redes sociais, essas relações ganharam novas possibilidades de interação, tornando importante compreender como os fãs interpretam a proximidade com seus ídolos.

Uma revisão científica publicada em 2024 na revista Frontiers in Psychology assinada por Holger Schramm, Nicole Liebers, Laurenz Biniak e Franca Dettmar, analisou 281 estudos sobre interações e relações parassociais publicados entre 2016 e 2020. O levantamento identificou que 40% das pesquisas se concentravam nas redes sociais e nas novas mídias, demonstrando a relevância desses ambientes para o estudo dos vínculos entre o público e as figuras que o acompanham.

Mas essas conexões não se resumem à relação individual com uma celebridade, uma pesquisa da Deloitte publicada em 2024 e realizada com 3.517 consumidores dos Estados Unidos, apontou que 54% dos entrevistados da Geração Z e dos millennials afirmavam que seus fandoms os ajudavam a fazer novas amizades. O dado evidencia que a participação nessas comunidades também pode contribuir para a construção de vínculos sociais e experiências compartilhadas.

Em entrevista para este projeto, Fabiano de Abreu foi questionado sobre os limites da admiração por figuras públicas, a influência das redes sociais e os riscos da dependência emocional em um ídolo. Para ele, é importante diferenciar a admiração de situações em que o artista passa a ocupar o centro da vida do fã e a pessoa começa a acreditar em uma relação de reciprocidade que não existe.

O entrevistado também chama atenção para o tempo dedicado às telas e para as expectativas criadas em torno dessas figuras públicas, suas respostas levantam uma discussão sobre como o ambiente digital pode influenciar a maneira como os fãs vivenciam a admiração e constroem vínculos com pessoas que embora façam parte de sua rotina online não necessariamente participam de sua vida pessoal.

Entretanto, sentir proximidade com um artista não significa, por si só, que exista um problema psicológico, as relações parassociais podem assumir diferentes significados e a participação em um fandom também pode proporcionar acolhimento, amizades e identificação. Por isso, é importante distinguir o envolvimento saudável de situações em que a admiração provoca sofrimento ou interfere negativamente na rotina.

Entre a inspiração proporcionada por um ídolo e as conexões construídas com outros fãs, as relações parassociais ajudam a compreender como os fandoms ocupam espaço na vida das pessoas. Mais do que discutir os limites da admiração, o tema convida a refletir sobre a influência das redes sociais nas relações humanas e sobre a importância de reconhecer a diferença entre a proximidade percebida e os vínculos construídos na vida real.`;

async function main() {
  await prisma.sectionPage.update({
    where: { slug: "perfil-1" },
    data: {
      label: "Por Trás do Icon",
      title: "Por Trás do Icon",
      subtitle: "A trajetória de Luiza de França Oliveira Maia com o fandom de One Direction",
      excerpt:
        "Na adolescência, acompanhar cada novidade dos ídolos pode significar passar horas na internet, criar páginas, escrever histórias e conhecer pessoas que, mesmo distantes, compartilhavam a mesma paixão. Mas e quando essa experiência deixa marcas que ultrapassam a fase de ser fã?",
      body: perfil1Body,
    },
  });

  await prisma.sectionPage.update({
    where: { slug: "audio-1" },
    data: {
      label: "Identidade e Pertencimento",
      title: "Identidade e Pertencimento",
      subtitle: "Representatividade, reconhecimento e pertencimento na cultura fandom",
      excerpt:
        "Para pessoas que raramente se veem representadas na mídia, encontrar essas referências em obras e artistas pode significar mais do que entretenimento: pode ser uma forma de reconhecimento e pertencimento.",
      body: audio1Body,
    },
  });

  await prisma.sectionPage.update({
    where: { slug: "audio-2" },
    data: {
      label: "Parassocialidade",
      title: "Parassocialidade",
      subtitle: "Até onde vai o vínculo entre fãs e ídolos?",
      excerpt:
        "Uma música pode acompanhar momentos importantes da vida, um artista pode servir de inspiração. Mas até que ponto esse vínculo faz parte da experiência de ser fã e quando ele pode se tornar prejudicial?",
      body: audio2Body,
    },
  });

  console.log("Conteúdo atualizado: perfil-1, audio-1, audio-2.");
}

main().finally(() => prisma.$disconnect());
