const projects = [
  {name:'Pulso',repo:'Pulso',category:'ferramentas',kind:'BEM-ESTAR',description:'Uma experiência digital para acompanhar treinos e manter o ritmo.',tint:'#dce6da'},
  {name:'Tabela Periódica',repo:'Tabela-Periodica',category:'explorar',kind:'QUÍMICA',description:'Uma tabela interativa para explorar os elementos e suas propriedades.',tint:'#dce4f0'},
  {name:'Doodle Chemistry Lab',repo:'Doodle-Chemistry-Lab',category:'jogos',kind:'JOGO · QUÍMICA',description:'Combine elementos e experimente novas descobertas em um laboratório criativo.',tint:'#e9dded'},
  {name:'Sistema Solar 3D',repo:'Sistema_Solar_3D',category:'explorar',kind:'ESPAÇO',description:'Uma representação visual dos planetas em movimento pelo sistema solar.',tint:'#dedfea'},
  {name:'Países do Mundo',repo:'Paises-do-Mundo',category:'explorar',kind:'GEOGRAFIA',description:'Uma viagem interativa para conhecer países e curiosidades do mundo.',tint:'#dce9e5'},
  {name:'Nightfall',repo:'Nightfall',category:'jogos',kind:'JOGO · SOBREVIVÊNCIA',description:'Escolha um lado entre humanos e vampiros e descubra quem sobrevive.',tint:'#ded9e2'},
  {name:'Xadrez',repo:'Xadrez',category:'jogos',kind:'JOGO · ESTRATÉGIA',description:'Um tabuleiro digital para partidas de xadrez direto no navegador.',tint:'#e6dfd2'},
  {name:'Damas',repo:'Damas',category:'jogos',kind:'JOGO · ESTRATÉGIA',description:'Desafie sua estratégia em uma partida clássica de damas.',tint:'#e8dedd'},
  {name:'Tetris',repo:'Tetris',category:'jogos',kind:'JOGO · ARCADE',description:'Encaixe as peças, complete linhas e mantenha o ritmo neste clássico.',tint:'#dde3ed'},
  {name:'Solitaire',repo:'Solitaire',category:'jogos',kind:'JOGOS DE CARTAS',description:'Uma coleção de jogos de paciência para uma pausa tranquila.',tint:'#e7e1d1'},
  {name:'Poker Texas Hold’em',repo:'Poker-Texas-Hold-em',category:'jogos',kind:'JOGO · CARTAS',description:'Uma mesa de poker no navegador para jogar e testar suas decisões.',tint:'#d9e4d9'},
  {name:'Pacman',repo:'Pacman',category:'jogos',kind:'JOGO · ARCADE',description:'Uma releitura de Pac-Man para revisitar a diversão dos fliperamas.',tint:'#eee5c9'},
  {name:'Jogo da Cobrinha',repo:'Jogo-da-Cobrinha',category:'jogos',kind:'JOGO · ARCADE',description:'Guie a cobrinha, colete pontos e tente bater seu próprio recorde.',tint:'#dce6d7'},
  {name:'Asteroids',repo:'Jogo-Asteroids',category:'jogos',kind:'JOGO · ARCADE',description:'Pilote pelo espaço e desvie dos asteroides nesta aventura arcade.',tint:'#e1e0eb'},
  {name:'Sudoku',repo:'Jogo-Sudoku',category:'jogos',kind:'JOGO · LÓGICA',description:'Um desafio de lógica para preencher a grade número por número.',tint:'#dce3e9'},
  {name:'Calculadora',repo:'Calculadora',category:'ferramentas',kind:'ACESSIBILIDADE',description:'Projeto de acessibilidade para pessoas daltônicas, disléxicas e com problemas de visão.',tint:'#e9e0d6'},
];

const grid = document.querySelector('#project-grid');
const count = document.querySelector('#visible-count');
const pageUrl = repo => `https://andreborges64.github.io/${repo}/`;
const screenshotUrl = url => `https://image.thum.io/get/width/1000/crop/680/noanimate/${url}`;

function render(filter = 'todos') {
  const visible = projects.filter(project => filter === 'todos' || project.category === filter);
  count.textContent = String(visible.length).padStart(2, '0');
  grid.innerHTML = visible.map((project, index) => {
    const url = pageUrl(project.repo);
    return `<article class="project-card" style="--card-tint:${project.tint}">
      <a class="project-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${project.name} em uma nova aba">
        <div class="preview"><img src="${screenshotUrl(url)}" alt="Captura da tela principal de ${project.name}" loading="lazy" onerror="this.style.opacity='0'"><span class="preview-label">${project.kind}</span><span class="preview-arrow" aria-hidden="true">↗</span></div>
        <div class="card-info"><h3 class="card-title">${project.name}</h3><span class="card-number">${String(projects.indexOf(project)+1).padStart(2,'0')}</span><p class="card-description">${project.description}</p><span class="card-tag">${project.repo}</span></div>
      </a></article>`;
  }).join('');
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.is-active')?.classList.remove('is-active');
  document.querySelector('.filter[aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
  button.classList.add('is-active');
  button.setAttribute('aria-pressed', 'true');
  render(button.dataset.filter);
}));

render();

const projectsSection = document.querySelector('#projetos');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let rayFrame = 0;

function moveBackgroundRays() {
  rayFrame = 0;
  if (reduceMotion.matches) return;
  const bounds = projectsSection.getBoundingClientRect();
  const travel = Math.max(bounds.height - window.innerHeight, 1);
  const progress = Math.min(1, Math.max(0, -bounds.top / travel));
  const centered = (progress - .5) * 90;
  projectsSection.style.setProperty('--ray-shift-x', `${centered}px`);
  projectsSection.style.setProperty('--ray-shift-y', `${(progress - .5) * -54}px`);
  projectsSection.style.setProperty('--ray-shift-x-reverse', `${centered * -.72}px`);
  projectsSection.style.setProperty('--ray-shift-y-reverse', `${(progress - .5) * 42}px`);
}

function queueRayMove() {
  if (!rayFrame) rayFrame = window.requestAnimationFrame(moveBackgroundRays);
}

window.addEventListener('scroll', queueRayMove, { passive: true });
window.addEventListener('resize', queueRayMove, { passive: true });
moveBackgroundRays();
