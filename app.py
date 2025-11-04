# from flask import Flask, jsonify, request
# from flask_cors import CORS 
# # Importa as funções do conector
# from db_connector import execute_read_query, execute_read_one_query, execute_commit_query

# app = Flask(__name__)

# # Configuração do CORS
# CORS(app) 

# @app.route('/products', methods=['GET'])
# def get_products():
#     """Consulta todos os produtos."""
#     query = "SELECT * FROM products"
#     products_list = execute_read_query(query)
#     return jsonify(products_list)

# @app.route('/categories', methods=['GET'])
# def get_categories():
#     query = "SELECT id, name FROM categories"
#     categories_list = execute_read_query(query)
#     return jsonify(categories_list)

# @app.route('/brands', methods=['GET'])
# def get_brands():
#     query = "SELECT id, name FROM brands"
#     brands_list = execute_read_query(query)
#     return jsonify(brands_list)

# @app.route('/products/<int:product_id>', methods=['GET'])
# def get_product(product_id):
#     query = "SELECT * FROM products WHERE id = %s" 
#     product = execute_read_one_query(query, (product_id,))
#     if product:
#         return jsonify(product)
#     return jsonify({"message": "Produto não encontrado"}), 404

# @app.route('/products', methods=['POST'])
# def create_product():
#     product_data = request.get_json()
#     name = product_data.get('name')
#     price = product_data.get('price')
#     description = product_data.get('description')
#     category_id = product_data.get('category_id') 
#     brand_id = product_data.get('brand_id')
#     stock = product_data.get('stock')
#     image_url = product_data.get('image_url', '')
    
#     if not name or not price:
#         return jsonify({"message": "Nome e preço são obrigatórios"}), 400
        
#     query = """
#     INSERT INTO products (name, price, description, category_id, brand_id, stock, image_url) 
#     VALUES (%s, %s, %s, %s, %s, %s, %s)
#     """
#     data = (name, price, description, category_id, brand_id, stock, image_url)
    
#     rows_affected = execute_commit_query(query, data)
    
#     if rows_affected > 0:
#         return jsonify({"message": "Produto criado com sucesso"}), 201
#     else:
#         return jsonify({"message": "Erro ao criar o produto"}), 500

# # Rota: PUT /products/<id>
# @app.route('/products/<int:product_id>', methods=['PUT'])
# def update_product(product_id):
#     product_data = request.get_json()
#     name = product_data.get('name')
#     price = product_data.get('price')
#     description = product_data.get('description')
#     category_id = product_data.get('category_id')
#     brand_id = product_data.get('brand_id')
#     stock = product_data.get('stock')
#     image_url = product_data.get('image_url', '')

#     query = """
#     UPDATE products 
#     SET name = %s, price = %s, description = %s, category_id = %s, brand_id = %s, stock = %s, image_url = %s
#     WHERE id = %s
#     """
#     data = (name, price, description, category_id, brand_id, stock, image_url, product_id)
    
#     rows_affected = execute_commit_query(query, data)
    
#     if rows_affected > 0:
#         return jsonify({"message": f"Produto ID {product_id} atualizado com sucesso"}), 200
    
#     return jsonify({"message": f"Produto ID {product_id} não encontrado ou nenhum dado alterado"}), 404

# # Rota: DELETE /products/<id>
# @app.route('/products/<int:product_id>', methods=['DELETE'])
# def delete_product(product_id):
#     query = "DELETE FROM products WHERE id = %s"
#     data = (product_id,) 
    
#     rows_affected = execute_commit_query(query, data)
    
#     if rows_affected > 0:
#         return jsonify({"message": f"Produto ID {product_id} excluído com sucesso"}), 200
    
#     return jsonify({"message": f"Produto ID {product_id} não encontrado"}), 404

# if __name__ == '__main__':
#     print("Iniciando API em http://127.0.0.1:5000/")
#     app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS 
# ESSENCIAL: Adiciona o módulo os para ler variáveis de ambiente
import os 
# Importa as funções do conector
from db_connector import execute_read_query, execute_read_one_query, execute_commit_query

app = Flask(__name__)

