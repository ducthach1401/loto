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
    const url = API_URL + '/v1/spin';
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

async function printNumber(data) {
    console.log(data);
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

setInterval(getNumber, 1000);