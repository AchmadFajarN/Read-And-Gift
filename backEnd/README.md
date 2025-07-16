Required
--
- postgreSQL (Versi terbaru disarankan)
- nodeJs (Versi terbaru disarankan)

## Pendahuluan
- Buat file bernama `.env` jika tidak ada. 
- Isi file tersebut menggunakan format
```bash
#Server Configuration
HOST=
PORT=

# Postgre Config
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=

# Authentication config
ACCESS_TOKEN_KEY=
REFRESH_TOKEN_KEY=
ACCESS_TOKEN_AGE=

# node-pg-migrate url
DATABASE_URL==

```
## Authentication
- Isi setiap variable untuk 'Authentication config' kecuali `ACCESS_TOKEN_AGE` menggunakan module javascript `crypto` di REPL, contoh:
```js
require('crypto').randomBytes(64).toString('hex');
```
- Isi `ACCESS_TOKEN_AGE` dengan waktu token akan aktif misal `3600` artinya token akan aktif selama 1 jam.
```
ACCESS_TOKEN_AGE=3600
```

## Migration
- isi variable `DATABASE_URL` di file `.env` dengan format:
```bash
DATABASE_URL=postgresql://<pg-user>:<pg-password>@<-pg-host>:<pg-port>/<pg-database>
```
contoh:
```bash
DATABASE_URL=postgresql://developer:secret@localhost:5432/readAndGift
```

- Jalankan printah 
```bash
npm run migrate up
```

## Jalankan Aplikasi (Development)
- Isi variable `PORT` dan `HOST` di `.env`
```bash
HOST=localhost
PORT=5000
```

- Jalankan perintah
```bash
npm run start:dev
```

Documentation API
==
User Register
--
### Method: `POST` 
### Endpoint: /users/register
Body request required . <br>
- Mode: raw (JSON)
- Validator:
```bash
username: string
fullname: string
password: string
email: string
address: string
no_contact: number
sosmed_url: array[string]
```
Contoh body request: 
```bash
{
    "username": "budi",
    "fullname": "Ahmad Budi",
    "password": "secret",
    "email": "budi@mail.com",
    "address": "cianjur",
    "no_contact": "087712333212",
    "sosmed_url": ["http://linkedin/budi", "http://instagram/budi"]
}
```
### Response
- Status code `201 Ok`
- body response: 
```bash
{
    status: 'sucess',
    message: 'Akun berhasil terdaftar',
    data: {
        userId: 'users-ajsdnj1123'
    }
}
```

Image Profile Register
--
### 1. Method: `POST`
### Endpoint: /users/{id}/profileImge

Body request required
- Mode: multipart/form-data (image)
- Key: image
- validator: Hanya menerima format yang diperuntukan image

### Response
- status code: 201
- response body:
```bash
{
    status: 'success',
    message: 'Foto profile berhasil diunggah',
    data: {
        url: http://localhost:4000/profile/121212-userphoto
    }
}
```


User Service
--
### 1. Get User By Id
### Method: `GET`,
### Endpoint: '/user/{id}'
- User Id as params required
- Bearer Token As Authorization is Required

### Response
- Status Code(200)
- Reponse body:
```bash
{
    status: 'success',
    data: {
        username: 'budi',
        fullname: 'ahmad budi',
        image_profile_url: 'http://localhost:5000/profile/11221-userphoto' 
    }
}
```
<br>

### 2. Edit User By Id
### Method: `PUT`
### Endpoint: '/user/{id}'
- User id as param required
- Bearer Token As Authorization is Required
- Hanya pemilik akun yang bisa mengubah user

body request required
- validator:
```bash
{
    username: string,
    fullname: string,
    address: string,
    sosmed_url: array[string]
}
```
contoh:
```json
{
    "username": "John",
    "fullname": "John Doe",
    "address": "Tasik Malaya",
    "sosmed_url": ["http://linkedin/john", "https://instagram/john]
}
```
### response
- status code(200)
- response body: 
```bash
{
    status: 'success',
    message: 'akun berhasil diupdate'
}
```

### 3. Delete User By Id
### Method: `DELETE`
### Endpoint: '/user/{id}'
- User id as param required
- Bearer Token As Authorization is Required
- Hanya pemilik akun yang bisa menghapus user

### response
- status code(200)
- response body:
```json
{
    "status": "success",
    "message": "akun berhasil dihapus"
}
```





