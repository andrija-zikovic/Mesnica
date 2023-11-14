Mesnica Web Trgovina

Ovo je moji prvi samostalni projekt

Krajem 2022. doživio sam ozljedu(pad sa visine) na poslu koja mi je dala priliku 
i vrijeme da se počnem baviti programiranjem.

Započeo sam sa Pythonom s nekoliko tuturiala, ali nisam shvaćao šta radim i to mi je smetalo.
Nisam htio tipkati u prazno bez da razumijem šta se dešava ispod tih sintaksi koje pišem.

Potražio sam najbolji content na webu s kojim mogu naučiti dubinu programiranja i 
otkrio sam vrlo poznati Harvardov CS50, za mene tad velika nepoznanica.

Odmah mi se svidio jer je to najbliže fakultetskom predavanju od svih tuturial na koje sam naišao, zato što nije tuturial.

CS50 mi je pomogao da razumijem dubinu programiranja. Sad shvačam ulogu kompajlera, razumijem kako strojni jezik funkcionira,
te kako se zaista informacije prenose preko jedinica i nula. Upoznao me sa SQL bazom podataka i raznim metodama pretraživanja 
podataka(Bubble sort, Merge sort..).

Nakon CS50 sam se bacion na izradu prve web stranica s pythonom, flaskom i jinjom, tad sam se prvi put upoznao sa JavaScriptom 
koji sam koristio u html skriptama.

Nakon šta sam napravio sve šta sam htio s tom prvom web stranicom, osječao sam se nekako ograničeno u flasku. 

Mislio sam da je problem u frameworku, i odlučio sam naučiti React jer je on jedan od poznatijih.

Kroz React tuturial od Dave Graya na Youtubeu počeo sam shvačati kolike mi probleme nerazumijevanj CSS-s i HTML-a zadaje probleme
i usporava moji napredak. Stopirao sam učenje Reacta i posvetit sam se HTML-u i CSS-u.

U HTML-u sam se morao bolje upoznati s elementima i atributima koje želim koristit i koji su mi potrebni. 
A u CSS-u trebao sam naučiti kako kristit flex, grid i ostale stilove kako bi mogao postaviti i urediti elemente onako kako želim.

Nakon toga sam se spreman vratio na učenje Reacta. 

Kroz tuturial naučio sam kako se israđuju komponente, kako se koriste hooks useState, useEffect, kako se šalju svojstva(prop) kroz komponente, što je to prop driling i zašto nije dobro, useContext, useRef.

Stvarno mi se svidio React, osječao sam se kao da je sve moguće. Uvijek je sve bilo moguće, samo sam tek tad to shvatio.
Fascinantno je kako s tim malim uređajem s tipkovnicom u svom krili imaš neograničene mogućnosti. 
Kad gradiš kuću, moraš ići na stotine lokacije, kako bi rješavao probleme koji su vezani za tu kuću.
A u digitalnom svijet sve probleme riješavaš s jednog mjesta. Prelijepo.

Dok sam radio na ovoj web trgovini, došao sam do problema gdje sam morao nači rješenje za manipulaciju proizvodima.
Kako će vlasnik web trgovine izrađivati, mjenjati i uređivati proizvode. 

Logično rješenje je bilo nekakva baza podataka, ali nisam htio manipulirati bazom podataka s frontenda, pa je jedino 
rješenje bilo pozabaviti se s nekakvim backendom. Potražio sam koji je dobar javascript backend framework koji se koristi uz React.

Tad sam se upoznao s node.js-om. Odlučio sam se opet kroz tuturila naučiti osnove Node.js-a kako bi mogao zadovoljiti potrebe
web trgovine. 

# **SERVER**

Prvi framework za Node.js s kojim sam se upoznao je "express", u ovom projektu koristim ga za definiranje URL ruta. 

Nakon izrade prvih ruta morao sam definirati credentials middleware kako mi mogao definirati koji url
ima pristup ovom serveru. Za to sam izradio dva filea, jedan u kojem definiram listu URLova koji će
imati pristup, a drugi je middleware koji provjerava dal je URL s kojeg dolazi request u listi URLova 
i daje dopuštenje za slanje kredencijala. Nakon toga koristim "cors" koji isto provjerava dal URL ima 
dopuštenje za slanje requesta.

## server/routes/products.js 

Izradio sam nekoliko ruta, prva je bila za slanje podataka o proizvodima ( url/products ). 

## server/controllers/productsContorller.js

Kad se pristupi ruti, server obrađuje productsController koji iz mongoDB NoSQL baze podataka izvlači listu proizvoda

```javascript
[ {
    _id: ObjectId,
    title: String,
    price: Number,
    onStorage: Number,
    meatType: String,
    imgSrc: String
}]
```

i vraća kao response. 
Za izvlačenje podataka s mongoDB koristim "mongoose" s kojim se spajam na bazu 
podataka, i izrađivanje Schema pomoću kojih definiram šta želim izvući iz baze podataka.

## server/routes/order.js  

Sljedeće ruta ( url/order ) obrađuje naruđbu. Kad se pristupi ruti server obrađuje orderController.

## server/controllers/orderController.js

orderController s podacima koje dobiva kroz request, izrađuje QR kod koji prenosi informacije :
```javascript
{
HRVHUB30
EUR
${amount}
${req.body.buyer.company}
${req.body.buyer.address}
${req.body.buyer.zip} ${req.body.buyer.city}
Sample name 
Sample Street
Sample Zipcode City
${bankAcc}
HR04
123456879-123456
COST
RAČUN BR ${nextInvoiceNumber}
}
```

Skeniranjem QR koda, ispunjuju se potrebni podaci za plačanje unutra bankovne aplikacije.

Zatim kontroler isto tako s "easyinvoice" izrađuje PDF file. Kad je PDF file izrađen, orderController zove 
emailSander fukciju koja koristi "nodemailer" za slanje emaila kupcu s PDF fileom u privitku. 

Kad je email poslan orderController sprema naruđbu u mongoDB bazu podataka.

## server/routes/form.js 

Ruta ( url/form ) obrađuje formController 

## server/controllers/formController.js

koji kroz request dobiva (name, email, message), zatim s "nodemailer" šalje email s dobivenim informacija na email trgovine.

## server/routes/login.js 

Ruta ( url/login ) obrađuje logInController 

## server/controllers/logInController.js

koji kroz request dobiva ( username, password ). logInController u mongoDB bazi podataka traži username 
```javascript 
    const foundUser = await User.findOne({ username });
```
ako ne nađe username koji je isti kao dobiven username vraća negativni response.

Ako pronađe username koji je isti kao dobiven username, provjerava dal se passwordi podudaraju, za to koristi "bycrypt"
```javascript
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
```
ako se ne podudaraju vraća negativan response.

Ako se podudaraju. logInController s "jesonwebtoken" kreira accessToken i refreshToken, refreshToken sprema u bazu podataka i vraca ga kroz cookie, a accesToken vraca kao json.
```javascript
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
```

[## server/routes/logout.js](https://github.com/andrija-zikovic/react-mini-project/blob/main/server/routes/products.js) 

Routa ( url/logout ) obrađuje logoutController 

## server/controller/logoutController.js

koji provjerava dal je kroz cookie poslan JWT.
```javascript
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;
```
Ako je JWT poslan, u bazi podataka traži Usera s tim JWT. Kad ga nađe, briše JWT iz baze podataka tog usera.
```javascript
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
``` 
Zatim vraća prazan cookie i pozitivan response.
```javascript
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
```