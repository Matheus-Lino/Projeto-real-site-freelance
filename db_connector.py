# from mysql.connector import connect, Error
# from mysql.connector.cursor import MySQLCursorDict

# DB_CONFIG = {
#     "host": "localhost",
#     "user": "root",  
#     "password": "Ponte123", 
#     "database": "outlet_machado"
# }

# def create_connection():
#     connection = None
#     try:
#         connection = connect(**DB_CONFIG)
#         print(">>> DEBUG: Conexão MySQL estabelecida com sucesso.")
#         return connection
#     except Error as err:
#         # PONTO CRÍTICO: SE HOUVER UM ERRO DE CREDENCIAL, APARECERÁ AQUI!
#         print(f"\n\n!!! ERRO CRÍTICO DE CONEXÃO COM O BANCO !!!")
#         print(f"ERRO: {err}")
#         print("!!! Verifique se o MySQL Server está ligado e se as credenciais (user/password) estão corretas.\n")
#         return None

# def execute_read_query(query, params=None):
#     connection = create_connection()
#     if connection is None:
#         return []

#     cursor = connection.cursor(dictionary=True) 
#     result = []
    
#     try:
#         cursor.execute(query, params or ())
#         result = cursor.fetchall()
#         print(f">>> DEBUG: Query executada: '{query}'. Linhas retornadas: {len(result)}") 
#     except Error as err:
#         print(f">>> ERRO DE QUERY: {err}")
#     finally:
#         cursor.close()
#         connection.close()
        
#     return result

# def execute_read_one_query(query, params=None):
#     connection = create_connection()
#     if connection is None:
#         return None
#     cursor = connection.cursor(dictionary=True)
#     result = None
#     try:
#         cursor.execute(query, params or ())
#         result = cursor.fetchone()
#     except Error as err:
#         print(f">>> ERRO DE QUERY ONE: {err}")
#     finally:
#         cursor.close()
#         connection.close()
#     return result

# def execute_commit_query(query, params=None):
#     connection = create_connection()
#     if connection is None:
#         return 0
#     cursor = connection.cursor()
#     rows_affected = 0
#     try:
#         cursor.execute(query, params or ())
#         connection.commit()
#         rows_affected = cursor.rowcount
#         print(f">>> DEBUG: Commit executado. Linhas afetadas: {rows_affected}") 
#     except Error as err:
#         print(f">>> ERRO DE COMMIT: {err}")
#         connection.rollback()
#     finally:
#         cursor.close()
#         connection.close()
#     return rows_affected

from mysql.connector import connect, Error
from mysql.connector.cursor import MySQLCursorDict
import os # ESSENCIAL: Adicionar o módulo os para ler variáveis de ambiente

# ----------------------------------------------------------------------
# CORREÇÃO: LÊ AS VARIÁVEIS DE AMBIENTE DO RAILWAY
# ----------------------------------------------------------------------
DB_CONFIG = {
    # Em produção (Railway), ele usará as credenciais do novo Add-on MySQL.
    "host": os.environ.get('MYSQL_HOST', 'localhost'), 
    "user": os.environ.get('MYSQL_USER', 'root'),  
    "password": os.environ.get('MYSQL_PASSWORD', 'Ponte123'), 
    "database": os.environ.get('MYSQL_DATABASE', 'outlet_machado')
}
# ----------------------------------------------------------------------


def create_connection():
    connection = None
    try:
        connection = connect(**DB_CONFIG)
        print(">>> DEBUG: Conexão MySQL estabelecida com sucesso.")
        return connection
    except Error as err:
        print(f"\n\n!!! ERRO CRÍTICO DE CONEXÃO COM O BANCO !!!")
        print(f"ERRO: {err}")
        print("!!! Verifique as variáveis de ambiente (MYSQL_*) no Dashboard do Railway. !!!\n")
        return None

def execute_read_query(query, params=None):
    connection = create_connection()
    if connection is None:
        return []

    cursor = connection.cursor(dictionary=True) 
    result = []
    
    try:
        cursor.execute(query, params or ())
        result = cursor.fetchall()
        print(f">>> DEBUG: Query executada: '{query}'. Linhas retornadas: {len(result)}") 
    except Error as err:
        print(f">>> ERRO DE QUERY: {err}")
    finally:
        cursor.close()
        connection.close()
        
    return result

def execute_read_one_query(query, params=None):
    connection = create_connection()
    if connection is None:
        return None
    cursor = connection.cursor(dictionary=True)
    result = None
    try:
        cursor.execute(query, params or ())
        result = cursor.fetchone()
    except Error as err:
        print(f">>> ERRO DE QUERY ONE: {err}")
    finally:
        cursor.close()
        connection.close()
    return result

def execute_commit_query(query, params=None):
    connection = create_connection()
    if connection is None:
        return 0
    cursor = connection.cursor()
    rows_affected = 0
    try:
        cursor.execute(query, params or ())
        connection.commit()
        rows_affected = cursor.rowcount
        print(f">>> DEBUG: Commit executado. Linhas afetadas: {rows_affected}") 
    except Error as err:
        print(f">>> ERRO DE COMMIT: {err}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()
    return rows_affected