# ----------------------------------------------------------------------
# CORREÇÃO 1: CONFIGURAÇÃO DE CORS
# ----------------------------------------------------------------------
# Lê o domínio do Vercel da variável que você criou (VERCEL_ORIGIN)
VERCEL_ORIGIN = os.environ.get('VERCEL_ORIGIN', 'http://localhost:5173') 
RAILWAY_ORIGIN = os.environ.get('RAILWAY_ORIGIN', 'https://projeto-real-site-freelance-production.up.railway.app') 

# Lista de origens permitidas
ALLOWED_ORIGINS = [
    VERCEL_ORIGIN,
    RAILWAY_ORIGIN,
    "http://localhost:5173", # Para testes locais
    "http://127.0.0.1:5000", # Para testes locais
]

# Configuração do CORS: Permite apenas as origens seguras
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}}) 
# ----------------------------------------------------------------------

@app.route('/products', methods=['GET'])
def get_products():
    """Consulta todos os produtos."""
    query = "SELECT * FROM products"
    products_list = execute_read_query(query)
    return jsonify(products_list)

@app.route('/categories', methods=['GET'])
def get_categories():
    query = "SELECT id, name FROM categories"
    categories_list = execute_read_query(query)
    return jsonify(categories_list)

@app.route('/brands', methods=['GET'])
def get_brands():
    query = "SELECT id, name FROM brands"
    brands_list = execute_read_query(query)
    return jsonify(brands_list)

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    query = "SELECT * FROM products WHERE id = %s" 
    product = execute_read_one_query(query, (product_id,))
    if product:
        return jsonify(product)
    return jsonify({"message": "Produto não encontrado"}), 404

@app.route('/products', methods=['POST'])
def create_product():
    product_data = request.get_json()
    name = product_data.get('name')
    price = product_data.get('price')
    description = product_data.get('description')
    category_id = product_data.get('category_id') 
    brand_id = product_data.get('brand_id')
    stock = product_data.get('stock')
    image_url = product_data.get('image_url', '')
    
    if not name or not price:
        return jsonify({"message": "Nome e preço são obrigatórios"}), 400
        
    query = """
    INSERT INTO products (name, price, description, category_id, brand_id, stock, image_url) 
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    data = (name, price, description, category_id, brand_id, stock, image_url)
    
    rows_affected = execute_commit_query(query, data)
    
    if rows_affected > 0:
        return jsonify({"message": "Produto criado com sucesso"}), 201
    else:
        return jsonify({"message": "Erro ao criar o produto"}), 500

# Rota: PUT /products/<id>
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product_data = request.get_json()
    name = product_data.get('name')
    price = product_data.get('price')
    description = product_data.get('description')
    category_id = product_data.get('category_id')
    brand_id = product_data.get('brand_id')
    stock = product_data.get('stock')
    image_url = product_data.get('image_url', '')

    query = """
    UPDATE products 
    SET name = %s, price = %s, description = %s, category_id = %s, brand_id = %s, stock = %s, image_url = %s
    WHERE id = %s
    """
    data = (name, price, description, category_id, brand_id, stock, image_url, product_id)
    
    rows_affected = execute_commit_query(query, data)
    
    if rows_affected > 0:
        return jsonify({"message": f"Produto ID {product_id} atualizado com sucesso"}), 200
    
    return jsonify({"message": f"Produto ID {product_id} não encontrado ou nenhum dado alterado"}), 404

# Rota: DELETE /products/<id>
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    query = "DELETE FROM products WHERE id = %s"
    data = (product_id,) 
    
    rows_affected = execute_commit_query(query, data)
    
    if rows_affected > 0:
        return jsonify({"message": f"Produto ID {product_id} excluído com sucesso"}), 200
    
    return jsonify({"message": f"Produto ID {product_id} não encontrado"}), 404

if __name__ == '__main__':
    # CORREÇÃO 2: Usa a porta definida pelo Railway e escuta em 0.0.0.0
    port = int(os.environ.get('PORT', 5000)) 
    print(f"Iniciando API em http://0.0.0.0:{port}/")
    app.run(host='0.0.0.0', port=port, debug=False)