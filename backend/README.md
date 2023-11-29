# Proba Tehnica IT 2023 - Backend

## Detalii

Backend-ul a fost un challenge pentru mine, pentru că nu prea știam backend mai deloc și am reușit să învăț tot ce mi-a trebuit în câteva zile de la 0.

## Tehnologii

Pentru implementare am folosit **NODEJS**, mai exact **EXPRESS**, iar pentru baza de date am folosit **MongoDB**.

## Rulare

Pentru rularea backend-ului, trebuie să mergi în folderul **backend/** și să rulezi următoarele comenzi:

```
    npm i
```

și apoi

```
    npm start // dacă vrei să rulezi codul în enviromentul 'development'
```

sau

```
    npm run start:prod // dacă vrei să rulezi codul în enviromentul 'production'
```

Serverul ar trebui să asculte la adresa [asta](http://localhost:3000).

## Task-uri implementate

### 1. Register & Login

#### Register

```
    POST /api/users/register
```

Preluează datele necesare pentru înregistrarea unui nou utilizator în entitatea **User** din baza de date. Verificările necesare sunt efectuate în schema **User**, dar și în controller-ul specific.

```
    POST /api/users/login
```

Preluează datele necesare, verifică autentificarea și setează un cookie pentru tokenul **JWT**.

### 2. CRUD

```
    GET /polls - întoarce toate poll-urile din baza de date
```

```
    POST /polls - creează un poll, îl inserează în baza de date
```

```
    DELETE /polls/:id - șterge un poll din baza de date pe baza id-ului furnizat
```

```
    PATCH /polls/vote/:id - incrementează numărul de voturi
```

### BONUS

#### Password Encryption

Parolele sunt criptate folosind **bcrypt** înainte de a fi salvate în baza de date.

#### Validate email & password

Am implementat în schema **User** următoarele validari:

-   email-ul să fie de tipul **'@gmail'**;
-   parola să aibă între 8 și 32 de caractere;
-   câmpurile 'parola' și 'confirmă parola' din formularul de înregistrare să fie la fel;

#### Endpoint Validation

##### Create (Post)

-   fiecare poll are un owner
-   validarea ownerului se realizează extrăgând id-ul userului din token-ul **JWT** și verificând dacă este același cu cel al ownerului poll-ului respectiv

##### Stergere (Delete)

-   este restricționată doar pentru user-ul care a creat poll-ul respectiv

#### Vote a poll

-   incrementează numărul de voturi
-   merge doar dacă userul este logat și nu a votat deja la poll-ul respectiv
-   se salvează pentru fiecare poll id-ul userilor care au votat deja
