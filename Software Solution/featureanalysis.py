# import pandas as pd
# import spacy
import numpy as np
import csv
from textblob import classifiers
from textblob import TextBlob
import json
from apiclient import discovery
from apiclient import errors
from httplib2 import Http
from oauth2client import file, client, tools
import base64
from bs4 import BeautifulSoup
import re
import time
import dateutil.parser as parser
from datetime import datetime
import datetime
import csv
# from sklearn.base import BaseEstimator, TransformerMixin
# # Load SpaCy's models
# SPACY = spacy.load('xx')
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
# from sklearn.base import BaseEstimator, ClassifierMixin
# from keras.utils import to_categorical
#
# from keras.models import Sequential
# from keras.layers import Dense, LSTM, GRU, SimpleRNN, Activation, Dropout
#
# from sklearn.model_selection import GridSearchCV, ShuffleSplit
# from sklearn.pipeline import Pipeline


# class PosPreprocessor(BaseEstimator, TransformerMixin):
#     def __init__(self, length_percentile=95):
#         self.length_percentile = length_percentile
#         self._standartization_factor = 0
#
#     # def transform(self, X, *_):
#     #     assert (self.sentence_size is not None), "Fitting required"
#     #
#     #     # Create the output matrix
#     #     result = np.zeros((len(X), self.sentence_size), dtype='uint8')
#     #
#     #     # Tokenize and POS tag all the documents using multi-threading
#     #     for i, x in enumerate(SPACY.pipe(X, batch_size=500, n_threads=-1)):
#     #         # Store the POS-tags
#     #         tags = np.fromiter((token.pos for token in x), dtype='uint8', count=len(x))
#     #
#     #         # Pad and truncate data, if necessary, and store them in result
#     #         last_index = len(tags) if len(tags) < self.sentence_size else self.sentence_size
#     #         result[i, :last_index] = tags[:last_index]
#     #
#     #     # Generate the factor one time to ensure applying the same factor at the next transformations
#     #     if self._standartization_factor == 0:
#     #         self._standartization_factor = np.min(result[result != 0]) - 1
#     #
#     #     # Standartize all valid elements to count from 1
#     #     result[result != 0] -= self._standartization_factor
#     #     return result
#
#     def fit(self, X, *_):
#         # Define an optimal sentence size covering a specific percent of all sample
#         self.sentence_size = int(np.percentile([len(t.split()) for t in X], self.length_percentile))
#         return self
#
#     def fit_transform(self, X, *_):
#         self.fit(X)
#         return self.transform(X)
#
#
# class RnnClassifier(BaseEstimator, ClassifierMixin):
#
#     def __init__(self,
#                  batch_size=32,
#                  epochs=3,
#                  dropout=0,
#                  rnn_type='gru',
#                  hidden_layer=[64, 32]):
#
#         # How many samples are processed in one training step?
#         self.batch_size = batch_size
#         # How long should the artificial neural network train?
#         self.epochs = epochs
#         # How much dropout do we put into the model to avoid overfitting?
#         self.dropout = dropout
#         # Which type of RNN do we want?
#         self.rnn_type = rnn_type
#         # Do we have hidden layer? If yes, how many which how many neurons?
#         self.hidden_layer = hidden_layer
#
#         self._rnn = None
#         self._num_classes = None
#         self._num_words = None
#
#     def fit(self, X, Y=None):
#         assert (Y is not None), "Y is required"
#         assert (self.rnn_type in ['gru', 'lstm', 'simple']), "Invalid RNN type"
#
#         # How many different tags do we have?
#         self._num_words = np.max(X) + 1
#
#         # How many classes should we predict?
#         self._num_classes = np.max(Y) + 1
#
#         node_type = None
#         if self.rnn_type is 'gru':
#             node_type = GRU
#         elif self.rnn_type is 'lstm':
#             node_type = LSTM
#         else:
#             node_type = SimpleRNN
#
#         # Transfer the data into a appropiated shape
#         X = self._reshape_input(X)
#
#         # Ready for rumble?! Here the actual neural network starts!
#         self._rnn = Sequential()
#         self._rnn.add(node_type(X.shape[1],
#                                 input_shape=(X.shape[1], self._num_words),
#                                 return_sequences=(len(self.hidden_layer) > 0)
#                                 ))
#
#         # Add dropout, if needed
#         if self.dropout > 0:
#             self._rnn.add(Dropout(self.dropout))
#
#         # Add the hidden layers and their dropout
#         for (i, hidden_neurons) in enumerate(self.hidden_layer):
#             sequences = i != len(self.hidden_layer) - 1
#
#             self._rnn.add(node_type(hidden_neurons, return_sequences=sequences))
#             if self.dropout > 0:
#                 self._rnn.add(Dropout(self.dropout))
#
#         # Add the output layer and compile the model
#         self._rnn.add(Dense(3, activation='softmax'))
#         self._rnn.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
#
#         # Convert the results in the right format and start the training process
#         Y = to_categorical(Y, num_classes=self._num_classes)
#         self._rnn.fit(X, Y, epochs=self.epochs,
#                       batch_size=self.batch_size,
#                       verbose=0)
#
#         return self
#
#     def predict(self, X, y=None):
#         if self._rnn is None:
#             raise RuntimeError("Fitting required before prediction!")
#
#         # 'Softmax' returns a list of probabilities - just use the highest onw
#         return np.argmax(
#             self._rnn.predict(
#                 self._reshape_input(X),
#                 batch_size=self.batch_size
#             ))
#
#     def score(self, X, y=None):
#         assert (y is not None), "Y is required"
#
#         # Evaluate the model on training data
#         return self._rnn.evaluate(
#             self._reshape_input(X),
#             to_categorical(y, num_classes=self._num_classes)
#         )[1]
#
#     def _reshape_input(self, X):
#         result = np.resize(X, (X.shape[0], X.shape[1], self._num_words))
#         for x in range(0, X.shape[0]):
#             for y in range(0, X.shape[1]):
#                 result[x, y] = to_categorical(X[x, y], num_classes=self._num_words)[0]
#         return result
#
#
def getauthors(AUTHORS):
    f = open('authorlist.csv', 'r')
    count = 1
    with f:

        reader = csv.reader(f, delimiter="~")

        for row in reader:

            for element in row:
                AUTHORS[element] = count
                count = count + 1
    return AUTHORS
