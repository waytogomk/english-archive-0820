const pages = document.querySelectorAll('.page');
const nav = document.querySelectorAll('nav button');
const titles = { home: '대시보드', school: '학교별 내신', grammar: 'Grammar', novel: 'Novel Study' };
const uploadModal = document.getElementById('upload-modal');
const quizModal = document.getElementById('quiz-modal');
let currentUploadName = '';
let currentQuizName = '';
let currentQuizIsGrammar = false;

function go(name) {
  pages.forEach(page => page.classList.toggle('active', page.id === `${name}-page`));
  nav.forEach(button => button.classList.toggle('active', button.dataset.page === name));
  document.getElementById('title').textContent = titles[name];
}

function toast(message, duration = 3000) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), duration);
}

async function api(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || '서버 요청에 실패했습니다.');
  return payload;
}

function openUpload(name) {
  currentUploadName = name;
  uploadModal.classList.remove('hidden');
  document.getElementById('upload-title').textContent = `${name} 업로드`;
  document.getElementById('source-name').value = name;
  document.getElementById('source-file').value = '';
  document.getElementById('file-state').textContent = '눌러서 파일을 선택하세요';
}

function uploadDescriptor(name) {
  const school = document.getElementById('school-name').textContent;
  if (name === '학교 어휘 자료') return { kind: 'vocabulary_source', school, source_role: 'vocabulary' };
  if (name === '학교 문법 프린트') return { kind: 'school_grammar_source', school, source_role: 'school_grammar' };
  if (name === '기출문제 PDF') return { kind: 'exam_source', school, source_role: 'past_exam' };
  if (name === '교과서 시험범위 지문') return { kind: 'textbook_source', school, source_role: 'textbook_range' };
  if (name.endsWith('문법 프린트')) return { kind: 'grammar_source', topic: name.replace(/ 문법 프린트$/, ''), source_role: 'grammar_print' };
  if (name.endsWith('자료')) return { kind: 'novel_quiz', book: name.replace(/ 자료$/, ''), source_role: 'reading_quiz' };
  return { kind: 'source', source_role: 'reference' };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function bindActions() {
  document.querySelectorAll('[data-upload]').forEach(button => button.onclick = () => openUpload(button.dataset.upload));
  document.querySelectorAll('[data-toast]').forEach(button => button.onclick = () => toast(button.dataset.toast));
  document.querySelectorAll('[data-quiz]').forEach(button => {
    button.onclick = () => {
      currentQuizName = button.dataset.quiz;
      currentQuizIsGrammar = Boolean(button.closest('#topics'));
      quizModal.classList.remove('hidden');
      document.getElementById('quiz-title').textContent = `${currentQuizName} 퀴즈 설정`;
      const count = document.getElementById('quiz-count');
      count.value = currentQuizIsGrammar ? '15문제' : '5문제';
      count.disabled = currentQuizIsGrammar;
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

async function loadSavedContents() {
  const container = document.getElementById('saved-content-list');
  try {
    const { items } = await api('/api/contents');
    container.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('p');
      empty.textContent = '아직 영구 저장된 자료가 없습니다.';
      container.appendChild(empty);
      return;
    }
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'saved-row';
      const info = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = item.title;
      const meta = document.createElement('small');
      meta.textContent = `${item.kind} · ${item.question_count}문제 · v${item.version}${item.school ? ` · ${item.school}` : ''}${item.book ? ` · ${item.book}` : ''}`;
      info.append(title, meta);
      const actions = document.createElement('div');
      actions.className = 'saved-actions';
      const status = document.createElement('span');
      status.className = `saved-status ${item.status}`;
      status.textContent = item.status === 'published' ? '배포 중' : item.status === 'review' ? '검수 필요' : '초안';
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.onclick = async () => {
        const nextTitle = prompt('자료 제목 수정', item.title);
        if (!nextTitle || nextTitle === item.title) return;
        try {
          await api(`/api/contents/${item.id}`, { method: 'PUT', body: JSON.stringify({ title: nextTitle }) });
          toast('제목을 수정했습니다.');
          loadSavedContents();
        } catch (error) {
          toast(error.message, 5000);
        }
      };
      actions.append(status, edit);
      if (item.status !== 'published' && item.question_count > 0) {
        const publish = document.createElement('button');
        publish.textContent = '배포';
        publish.onclick = async () => {
          try {
            await api(`/api/contents/${item.id}/publish`, { method: 'POST', body: '{}' });
            toast('학생 앱에 배포했습니다.');
            loadSavedContents();
          } catch (error) {
            toast(error.message, 5000);
          }
        };
        actions.appendChild(publish);
      }
      row.append(info, actions);
      container.appendChild(row);
    });
  } catch (error) {
    container.textContent = error.message;
  }
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

document.getElementById('save-upload').onclick = async event => {
  const files = [...document.getElementById('source-file').files];
  if (!files.length) return toast('파일을 선택해 주세요.');
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = '저장 및 분석 중…';
  try {
    const descriptor = uploadDescriptor(currentUploadName);
    const baseTitle = document.getElementById('source-name').value.trim() || currentUploadName;
    const results = [];
    for (const file of files) {
      const result = await api('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          ...descriptor,
          title: files.length > 1 ? `${baseTitle} - ${file.name}` : baseTitle,
          filename: file.name,
          mime_type: file.type,
          data_base64: await fileToBase64(file)
        })
      });
      results.push(result);
    }
    uploadModal.classList.add('hidden');
    const parsed = results.reduce((sum, result) => sum + result.parsed_questions, 0);
    const chars = results.reduce((sum, result) => sum + result.extracted_characters, 0);
    toast(`영구 저장 완료 · ${chars.toLocaleString()}자 추출 · ${parsed}문제 인식`, 4500);
    loadSavedContents();
  } catch (error) {
    toast(error.message, 5000);
  } finally {
    button.disabled = false;
    button.textContent = '업로드하고 분석';
  }
};

