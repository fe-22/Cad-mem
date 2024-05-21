
from flask import Flask, send_from_directory

app = Flask(__name__)

#Armazena a planilha em um diretorio chamado 'spreadsheets'
@app.route('/spreadsheets/<path: filename>')
def send_spreadsheets(filename):
    return send_from_directory('spreadsheets', filename)

#Armazena a interface em um diretório chamado 'interface'
@app.route('/interface/<path: filename>')
def send_interface(filename):
    return send_from_directory('interface', filename)


if __name__ == '__main__':
    app.run(debug=True)
