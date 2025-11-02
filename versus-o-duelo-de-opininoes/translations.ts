// FIX: Import React to allow JSX syntax in a .ts file.
import React from 'react';

export const translations = {
    // App.tsx
    introOpinion: {
        pt: 'OPINE',
        en: 'DEBATE',
        es: 'OPINA'
    },
    introTitle: {
        pt: 'VERSUS',
        en: 'VERSUS',
        es: 'VERSUS'
    },
    introSubtitle: {
        pt: 'O Duelo de Opiniões',
        en: 'The Duel of Opinions',
        es: 'El Duelo de Opiniones'
    },
    introButtonOpine: {
        pt: 'OPINE',
        en: 'DEBATE',
        es: 'OPINA'
    },
    introButtonCuriosities: {
        pt: 'CURIOSIDADES',
        en: 'CURIOSITIES',
        es: 'CURIOSIDADES'
    },

    // Questions.tsx
    loadingDuels: {
        pt: 'Carregando Duelos...',
        en: 'Loading Duels...',
        es: 'Cargando Duelos...'
    },
    errorTitle: {
        pt: 'Algo deu errado',
        en: 'Something went wrong',
        es: 'Algo salió mal'
    },
    errorButton: {
        pt: 'Tentar Novamente',
        en: 'Try Again',
        es: 'Intentar de Nuevo'
    },
    summaryTitle: {
        pt: 'Seu Resumo de Opiniões',
        en: 'Your Opinion Summary',
        es: 'Tu Resumen de Opiniones'
    },
    summaryYourAnswer: {
        pt: 'Sua resposta:',
        en: 'Your answer:',
        es: 'Tu respuesta:'
    },
    voteYes: {
        pt: 'SIM',
        en: 'YES',
        es: 'SÍ'
    },
    voteNo: {
        pt: 'NÃO',
        en: 'NO',
        es: 'NO'
    },
    voteSkipped: {
        pt: 'NÃO VOTOU',
        en: 'SKIPPED',
        es: 'NO VOTADO'
    },
    buttonGoHome: {
        pt: 'Voltar para Home',
        en: 'Back to Home',
        es: 'Volver al Inicio'
    },
    questionProgress: {
        pt: 'PERGUNTA {current} DE {total}',
        en: 'QUESTION {current} OF {total}',
        es: 'PREGUNTA {current} DE {total}'
    },
    buttonBack: {
        pt: 'Voltar',
        en: 'Back',
        es: 'Volver'
    },
    buttonNext: {
        pt: 'Próxima Pergunta',
        en: 'Next Question',
        es: 'Siguiente Pregunta'
    },
    buttonFinish: {
        pt: 'Finalizar',
        en: 'Finish',
        es: 'Finalizar'
    },
    buttonUnderstand: {
        pt: 'Entenda',
        en: 'Understand',
        es: 'Entiende'
    },
    
    // Curiosities.tsx
    curiositiesTitle: {
        pt: 'CURIOSIDADES',
        en: 'CURIOSITIES',
        es: 'CURIOSIDADES'
    },
    curiositiesSubtitle: {
        pt: 'FATOS INTRIGANTES DO CENÁRIO GLOBAL',
        en: 'INTRIGUING FACTS FROM THE GLOBAL SCENE',
        es: 'HECHOS INTRIGANTES DEL ESCENARIO GLOBAL'
    },

    // Footer.tsx
    developedBy: {
        pt: 'Desenvolvido por',
        en: 'Developed by',
        es: 'Desarrollado por'
    }
};

export type TranslationKey = keyof typeof translations;

