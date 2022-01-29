async function choosePaper(value) {
    const paper = document.querySelector('input[name="paper"]:checked').value;
    if (value == 0){
        if (paper == 1){
            document.getElementById('paper1').src = '';
            console.log(document.getElementById('paper1'));
        }
        else {
            document.getElementById('paper2').src = '';
        }
    }
    if (paper == 1){
        document.getElementById('paper1').src = '../image/'+ value +'.jpg';
    }
    else {
        document.getElementById('paper2').src = '../image/'+ value +'.jpg';
    }
}

async function reset() {
    const url = API_URL + '/v1/reset';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if (data.message == 'success') {
        document.getElementById('current').innerHTML = '';
        Swal.fire({
            title: 'Reset',
            icon: 'success'
        });
    }
   
}

async function spin() {
    let timerInterval
    await Swal.fire({
        title: 'Chờ tí nhé thằng l...',
        html: 'Tự đóng sau <b></b> ms.',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
        }
    })
    const url = API_URL + '/v1/spin';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    Swal.fire({
        title: data.number,
        icon: 'success',
        timer: 1000
    })
    printNumber(data);    
}

async function printNumber(data) {
    document.getElementById('current').innerHTML = data.number;
    for (let i = 0; i < 10; i++){
        document.getElementById('hang' + i).innerHTML = 'Hàng ' + i + ': ';
    }
    let temp = data.loto.reverse();
    for (let number of temp){
        let n = Math.floor(number / 10);
        document.getElementById('hang' + n).innerHTML += ' ' + number;
    }
}

async function getNumber() {
    const url = API_URL + '/v1/number';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    printNumber(data);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

async function checkName() {
    while (!getCookie('username')) {
        console.log('x');
        await Swal.fire({
            title: 'Xin cái tên:',
            input: 'text'
        }).then((result) => {
            if (result.isConfirmed){
                document.cookie = 'username=' + result.value;
            }
        })
    }
}

function getPaper(number) {
    let paper = document.getElementById('paper' + number).src;
    paper = paper.split('/');
    paper = paper[paper.length - 1].split('.')[0];
    return paper;
}
async function checkPeople() {
    const url = API_URL + '/v1/check';
    let temp1 = getPaper(1);
    let temp2 = getPaper(2);
    const payload = {
        paper: [temp1, temp2]
    }
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    let chat = document.getElementById('chat');
    chat.innerHTML = '';
    let dem = 0;
    for (let i in data){
        dem ++;
        chat.innerHTML += dem + '. ' + i + ' đã chọn tờ: ' +  data[i][0] + ' ' +  data[i][1] + '\n';
    }
}

setInterval(getNumber, 1000);