#
#
# def dataanlysis():
#     # from spacy.lang.xx import MultiLanguage
#     # nlp = MultiLanguage()
#
#     AUTHORS = {}
#     AUTHORS = getauthors(AUTHORS)
#     # AUTHORS = {'EAP': 0, 'HPL': 1, 'MWS': 2}
#
#     # Load the training data
#     dataset = pd.read_csv("trainset.csv", delimiter='~')
#     # dataset = pd.read_csv("train.csv")
#     # Convert the author strings into numbers
#     print(AUTHORS)
#     print(dataset['author'])
#     dataset['author'] = dataset['author'].apply(lambda x: AUTHORS[x])
#     print(dataset['author'])
#     syntax_pipeline = Pipeline([
#         ('pre', PosPreprocessor()),
#         ('rnn', RnnClassifier(batch_size=64, rnn_type='gru', hidden_layer=[64]))
#     ])
#
#     # Create the grid search with specifying possible parabeter
#     optimizer = GridSearchCV(syntax_pipeline, {
#         'rnn__epochs': (25, 30, 35, 40, 45, 50),
#         'rnn__dropout': (0.25, 0.3, 0.35, 0.4)
#     }, cv=ShuffleSplit(test_size=0.10, n_splits=1, random_state=0))
#
#     # Start the second search: Again, that will take some time!
#     optimizer.fit(dataset['text'], dataset['author'])
#
#     return "Done"

