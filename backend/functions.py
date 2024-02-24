from pytube import YouTube
import os
import moviepy.editor as mpe
import random


def get_resulations(link):
    yt = YouTube(link)
    streams = yt.streams.filter(file_extension='mp4')
    available = []

    for i in streams:
        if i.resolution == None:
            continue
        
        if i.resolution in available:
            continue

        available.append(i.resolution)
   
    return available

def get_info(link):
    yt = YouTube(link)
    resolutions = get_resulations(link)

    return {"Sucess": True,"Resolutions": resolutions, "Thumbnail_url": yt.thumbnail_url, "Title": yt.title, "Link": link, "Duration": yt.length}

def get_itag(link, res):
    yt = YouTube(link)
    streams = yt.streams.filter(file_extension='mp4')
    return list(streams.filter(res=res, progressive=False).itag_index.keys())[0]


def clear_videos():
    klasor_yolu = "/home/deno/mp4_api/videos"

    dosyalar = os.listdir(klasor_yolu)

    for dosya in dosyalar:
        dosya_yolu = os.path.join(klasor_yolu, dosya)
        if os.path.isfile(dosya_yolu):
            os.remove(dosya_yolu)

        print("Klasördeki tüm dosyalar başarıyla silindi.")

def combine_audio(vidname, audname, outname, fps=25):
    my_clip = mpe.VideoFileClip(vidname)
    audio_background = mpe.AudioFileClip(audname)
    final_clip = my_clip.set_audio(audio_background)
    final_clip.write_videofile(outname,fps=fps)


def download(link, res):
    yt = YouTube(link)

    streams = yt.streams.filter(file_extension='mp4', progressive=True, resolution=res)

    if list(streams) != []:
        name = list(streams)[0].download("./videos/")
        newname = name.replace(' ','_')[:-4] + " " + str(random.randint(1,100000)) + ".mp4"
        os.rename(name,newname)
    
        return
    
    streams = yt.streams.filter(file_extension='mp4', progressive=False, resolution=res)
    print(streams)
    vid_name = streams[0].download("./temp/")
    newname = vid_name.replace(' ','_')[:-4] + " " + str(random.randint(1,100000)) + ".mp4"
    os.rename(vid_name,newname)

    stream = yt.streams.filter(progressive=False, only_audio=True).get_audio_only()
    print(stream)
    aud_name = stream.download("./temp/")
    vid_name = newname.split("/")[-1]
    
    outname = "./videos/" + vid_name.replace(' ','_')[:-4] + ".mp4"

    combine_audio(newname, aud_name, outname)

    os.remove(newname)
    os.remove(aud_name)

    return outname.split("/")[-1]



