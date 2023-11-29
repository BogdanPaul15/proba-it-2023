# Proba Tehnica IT 2023 - Frontend

## Detalii

Am încercat să respect cât de mult am putut [mock-ul propus](https://www.figma.com/file/xVbkT0NqONJIZbreiG9tRQ/Proba?type=design&node-id=0-1&mode=design&t=L9cBL79FCFs96lph-0) pentru design-ul aplicației, ba chiar am adus destul de multe îmbunătățiri la el, este full responsive, având 3 breakpoint-uri generale, câte unul pentru fiecare categorie importanta de ecrane (**mobile**, **tablet**, **desktop**).

## Tehnologii

Pentru implementare am folosit **ReactJS**, pentru comunicarea cu backend am folosit **Axios**, iar pentru o strcturare mai bună a _CSS_-ului am folosit **SCSS**.

## Rulare

Pentru rularea frontend-ului, trebuie să mergi în folderul **frontend/** și să rulezi următoarele comenzi:

```
    npm i
```

și apoi

```
    npm run dev
```

Frontend-ul ar trebui să fie deschis în browser la adresa [asta](http://localhost:5173).

## Task-uri implementate

### 1. Navbar

Este fixat sus, conține logo-ul și o listă (meniu) cu 4 butoane, fiecare buton fiind _conditional rendered_ după informațiile utilizatorului. Dacă utilizatorul este logat, atunci se vor afișa doar butoanele de 'logout' și de 'create poll'. În caz contrar, se vor afișa doar 'login' și 'register'.

Pe mobile, meniul se comprimă într-un buton de tip hamburger, fiind afișat doar la apăsare.

### 2. Footer

Footer-ul conține cele 3 link-uri către paginile LSAC ale evenimentului (twitch, facebook, instagram).

### 3. Autentificare

Fiecare dintre butoanele de 'login' și 'register' deschid câte un popup, blocând accesarea conținutului din spate.

#### 3.1 Înregistrare

Formularul conține 3 câmpuri: _email_, _parolă_, _confirmare parolă_. După ce utilizatorul s-a înregistrat cu succes, se va deschide popup-ul pentru conectare. Altfel, se afișeaza mesaj de eroare.

#### 3.2 Conectare

Formularul conține 2 câmpuri: _email_, _parolă_. După ce utilizatorul s-a conectat cu succes, este redirecționat către pagina principală (token-ul de JWT este salvat ca și cookie). Altfel, se afișeaza mesaj de eroare.

### 4. Pagina de poll-uri

Fiecare sondaj este reprezentat individual prin componenta sa, precum și **întrebarea**, **opțiunile** și butoane pentru **acțiuni posibile**.

Un utilizator care nu este logat, nu este lăsat să selecteze o opțiune.

Nu poți vota dacă nu ai selectat vreo opțiune, vei primi eroare. Dacă tu ești și cel care a creat poll-ul respectiv, atunci va apărea și un buton de 'delete' pentru a șterge poll-ul din baza de date.

#### Bonus: Vote Poll

Am implementat și bonusul pentru votat, întocmai cum este descris în cerință. Cum am spus și mai sus, dacă utilizatorul nu este logat, atunci nu va fi lăsat să voteze. Dacă utilizatorul este logat și nu a votat, nu vor apărea rezultatele pentru poll-ul respectiv. Doar după ce utilizatorul a și votat la poll-ul respectiv, nu mai este lăsat să voteze, iar rezultatele totale (cât și pentru fiecare opțiune) sun afișate sub forma unor progress bar-uri și prin procente din numărul total de voturi.

### 5. Crearea unui poll

Prin apăsarea butonului 'create poll' din meniu, se va deschide un popup similar cu cele de login și register, unde utilizatorul va fi lăsat să-și creeze propriul poll.

##### Bonus: Multiple Options

By default, utilizatorul poate crea un poll doar cu 3 variante de răspuns, însă am implementat un buton care o dată ce este apăsat, va crea un nou input pentru o nouă variantă de răspuns. De asemenea, input-urile adăugate pot fi și șterse, tot în cadrul formularului.

#### 5.1 Delete Poll

Am implementat și posibilitatea de a șterge un poll printr-un buton de 'delete'.

##### Bonus: Only Delete My Polls

Un poll va avea un buton de 'delete' dacă și numai dacă user-ul curent este user-ul care l-a creat.

### 6. Responsiveness

Cum am mai spus, aplicația este 100% responsive.
