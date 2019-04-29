from flask_api import FlaskAPI
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import importlib, importlib.util, os.path
import os

app = FlaskAPI(__name__)
CORS(app, support_credentials=True)


@app.route('/Authenticate',methods=['POST'])
def Authenticate():
    content = request.json
    return jsonify({'username':content['username'],'password':content['password']})


@app.route('/dataAcquisition/')
def dataAcquisition():
    result = os.system('python a_DataAquisition/retrieve_gmail.py')
    if result != 0:
        return {'status':"Failure"}
    return {'status':"Success"}


@app.route('/dataCleaning/')
@cross_origin(supports_credentials=True)
def dataCleaning():
    print("Just before the call, ")
    output = os.system('python dataclean.py')
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
    # classifiername = request.args.get('type')
    # print("Just before the call, ", classifiername)
    output = featureanalysis.analyzeunreadmail("RandomTree")
    if output != 0:
        return output
    print("Kaizer Chiefs")
    return {'Error':output}


@app.route('/sendmail/')
def sendmail():
    import sendwarningemail
    content = request.json
    message = content['message']
    print("Just before the call, ", message)
    output = sendwarningemail.send_mail(message)
    if output != 0:
        return jsonify(success=0)
    return jsonify(success=1)


def module_from_file(module_name, file_path):
    print(file_path)
    print("#####################################")
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


if __name__=="__main__":
    app.run(debug=True)