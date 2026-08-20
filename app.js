const quiz = [
  { sentence: 'A strange thing _____ to me while I was walking home.', hint: '일어나다', answer: 'happened', choices: ['happened', 'reached', 'waited', 'belonged'] },
  { sentence: 'Please _____ the software on your computer.', hint: '갱신하다', answer: 'update', choices: ['replace', 'update', 'define', 'alter'] },
  { sentence: 'He _____ praise for his hard work.', hint: '~할 자격이 있다', answer: 'deserves', choices: ['asserts', 'deserves', 'suspects', 'owes'] },
  { sentence: 'We _____ heavy traffic because it was the holiday season.', hint: '예상하다', answer: 'anticipated', choices: ['organized', 'experienced', 'anticipated', 'determined'] },
  { sentence: 'The baby _____ slowly across the floor.', hint: '기어가다', answer: 'crawled', choices: ['attacked', 'hesitated', 'prayed', 'crawled'] }
];

let current = 0;
let locked = false;
let publishedNovel = null;
let publishedMock = null;
let dynamicQuiz = null;
let dynamicIndex = 0;
let dynamicScore = 0;
let dynamicLocked = false;
let dynamicBackScreen = 'home-screen';
const screens = document.querySelectorAll('.screen');
const title = document.getElementById('screen-title');
const titles = { 'home-screen': '오늘의 학습', 'school-screen': '학교별 내신', 'student-mock-screen': '기출유형 모의고사', 'word-set-screen': '단어 목록', 'word-screen': '단어 퀴즈', 'grammar-screen': 'Grammar', 'fridge-screen': 'Teacher’s Treat Fridge', 'novel-screen': 'Novel Study', 'mock-screen': '내신 모의고사', 'record-screen': '학습 기록' };

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
  else { awardSnack(); showToast('학습 완료! 원하는 간식을 직접 골라보세요.'); current = 0; openScreen('home-screen'); }
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

function renderNovelState() {
  const state = localStorage.getItem('mk-novel-gangsta-granny') || 'not-started';
  const badge = document.getElementById('novel-status');
  const progress = document.getElementById('novel-progress-bar');
  const text = document.getElementById('novel-progress-text');
  badge.className = `learning-status ${state}`;
  badge.textContent = state === 'completed' ? '학습 완료' : state === 'in-progress' ? '학습 중' : '학습 전';
  progress.style.width = state === 'completed' ? '100%' : state === 'in-progress' ? '20%' : '0%';
  const total = publishedNovel?.question_count || 20;
  text.textContent = state === 'completed' ? `${total}문제를 모두 완료했어요.` : state === 'in-progress' ? `${Math.max(1, Math.floor(total * .2))} / ${total}문제 학습 중` : '아직 학습하지 않았어요.';
}

document.getElementById('start-novel').addEventListener('click', async () => {
  if (!publishedNovel) return showToast('관리자에서 문제와 정답 파일을 다시 업로드해 주세요.');
  localStorage.setItem('mk-novel-gangsta-granny', 'in-progress');
  renderNovelState();
  await startDynamicQuiz(publishedNovel, 'novel-screen');
});

renderNovelState();

const snacks = [
  ['🍲','떡볶이'],['🥭','망고'],['🍉','수박'],['🍦','아이스크림'],['🍫','초콜릿'],
  ['🥤','콜라'],['🧃','주스'],['🌭','소시지'],['🍕','피자'],['🍪','쿠키']
];

function chosenSnacks() {
  try {
    return JSON.parse(localStorage.getItem('mk-chosen-snacks') || '[]').filter(index => Number.isInteger(index) && index >= 0 && index < snacks.length);
  } catch {
    return [];
  }
}

function pendingRewards() {
  return Math.max(0, Number(localStorage.getItem('mk-pending-snack-rewards') || 0));
}

function migrateOldRewards() {
  const legacy = Math.min(Number(localStorage.getItem('mk-earned-snacks') || 0), snacks.length);
  if (legacy > 0 && chosenSnacks().length === 0) {
    localStorage.setItem('mk-pending-snack-rewards', String(pendingRewards() + legacy));
  }
  localStorage.removeItem('mk-earned-snacks');
}