def textblobClassifiers():
    testfile = open('testset.csv')
    testset = csv.reader(testfile, delimiter="~")
    testdata = list(testset)
    itertest = 0
    for x in testdata:
        if len(x) < 1:
            del testdata[itertest]
        itertest = itertest + 1
    a_test_set = [tuple(y) for y in testdata]
    print(a_test_set)
    testfile.close()
    trainfile = open('textblobtrain.csv')
    dataset = csv.reader(trainfile, delimiter="~")
    data = list(dataset)
    counter = 0
    for x in data:
        if len(x) < 1:
            del data[counter]
        counter = counter + 1
    a_list_of_tuple = [tuple(x) for x in data]
    classifier = classifiers.NaiveBayesClassifier(a_list_of_tuple)
    dt_classifier = classifiers.DecisionTreeClassifier(a_list_of_tuple)
    trainfile.close()
    naiveaccuracy = classifier.accuracy(a_test_set)
    dtaccuracy =  dt_classifier.accuracy(a_test_set)
    print("Accuracy is at", naiveaccuracy)
    print("Accuracy is at", dtaccuracy)
    classifier.show_informative_features(3)
    # blob = TextBlob('We gotta do some things, for this Machine Learning', classifier=classifier)
    # print(blob.classify())
    # anotherblob = TextBlob('We gotta do some things, for this Machine Learning', classifier=dt_classifier)
    # print(anotherblob.classify())
    mostaccurate = ''
    if naiveaccuracy >= dtaccuracy:
        mostaccurate = "Naive Bayes"
    else:
        mostaccurate = "Decision Tree"
    result = {"mostAccurate": mostaccurate, "naiveaccuracy": naiveaccuracy, "dtaccuracy": dtaccuracy}
    json_data = json.dumps(result)
    return json_data


def classifierunreademail(classifiername):
    authorOne = ''
    authOneText = ''
    authorTwo = ''
    authTwoText = ''
    exampleFile = open('unreadtest.csv')
    exampleReader = csv.reader(exampleFile, delimiter="~")
    exampleData = list(exampleReader)
    count = 0
    if len(exampleData) > 0:
        for data in exampleData:
            if data[0] == "Sender":
                count = count + 1
                continue
            if count == 1:

                authorOne = data[0].strip()
                print(authorOne)
                print('-------')
                if '<' in authorOne:
                    authorOne = data[0].partition('<')[0].strip()
                if '-' in authorOne:
                    authorOne = data[0].partition('-')[0].strip()
                if '"' in authorOne:
                    authorOne = authorOne.replace('"', '')
                authOneText = data[3]
                count = count + 1
                continue
            if count == 2:
                authorTwo = data[0].strip()
                print(authorTwo)
                print('#####')
                if '<' in authorTwo:
                    authorTwo = data[0].partition('<')[0].strip()
                if '-' in authorTwo:
                    authorTwo = data[0].partition('-')[0].strip()
                if '"' in authorTwo:
                    authorTwo = authorTwo.replace('"', '')
                authTwoText = data[3]
                count = count + 1
        trainfile = open('textblobtrain.csv')
        dataset = csv.reader(trainfile, delimiter="~")
        data = list(dataset)
        counter = 0
        for x in data:
            if len(x) < 1:
                del data[counter]
            counter = counter + 1
        a_list_of_tuple = [tuple(x) for x in data]
        classifier = classifiers.NaiveBayesClassifier(a_list_of_tuple)
        dt_classifier = classifiers.DecisionTreeClassifier(a_list_of_tuple)
        trainfile.close()
        detectedauthora = 0
        detectedauthorb = 0
        if classifiername == "Naive Bayes":
            blob = TextBlob(authOneText, classifier=classifier)
            anotherblob = TextBlob(authTwoText, classifier=classifier)
            detectedauthora = blob.classify()
            detectedauthorb = anotherblob.classify()
        else:
            blob = TextBlob(authOneText, classifier=dt_classifier)
            anotherblob = TextBlob(authTwoText, classifier=dt_classifier)
            detectedauthora = blob.classify()
            detectedauthorb = anotherblob.classify()
        print("Detected for A: ", detectedauthora)
        print("Detected for B: ", detectedauthorb)
        authorastatus = 'DNE'
        authorbstatus = 'DNE'
        f = open('authorlist.csv', 'r')
        AUTHORS = {}
        AUTHORS = getauthors(AUTHORS)
        for currentauthor in AUTHORS:
            if authorOne == currentauthor:
                authorastatus = "authorexists"

            if authorTwo == currentauthor:
                authorbstatus = "authorexists"

        result = {"authorastatus": authorastatus, "authorbstatus": authorbstatus, "detectedAuthorA": detectedauthora, "detectedAuthorB": detectedauthorb, "claimedA": authorOne, "claimedB": authorTwo}
        json_data = json.dumps(result)
        return json_data


