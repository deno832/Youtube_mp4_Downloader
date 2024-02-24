from fastapi import FastAPI
import uvicorn
from pytube import YouTube
from pydantic import BaseModel
from functions import *
import random
import os
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


clear_videos()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/videos", StaticFiles(directory="videos"), name="videos")

class link_model(BaseModel):
    link: str

class download_model(BaseModel):
    link: str
    res: str

@app.post("/bilgi")
def root(post: link_model):
    try:
        response = get_info(post.link)
    except:
        return {"Sucess": False}
    
    return response

@app.post("/indir")
def root(post: download_model):
    return {"success": True,"filename": download(post.link, post.res)}

if __name__ == "__main__":
    uvicorn.run(app, port=12345)