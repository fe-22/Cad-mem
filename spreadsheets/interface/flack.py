from flask import Flask, render_template

app = Flask(__name__template_folder='cad+mem.html')

@app.route('/')
def home():
    return render_template('cad+mem.html')

@app.route('/formulario')
def formulario():
    return render_template('cad+mem.html')

if __name__ == '__main__':
    app.run(debug=True)