def analyzeunreadmail(classifiername):
    SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'
    store = file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    GMAIL = discovery.build('gmail', 'v1', http=creds.authorize(Http()))

    user_id = 'me'
    label_id_two = 'UNREAD'
    unread_msgs = GMAIL.users().messages().list(userId='me', labelIds=[label_id_two], maxResults=2).execute()
    mssg_list = unread_msgs['messages']
    print("Total unread messages in inbox: ", str(len(mssg_list)))

    final_list = []
    for mssg in mssg_list:
        temp_dict = {}
        m_id = mssg['id']  # get id of individual message
        message = GMAIL.users().messages().get(userId=user_id, id=m_id).execute()  # fetch the message using API
        payld = message['payload']  # get payload of the message
        headr = payld['headers']  # get header of the payload

        for one in headr:  # getting the Subject
            if one['name'] == 'Subject':
                msg_subject = one['value']
                temp_dict['Subject'] = msg_subject
            else:
                pass

        for two in headr:  # getting the date
            if two['name'] == 'Date':
                msg_date = two['value']
                date_parse = (parser.parse(msg_date))
                m_date = (date_parse.date())
                temp_dict['Date'] = str(m_date)
            else:
                pass

        for three in headr:  # getting the Sender
            if three['name'] == 'From':
                msg_from = three['value']
                temp_dict['Sender'] = msg_from
            else:
                pass

        temp_dict['Snippet'] = message['snippet']  # fetching message snippet

        try:

            # Fetching message body
            mssg_parts = payld['parts']  # fetching the message parts
            part_one = mssg_parts[0]  # fetching first element of the part
            part_body = part_one['body']  # fetching body of the message
            part_data = part_body['data']  # fetching data from the body
            clean_one = part_data.replace("-", "+")  # decoding from Base64 to UTF-8
            clean_one = clean_one.replace("_", "/")  # decoding from Base64 to UTF-8
            clean_two = base64.b64decode(bytes(clean_one, 'UTF-8'))  # decoding from Base64 to UTF-8
            soup = BeautifulSoup(clean_two, "lxml")
            mssg_body = soup.body()
            # mssg_body is a readible form of message body
            # depending on the end user's requirements, it can be further cleaned
            # using regex, beautiful soup, or any other method
            temp_dict['Message_body'] = mssg_body

        except:
            pass

        final_list.append(temp_dict)  # This will create a dictonary item in the final list

        # This will mark the messagea as read
        #GMAIL.users().messages().modify(userId=user_id, id=m_id, body={'removeLabelIds': ['UNREAD']}).execute()

    print("Total messaged retrived: ", str(len(final_list)))
    # exporting the values as .csv
    with open('unreadtest.csv', 'w', encoding='utf-8', newline='') as csvfile:
        fieldnames = ['Sender', 'Subject', 'Date', 'Snippet', 'Message_body']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, delimiter='~')
        writer.writeheader()
        for val in final_list:
            writer.writerow(val)

    csvfile.close()
    return classifierunreademail(classifiername)


print(analyzeunreadmail("Decision Tree"))