export const questionsContent = {
    pt: [
        { id: 1, text: 'A recente operação policial de grande porte no Rio de Janeiro foi legítima?', explanation: 'Operações policiais em larga escala no Rio de Janeiro representam uma estratégia de confronto direto com facções criminosas fortemente armadas, que dominam vastos territórios. Defensores dessas ações argumentam que são necessárias para restabelecer a ordem, desarticular o crime organizado e proteger a população de bem. No entanto, críticos apontam para o alto número de vítimas civis, a violação de direitos humanos e a pouca eficácia a longo prazo, sugerindo que a abordagem militarizada apenas agrava o ciclo de violência sem resolver as causas profundas do problema, como a desigualdade social e a falta de oportunidades.' },
        { id: 2, text: 'O traficante é vítima do usuário?', explanation: 'Esta questão explora uma possível inversão de papéis na lógica do crime. A visão tradicional coloca o traficante como o agente ativo e o usuário como o consumidor final que alimenta o sistema. No entanto, uma análise mais complexa sugere que muitos traficantes, especialmente os de baixo escalão, são frequentemente jovens de comunidades marginalizadas, com poucas alternativas de vida, tornando-se eles próprios vítimas de um sistema socioeconômico excludente que o vício dos usuários ajuda a perpetuar.' },
        { id: 3, text: 'A imprensa é imparcial?', explanation: 'O ideal jornalístico preza pela imparcialidade e pela apresentação objetiva dos fatos. Contudo, na prática, veículos de comunicação são empresas com interesses econômicos e, por vezes, políticos. A escolha do que noticiar (agendamento), o destaque dado a certos temas e a linha editorial adotada podem influenciar a percepção do público. O debate reside em diferenciar o jornalismo profissional, que busca a pluralidade de fontes e a checagem de fatos, da propaganda ou do ativismo disfarçado de notícia.' },
        { id: 4, text: 'Os Estados Unidos vão atacar a Venezuela?', explanation: 'A política externa dos EUA em relação à Venezuela é objeto de intenso debate. Por um lado, sanções econômicas e pressão diplomática são as ferramentas preferenciais. Uma intervenção militar direta é considerada de alto custo político, financeiro e humano, sendo publicamente descartada por muitos analistas. Por outro lado, a instabilidade política na Venezuela, suas vastas reservas de petróleo e a proximidade geográfica com os EUA mantêm a "opção militar" como uma possibilidade latente, embora improvável, no discurso de alguns setores mais radicais da política americana.' },
        { id: 5, text: 'Bolsonaro é elegível para 2026?', explanation: 'Em junho de 2023, o Tribunal Superior Eleitoral (TSE) declarou o ex-presidente Jair Bolsonaro inelegível por oito anos, a contar das eleições de 2022, por abuso de poder político e uso indevido dos meios de comunicação. A decisão se baseou em uma reunião com embaixadores onde ele atacou o sistema eleitoral brasileiro. Juridicamente, ele está impedido de concorrer até 2030. A defesa ainda tenta reverter a decisão em instâncias superiores, como o STF, mas o cenário atual é de inelegibilidade.' },
        { id: 6, text: 'Barroso deve sofrer sanções Magnitski?', explanation: 'A Lei Magnitsky é um dispositivo legal dos EUA que autoriza sanções contra estrangeiros envolvidos em corrupção e violações de direitos humanos. A aplicação de sanções ao Ministro Luís Roberto Barroso, do STF, é uma demanda de setores críticos à sua atuação, acusando-o de ativismo judicial e decisões que extrapolam suas funções. No entanto, para que as sanções fossem aplicadas, o governo dos EUA precisaria conduzir uma investigação e concluir que há evidências robustas de corrupção ou violações graves de direitos humanos, o que torna o cenário altamente improvável e politicamente complexo.' },
        { id: 7, text: 'A legalização da maconha para uso recreativo seria benéfica para o Brasil?', explanation: 'O debate sobre a legalização da maconha envolve argumentos sobre saúde pública, segurança, liberdade individual e potencial de arrecadação de impostos. Países como Canadá e Uruguai já legalizaram, oferecendo dados sobre os impactos sociais e econômicos da medida, que continuam a ser analisados e debatidos globalmente.' },
        { id: 8, text: 'O voto no Brasil deveria ser facultativo em vez de obrigatório?', explanation: 'A obrigatoriedade do voto no Brasil é defendida como um pilar da democracia, garantindo maior participação popular. Críticos, no entanto, argumentam que o voto facultativo aumentaria a qualidade do eleitorado, composto por cidadãos mais engajados e informados, além de ser uma expressão de liberdade individual.' },
        { id: 9, text: 'As cotas raciais em universidades e concursos públicos são uma política justa?', explanation: 'As cotas são uma política de ação afirmativa que visa corrigir desigualdades históricas e promover a diversidade. Seus defensores a veem como uma ferramenta essencial para a inclusão, enquanto opositores questionam sua eficácia e argumentam que ela pode ferir o princípio da meritocracia.' },
        { id: 10, text: 'A redução da maioridade penal de 18 para 16 anos diminuiria a criminalidade?', explanation: 'A proposta de reduzir a maioridade penal é um tema recorrente no debate público brasileiro. Apoiadores acreditam que a medida coibiria a participação de jovens em crimes graves, enquanto opositores alertam para os riscos de superlotar o sistema prisional e dificultar a ressocialização, argumentando que a solução passa por investimentos em educação e oportunidades.' }
    ],
    en: [
        { id: 1, text: 'Was the recent large-scale police operation in Rio de Janeiro legitimate?', explanation: 'Large-scale police operations in Rio de Janeiro represent a strategy of direct confrontation with heavily armed criminal factions that dominate vast territories. Proponents of these actions argue that they are necessary to restore order, dismantle organized crime, and protect law-abiding citizens. However, critics point to the high number of civilian casualties, human rights violations, and a lack of long-term effectiveness, suggesting that the militarized approach only exacerbates the cycle of violence without addressing the root causes of the problem, such as social inequality and lack of opportunities.' },
        { id: 2, text: 'Is the drug dealer a victim of the user?', explanation: 'This question explores a possible role reversal in the logic of crime. The traditional view places the dealer as the active agent and the user as the final consumer who fuels the system. However, a more complex analysis suggests that many dealers, especially low-level ones, are often young people from marginalized communities with few life alternatives, becoming victims themselves of an exclusionary socioeconomic system that users\' addiction helps perpetuate.' },
        { id: 3, text: 'Is the press impartial?', explanation: 'The journalistic ideal values impartiality and the objective presentation of facts. However, in practice, media outlets are businesses with economic and sometimes political interests. The choice of what to report (agenda-setting), the emphasis given to certain topics, and the editorial line adopted can influence public perception. The debate lies in differentiating professional journalism, which seeks a plurality of sources and fact-checking, from propaganda or activism disguised as news.' },
        { id: 4, text: 'Will the United States attack Venezuela?', explanation: 'US foreign policy towards Venezuela is the subject of intense debate. On one hand, economic sanctions and diplomatic pressure are the preferred tools. A direct military intervention is considered to have high political, financial, and human costs, and is publicly dismissed by many analysts. On the other hand, political instability in Venezuela, its vast oil reserves, and its geographical proximity to the US keep the "military option" as a latent, though unlikely, possibility in the discourse of some more radical sectors of American politics.' },
        { id: 5, text: 'Is Bolsonaro eligible for 2026?', explanation: 'In June 2023, the Superior Electoral Court (TSE) declared former President Jair Bolsonaro ineligible for eight years, starting from the 2022 elections, for abuse of political power and misuse of the media. The decision was based on a meeting with ambassadors where he attacked the Brazilian electoral system. Legally, he is barred from running until 2030. His defense is still trying to reverse the decision in higher courts, such as the STF, but the current scenario is one of ineligibility.' },
        { id: 6, text: 'Should Barroso suffer Magnitsky sanctions?', explanation: 'The Magnitsky Act is a US legal provision that authorizes sanctions against foreigners involved in corruption and human rights violations. Applying sanctions to Justice Luís Roberto Barroso of the STF is a demand from sectors critical of his actions, accusing him of judicial activism and decisions that overstep his duties. However, for the sanctions to be applied, the US government would need to conduct an investigation and conclude that there is robust evidence of corruption or serious human rights violations, which makes the scenario highly unlikely and politically complex.' },
        { id: 7, text: 'Would legalizing marijuana for recreational use be beneficial for Brazil?', explanation: 'The debate over marijuana legalization involves arguments about public health, safety, individual freedom, and potential tax revenue. Countries like Canada and Uruguay have already legalized it, providing data on the social and economic impacts of the measure, which continue to be analyzed and debated globally.' },
        { id: 8, text: 'Should voting in Brazil be optional instead of mandatory?', explanation: 'Mandatory voting in Brazil is defended as a pillar of democracy, ensuring greater popular participation. Critics, however, argue that optional voting would improve the quality of the electorate, composed of more engaged and informed citizens, as well as being an expression of individual freedom.' },
        { id: 9, text: 'Are racial quotas in universities and public exams a fair policy?', explanation: 'Quotas are an affirmative action policy aimed at correcting historical inequalities and promoting diversity. Its supporters see it as an essential tool for inclusion, while opponents question its effectiveness and argue that it may violate the principle of meritocracy.' },
        { id: 10, text: 'Would reducing the age of criminal responsibility from 18 to 16 decrease crime?', explanation: 'The proposal to reduce the age of criminal responsibility is a recurring theme in the Brazilian public debate. Supporters believe the measure would curb the participation of young people in serious crimes, while opponents warn of the risks of overcrowding the prison system and hindering rehabilitation, arguing that the solution involves investments in education and opportunities.' }
    ],
    es: [
        { id: 1, text: '¿Fue legítima la reciente operación policial a gran escala en Río de Janeiro?', explanation: 'Las operaciones policiales a gran escala en Río de Janeiro representan una estrategia de confrontación directa con facciones criminales fuertemente armadas que dominan vastos territorios. Los defensores de estas acciones argumentan que son necesarias para restablecer el orden, desmantelar el crimen organizado y proteger a los ciudadanos respetuosos de la ley. Sin embargo, los críticos señalan el alto número de víctimas civiles, las violaciones de los derechos humanos y la falta de eficacia a largo plazo, sugiriendo que el enfoque militarizado solo agrava el ciclo de violencia sin abordar las causas profundas del problema, como la desigualdad social y la falta de oportunidades.' },
        { id: 2, text: '¿Es el narcotraficante una víctima del consumidor?', explanation: 'Esta pregunta explora una posible inversión de roles en la lógica del crimen. La visión tradicional sitúa al traficante como el agente activo y al consumidor como el eslabón final que alimenta el sistema. Sin embargo, un análisis más complejo sugiere que muchos traficantes, especialmente los de bajo nivel, son a menudo jóvenes de comunidades marginadas con pocas alternativas de vida, convirtiéndose ellos mismos en víctimas de un sistema socioeconómico excluyente que la adicción de los usuarios ayuda a perpetuar.' },
        { id: 3, text: '¿Es imparcial la prensa?', explanation: 'El ideal periodístico valora la imparcialidad y la presentación objetiva de los hechos. Sin embargo, en la práctica, los medios de comunicación son empresas con intereses económicos y, a veces, políticos. La elección de qué noticias cubrir (establecimiento de la agenda), el énfasis dado a ciertos temas y la línea editorial adoptada pueden influir en la percepción del público. El debate radica en diferenciar el periodismo profesional, que busca la pluralidad de fuentes y la verificación de hechos, de la propaganda o el activismo disfrazado de noticia.' },
        { id: 4, text: '¿Atacarán los Estados Unidos a Venezuela?', explanation: 'La política exterior de EE. UU. hacia Venezuela es objeto de un intenso debate. Por un lado, las sanciones económicas y la presión diplomática son las herramientas preferidas. Una intervención militar directa se considera de alto costo político, financiero y humano, y es públicamente descartada por muchos analistas. Por otro lado, la inestabilidad política en Venezuela, sus vastas reservas de petróleo y su proximidad geográfica con EE. UU. mantienen la "opción militar" como una posibilidad latente, aunque improbable, en el discurso de algunos sectores más radicales de la política estadounidense.' },
        { id: 5, text: '¿Es Bolsonaro elegible para 2026?', explanation: 'En junio de 2023, el Tribunal Superior Electoral (TSE) declaró al expresidente Jair Bolsonaro inelegible por ocho años, a contar desde las elecciones de 2022, por abuso de poder político y uso indebido de los medios de comunicación. La decisión se basó en una reunión con embajadores donde atacó el sistema electoral brasileño. Legalmente, no puede presentarse a elecciones hasta 2030. Su defensa todavía intenta revertir la decisión en instancias superiores, como el STF, pero el escenario actual es de inelegibilidad.' },
        { id: 6, text: '¿Debería Barroso sufrir sanciones Magnitsky?', explanation: 'La Ley Magnitsky es una disposición legal de EE. UU. que autoriza sanciones contra extranjeros involucrados en corrupción y violaciones de derechos humanos. La aplicación de sanciones al Ministro Luís Roberto Barroso, del STF, es una demanda de sectores críticos a su actuación, acusándolo de activismo judicial y decisiones que exceden sus funciones. Sin embargo, para que las sanciones se aplicaran, el gobierno de EE. UU. necesitaría realizar una investigación y concluir que existen pruebas sólidas de corrupción o violaciones graves de los derechos humanos, lo que hace que el escenario sea muy improbable y políticamente complejo.' },
        { id: 7, text: '¿Sería beneficioso para Brasil legalizar la marihuana para uso recreativo?', explanation: 'El debate sobre la legalización de la marihuana involucra argumentos sobre salud pública, seguridad, libertad individual y potencial recaudación de impuestos. Países como Canadá y Uruguay ya la han legalizado, ofreciendo datos sobre los impactos sociales y económicos de la medida, que continúan siendo analizados y debatidos globalmente.' },
        { id: 8, text: '¿Debería el voto en Brasil ser opcional en lugar de obligatorio?', explanation: 'El voto obligatorio en Brasil se defiende como un pilar de la democracia, garantizando una mayor participación popular. Los críticos, sin embargo, argumentan que el voto opcional mejoraría la calidad del electorado, compuesto por ciudadanos más comprometidos e informados, además de ser una expresión de libertad individual.' },
        { id: 9, text: '¿Son las cuotas raciales en universidades y concursos públicos una política justa?', explanation: 'Las cuotas son una política de acción afirmativa que busca corregir desigualdades históricas y promover la diversidad. Sus defensores la ven como una herramienta esencial para la inclusión, mientras que los opositores cuestionan su eficacia y argumentan que puede vulnerar el principio de meritocracia.' },
        { id: 10, text: '¿Reducir la edad de responsabilidad penal de 18 a 16 años disminuiría la criminalidad?', explanation: 'La propuesta de reducir la edad de responsabilidad penal es un tema recurrente en el debate público brasileño. Los partidarios creen que la medida frenaría la participación de jóvenes en delitos graves, mientras que los opositores advierten sobre los riesgos de superpoblar el sistema penitenciario y dificultar la rehabilitación, argumentando que la solución pasa por inversiones en educación y oportunidades.' }
    ]
};

