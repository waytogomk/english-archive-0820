const pages = document.querySelectorAll('.page');
const nav = document.querySelectorAll('nav button');
const titles = { home: '대시보드', school: '학교별 내신', grammar: 'Grammar', novel: 'Novel Study' };
const uploadModal = document.getElementById('upload-modal');
const quizModal = document.getElementById('quiz-modal');

function go(name) {
  pages.forEach(page => page.classList.toggle('active', page.id === `${name}-page`));
  nav.forEach(button => button.classList.toggle('active', button.dataset.page === name));
  document.getElementById('title').textContent = titles[name];
}
function toast(message) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 2200);
}
function openUpload(name) {
  uploadModal.classList.remove('hidden');
  document.getElementById('upload-title').textContent = `${name} 업로드`;
  document.getElementById('source-name').value = name;
  document.getElementById('save-upload').dataset.exam = name === '기출문제 PDF' ? 'true' : '';
}
function bindActions() {
  document.querySelectorAll('[data-upload]').forEach(button => button.onclick = () => openUpload(button.dataset.upload));
  document.querySelectorAll('[data-quiz]').forEach(button => {
    button.onclick = () => {
      quizModal.classList.remove('hidden');
      document.getElementById('quiz-title').textContent = `${button.dataset.quiz} 퀴즈 설정`;
      const count = document.getElementById('quiz-count');
      const isGrammar = Boolean(button.closest('#topics'));
      count.value = isGrammar ? '15문제' : '5문제';
      count.disabled = isGrammar;
    };
  });
}
function bindSchool(button) {
  button.onclick = () => {
    document.querySelectorAll('#schools button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('school-name').textContent = button.textContent;
  };
}
nav.forEach(button => button.onclick = () => go(button.dataset.page));
document.querySelectorAll('[data-go]').forEach(button => button.onclick = () => go(button.dataset.go));
document.querySelectorAll('#schools button').forEach(bindSchool);
bindActions();
document.querySelector('.close').onclick = () => uploadModal.classList.add('hidden');
document.querySelector('.close-quiz').onclick = () => quizModal.classList.add('hidden');
document.getElementById('source-file').onchange = event => {
  document.getElementById('file-state').textContent = `${event.target.files.length}개 파일 선택됨`;
};
document.getElementById('save-upload').onclick = () => {
  if (!document.getElementById('source-file').files.length) return toast('파일을 선택해 주세요.');
  uploadModal.classList.add('hidden');
  const isExam = document.getElementById('save-upload').dataset.exam === 'true';
  toast(isExam ? 'PDF 문항 수를 분석 중입니다. 동일한 문항 수로 생성됩니다.' : '자료를 등록했습니다. 분석 후 검수할 수 있습니다.');
};
document.getElementById('save-quiz').onclick = () => {
  quizModal.classList.add('hidden');
  toast(`${document.getElementById('quiz-count').value} 퀴즈 초안을 만들었습니다.`);
};
document.getElementById('add-school').onclick = () => {
  const name = prompt('학교 이름');
  if (!name) return;
  const button = document.createElement('button');
  button.textContent = name;
  document.getElementById('schools').appendChild(button);
  bindSchool(button);
};
document.getElementById('add-topic').onclick = () => {
  const name = prompt('문법 아이템 이름');
  if (!name) return;
  const article = document.createElement('article');
  article.innerHTML = `<b>${name}</b><span>15문제 퀴즈</span><button data-quiz="${name}">퀴즈 설정</button><button data-upload="${name} 문법 프린트">자료 추가</button>`;
  document.getElementById('topics').appendChild(article);
  bindActions();
};
document.getElementById('add-book').onclick = () => {
  const name = prompt('책 제목');
  if (!name) return;
  const article = document.createElement('article');
  article.innerHTML = `<span class="cover">NEW</span><div><b>${name}</b><small>Chapter 자료 미등록</small></div><button data-quiz="${name}">퀴즈 설정</button><button data-upload="${name} 자료">자료 추가</button>`;
  document.getElementById('books').appendChild(article);
  bindActions();
};