function renderFridge() {
  const chosen = chosenSnacks();
  document.getElementById('fridge-summary').textContent = `${chosen.length} / ${snacks.length} 획득`;
  const preview = document.getElementById('preview-snacks');
  const previewItems = chosen.slice(-4).map(index => snacks[index]);
  preview.innerHTML = [...previewItems, ...Array(Math.max(0, 4 - previewItems.length)).fill(['?',''])].map(([emoji]) => `<span class="${emoji === '?' ? 'locked' : ''}">${emoji}</span>`).join('');
  const grid = document.getElementById('fridge-grid');
  grid.innerHTML = snacks.map(([emoji, name], index) => `<div class="snack-slot ${chosen.includes(index) ? '' : 'locked'}"><span class="snack-emoji">${emoji}</span><strong>${name}</strong><small>${chosen.includes(index) ? '내가 고른 간식' : '미획득'}</small></div>`).join('');
  const next = document.getElementById('next-reward');
  next.textContent = chosen.length === snacks.length ? 'Amazing! 냉장고의 모든 간식을 모았어요!' : '학습 세트를 완료하면 10개 중 원하는 간식을 직접 선택할 수 있어요.';
  const pendingButton = document.getElementById('open-snack-picker');
  pendingButton.classList.toggle('hidden', pendingRewards() === 0 || chosen.length === snacks.length);
  pendingButton.textContent = `받지 않은 간식 보상 ${pendingRewards()}개 고르기`;
}

function awardSnack() {
  if (chosenSnacks().length >= snacks.length) return;
  localStorage.setItem('mk-pending-snack-rewards', String(pendingRewards() + 1));
  renderFridge();
  openSnackPicker();
}

function openSnackPicker() {
  if (pendingRewards() < 1 || chosenSnacks().length >= snacks.length) return;
  const chosen = chosenSnacks();
  document.getElementById('snack-picker-message').textContent = `받을 수 있는 보상 ${pendingRewards()}개 · 원하는 간식을 선택하세요.`;
  const choices = document.getElementById('snack-choice-grid');
  choices.replaceChildren();
  snacks.forEach(([emoji, name], index) => {
    const button = document.createElement('button');
    button.className = 'snack-choice';
    button.disabled = chosen.includes(index);
    button.innerHTML = `<span>${emoji}</span><strong>${chosen.includes(index) ? `${name} · 획득 완료` : name}</strong>`;
    button.onclick = () => chooseSnack(index);
    choices.appendChild(button);
  });
  document.getElementById('snack-picker').classList.remove('hidden');
}

function chooseSnack(index) {
  const chosen = chosenSnacks();
  if (chosen.includes(index) || pendingRewards() < 1) return;
  chosen.push(index);
  localStorage.setItem('mk-chosen-snacks', JSON.stringify(chosen));
  localStorage.setItem('mk-pending-snack-rewards', String(Math.max(0, pendingRewards() - 1)));
  renderFridge();
  showToast(`${snacks[index][0]} ${snacks[index][1]} 획득! 쌤이 쏜다!`);
  if (pendingRewards() > 0 && chosen.length < snacks.length) openSnackPicker();
  else document.getElementById('snack-picker').classList.add('hidden');
}

document.getElementById('review-wrong').addEventListener('click', () => {
  showToast('저장된 Grammar 오답 4문제를 다시 시작합니다.');
});

migrateOldRewards();
renderFridge();
document.getElementById('open-snack-picker').onclick = openSnackPicker;
document.getElementById('snack-picker-later').onclick = () => document.getElementById('snack-picker').classList.add('hidden');

function showPublishedMock(mock) {
  document.getElementById('mock-empty').classList.add('hidden');
  document.getElementById('published-mock-card').classList.remove('hidden');
  document.getElementById('published-mock-title').textContent = mock.title;
  document.getElementById('published-mock-meta').textContent = `${mock.question_count}문제 · 새 시험`;
  document.getElementById('student-mock-title').textContent = mock.title;
  document.getElementById('student-mock-count').textContent = `${mock.question_count}문제`;
}

async function loadPublishedContents() {
  try {
    const response = await fetch('/api/contents?status=published');
    if (!response.ok) throw new Error('API unavailable');
    const { items } = await response.json();
    publishedNovel = items.find(item => item.kind === 'novel_quiz' && item.book === 'Gangsta Granny') || items.find(item => item.kind === 'novel_quiz') || null;
    publishedMock = items.find(item => item.kind === 'mock_exam' && item.school === '세화여중') || items.find(item => item.kind === 'mock_exam') || null;
    if (publishedNovel) {
      document.querySelector('.novel-book-card h3').textContent = publishedNovel.book || publishedNovel.title;
      document.querySelector('.novel-book-card p').textContent = `관리자 등록 · 독해 ${publishedNovel.question_count}문제`;
      document.getElementById('start-novel').textContent = `${publishedNovel.question_count}문제 시작하기`;
      renderNovelState();
    }
    if (publishedMock) showPublishedMock(publishedMock);
  } catch {
    showToast('서버 연결이 필요합니다. start-app.cmd로 실행해 주세요.');
  }
}

