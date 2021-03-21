// window.onload = function() {
//   AudioRecord();
// }

const chatMessages = document.querySelector('.messages-box');
const message = document.getElementById('message');
const sendMessage = document.getElementById('sendMessage');
const openButton = document.getElementById('open-button');
const closeButton = document.getElementById('close-button')

openButton.onclick = function () {
  document.getElementById("myForm").style.display = "block";
  openButton.style.display = "none"
}

closeButton.onclick = function() {
  document.getElementById("myForm").style.display = "none";
  openButton.style.display = "block"


}

window.onload = function AudioRecord() {

  const record = document.querySelector('.record');
  const stop = document.querySelector('.stop');
  const soundClips = document.querySelector('.sound-clips');
  const mainSection = document.querySelector('.main-controls');

  stop.disabled = true;

  if (navigator.mediaDevices.getUserMedia) {

    const constraints = { audio: true };
    let chunks = [];

    let onSuccess = function(stream) {
      const mediaRecorder = new MediaRecorder(stream);


      record.onclick = function() {
        mediaRecorder.start();
        record.style.background = "red";

        stop.disabled = false;
        record.disabled = true;
      }

      stop.onclick = function() {
        mediaRecorder.stop();
        record.style.background = "";
        record.style.color = "";
        stop.disabled = true;
        record.disabled = false;
      }

      mediaRecorder.onstop = function(e) {

        const clipContainer = document.createElement('article');
        const audio = document.createElement('audio');

        audio.setAttribute('controls', '');

        const userLabel = document.createElement('span');
	      userLabel.textContent = "You: "
        userLabel.style.color = "blue"


        clipContainer.appendChild(userLabel);
        clipContainer.appendChild(audio);
        chatMessages.appendChild(clipContainer);

        audio.controls = true;
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
      }
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }
    }

    let onError = function(err) {
      console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

  } else {
    console.log('getUserMedia not supported on your browser!');
  }
}


function chatAnswer(msg) {
  if (msg) {
    const answers = ['Здравствуйте, чем я могу вам помочь?', 'К сожалению, я этого не знаю.\nПрошу прощения.',
                      'Время работы ресторана вы можете найти на странице сайта.\nЧто-то еще?', 'По всем интерисующим вопросам обращайтесь по номеру +7 (999) 555-55-55'];
    msg = msg.toLowerCase();
    const hello = msg.includes('привет') || msg.includes('здравствуйте') // 0
    const time = msg.includes('время') || msg.includes('рассписание') // 2
    const question = msg.includes('вопрос') // 3

    let answer = document.createElement('p')
    let name = document.createElement('span');
    name.style.color = 'blue';
    name.textContent = 'Alisa: ';
    let msg_node = document.createElement('span')
    if (hello) {
      msg_node.textContent = answers[0]
    } 
    else if (time) {
      msg_node.textContent = answers[2]
    }
    else if (question) {
      msg_node.textContent = answers[3]
    }
    else {
      msg_node.textContent = answers[1] 
    }
    answer.appendChild(name)
    answer.appendChild(msg_node)
    chatMessages.appendChild(answer)
  }
}


sendMessage.onclick = function() {
  messageValue = message.value;
  if (messageValue) {
    message.value = '';
    const newMessage = document.createElement('p');
    let name = document.createElement('span');
    name.style.color = 'blue';
    name.textContent = 'You: ';
    let msg_node = document.createElement('span');
    msg_node.textContent = messageValue
    newMessage.appendChild(name)
    newMessage.appendChild(msg_node)
    chatMessages.appendChild(newMessage)
    chatAnswer(messageValue);
  }
}