from fastapi import Query
from database.engine import session,engine
import datetime
import bcrypt
from models import models
from config import logError
from helpers import passhash


db = session


#---------------------------User---------------------------#

def if_user_exist(email: str):
    query = f'SELECT * FROM users where email = "{email}"'
    with engine.connect() as conn:
        is_exist = conn.execute(query).fetchone()
        return is_exist

def role_power(user_id: int):
    query = f'SELECT role_power FROM role INNER JOIN users on role.role_id = users.role_id where id = {user_id}'
    with engine.connect() as conn:
        res = conn.execute(query)
        roles = res.fetchall()
        if roles != []:
            for x in roles:
                return x[0]
        else:
            return logError.NO_USER_WITH_THAT_ID_ERROR

def add_new_user(user_schema):
    salt = bcrypt.gensalt()
    password = user_schema.password
    new_user = models.Users(c_id = user_schema.c_id,fullname = user_schema.fullname,email = user_schema.email,password = passhash.genrate_hash_password(password,salt).decode(),salt = salt,contact_no = user_schema.contact_no, working_under = user_schema.working_under, dob = user_schema.dob, isactive = 1 , role_id = user_schema.role_id,created_at = datetime.datetime.now())
    db.add(new_user)
    db.commit()
    db.close()

def update_user(user_schema,id: int):
    query = f'UPDATE users SET c_id = {user_schema.c_id}, fullname = "{user_schema.fullname}", email = "{user_schema.email}", contact_no = "{user_schema.contact_no}", working_under = {user_schema.working_under}, dob = "{user_schema.dob}", role_id = {user_schema.role_id}, updated_at = "{datetime.datetime.now()}"  where id = {id}'
    res = db.execute(query)
    db.commit()
    db.close()

def list_all_user():
    query = 'SELECT * FROM users WHERE isactive = 1'
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def list_user_admin(cur_user):
    query = f"SELECT * FROM users WHERE role_id != 0 AND c_id = {cur_user.c_id} AND isactive = 1"
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def list_user_supervisor(cur_user):
    query = f"SELECT * FROM users WHERE role_id != 0 AND role_id != 1 AND c_id = {cur_user.c_id} AND isactive = 1"
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def list_user_id(id: int):
    return db.query(models.Users).get(id)

def list_user_id_admin(id: int,cur_user):
    query = f"SELECT * FROM users WHERE id = {id} AND role_id != 0 AND c_id = {cur_user.c_id}"
    with engine.connect() as conn:
        return conn.execute(query).fetchone()

def list_user_id_supervisor(id: int,cur_user):
    query = f"SELECT * FROM users WHERE id = {id} AND role_id != 0 AND role_id != 1 AND c_id = {cur_user.c_id}"
    with engine.connect() as conn:
        return conn.execute(query).fetchone()

def update_email_check(id: int):
    query = f"SELECT email FROM users WHERE id != '{id}'"
    return db.execute(query).fetchall()

def list_supervisor_superadmin():
    query = f"SELECT * FROM users WHERE role_id = 2"
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def list_supervisor_admin_supervisor(cur_user_cid):
    query = f"SELECT * FROM users WHERE role_id = 2 and c_id = {cur_user_cid}"
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def delete_user_superadmin(id):
    try:
        query = f"UPDATE users SET isactive = 0 where id = {id} and role_id != 0"
        #"delete from users where id = {id}"
        db.execute(query)
        db.commit()
        db.close()
        return "User Deleted"
    except:
        return "Unable to Delete"

def delete_user_admin(id):
    try:
        query = f'UPDATE users SET isactive = 0 where id = {id} and role_id != 0 and role_id != 1'
        db.execute(query)
        db.commit()
        db.close()
        return True
    except:
        return False

def delete_user_supervisor(id):
    try:
        query = f'UPDATE users SET isactive = 0 where id = {id} and role_id != 0 and role_id != 1 and role_id != 2'
        db.execute(query)
        db.commit()
        db.close()
        return "User Deleted"
    except:
        return "Unable to Delete"

#----------------------Company------------------------#

def validate_comp_name(cmpny_name: str):
    return db.query(models.Company).filter(models.Company.company_name == cmpny_name).first()

def validate_comp_name_update(cmpny_name: str,id: int):
    query = f'SELECT company_name FROM company WHERE company_id != {id}'
    res = db.execute(query).fetchall()
    if cmpny_name in res:
        return True
    else:
        return False

def list_of_cid():
    companyid = db.query(models.Company).with_entities(models.Company.company_id)
    id_list = []
    for company_id in companyid:
        id_list.append(company_id[0])
    return id_list

def add_new_company(data):
    new_company = models.Company(company_name = data.company_name,country = data.country, state = data.state, city = data.city, pincode = data.pincode, department = data.department, branch = data.branch, address = data.address, created_at = datetime.datetime.now(),isactive = 1)
    db.add(new_company)
    db.commit()
    db.close()

def update_company(data,id):
    query = f'update company set company_name = "{data.company_name}",country = "{data.country}", state = "{data.state}", city = "{data.city}", pincode = "{data.pincode}", department = "{data.department}", branch = "{data.branch}", address = "{data.address}", updated_at = "{datetime.datetime.now()}"  where company_id = {id}'
    db.execute(query)
    db.commit()
    db.close()

def list_company_superadmin():
    query = 'SELECT * FROM company WHERE isactive = 1'
    with engine.connect() as conn:
        return conn.execute(query).fetchall()

def list_company_superadmin_id(id: int):
    return db.query(models.Company).get(id)

def delete_compnany(id: int):
    query = f'UPDATE company SET isactive = 0 where company_id = {id}'
    db.execute(query)
    db.commit()
    new_query = f'UPDATE users SET isactive = 0 where c_id = {id}'
    db.execute(new_query)
    db.commit()

#-----------------------resetPassword----------------------------#

def reset_pass(new_password,email):
    salt = bcrypt.gensalt()
    newpass = new_password
    h_pass = passhash.genrate_hash_password(newpass,salt).decode('utf-8')
    salt = salt.decode('utf-8')
    query = f'update users set password = "{h_pass}", salt = "{salt}" where email = "{email[0]}"'
    db.execute(query)
    db.commit()
    db.close()