async function startDynamicQuiz(summary, backScreen) {
  try {
    const response = await fetch(`/api/contents/${summary.id}`);
    const content = await response.json();
    if (!response.ok) throw new Error(content.error || '퀴즈를 불러오지 못했습니다.');
    if (!content.questions?.length) throw new Error('인식된 문제와 정답이 없습니다. 관리자 검수가 필요합니다.');
    dynamicQuiz = content;
    dynamicIndex = 0;
    dynamicScore = 0;
    dynamicBackScreen = backScreen;
    openScreen('dynamic-quiz-screen');
    renderDynamicQuestion();
  } catch (error) {
    showToast(error.message);
  }
}

function renderDynamicQuestion() {
  const question = dynamicQuiz.questions[dynamicIndex];
  dynamicLocked = false;
  document.getElementById('dynamic-quiz-title').textContent = dynamicQuiz.title;
  document.getElementById('dynamic-quiz-kind').textContent = dynamicQuiz.kind === 'mock_exam' ? 'MOCK EXAM' : dynamicQuiz.kind === 'grammar_quiz' ? 'GRAMMAR' : 'READING QUIZ';
  document.getElementById('dynamic-question-count').textContent = `${dynamicIndex + 1} / ${dynamicQuiz.questions.length}`;
  document.getElementById('dynamic-progress-bar').style.width = `${((dynamicIndex + 1) / dynamicQuiz.questions.length) * 100}%`;
  document.getElementById('dynamic-question-text').textContent = question.prompt;
  document.getElementById('dynamic-feedback').textContent = '';
  const next = document.getElementById('next-dynamic-question');
  next.disabled = true;
  next.textContent = dynamicIndex === dynamicQuiz.questions.length - 1 ? '결과 보기' : '다음 문제';
  const choices = document.getElementById('dynamic-choices');
  const shortArea = document.getElementById('dynamic-short-answer');
  choices.replaceChildren();
  document.getElementById('dynamic-answer-input').value = '';
  if (question.choices.length) {
    shortArea.classList.add('hidden');
    question.choices.forEach(choice => {
      const button = document.createElement('button');
      button.className = 'choice';
      button.textContent = choice;
      button.onclick = () => answerDynamic(button, choice);
      choices.appendChild(button);
    });
  } else {
    shortArea.classList.remove('hidden');
  }
}

function normalizeAnswer(value) {
  return String(value).trim().toLowerCase().replace(/[.!?]/g, '');
}

function matchesAnswer(value, expected) {
  return value === expected || value.startsWith(`${expected}) `) || value.startsWith(`${expected}. `);
}

function answerDynamic(button, value) {
  if (dynamicLocked) return;
  dynamicLocked = true;
  const question = dynamicQuiz.questions[dynamicIndex];
  const selected = normalizeAnswer(value);
  const expected = normalizeAnswer(question.answer);
  const correct = matchesAnswer(selected, expected);
  if (correct) dynamicScore += 1;
  document.querySelectorAll('#dynamic-choices .choice').forEach(option => {
    option.disabled = true;
    const optionValue = normalizeAnswer(option.textContent);
    if (matchesAnswer(optionValue, expected)) option.classList.add('correct');
  });
  if (button && !correct) button.classList.add('wrong');
  document.getElementById('dynamic-feedback').textContent = correct ? `정답이에요! ${question.explanation}` : `정답: ${question.answer} · ${question.explanation}`;
  document.getElementById('next-dynamic-question').disabled = false;
}

document.getElementById('submit-dynamic-answer').onclick = () => {
  const input = document.getElementById('dynamic-answer-input');
  if (!input.value.trim()) return;
  answerDynamic(null, input.value);
};

document.getElementById('next-dynamic-question').onclick = () => {
  if (dynamicIndex < dynamicQuiz.questions.length - 1) {
    dynamicIndex += 1;
    renderDynamicQuestion();
    return;
  }
  if (dynamicQuiz.kind === 'novel_quiz') {
    localStorage.setItem('mk-novel-gangsta-granny', 'completed');
    renderNovelState();
  }
  awardSnack();
  showToast(`${dynamicQuiz.questions.length}문제 완료 · ${dynamicScore}개 정답 · 원하는 간식을 골라보세요!`);
  openScreen(dynamicBackScreen);
};

document.getElementById('dynamic-quiz-back').onclick = () => openScreen(dynamicBackScreen);
document.getElementById('start-published-mock').addEventListener('click', async () => {
  if (!publishedMock) return showToast('배포된 모의고사가 없습니다.');
  await startDynamicQuiz(publishedMock, 'school-screen');
});

loadPublishedContents();

renderQuestion();
