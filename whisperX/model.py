print("model Running")
#base
import os
import sys
#srtModify & srtConvert
import pysubs2
import pandas as pd
#summaryScript
import openai
#simmilarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
#clipEdit
from moviepy.editor import VideoFileClip, concatenate_videoclips # 영상 편집 : 서브클립
import random

##Similarity option and Script option
# opt = "0.2" ## 0.1, 0.2, 0.3
# script = "no" ##add, no


###whisperX 실행
video_name = sys.argv[1]
opt = sys.argv[2]
script = sys.argv[3]

#path_video = "./188s.mp4"
#path_video = "../../src/{0}.mp4".format(video_name) #요약하고자 하는 video 경로
path_video = "../src/{0}.mp4".format(video_name)


#path_video = "../server/src/{1}.mp4".format(sys.argv[1])


print("whisperX Running")
os.system("whisperx " + path_video)
print("whisperX End")

###srtConvert & srtModify
#path_srt = "../../src/{0}.srt".format(video_name)
path_srt = "../src/{0}.srt".format(video_name)
if script=="add":
    #os.system("ffmpeg -i ../../src/summaryVideo_{0}.mp4 -vf {1} output_srt.mp4".format(video_name, path_script)) # input.txt랑 output.mp4 손보면 될 듯
    os.system("ffmpeg -i ../src/{0}.mp4 -vf {1} ../src/{2}.mp4 -y".format(video_name, path_srt,video_name)) # input.txt랑 output.mp4 손보면 될 듯 
    # os.system("rm ../src/{0}.mp4")
    # os.system("mv ")

subs = pysubs2.load(path_srt, encoding='utf-8') #.srt파일 불러오기

#originScript_txt=open('../../src/originScript_{0}.txt'.format(video_name),'w')
originScript_txt=open('../src/originScript_{0}.txt'.format(video_name),'w')

idx = 0
flag = 0
for line in subs:
    if line.text.strip()[-1]!="." and line.text.strip()[-1]!="!" and line.text.strip()[-1]!="?" :
        flag = 1
        while (flag == 1) :
            subs[idx].text = line.text + subs[idx+1].text
            subs[idx].end = subs[idx+1].end
            del subs[idx+1]
            if line.text.strip()[-1]!="." and line.text.strip()[-1]!="!" and line.text.strip()[-1]!="?" :
                continue
            else :
                flag = 0
        
    idx = idx + 1
subs.save(path_srt)

for line in subs:
    originScript_txt.write(line.text + '\n')
originScript_txt.close


###summaryScript
OPENAI_API_KEY = "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"

openai.api_key = OPENAI_API_KEY
# 모델 - GPT 3.5 Turbo 선택
model = "gpt-3.5-turbo"
# 질문 작성하기
#originScript_txt=open('../../src/originScript_{0}.txt'.format(video_name),'r')
originScript_txt=open('../src/originScript_{0}.txt'.format(video_name),'r')
caption=originScript_txt.read()
# caption = originScript_txt.read()
query = "Summarize these text." + str(caption)

# 메시지 설정하기
messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query}
]

# ChatGPT API 호출하기
print("Call ChatGPT API")
response = openai.ChatCompletion.create(
    model=model,
    messages=messages
)
answer = response['choices'][0]['message']['content']
#summaryScript_txt=open('../../src/summaryScript_{0}.txt'.format(video_name),'w')
summaryScript_txt=open('../src/summaryScript_{0}.txt'.format(video_name),'w')
answer=answer.replace(". " or "? " or "! ",".\n")
summaryScript_txt.write(answer)
summaryScript_txt.close


#originScript_txt=open('../../src/originScript_{0}.txt'.format(video_name),'r')
#summaryScript_txt=open('../../src/summaryScript_{0}.txt'.format(video_name),'r')

originScript_txt=open('../src/originScript_{0}.txt'.format(video_name),'r')
summaryScript_txt=open('../src/summaryScript_{0}.txt'.format(video_name),'r')


# calculate cos similarity & get timestamp to list
k=0
idx=set([])
for line in originScript_txt:
    origin=line
    # print("origin : " ,origin)
    for line2 in summaryScript_txt:
        target=line2
        # print("target : " ,target)
        sentences = (origin, target)
        tfidf_vectorizer = TfidfVectorizer()  # 문장 벡터화 하기(사전 만들기)
        tfidf_matrix = tfidf_vectorizer.fit_transform(sentences)

        cos_similar = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2]) #문장 비교
        #print("코사인 유사도 측정 : ", cos_similar, '\n')
        if cos_similar >= float(opt):
            idx.add(k)
    k=k+1
    summaryScript_txt.seek(0)
print("===file end===")

idx_list=list(idx)
idx_list.sort()
print(idx_list)

### subs에 srt 스크립트 load
subs = pysubs2.load(path_srt, encoding='utf-8')

### subclip 따기 + input.txt
f=open("input.txt", "w")
for i in range(0, len(idx_list)) :
    clip = VideoFileClip(path_video).subclip(subs[idx_list[i]].start/1000, subs[idx_list[i]].end/1000)
    clip.write_videofile("clip" + str(i+1) + ".mp4")
    f.write("file clip" + str(i+1) + ".mp4" + '\n')
f.close()

### saveStorage...
def saveResult() :
    print("save Result")
    path_script=''
    #os.system("ffmpeg -f concat -i input.txt -c copy ../../src/summaryVideo_{0}.mp4".format(video_name))
    os.system("ffmpeg -f concat -i input.txt -c copy ../src/summaryVideo_{0}.mp4".format(video_name))
    for i in range(0, len(idx)) :
        os.remove("clip" + str(i+1) + ".mp4")
    os.remove("input.txt")
    
    
saveResult()

os.remove('../src/originScript_{0}.txt'.format(video_name))
os.remove('../src/summaryScript_{0}.txt'.format(video_name))
os.remove("../src/{0}.mp4".format(video_name))
os.remove('../src/{0}.wav'.format(video_name))
os.remove('../src/{0}.srt'.format(video_name))
os.system("mv ../src/summaryVideo_{0}.mp4 ./public/".format(video_name) )

print("model end")