// FIX: Replaced JSX with React.createElement to be compatible with .ts files.
export const curiositiesData = {
    pt: [
         {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#3DE8E8]"},
                React.createElement('path', {d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}), React.createElement('circle', {cx: "12", cy: "10", r: "3"}), React.createElement('line', {x1: "12", y1: "1", x2: "12", y2: "3"}), React.createElement('line', {x1: "12", y1: "17", x2: "12", y2: "23"}), React.createElement('line', {x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64"}), React.createElement('line', {x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78"}), React.createElement('line', {x1: "1", y1: "12", x2: "3", y2: "12"}), React.createElement('line', {x1: "21", y1: "12", x2: "23", y2: "12"}), React.createElement('line', {x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36"}), React.createElement('line', {x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22"})
            ),
            title: "O Território Que Ninguém Quer",
            text: "Bir Tawil, uma área de 2.060 km² na fronteira entre o Egito e o Sudão, é um dos únicos lugares na Terra não reivindicado por nenhum país. Devido a uma discrepância em mapas de fronteira coloniais, tanto o Egito quanto o Sudão reivindicam o território vizinho de Hala'ib (mais valioso), deixando Bir Tawil em um limbo legal."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#E83D84]"},
                React.createElement('path', {d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}), React.createElement('path', {d: "M12 10.5l-5.5 3 5.5 3 5.5-3z"}), React.createElement('path', {d: "M12 3.5v7"})
            ),
            title: "Países Sem Exército",
            text: "Mais de 20 países no mundo não possuem forças armadas. Entre eles estão Costa Rica, Islândia, Panamá, Vaticano e diversas nações insulares. A segurança desses países é garantida por forças policiais, acordos com nações maiores ou uma política de neutralidade histórica."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#A385E8]"},
                React.createElement('rect', {x: "2", y: "7", width: "20", height: "14", rx: "2", ry: "2"}), React.createElement('path', {d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}), React.createElement('line', {x1: "12", y1: "11", x2: "12", y2: "13"}), React.createElement('line', {x1: "10", y1: "15", x2: "14", y2: "15"})
            ),
            title: "A Capital Que se Move",
            text: "A nação insular de Palau está planejando 'mover' sua capital, Ngerulmud, para um local mais seguro. A capital atual é uma das menos populosas do mundo e está ameaçada pela elevação do nível do mar, um risco existencial para muitos países de baixa altitude no Pacífico."
        }
    ],
    en: [
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#3DE8E8]"},
                React.createElement('path', {d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}), React.createElement('circle', {cx: "12", cy: "10", r: "3"}), React.createElement('line', {x1: "12", y1: "1", x2: "12", y2: "3"}), React.createElement('line', {x1: "12", y1: "17", x2: "12", y2: "23"}), React.createElement('line', {x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64"}), React.createElement('line', {x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78"}), React.createElement('line', {x1: "1", y1: "12", x2: "3", y2: "12"}), React.createElement('line', {x1: "21", y1: "12", x2: "23", y2: "12"}), React.createElement('line', {x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36"}), React.createElement('line', {x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22"})
            ),
            title: "The Territory Nobody Wants",
            text: "Bir Tawil, a 2,060 km² area on the border between Egypt and Sudan, is one of the only places on Earth not claimed by any country. Due to a discrepancy in colonial border maps, both Egypt and Sudan claim the neighboring (more valuable) Hala'ib Triangle, leaving Bir Tawil in a legal limbo."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#E83D84]"},
                React.createElement('path', {d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}), React.createElement('path', {d: "M12 10.5l-5.5 3 5.5 3 5.5-3z"}), React.createElement('path', {d: "M12 3.5v7"})
            ),
            title: "Countries Without Armies",
            text: "Over 20 countries in the world have no armed forces. Among them are Costa Rica, Iceland, Panama, Vatican City, and various island nations. The security of these countries is guaranteed by police forces, agreements with larger nations, or a policy of historical neutrality."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#A385E8]"},
                React.createElement('rect', {x: "2", y: "7", width: "20", height: "14", rx: "2", ry: "2"}), React.createElement('path', {d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}), React.createElement('line', {x1: "12", y1: "11", x2: "12", y2: "13"}), React.createElement('line', {x1: "10", y1: "15", x2: "14", y2: "15"})
            ),
            title: "The Moving Capital",
            text: "The island nation of Palau is planning to 'move' its capital, Ngerulmud, to a safer location. The current capital is one of the least populous in the world and is threatened by rising sea levels, an existential risk for many low-lying countries in the Pacific."
        }
    ],
    es: [
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#3DE8E8]"},
                React.createElement('path', {d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}), React.createElement('circle', {cx: "12", cy: "10", r: "3"}), React.createElement('line', {x1: "12", y1: "1", x2: "12", y2: "3"}), React.createElement('line', {x1: "12", y1: "17", x2: "12", y2: "23"}), React.createElement('line', {x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64"}), React.createElement('line', {x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78"}), React.createElement('line', {x1: "1", y1: "12", x2: "3", y2: "12"}), React.createElement('line', {x1: "21", y1: "12", x2: "23", y2: "12"}), React.createElement('line', {x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36"}), React.createElement('line', {x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22"})
            ),
            title: "El Territorio Que Nadie Quiere",
            text: "Bir Tawil, un área de 2.060 km² en la frontera entre Egipto y Sudán, es uno de los únicos lugares en la Tierra no reclamado por ningún país. Debido a una discrepancia en los mapas fronterizos coloniales, tanto Egipto como Sudán reclaman el territorio vecino de Hala'ib (más valioso), dejando a Bir Tawil en un limbo legal."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#E83D84]"},
                React.createElement('path', {d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}), React.createElement('path', {d: "M12 10.5l-5.5 3 5.5 3 5.5-3z"}), React.createElement('path', {d: "M12 3.5v7"})
            ),
            title: "Países Sin Ejército",
            text: "Más de 20 países en el mundo no tienen fuerzas armadas. Entre ellos están Costa Rica, Islandia, Panamá, la Ciudad del Vaticano y varias naciones insulares. La seguridad de estos países está garantizada por fuerzas policiales, acuerdos con naciones más grandes o una política de neutralidad histórica."
        },
        {
            icon: React.createElement('svg', {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className: "w-8 h-8 mr-4 text-[#A385E8]"},
                React.createElement('rect', {x: "2", y: "7", width: "20", height: "14", rx: "2", ry: "2"}), React.createElement('path', {d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}), React.createElement('line', {x1: "12", y1: "11", x2: "12", y2: "13"}), React.createElement('line', {x1: "10", y1: "15", x2: "14", y2: "15"})
            ),
            title: "La Capital Que se Mueve",
            text: "La nación insular de Palaos está planeando 'mover' su capital, Ngerulmud, a un lugar más seguro. La capital actual es una de las menos pobladas del mundo y está amenazada por la elevación del nivel del mar, un riesgo existencial para muchos países de baja altitud en el Pacífico."
        }
    ]
};