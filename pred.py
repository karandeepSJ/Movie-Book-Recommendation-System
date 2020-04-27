import numpy as np
import pandas as pd
import sys
import scipy.io
import os

def get_path_prefix():
    currentDir = os.getcwd()
    if currentDir.endswith('recommendation-service'):
        ind = currentDir.rindex('/')
        parentDir = currentDir[:ind]
        ind = parentDir.rindex('/')
        grandParentDir = parentDir[:ind] + '/'
        return grandParentDir
    else:
        return ""

prefix = get_path_prefix()
params = scipy.io.loadmat(prefix + 'recommender-system/trained_params.mat')
movie_ids = np.load(prefix + 'recommender-system/movieids.npy', allow_pickle=True)
book_ids = np.load(prefix + 'recommender-system/bookids.npy', allow_pickle=True)
book_userids = np.load(prefix + 'recommender-system/book_userids.npy', allow_pickle=True)

B = params['Core']
User_Mem = params['UserMem']
Item_Mem = params['ItemMem'].T


book_id = int(sys.argv[1])
movie_id = int(sys.argv[2])
items1 = []
items2 = []


# In[32]:


if(movie_id!=0):
    idx = movie_id-1
    cluster = User_Mem[851 + idx]
    user_cluster = np.argmax(cluster)
    cluster2 = B[user_cluster,:]
    item_cluster = np.argmax(cluster2)
    items1 = np.where(Item_Mem.argmax(axis=0) == item_cluster)[0]
    
if(book_id!=0):
    idx = np.where(book_userids==book_id)[0]
    cluster = User_Mem[idx]
    user_cluster = np.argmax(cluster)
    cluster2 = B[user_cluster,:]
    item_cluster = np.argmax(cluster2)
    items2 = np.where(Item_Mem.argmax(axis=0) == item_cluster)[0]


items = np.array(list(set(items1).union(set(items2))))

books = items[items<974]
movies = items[items>=974]


bids = book_ids[books]
mids = movie_ids[movies-974]
bidsOut = ",".join(list(bids))
midsOut = ",".join([str(id) for id in list(mids)])
print(bidsOut.replace('\n',''))
print(midsOut.replace('\n',''))



