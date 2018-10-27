import csv
from os import listdir
from os.path import isfile, join, isdir

def load_corpus():
    authorset = []
    trainset = []
    numemails = []
    exampleFile = open('raw_mail_dir.csv')
    exampleReader = csv.reader(exampleFile)
    exampleData = list(exampleReader)
    for data in exampleData:
        authorexists = False
        if data[0] == "Sender":
            continue
        for author in authorset:
            if author == data[0]:
                authorexists = True
                break
        if not authorexists:
            authorset.append(data[0])
            numemails.append(0)

    return exampleData