document.getElementById('save-quiz').onclick = async event => {
  if (!currentQuizIsGrammar) {
    quizModal.classList.add('hidden');
    toast('Novel Study는 업로드된 문제 수와 정답을 그대로 사용합니다.');
    return;
  }
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = '15문제 생성 중…';
  try {
    const result = await api('/api/generate', { method: 'POST', body: JSON.stringify({ type: 'grammar', topic: currentQuizName }) });
    await api(`/api/contents/${result.item.id}/publish`, { method: 'POST', body: '{}' });
    quizModal.classList.add('hidden');
    toast(`${currentQuizName} 15문제를 생성해 학생 앱에 배포했습니다.`, 4500);
    loadSavedContents();
  } catch (error) {
    toast(error.message, 5000);
  } finally {
    button.disabled = false;
    button.textContent = '퀴즈 만들기';
  }
};

document.getElementById('publish-mock').onclick = async event => {
  const school = document.getElementById('school-name').textContent;
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = '문항 생성 중…';
  try {
    const result = await api('/api/generate', { method: 'POST', body: JSON.stringify({ type: 'mock_exam', school }) });
    const published = await api(`/api/contents/${result.item.id}/publish`, { method: 'POST', body: '{}' });
    document.getElementById('publish-note').textContent = `학생 앱 배포 완료 · ${published.question_count}문제`;
    toast('유사 모의고사를 생성해 학생 앱에 배포했습니다.', 4500);
    loadSavedContents();
  } catch (error) {
    toast(error.message, 6000);
  } finally {
    button.disabled = false;
    button.textContent = '유사 모의고사 생성 및 배포';
  }
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
  article.innerHTML = `<span class="cover mint-cover" aria-hidden="true"><svg viewBox="0 0 48 60"><path d="M8 7h28a6 6 0 0 1 6 6v40H14a6 6 0 0 1-6-6Z"/><circle cx="20" cy="29" r="2"/><circle cx="31" cy="29" r="2"/><path d="M20 38c3 3 8 3 11 0M13 7v46"/></svg></span><div><b>${name}</b><small>Chapter 자료 미등록</small></div><button data-quiz="${name}">퀴즈 설정</button><button data-upload="${name} 자료">자료 추가</button>`;
  document.getElementById('books').appendChild(article);
  bindActions();
};

api('/api/health').catch(() => toast('start-app.cmd로 서버를 실행해 주세요.', 6000));
document.getElementById('refresh-content').onclick = loadSavedContents;
loadSavedContents();
