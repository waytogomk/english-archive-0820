const quiz = [
  { sentence: 'A strange thing _____ to me while I was walking home.', hint: '일어나다', answer: 'happened', choices: ['happened', 'reached', 'waited', 'belonged'] },
  { sentence: 'Please _____ the software on your computer.', hint: '갱신하다', answer: 'update', choices: ['replace', 'update', 'define', 'alter'] },
  { sentence: 'He _____ praise for his hard work.', hint: '~할 자격이 있다', answer: 'deserves', choices: ['asserts', 'deserves', 'suspects', 'owes'] },
  { sentence: 'We _____ heavy traffic because it was the holiday season.', hint: '예상하다', answer: 'anticipated', choices: ['organized', 'experienced', 'anticipated', 'determined'] },
  { sentence: 'The baby _____ slowly across the floor.', hint: '기어가다', answer: 'crawled', choices: ['attacked', 'hesitated', 'prayed', 'crawled'] }
];

let current = 0;
let locked = false;
const screens = document.querySelectorAll('.screen');
const title = document.getElementById('screen-title');
const titles = { 'home-screen': '오늘의 학습', 'word-set-screen': '단어 목록', 'word-screen': '단어 퀴즈', 'mock-screen': '내신 모의고사', 'record-screen': '학습 기록' };

function openScreen(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  document.querySelectorAll('.bottom-nav button').forEach(button => button.classList.toggle('active', button.dataset.open === id));
  title.textContent = titles[id];
  document.querySelector('.topbar').style.display = id === 'home-screen' ? 'flex' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'word-screen') renderQuestion();
}

document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openScreen(button.dataset.open)));

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2300);
}

document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));

function renderQuestion() {
  const item = quiz[current];
  locked = false;
  document.getElementById('question-count').textContent = `${current + 1} / ${quiz.length}`;
  document.getElementById('quiz-progress-bar').style.width = `${((current + 1) / quiz.length) * 100}%`;
  document.getElementById('question-text').textContent = item.sentence;
  document.getElementById('question-hint').textContent = `뜻: ${item.hint}`;
  document.getElementById('feedback').textContent = '';
  const next = document.getElementById('next-question');
  next.disabled = true;
  next.textContent = current === quiz.length - 1 ? '결과 보기' : '다음 문제';
  const choices = document.getElementById('choices');
  choices.replaceChildren();
  item.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.textContent = choice;
    button.addEventListener('click', () => answerQuestion(button, choice));
    choices.appendChild(button);
  });
}

function answerQuestion(button, choice) {
  if (locked) return;
  locked = true;
  const item = quiz[current];
  document.querySelectorAll('.choice').forEach(option => {
    option.disabled = true;
    if (option.textContent === item.answer) option.classList.add('correct');
  });
  const correct = choice === item.answer;
  if (!correct) button.classList.add('wrong');
  document.getElementById('feedback').textContent = correct ? '정답이에요! 문장 속 쓰임도 기억해 두세요.' : `정답은 “${item.answer}”예요. 오답노트에 저장했어요.`;
  document.getElementById('next-question').disabled = false;
}

document.getElementById('next-question').addEventListener('click', () => {
  if (current < quiz.length - 1) { current += 1; renderQuestion(); }
  else { showToast('5문제를 완료했어요. 기록에 저장했습니다.'); current = 0; openScreen('home-screen'); }
});

document.getElementById('exam-file').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('file-name').textContent = file.name;
  document.getElementById('upload-card').classList.add('hidden');
  document.getElementById('analysis-panel').classList.remove('hidden');
  showToast('시험지 구조 분석이 완료됐어요.');
});

document.getElementById('generate-button').addEventListener('click', event => {
  event.currentTarget.textContent = '초안 생성 완료 · 검수 화면 열기';
  showToast('25문항 초안을 만들었어요. 정답과 해설을 검수해 주세요.');
});

renderQuestion();
