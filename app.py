from flask import Flask, request, jsonify,render_template
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# Conexión a la base de datos
def conexion():
    con = sqlite3.connect("notes.db")
    con.row_factory = sqlite3.Row
    return con


def inicializar_db():
    con = conexion()
    cursor = con.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            contenido TEXT NOT NULL
        )
    """)
    con.commit()
    con.close()

@app.route('/notes', methods=['POST'])
def anadir_nota():
    # extraemos los datos
    data = request.get_json()
    titulo = data.get("titulo")
    contenido = data.get("contenido")
    
    if not titulo:
        return jsonify({"Error":"Nota sin titulo"}),400
    if not contenido:
        return jsonify({"Error":"Nota vacia"}),400
    
    # aqui los insertamos en la base de datos
    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO notes (titulo,contenido) VALUES (?,?)""",(titulo,contenido))
    conn.commit()
    conn.close()    
    return jsonify({"message":"Nota guardada"}),201

if __name__ == '__main__':
    inicializar_db()
    app.run(debug=True)
