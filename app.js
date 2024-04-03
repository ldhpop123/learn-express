// Express 모듈을 불러옵니다.
const express = require('express')

// path 모듈을 불러옵니다. 파일 및 디렉토리 경로를 처리하는 데 사용됩니다.
const path = require('path') 

// express 앱을 생성합니다
const app = express();
// 앱의 포트를 설정합니다. 환경 변수에 포트가 지정되어 있지 않으면 3000번 포트를 사용합니다.
// app.set(키, 값)에 데이터를 저장, 데이터를 app.get(키)로 가져올 수 있음.
app.set('port', process.env.PORT || 3000);

// 미들웨어 사용 설정 -> 미들웨어는 app.use와 함께 사용됨.
// 미들웨어는 위에서부터 아래 순서대로 실행되면서 요청과 응답 사이에 특별한 기능을 추가할 수 있음.
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다')
    next();
})
    // app.use(미들웨어) -> 모든 요청에서 미들웨어 실행
    // app.use('abc', 미들웨어) -> abc로 시작되는 요청에서 미들웨어 실행
    // app.post('abc', 미들웨어) -> abc로 시작되는 POST 요청에서 미들웨어가 실행되지 않음.
    // next -> 다음 미들웨어로 넘어가느 함수, next를 실행하지 않으면 다음 미들웨어가 실행되지 않음.

// 루트 경로('/')로 GET 요청이 오면 실행
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

    //app.get(주소, 라우터) -> 주소에 대한 GET요청이 올때 어떤 동작을 할지 적는 부분
    // req -> 요청에 대한 정보가 들어 있는 객체
    // res -> 응답에 대한 정보가 들어 있는 객체
    // (req, res) => {} -> 다음으로 실행될 콜백 함수를 정의, 이 함수는 req, res를 인자로 받음.
    // throw new Error -> 에러를 발생시키고, 이를 등록된 에러 처리 미들웨어로 전달

// 에러처리 미들웨어 -> 매개 변수가 err, req, res, next로 4개 -> 반드시 매개변수가 4개여야 함.
// 기본적으로 익스프레스가 에러를 처리하긴 하지만, 직접 에러 처리 미들웨어를 연결해주는 것을 권장.
// 에러처리 미들웨어는 특별한 경우가 아니면 가장 아래에 위치함.
app.use((err, rea, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});
    // err -> 에러에 관한 정보가 담겨 있음
    // res.status(HTTP 상태코드) -> HTTP 상태코드 지정, 기본 값은 200(성공)

// 앱이 설정한 포트에서 대기 상태로 시작됩니다.
// 서버가 시작되면 해당 포트에서 대기 중 메세지를 로그에 출력합니다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈포트에서 대기중');
});
