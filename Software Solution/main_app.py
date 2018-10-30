from flask_api import FlaskAPI
from flask import request, jsonify
from flask_cors import CORS
import importlib, importlib.util, os.path
import os

app = FlaskAPI(__name__)
CORS(app)

@app.route('/getData/')
def getData():
    return {'name':'roy'}

@app.route('/Authenticate',methods=['POST'])
def Authenticate():
    content = request.json
    return jsonify({'username':content['username'],'password':content['password']})

@app.route('/dataAcquisition/')
def dataAcquisition():
    # foo = module_from_file("foo", "/a_DataAquisition/retrieve_gmail.py")
    # result = foo.dataacuire()
    # return {'data': result}
    result = os.system('python a_DataAquisition/retrieve_gmail.py')
    if result != 0:
        return {'status':"Failure"}
    return {'status':"Success"}

@app.route('/dataCleaning/')
def dataCleaning():
    import dataclean
    output = dataclean.load_corpus()
    if output != 0:
        return {'status':output}
    print("Kaizer Chiefs")
    return {'status':output}

@app.route('/featureEngineer/')
def featureEngineer():
    import featureengineering
    output = featureengineering.dataextraction()
    if output != 0:
        return output
    print("Kaizer Chiefs")
    return {'Error':output}


@app.route('/featureAnalysis/')
def featureAnalysis():
    import featureanalysis
    output = featureanalysis.textblobClassifiers()
    if output != 0:
        return output
    print("Kaizer Chiefs")
    return {'Error':output}


@app.route('/unreadAnalysis/')
def unreadAnalysis():
    import featureanalysis
    classifiername = request.args.get('type')
    output = featureanalysis.analyzeunreadmail(classifiername)
    if output != 0:
        return output
    print("Kaizer Chiefs")
    return {'Error':output}


@app.route('/sendwarningmail/')
def sendwarningmail():
    import sendwarningemail
    message = request.args.get('message')
    output = sendwarningemail.send_mail(message)
    if output != 0:
        return "Success"
    print("Kaizer Chiefs")
    return {'Error': output}


def module_from_file(module_name, file_path):
    print(file_path)
    print("#####################################")
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


if __name__=="__main__":
    app.run(debug=True)