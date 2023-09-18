# Video Summarization with ChatGPT
2023.03. ~ 2023.06. <br/>
숭실대학교 23-1학기 소프트웨어프로젝트에서 진행한 프로젝트입니다. </br>
ChatGPT와 WhisperX 를 사용하여 AI 영상 요약 모델을 구현하고, 인터페이스를 통해 사용자에게 영상 요약 서비스를 제공했습니다.

### SW1821

`AI model` 강준규 <a href="https://github.com/KangJunGyu">@KangJunGyu</a><br/>
`AI model` 이원호 <a href="https://github.com/wono">@wono</a><br/>
`Front-end` 성나영 <a href="https://github.com/sna0e">@sna0e</a><br/>
`Back-end` 조수현 <a href="https://github.com/chopha">@chopha</a><br/>

<hr/>
<h4>This project summarizes Youtube video efficiently by utilizing ChatGPT.</h4>
By employing STT, we extract a text file of the caption of a video. Then, ChatGPT summarizes it. In conclusion, it compared original caption text with condensed text by applying COS accuracy. We select parts of the text with higher accuracy to edit the video.

<h4>The website provides service for video summarization</h4>
<ol>
    <li>User submits a URL of Youtube video.</li>
    <li>AI model utilizing ChatGPT and WhisperX makes a summarized video.</li>
    <li>Website shows the result of the video. </li>
    <li>User can download it.</li>
</ol>
<br/>
<br/>

# stacks
<h3>Environment</h3>
<img src="https://img.shields.io/badge/linux-fcc624?style=for-the-badge&logo=linux&logoColor=black"/>
<img src="https://img.shields.io/badge/visual studio code-007acc?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>


<h3>Config</h3>
<img src="https://img.shields.io/badge/npm-cb3837?style=for-the-badge&logo=npm&logoColor=white"/>

<h3>Development</h3>
<img src="https://img.shields.io/badge/python-3776ab?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=ffffff"/>
<h3>AI model</h3>
<img src="https://img.shields.io/badge/openAI-412991?style=for-the-badge&logo=openAI&logoColor=white"/>

<h3>Library</h3>
<img src="https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white"/>
<img src="https://img.shields.io/badge/pypi-3375a9?style=for-the-badge&logo=pypi&logoColor=white"/>

<h3>Communication</h3>
<img src="https://img.shields.io/badge/notion-black?style=for-the-badge&logo=notion&logoColor=white"/>
<img src="https://img.shields.io/badge/discord-5865f2?style=for-the-badge&logo=discord&logoColor=white"/>

<br/>
<br/>


# Requirements
for building running the appication you need:
- [Node js 18.13.0](#https://nodejs.org/ko) 
- [Npm 9.4.0](#https://www.npmjs.com/)
- [Python 3.11.2 ](#https://www.python.org/downloads/)
- [PyTorch 1.13.1](#https://pytorch.org/)
- [Torchaudio 0.13.1](#https://pytorch.org/)
- [Torchvision 0.14.1](#https://pytorch.org/)
- [FFmpeg-Python 0.2.0](#https://ffmpeg.org/)
- [CUDA 11.4](#https://developer.nvidia.com/cuda-toolkit)
- [WhisperX v2](#https://openai.com/)

### Installtion
```bash
$ git clone https://github.com/SW1821/Video_Summarization_with_ChatGPT.git
$ cd Video_Summarization_with_ChatGPT
```
### Backend
```bash
$ cd server
$ npm install
$ npm run develop
```

### Frontend
```bash
$ cd client
$ npm install
$ npm run start
```
### AI
```bash
$ cd model
$ pip install -e .
$ python model.py
```