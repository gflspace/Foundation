import json,sys,os
from PIL import Image,ImageOps
S,dst=sys.argv[1],sys.argv[2]; sel=json.load(open(f'{S}/tools/select.json')); out={}
for album,ns in sel.items():
    os.makedirs(f'{dst}/{album}',exist_ok=True); out[album]=[]
    for k,n in enumerate(ns,1):
        im=ImageOps.exif_transpose(Image.open(f'{S}/drive/files/{n}')).convert('RGB')
        im.thumbnail((1600,1600)); p=f'{dst}/{album}/{k:02d}.jpg'
        im.save(p,'JPEG',quality=82,optimize=True,progressive=True)
        out[album].append({'n':n,'file':f'/gallery/{album}/{k:02d}.jpg','w':im.width,'h':im.height})
json.dump(out,open(f'{S}/tools/exported.json','w'),indent=1)
