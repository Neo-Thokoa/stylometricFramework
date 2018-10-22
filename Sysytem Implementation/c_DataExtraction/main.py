from os import listdir
from os.path import isfile, join, isdir
import csv
import email
import re
import nltk
from textstat.textstat import textstat
from textblob import TextBlob


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
            sentencecount += textstat.sentence_count(item['text'])
        featureset = dataset[count]['featureSet']
        featureset.append({'averageSentenceCount': float(float(sentencecount) / float(n))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})

    return finalfeatureset


def shortWordRatioDensity(dataset, data):
    count = 0
    finalfeatureset = []
    for author in data:
        shortwordcount = 0
        wordcount = 0
        featureset = []
        for item in author['mailset']:
            finalWordList = []
            words = item['text'].split()
            for word in words:
                if len(word) <= 3:
                    finalWordList.append(word)
            shortwordcount += len(finalWordList)
            wordcount += len(item['text'].split())
        featureset = dataset[count]['featureSet']
        featureset.append({'shortWordDensity': float(float(shortwordcount)/float(wordcount))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})

    return finalfeatureset


def averageParagraphNumber(dataset,data):
    count = 0
    finalfeatureset = []
    for author in data:
        paragraphcount = 0
        n = author['numemails']
        featureset = []
        for item in author['mailset']:
            paragraphcount += len(item['text'].split('\r\n')) + 1
        featureset = dataset[count]['featureSet']
        featureset.append({'averageParagraphCount': float(float(paragraphcount))})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})
    return finalfeatureset

def greetingUsed(rawdata,data):
    greetingSet = []
    return greetingSet

def freqFunctionWords(rawdata,data):
    functionWordsSet = []
    return functionWordsSet

def freqPunctuation(rawdata,data):
    punctuationSet = []
    return punctuationSet


def authourSentimentPolarity(dataset,data):
    count = 0
    finalfeatureset = []
    for author in data:
        paragraphcount = 0
        n = author['numemails']
        totalpolarity = 0
        totalsubjective = 0
        featureset = []
        for item in author['mailset']:
            wiki = TextBlob(item['text'])
            totalpolarity = totalpolarity + wiki.sentiment.polarity
            totalsubjective = totalsubjective + wiki.sentiment.subjectivity
        featureset = dataset[count]['featureSet']
        featureset.append({'averagePolarityCount': float(float(totalpolarity)/n)})
        featureset.append({'averageSubjectivityCount': float(float(totalsubjective) / n)})
        count += 1
        finalfeatureset.append({'author': author['author'], 'featureSet': featureset})
    return finalfeatureset

print('#################1###############')
datasetForML = averageCharNumber(data)
# print(datasetForML[0])

print('#################2###############')
datasetForML = averageWordNumber(datasetForML, data)

print('#################3###############')
datasetForML = averageWordLength(datasetForML, data)

print('#################4################')

datasetForML = averageSentenceNumber(datasetForML,data)

print('#################5################')

datasetForML = averageParagraphNumber(datasetForML,data)

print('#################6################')

datasetForML = shortWordRatioDensity(datasetForML, data)

datasetForML = authourSentimentPolarity(datasetForML, data)


def writeIntoCSV(data):
    f = csv.writer(open("featureset.csv", "w+"))
    for item in data:
        for featureitem in item['featureSet']:
            f.writerow([item['author'], featureitem])
    print("Done")


writeIntoCSV(datasetForML)