from os import listdir
from os.path import isfile, join, isdir
import csv
import email
import re
# import psv


def load_corpus(input_dir):
    trainfiles = [f for f in listdir(input_dir) if isdir(join(input_dir, f))]
    trainset = []
    # startIndex = 0
    # numEmails = 0
    for author in trainfiles:
        mailset = []
        # authorset = []
        sent_items = join(input_dir, author, 'sent_items')
        if isdir(sent_items) and len(listdir(sent_items)) > 50:
            # print(author, len(listdir(sent_items)))
            for msg in listdir(sent_items):
                fname = join(sent_items, msg)
                if isfile(fname):
                    e = email.message_from_file(open(fname))
                    txt = e.get_payload().split('-----')[0]
                    txt = ''.join(e for e in txt if e.isalnum() or e == ' ')
                    # trainset.append({'label': author, 'text': txt})
                    mailset.append({'text': txt})
            # authorset.append({'numemails':len(listdir(sent_items)), 'mailset':mailset})
            trainset.append({'author': author, 'numemails': len(listdir(sent_items)), 'mailset': mailset})
    return trainset


def writeIntoCSV(data):
    f = csv.writer(open("trainTest.csv", "w+"))
    f.writerow(["author", "message"])
    for item in data:
        f.writerow([item['label'], item['text']])
    print("Done")


# data = load_Judge('../../../Datasets/Enron/raw_maildir')
data = load_corpus('../../../Datasets/Enron/raw_maildir')
print(data[0]['mailset'][0])
# matrix = train_model(data)
# import csv
# a = zip(*data)
# csv.writer(open("output.csv", "wb")).writerows(a)
# writeIntoCSV(matrix)
# function that filters vowels

def averageCharNumber(data):
    featureSet = []
    for author in data:
        n = author['numemails']
        c = 0
        for item in author['mailset']:
            c += len(item['text'])
        averageset = [{'averageChar': float(float(c) / float(n))}]
        featureSet.append({'author': author['author'], 'featureSet': averageset})
    return featureSet

def numericRatioDensity(rawdata,data):
    ratioSet = []
    return ratioSet

def spaceRatioDensity(rawdata,data):
    spaceSet = []
    return spaceSet

def normalizedCharacterCount(rawdata,data):
    charCount = []
    return charCount


def averageWordNumber(dataset,data):
    count = 0
    finalfeatureset = []
    for author in data:
        n = author['numemails']
        c = 0
        featureset = []
        for item in author['mailset']:
            c += len(item['text'].split())
        featureset = dataset[count]['featureSet']
        featureset.append({'averageWord': float(float(c) / float(n))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})
    return finalfeatureset

def averageWordLength(dataset,data):
    count = 0
    finalfeatureset = []
    for author in data:
        wordcount = 0
        wordlength = 0
        featureset = []
        for item in author['mailset']:
            wordcount += len(item['text'].split())
            wordlength += len(item['text'])
        featureset = dataset[count]['featureSet']
        featureset.append({'averageWordLength':float(float(wordlength)/float(wordcount))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})

    return finalfeatureset

def averageSentenceNumber(dataset,data):
    count = 0
    finalfeatureset = []
    for author in data:
        sentencecount = 0
        n = author['numemails']
        featureset = []
        for item in author['mailset']:
            sentencecount += len(re.findall('[.\?!:+]', item['text']))
        featureset = dataset[count]['featureSet']
        featureset.append({'averageSentenceCount': float(float(sentencecount) / float(n))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})

    return finalfeatureset


def shortWordRatioDensity(rawdata,data):
    shortWordRatioSet = []
    return shortWordRatioSet

def averageParagraphNumber(rawdata,data):
    paragraphSet = []
    return paragraphSet

def greetingUsed(rawdata,data):
    greetingSet = []
    return greetingSet

def freqFunctionWords(rawdata,data):
    functionWordsSet = []
    return functionWordsSet

def freqPunctuation(rawdata,data):
    punctuationSet = []
    return punctuationSet

print('#################')
datasetForML = averageCharNumber(data)
# print(datasetForML[0])

print('#################')
datasetForML = averageWordNumber(datasetForML, data)

print('#################')
datasetForML = averageWordLength(datasetForML, data)

print('#################')

averageSentenceNumber(datasetForML,data)
print(datasetForML[0])
