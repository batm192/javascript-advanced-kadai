// 変数の初期化
let untyped = '';
let typed = '';
let score = '0';

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeScore = document.getElementById('typeScore');

const textLists = [
  'Hello World',
  'This is my App',
  'How are you?',
  'Today is sunny',
  'I love JavaScript!',
  'Good morning',
  'I am Japanese',
  'Let it be',
  'Samurai',
  'Typing Game',
  'Information Technology',
  'I want to be a programmer',
  'What day is today?',
  'I want to build a web app',
  'Nice to meet you',
  'Chrome Firefox Edge Safari',
  'machine learning',
  'Brendan Eich',
  'John Resig',
  'React Vue Angular',
  'Netscape Communications',
  'undefined null NaN',
  'Thank you very much',
  'Google Apple Facebook Amazon',
  'ECMAScript',
  'console.log',
  'for while if switch',
  'var let const',
  'Windows Mac Linux iOS Android',
  'programming',
];

const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// Math.random:0~1未満までのランダムなfloatを返す。
// float 浮動小数点型　int 整数型
// floorは小数点以下を切り捨てるメソッドfloor();

const keyPress = (e) => {
  //誤タイプの場合
  //returnを記載してpressKeyが誤ている場合は何も値をreturnしない
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped'); //誤ったタイプをした場合は.wrapの要素に.mistypedを追加
    //100ms後に背景色をもとに戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  //正タイプの場合
  wrap.classList.remove('mistyped');
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  //テキストが無くなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
  //スコア進捗に反映
  typeScore.textContent = score;
};
// substring(抽出の最初の位置, ここに指定した値の前までを抽出)
// ex. substring(0,1)
// substring(これ以降の値を抽出する)
// substring(1)

const rankCheck = (score) => {
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはaです。\nAランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます。`;
  }
  return `${score}文字うてました！\n${text}\n【OK】リトライ/【キャンセル】終了`;
};
// テンプレートリテラルで文字列を囲った場合、文字列内に${変数名}と記述することで、
// 文字列内に変数を埋め込むことができます。上記のコードでは、変数scoreに代入されている値
// が文字列として埋め込まれます。

//GameOver(ゲームの終了)を作る
const gameOver = (id) => {
  clearInterval(id);
  const result = confirm(rankCheck(score));
  //confirm ()メソッド OK キャンセルのダイアログ表示引数は文字列　OK=true キャンセル=false
  if (result == true) {
    window.location.reload();
  }
};

//カウントダウンタイマー
const timer = () => {
  //タイマー部分のHTML要素（P要素）を取得する
  let time = count.textContent;
  const id = setInterval(() => {
    //カウントダウンする
    time--;
    count.textContent = time;

    //カウント0になったらタイマーを止める
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click', () => {
  //カウントダウンタイマーを開始する
  timer();
  //startをクリックしたらランダムなテキストを表示
  createText();
  //スタートボタンを非表示にする
  start.style.display = 'none';
  //キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
